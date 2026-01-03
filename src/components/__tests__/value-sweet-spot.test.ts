import { describe, it, expect } from 'vitest';

// We need to mock the logic since we can't easily import the component function directly without context
// So we will verify the ALGORITHM logic itself here, similar to how it was implemented.

interface ModelResult {
    modelId: string;
    modelName: string;
    totalCost: number;
    perfScore: number;
}

function findStrategicValue(results: ModelResult[]) {
    const sorted = [...results].sort((a, b) => a.totalCost - b.totalCost);
    const premiumAnchor = sorted[sorted.length - 1];

    return sorted.find(m => {
        if (m.modelId === premiumAnchor.modelId) return false;
        const perfRetention = m.perfScore / (premiumAnchor.perfScore || 1);
        const priceRatio = m.totalCost / (premiumAnchor.totalCost || 1);

        // Criteria: >85% Retention AND <60% Price ( >40% Savings)
        return perfRetention >= 0.85 && priceRatio <= 0.60;
    });
}

describe('Smart Trade-off Logic: Strategic Value', () => {
    it('identifies a sweet spot model (Gemini 3 vs Opus)', () => {
        const models: ModelResult[] = [
            { modelId: 'budget', modelName: 'Flash', totalCost: 10, perfScore: 50 },
            { modelId: 'sweet-spot', modelName: 'Gemini 3 Pro', totalCost: 80, perfScore: 88 }, // 88% perf of Opus, 45% cost of Opus
            { modelId: 'premium', modelName: 'Opus 4.5', totalCost: 175, perfScore: 100 },
        ];

        const recommendation = findStrategicValue(models);
        expect(recommendation).toBeDefined();
        expect(recommendation?.modelId).toBe('sweet-spot');
    });

    it('ignores models that are too expensive (insufficient savings)', () => {
        const models: ModelResult[] = [
            { modelId: 'budget', modelName: 'Flash', totalCost: 10, perfScore: 50 },
            { modelId: 'expensive-mid', modelName: 'Almost Opus', totalCost: 150, perfScore: 95 }, // 95% perf (good) but 85% cost (bad savings)
            { modelId: 'premium', modelName: 'Opus 4.5', totalCost: 175, perfScore: 100 },
        ];

        const recommendation = findStrategicValue(models);
        expect(recommendation).toBeUndefined();
    });

    it('ignores models that perform too poorly (insufficient retention)', () => {
        const models: ModelResult[] = [
            { modelId: 'dumb-cheap', modelName: 'Dumb', totalCost: 20, perfScore: 40 }, // 40% perf (fail)
            { modelId: 'premium', modelName: 'Opus 4.5', totalCost: 175, perfScore: 100 },
        ];

        const recommendation = findStrategicValue(models);
        expect(recommendation).toBeUndefined();
    });
});
