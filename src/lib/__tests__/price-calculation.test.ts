import { describe, test, expect } from 'vitest';
import {
  calculateQueryCost,
  calculatePriceComparison,
  formatCostDisplay,
  safeCostRatio
} from '../price-calculation';
import { OpenRouterModel } from '@/types/models';

// Mock model data for testing
const mockModels: OpenRouterModel[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    created: 1677649963,
    architecture: {
      input_modalities: ['text'],
      output_modalities: ['text'],
      tokenizer: 'cl100k_base',
    },
    top_provider: { is_moderated: false },
    pricing: {
      prompt: '0.0000015', // $1.50 per 1M tokens
      completion: '0.000002', // $2.00 per 1M tokens
    },
    context_length: 4096,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    created: 1687882411,
    architecture: {
      input_modalities: ['text'],
      output_modalities: ['text'],
      tokenizer: 'cl100k_base',
    },
    top_provider: { is_moderated: false },
    pricing: {
      prompt: '0.00003', // $30.00 per 1M tokens
      completion: '0.00006', // $60.00 per 1M tokens
    },
    context_length: 8192,
  },
];

describe('Price Calculation', () => {
  test('calculateQueryCost should calculate correct costs', () => {
    const result = calculateQueryCost(mockModels[0]);

    expect(result.modelId).toBe('gpt-3.5-turbo');
    expect(result.modelName).toBe('GPT-3.5 Turbo');

    // Expected: (1000 * 0.0000015) + (500 * 0.000002) = 0.0015 + 0.0010 = 0.0025
    expect(result.costPerQuery).toBeCloseTo(0.0025, 6);
    expect(result.promptCost).toBeCloseTo(0.0015, 6);
    expect(result.completionCost).toBeCloseTo(0.0010, 6);
  });

  test('calculatePriceComparison should sort models by cost', () => {
    const result = calculatePriceComparison(mockModels, 100);

    expect(result.results).toHaveLength(2);
    expect(result.results[0].modelId).toBe('gpt-3.5-turbo'); // Cheaper model first
    expect(result.results[1].modelId).toBe('gpt-4'); // More expensive model second

    expect(result.cheapestModel.modelId).toBe('gpt-3.5-turbo');
    expect(result.mostExpensiveModel.modelId).toBe('gpt-4');
  });

  test('formatCostDisplay should format costs appropriately', () => {
    expect(formatCostDisplay(0.000001)).toBe('<$0.01'); // implementation returns <$0.01 for <0.01
    expect(formatCostDisplay(0.001)).toBe('<$0.01'); // implementation returns <$0.01 for <0.01
    expect(formatCostDisplay(0.1)).toBe('$0.10'); // Standard 2 decimal places
    expect(formatCostDisplay(1.5)).toBe('$1.50'); // Regular amounts
    expect(formatCostDisplay(150)).toBe('$150.00'); // Always 2 decimal places
    expect(formatCostDisplay(1500)).toBe('$1,500.00'); // Large amounts with commas
  });

  test('safeCostRatio should calculate correct ratios', () => {
    // safeCostRatio(costA, costB) -> costA / costB
    expect(safeCostRatio(1.0, 0.1)).toBe(10);
    expect(safeCostRatio(0.1, 1.0)).toBe(0.1);
    expect(safeCostRatio(1, 0)).toBe(0); // Handled infinite case
  });
});
