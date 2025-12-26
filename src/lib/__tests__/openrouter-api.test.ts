/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { OpenRouterAPI } from '../openrouter-api';

// Create a mock instance for testing
// We need to reset the singleton instance or mock the fetch calls carefully
// Since OpenRouterAPI is a singleton, we need to be careful with state

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
        it('should fetch and validate models successfully', async () => {
            const mockResponse = {
                data: [
                    {
                        id: 'model-1',
                        name: 'Model 1',
                        pricing: { prompt: '0', completion: '0' }
                    },
                    {
                        id: 'model-2',
                        name: 'Model 2',
                        pricing: { prompt: '1', completion: '1' }
                    }
                ]
            };

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const models = await api.getModels();

            expect(models).toHaveLength(2);
            expect(models[0].id).toBe('model-1');
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        it('should throw ApiError on network failure', async () => {
            (global.fetch as any).mockRejectedValueOnce(new TypeError('Network error'));

            await expect(api.getModels()).rejects.toThrow('Network error');
        });

        it('should throw ApiError on API error status', async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: false,
                status: 429,
                statusText: 'Too Many Requests',
                json: async () => ({ error: { message: 'Rate limit exceeded' } }),
            });

            await expect(api.getModels()).rejects.toThrow('Rate limit exceeded');
        });

        it('should filter out invalid models', async () => {
            const mockResponse = {
                data: [
                    {
                        id: 'valid-model',
                        name: 'Valid Model',
                        pricing: { prompt: '0', completion: '0' }
                    },
                    {
                        id: 'invalid-model-no-pricing',
                        name: 'Invalid Model',
                        // missing pricing
                    },
                    null // completely invalid
                ]
            };

            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const models = await api.getModels();

            expect(models).toHaveLength(1);
            expect(models[0].id).toBe('valid-model');
        });

        it('should throw ApiError on malformed response', async () => {
            (global.fetch as any).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ notData: [] }),
            });

            await expect(api.getModels()).rejects.toThrow('Invalid API response format');
        });
    });
});
