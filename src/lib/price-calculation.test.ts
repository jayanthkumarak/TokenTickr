import { describe, it, expect } from 'vitest';
import { calculatePriceComparison } from './price-calculation';
import { MODEL_EVALS, CONTEXT_FALLBACKS } from './static-eval-map';

// Mock interface to avoid alias resolution issues in test
interface MockModel {
    id: string;
    name: string;
    pricing: { prompt: string; completion: string };
    context_length: number;
    description?: string;
    top_provider?: { max_completion_tokens: number; is_moderated: boolean };
}

describe('TokenTickr Core Logic', () => {
    describe('Data Integrity (Static Map)', () => {
        it('should have Elo ratings for critical new models', () => {
            const criticalModels = [
                'google/gemini-3-pro-preview',
                'openai/gpt-5.2',
                'anthropic/claude-opus-4.5',
                'xai/grok-4'
            ];

            criticalModels.forEach(id => {
                expect(MODEL_EVALS[id], `Missing Elo for ${id}`).toBeDefined();
                expect(MODEL_EVALS[id].elo).toBeGreaterThan(0);
            });
        });

        it('should have context fallback for Opus 4.5', () => {
            const opusId = 'anthropic/claude-opus-4.5';
            expect(CONTEXT_FALLBACKS[opusId], `Missing context fallback for ${opusId}`).toBeDefined();
            expect(CONTEXT_FALLBACKS[opusId]).toBeGreaterThan(0);
        });
    });

    describe('Scoring Logic', () => {
        it('should correctly identify Estimated Elo source', () => {
            // Mock input models
            // We use 'openai/gpt-5.2' which we verified has source: 'estimated'
            const models: MockModel[] = [
                {
                    id: 'openai/gpt-5.2',
                    name: 'GPT-5.2',
                    pricing: { prompt: '0.000005', completion: '0.000015' },
                    context_length: 200000,
                    description: 'Test Model',
                    top_provider: { max_completion_tokens: 4096, is_moderated: false }
                },
                {
                    id: 'google/gemini-pro-1.5', // Known LMSYS source
                    name: 'Gemini 1.5 Pro',
                    pricing: { prompt: '0.000001', completion: '0.000003' },
                    context_length: 2000000,
                    description: 'Test Model',
                    top_provider: { max_completion_tokens: 8192, is_moderated: false }
                }
            ];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = calculatePriceComparison(models as any[], 1000);

            const gpt5 = result.results.find(r => r.modelId === 'openai/gpt-5.2');
            const gemini15 = result.results.find(r => r.modelId === 'google/gemini-pro-1.5');

            expect(gpt5).toBeDefined();
            expect(gpt5?.eloSource).toBe('estimated');
            expect(gpt5?.eloScore).toBe(1480); // matches static map

            expect(gemini15).toBeDefined();
            expect(gemini15?.eloSource).toBe('lmsys');
        });

        it('should assign non-zero value score', () => {
            const models: MockModel[] = [
                {
                    id: 'openai/gpt-5.2',
                    name: 'GPT-5.2',
                    pricing: { prompt: '10', completion: '30' }, // Expensive
                    context_length: 128000,
                    description: 'Test',
                    top_provider: { max_completion_tokens: 4096, is_moderated: false }
                }
            ];

            const result = calculatePriceComparison(models, 1000);
            const r = result.results[0];

            expect(r.valueScore).toBeGreaterThan(0);
            expect(r.valueScore).toBeLessThanOrEqual(100);
        });
    });
});
