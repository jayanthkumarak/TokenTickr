import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    logSessionStart,
    logComparison,
    getCurrentSessionId,
    _resetComparisonState,
} from '../usage-logger';

// Mock sessionStorage
const mockSessionStorage: Record<string, string> = {};
const sessionStorageMock = {
    getItem: vi.fn((key: string) => mockSessionStorage[key] || null),
    setItem: vi.fn((key: string, value: string) => { mockSessionStorage[key] = value; }),
    removeItem: vi.fn((key: string) => { delete mockSessionStorage[key]; }),
    clear: vi.fn(() => { Object.keys(mockSessionStorage).forEach(k => delete mockSessionStorage[k]); }),
};

// Mock fetch
const mockFetch = vi.fn();

describe('usage-logger', () => {
    beforeEach(() => {
        // Reset mocks
        vi.stubGlobal('sessionStorage', sessionStorageMock);
        vi.stubGlobal('fetch', mockFetch);
        vi.stubGlobal('window', { location: { hostname: 'tokentickr.com' } });

        // Reset all state
        sessionStorageMock.clear();
        _resetComparisonState();
        mockFetch.mockReset();
        mockFetch.mockResolvedValue({ ok: true });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    describe('logSessionStart', () => {
        it('should generate a valid UUID for session', () => {
            logSessionStart();

            const sessionId = getCurrentSessionId();
            expect(sessionId).toBeDefined();
            expect(sessionId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        it('should log session_start event', () => {
            logSessionStart();

            expect(mockFetch).toHaveBeenCalledWith('/api/log', expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('"event_type":"session_start"'),
            }));
        });

        it('should not log again if already logged in same session', () => {
            logSessionStart();
            logSessionStart();

            // Should only be called once
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('logComparison', () => {
        it('should not log if less than 2 models', () => {
            logComparison(['model-1']);

            expect(mockFetch).not.toHaveBeenCalled();
        });

        it('should log comparison with 2+ models', () => {
            logComparison(['model-1', 'model-2']);

            expect(mockFetch).toHaveBeenCalledWith('/api/log', expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('"event_type":"comparison"'),
            }));
        });

        it('should sort models for consistent comparison', () => {
            logComparison(['model-b', 'model-a']);

            const body = JSON.parse(mockFetch.mock.calls[0][1].body);
            expect(body.models).toEqual(['model-a', 'model-b']);
        });

        it('should not re-log the same comparison', () => {
            logComparison(['model-a', 'model-b']);
            logComparison(['model-b', 'model-a']); // Same models, different order

            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        it('should log when models change', () => {
            logComparison(['model-a', 'model-b']);
            logComparison(['model-a', 'model-b', 'model-c']); // Added model

            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
    });

    describe('getCurrentSessionId', () => {
        it('should return null when no session exists', () => {
            expect(getCurrentSessionId()).toBeNull();
        });

        it('should return session ID after logSessionStart', () => {
            logSessionStart();

            const sessionId = getCurrentSessionId();
            expect(sessionId).toBeDefined();
            expect(typeof sessionId).toBe('string');
        });
    });
});
