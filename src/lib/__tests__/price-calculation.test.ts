import { 
  calculateQueryCost, 
  calculatePriceComparison, 
  generateHeroText,
  formatCostDisplay,
  getCostRatio 
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
    
    // Expected: (150 * 0.0000015) + (300 * 0.000002) = 0.000225 + 0.0006 = 0.000825
    expect(result.costPerQuery).toBeCloseTo(0.000825, 6);
    expect(result.promptCost).toBeCloseTo(0.000225, 6);
    expect(result.completionCost).toBeCloseTo(0.0006, 6);
  });

  test('calculatePriceComparison should sort models by cost', () => {
    const result = calculatePriceComparison(mockModels, 100);
    
    expect(result.results).toHaveLength(2);
    expect(result.results[0].modelId).toBe('gpt-3.5-turbo'); // Cheaper model first
    expect(result.results[1].modelId).toBe('gpt-4'); // More expensive model second
    
    expect(result.cheapestModel.modelId).toBe('gpt-3.5-turbo');
    expect(result.mostExpensiveModel.modelId).toBe('gpt-4');
  });

  test('generateHeroText should create meaningful comparisons', () => {
    const comparisonData = calculatePriceComparison(mockModels, 100);
    const heroText = generateHeroText(comparisonData);
    
    expect(heroText).toContain('GPT-4');
    expect(heroText).toContain('GPT-3.5 Turbo');
    expect(heroText).toContain('more expensive');
  });

  test('formatCostDisplay should format costs appropriately', () => {
    expect(formatCostDisplay(0.000001)).toBe('$0.000001'); // Very small amounts
    expect(formatCostDisplay(0.001)).toBe('$0.0010'); // Small amounts under cent
    expect(formatCostDisplay(0.1)).toBe('$0.100'); // Under dollar
    expect(formatCostDisplay(1.5)).toBe('$1.50'); // Regular amounts
    expect(formatCostDisplay(150)).toBe('$150'); // Medium amounts
    expect(formatCostDisplay(1500)).toBe('$1,500.00'); // Large amounts with commas
  });

  test('getCostRatio should calculate correct ratios', () => {
    const cheap = { totalCost: 0.1 } as { totalCost: number };
    const expensive = { totalCost: 1.0 } as { totalCost: number };
    
    expect(getCostRatio(expensive, cheap)).toBe(10);
  });
}); 