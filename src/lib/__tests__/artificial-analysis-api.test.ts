import { describe, test, expect, vi } from 'vitest';
import { getAAIntelligenceIndexSync, getMMLUProSync, intelligenceIndexToElo, artificialAnalysisAPI, initializeAAScoreCache } from '../artificial-analysis-api';
import { AA_INTELLIGENCE_INDEX } from '../aa-static-scores';

describe('AA sync lookup (no substring matching)', () => {
  test('openai/gpt-5-mini returns Mini score via alias, not base gpt-5', () => {
    expect(getAAIntelligenceIndexSync('openai/gpt-5-mini')).toBe(AA_INTELLIGENCE_INDEX['gpt-5-mini']);
    expect(getAAIntelligenceIndexSync('openai/gpt-5-mini')).not.toBe(AA_INTELLIGENCE_INDEX['gpt-5']);
  });

  test('unknown variant does not inherit base model score via substring', () => {
    // 'gpt-5-mini-turbo-xyz' contains 'gpt-5' as substring; old code returned gpt-5's score.
    expect(getAAIntelligenceIndexSync('openai/gpt-5-mini-turbo-xyz')).toBeNull();
    expect(getMMLUProSync('openai/gpt-5-mini-turbo-xyz')).toBeNull();
  });

  test('exact and token-set matches still resolve', () => {
    expect(getAAIntelligenceIndexSync('openai/gpt-5')).toBe(AA_INTELLIGENCE_INDEX['gpt-5']);
    // Token-order variant resolves via token-set equality
    expect(getAAIntelligenceIndexSync('openai/gpt-5-mini:free')).toBe(AA_INTELLIGENCE_INDEX['gpt-5-mini']);
  });

  test('warmed API cache does not substring-match unknown variants', async () => {
    vi.spyOn(artificialAnalysisAPI, 'buildScoreMap').mockResolvedValue(new Map([['gpt-5', 68.5]]));
    await initializeAAScoreCache();
    // Cache holds only gpt-5; unknown variant must not inherit it
    expect(getAAIntelligenceIndexSync('openai/gpt-5-mini-turbo-xyz')).toBeNull();
  });
});

describe('artificial-analysis-api (legacy coverage)', () => {
  describe('getAAIntelligenceIndexSync', () => {
    test('should return exact match from static alias', () => {
      // 'anthropic/claude-3-opus': 'claude-3-opus', which has score 20.6
      const score = getAAIntelligenceIndexSync('anthropic/claude-3-opus');
      expect(score).toBeGreaterThan(0);
    });

    test('should return exact match by model name', () => {
      // 'claude-3-opus' exists in AA_INTELLIGENCE_INDEX
      const score = getAAIntelligenceIndexSync('claude-3-opus');
      expect(score).toBeGreaterThan(0);
    });

    test('should return match for edge case: anthropic: Sonnet 4.5', () => {
      // "anthropic/claude-sonnet-4.5" logic mismatch with "claude-4-5-sonnet"
      // "claude-sonnet-4.5" tokens: {claude, sonnet, 4, 5}
      // "claude-4-5-sonnet" tokens: {claude, 4, 5, sonnet}
      // These should match.
      const score = getAAIntelligenceIndexSync('anthropic/claude-sonnet-4.5');
      expect(score).not.toBeNull();
      // Verify it matches the score for claude-4-5-sonnet (which is around 49.6 currently)
      expect(score).toBeGreaterThan(40);
    });

    test('should return null for non-existent model', () => {
      const score = getAAIntelligenceIndexSync('provider/non-existent-model-xyz-123');
      expect(score).toBeNull();
    });

    test('should be case insensitive', () => {
      const score = getAAIntelligenceIndexSync('ANTHROPIC/CLAUDE-SONNET-4.5');
      expect(score).not.toBeNull();
    });
  });

  describe('intelligenceIndexToElo', () => {
    test('should map 0 to 1000', () => {
      expect(intelligenceIndexToElo(0)).toBe(1000);
    });

    test('should map 100 to 1550', () => {
      expect(intelligenceIndexToElo(100)).toBe(1550);
    });

    test('should map 50 to 1275', () => {
      expect(intelligenceIndexToElo(50)).toBe(1275);
    });
  });
});
