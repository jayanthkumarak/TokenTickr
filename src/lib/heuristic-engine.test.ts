import { describe, it, expect } from 'vitest';
import { calculateHeuristicElo, explainHeuristicElo } from './heuristic-engine';
import { OpenRouterModel } from '@/types/models';

// Factory to create mock models for testing
function createMockModel(overrides: Partial<OpenRouterModel> = {}): OpenRouterModel {
    return {
        id: 'test/test-model',
        name: 'Test Model',
        created: Date.now(),
        architecture: {
            input_modalities: ['text'],
            output_modalities: ['text'],
            tokenizer: 'cl100k_base',
        },
        top_provider: { is_moderated: false },
        pricing: {
            prompt: '0.000001', // $1/1M tokens (mid-tier)
            completion: '0.000002',
        },
        context_length: 32000,
        ...overrides,
    };
}

describe('Heuristic Intelligence Engine', () => {
    describe('calculateHeuristicElo', () => {
        it('should return heuristic source type', () => {
            const model = createMockModel();
            const result = calculateHeuristicElo(model);

            expect(result.source).toBe('heuristic');
            expect(result.signals).toBeDefined();
        });

        it('should produce higher Elo for expensive models', () => {
            const cheapModel = createMockModel({
                id: 'cheap/mini-model',
                name: 'Mini Model',
                pricing: { prompt: '0.00000001', completion: '0.00000001' }, // Ultra cheap
            });

            const expensiveModel = createMockModel({
                id: 'premium/pro-model',
                name: 'Pro Model',
                pricing: { prompt: '0.00005', completion: '0.0001' }, // Expensive
            });

            const cheapResult = calculateHeuristicElo(cheapModel);
            const expensiveResult = calculateHeuristicElo(expensiveModel);

            expect(expensiveResult.elo).toBeGreaterThan(cheapResult.elo);
        });

        it('should boost 70b models more than 7b models', () => {
            const small = createMockModel({
                id: 'meta/llama-7b',
                name: 'Llama 7B',
                pricing: { prompt: '0.000001', completion: '0.000001' },
            });

            const large = createMockModel({
                id: 'meta/llama-70b',
                name: 'Llama 70B',
                pricing: { prompt: '0.000001', completion: '0.000001' },
            });

            const smallResult = calculateHeuristicElo(small);
            const largeResult = calculateHeuristicElo(large);

            expect(largeResult.signals.paramBoost).toBeGreaterThan(smallResult.signals.paramBoost);
            expect(largeResult.elo).toBeGreaterThan(smallResult.elo);
        });

        it('should penalize "mini" keyword models', () => {
            const regular = createMockModel({
                id: 'provider/model',
                name: 'Model',
            });

            const mini = createMockModel({
                id: 'provider/model-mini',
                name: 'Model Mini',
            });

            const regularResult = calculateHeuristicElo(regular);
            const miniResult = calculateHeuristicElo(mini);

            expect(miniResult.signals.keywordBoost).toBeLessThan(regularResult.signals.keywordBoost);
        });

        it('should boost "pro" keyword models', () => {
            const regular = createMockModel({
                id: 'provider/model',
                name: 'Model',
            });

            const pro = createMockModel({
                id: 'provider/model-pro',
                name: 'Model Pro',
            });

            const regularResult = calculateHeuristicElo(regular);
            const proResult = calculateHeuristicElo(pro);

            // Regular model has 0 keyword boost, pro model has positive boost
            expect(regularResult.signals.keywordBoost).toBe(0);
            expect(proResult.signals.keywordBoost).toBeGreaterThan(0);
            expect(proResult.elo).toBeGreaterThan(regularResult.elo);
        });

        it('should respect floor bound (1050)', () => {
            const cheapTinyModel = createMockModel({
                id: 'unknown/tiny-mini-1b',
                name: 'Tiny Mini 1B',
                pricing: { prompt: '0.0000000001', completion: '0.0000000001' },
                context_length: 2048,
            });

            const result = calculateHeuristicElo(cheapTinyModel);

            expect(result.elo).toBeGreaterThanOrEqual(1050);
        });

        it('should respect cap bound (1400)', () => {
            const expensiveLargeModel = createMockModel({
                id: 'premium/ultra-pro-405b',
                name: 'Ultra Pro 405B',
                pricing: { prompt: '0.0001', completion: '0.0002' }, // Very expensive
                context_length: 1000000,
            });

            const result = calculateHeuristicElo(expensiveLargeModel);

            expect(result.elo).toBeLessThanOrEqual(1400);
        });

        it('should boost long context models', () => {
            const shortContext = createMockModel({
                context_length: 4096,
            });

            const longContext = createMockModel({
                context_length: 200000,
            });

            const shortResult = calculateHeuristicElo(shortContext);
            const longResult = calculateHeuristicElo(longContext);

            expect(longResult.signals.contextBoost).toBeGreaterThan(shortResult.signals.contextBoost);
        });
    });

    describe('explainHeuristicElo', () => {
        it('should return a human-readable breakdown', () => {
            const model = createMockModel({
                id: 'test/pro-70b',
                name: 'Test Pro 70B',
            });

            const explanation = explainHeuristicElo(model);

            expect(explanation).toContain('Heuristic Elo');
            expect(explanation).toContain('Base:');
            expect(explanation).toContain('Price boost:');
            expect(explanation).toContain('Param boost:');
        });
    });
});
