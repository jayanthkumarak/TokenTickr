/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { OpenRouterAPI } from '../openrouter-api';

// Mock static data must be defined before vi.mock or inside it
const mockStaticData = [
    {
        id: 'static-model',
        name: 'Static Model',
        pricing: { prompt: '0', completion: '0' },
        architecture: { tokenizer: 'test' }
    }
];

// Mock dynamic import
vi.mock('../openrouter-static-data', () => ({
    OPENROUTER_STATIC_DATA: mockStaticData
}));

describe('OpenRouterAPI', () => {
    let api: OpenRouterAPI;

    beforeEach(() => {
        // Reset fetch mock
        global.fetch = vi.fn();
        api = OpenRouterAPI.getInstance();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('formatPrice', () => {
        it('should format free models correctly', () => {
            expect(OpenRouterAPI.formatPrice('0')).toBe('Free');
            expect(OpenRouterAPI.formatPrice('0.0')).toBe('Free');
        });

        it('should format very low cost models', () => {
            // 0.0000005 * 1M = 0.5
            expect(OpenRouterAPI.formatPrice('0.0000005')).toBe('$0.500/M');
        });

        it('should format standard cost models', () => {
            // 0.000002 * 1M = 2.0
            expect(OpenRouterAPI.formatPrice('0.000002')).toBe('$2.00/M');
        });

        it('should handle invalid inputs gracefully', () => {
            expect(OpenRouterAPI.formatPrice('invalid')).toBe('Free');
        });
    });

    describe('formatContextLength', () => {
        it('should format millions correctly', () => {
            expect(OpenRouterAPI.formatContextLength(1000000)).toBe('1.0M');
            expect(OpenRouterAPI.formatContextLength(2500000)).toBe('2.5M');
        });

        it('should format thousands correctly', () => {
            expect(OpenRouterAPI.formatContextLength(4096)).toBe('4K');
            expect(OpenRouterAPI.formatContextLength(128000)).toBe('128K');
        });

        it('should format small numbers as is', () => {
            expect(OpenRouterAPI.formatContextLength(512)).toBe('512');
        });

        it('should handle zero or invalid input', () => {
            expect(OpenRouterAPI.formatContextLength(0)).toBe('Unknown');
            expect(OpenRouterAPI.formatContextLength(NaN)).toBe('Unknown');
        });
    });

    describe('getModels', () => {
        it('should return static data by default without fetching', async () => {
            const models = await api.getModels();

            expect(models).toEqual(mockStaticData);
            expect(global.fetch).not.toHaveBeenCalled();
        });

        it('should fetch from API when forceRefresh is true', async () => {
            const mockResponse = {
                data: [
                    {
                        id: 'fetched-model',
                        name: 'Fetched Model',
                        pricing: { prompt: '0', completion: '0' }
                    }
                ]
            };

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const models = await api.getModels(true);

            expect(models).toHaveLength(1);
            expect(models[0].id).toBe('fetched-model');
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        it('should fallback to static data on fetch error when forceRefresh is true', async () => {
            (global.fetch as any).mockRejectedValueOnce(new TypeError('Network error'));

            const models = await api.getModels(true);

            expect(models).toEqual(mockStaticData);
        });
    });
});
