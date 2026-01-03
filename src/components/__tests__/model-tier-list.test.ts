import { describe, it, expect } from 'vitest';
import { PriceCalculationResult } from '@/lib/price-calculation';

// Helper to simulate the logic inside ModelTierList
function getTier(pricePosition: number) {
    if (pricePosition < 0.2) return "Budget";
    else if (pricePosition > 0.7) return "Premium";
    return "Balanced";
}

describe('Model Tier Logic', () => {
    it('categorizes budget models correctly', () => {
        const tier = getTier(0.1);
        expect(tier).toBe('Budget');
    });

    it('categorizes premium models correctly', () => {
        const tier = getTier(0.8);
        expect(tier).toBe('Premium');
    });

    it('categorizes balanced models correctly', () => {
        const tier = getTier(0.5);
        expect(tier).toBe('Balanced');
    });
});
