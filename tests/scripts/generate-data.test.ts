import { describe, it, expect } from 'vitest';
import { minifyOpenRouterModels } from '../../scripts/generate-openrouter-static-data.mjs';
// Minified shape produced by minifyOpenRouterModels (script is untyped .mjs)
interface MinifiedModel {
    id?: string;
    name?: string;
    description?: string;
    pricing?: {
        prompt?: string;
        completion?: string;
        internal_reasoning?: string;
        input_cache_reads?: string;
        input_cache_writes?: string;
    };
    architecture?: {
        tokenizer?: string;
        instruct_type?: unknown;
        input_modalities?: string[];
        output_modalities?: string[];
    };
    top_provider?: {
        is_moderated?: boolean;
    };
    created?: number;
    supported_parameters?: string[];
}

// Mock raw data shaped like the OpenRouter API response
const mockRawModels = [
    {
        id: "openai/gpt-4",
        name: "GPT-4",
        description: "A very smart model that has a very long description that should be truncated because it exceeds the limit we set for our static data to keep the bundle size small...",
        context_length: 8192,
        pricing: {
            prompt: "0.00003",
            completion: "0.00006"
        },
        architecture: {
            tokenizer: "cl100k_base",
            modality: "text+image"
        },
        top_provider: {
            is_moderated: true
        },
        created: 1687824000
    },
    {
        id: "anthropic/claude-2",
        name: "Claude 2",
        // No description
        context_length: 100000,
        pricing: {
            prompt: "0.00001",
            completion: "0.00003"
        },
        // Missing architecture
    },
    {
        // Invalid model - missing ID
        name: "Invalid Model"
    }
];

describe('Data Generation Logic', () => {
    it('should transform raw models into valid schema', () => {
        const result = minifyOpenRouterModels(mockRawModels);
        expect(result).toHaveLength(2); // Should filter out the invalid one

        expect(result[0]).toEqual({
            id: "openai/gpt-4",
            name: "GPT-4",
            description: mockRawModels[0].description, // 172 chars < 300, kept whole
            context_length: 8192,
            pricing: {
                prompt: "0.00003",
                completion: "0.00006"
            },
            architecture: {
                tokenizer: "cl100k_base",
                input_modalities: ["text", "image"],
                output_modalities: ["text", "image"]
            },
            top_provider: {
                is_moderated: true
            },
            created: 1687824000
        });
    });

    it('should truncate descriptions over 300 chars', () => {
        const long = { ...mockRawModels[0], description: 'x'.repeat(400) };
        const result = minifyOpenRouterModels([long]);
        expect(result[0].description).toHaveLength(300);
        expect(result[0].description.endsWith('...')).toBe(true);
    });

    it('should sanitize null instruct_type to undefined', () => {
        const rawWithNull = [{
            ...mockRawModels[0],
            architecture: {
                ...mockRawModels[0].architecture,
                input_modalities: ["text"], // trigger the "new API" logic
                instruct_type: null
            }
        }];

        const result = minifyOpenRouterModels(rawWithNull);
        expect(result[0].architecture.instruct_type).toBeUndefined();
    });

    it('should handle missing optional fields safely', () => {
        const result = minifyOpenRouterModels(mockRawModels);
        const claude = (result as MinifiedModel[]).find((m) => m.id === 'anthropic/claude-2');

        expect(claude).toBeDefined();
        expect(claude?.description).toBe('');
        expect(claude?.architecture?.tokenizer).toBe('unknown');
        expect(claude?.top_provider?.is_moderated).toBe(false);
        // created falls back to now
        expect(Math.abs((claude?.created ?? 0) - Math.floor(Date.now() / 1000))).toBeLessThan(60);
    });

    it('should filter out invalid models', () => {
        const result = minifyOpenRouterModels(mockRawModels);
        const invalid = (result as MinifiedModel[]).find((m) => m.name === 'Invalid Model');
        expect(invalid).toBeUndefined();
    });

    it('should filter supported_parameters to the allowlist', () => {
        const raw = [{
            id: 'openai/gpt-4o',
            name: 'GPT-4o',
            pricing: { prompt: '0.00001', completion: '0.00002' },
            supported_parameters: ['tools', 'tool_choice', 'temperature', 'max_tokens', 'reasoning'],
        }];
        const result = minifyOpenRouterModels(raw) as MinifiedModel[];
        expect(result[0].supported_parameters).toEqual(['tools', 'tool_choice', 'reasoning']);
    });

    it('should omit supported_parameters when nothing survives the allowlist', () => {
        const raw = [{
            id: 'openai/gpt-4o',
            name: 'GPT-4o',
            pricing: { prompt: '0.00001', completion: '0.00002' },
            supported_parameters: ['temperature', 'max_tokens'],
        }];
        const result = minifyOpenRouterModels(raw) as MinifiedModel[];
        expect(result[0].supported_parameters).toBeUndefined();
    });

    it('should split legacy modality on + / - > instead of emitting a combined token', () => {
        const cases: Array<[string, string[]]> = [
            ['text+image', ['text', 'image']],
            ['text->image', ['text', 'image']],
            ['text/image', ['text', 'image']],
        ];
        for (const [modality, expected] of cases) {
            const result = minifyOpenRouterModels([{
                id: 'x/y',
                name: 'Y',
                pricing: { prompt: '0', completion: '0' },
                architecture: { modality },
            }]) as MinifiedModel[];
            expect(result[0].architecture?.input_modalities).toEqual(expected);
            expect(result[0].architecture?.output_modalities).toEqual(expected);
        }
    });

    it('should prefer explicit input/output modalities over the legacy fallback', () => {
        const result = minifyOpenRouterModels([{
            id: 'x/y',
            name: 'Y',
            pricing: { prompt: '0', completion: '0' },
            architecture: {
                modality: 'text+image',
                input_modalities: ['text'],
                output_modalities: ['text'],
            },
        }]) as MinifiedModel[];
        expect(result[0].architecture?.input_modalities).toEqual(['text']);
        expect(result[0].architecture?.output_modalities).toEqual(['text']);
    });

    it('should preserve non-zero pricing extras and drop zero/absent ones', () => {
        const result = minifyOpenRouterModels([{
            id: 'x/y',
            name: 'Y',
            pricing: {
                prompt: '0.00001',
                completion: '0.00002',
                internal_reasoning: '0.000001',
                input_cache_reads: '0',
                input_cache_writes: '0.0000001',
            },
        }]) as MinifiedModel[];
        expect(result[0].pricing?.internal_reasoning).toBe('0.000001');
        expect(result[0].pricing?.input_cache_reads).toBeUndefined();
        expect(result[0].pricing?.input_cache_writes).toBe('0.0000001');
    });
});
