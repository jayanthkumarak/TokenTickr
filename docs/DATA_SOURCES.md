# Data Sources & Methodology

This document explains how TokenTickr obtains and validates model performance data.

## Performance Score Sources

TokenTickr uses three tiers of data quality, clearly labeled in the UI:

### 🟢 LMSYS Verified

**Source**: [LMSYS Chatbot Arena](https://chat.lmsys.org)

The gold standard for LLM evaluation. LMSYS Arena uses anonymous pairwise comparisons where users interact with two models and choose their preferred response. These votes are aggregated using a Bradley-Terry model to produce Elo-like ratings with confidence intervals.

- **Methodology**: Crowdsourced, blind A/B testing
- **Update Frequency**: Continuous (we sync periodically)
- **Confidence**: High — backed by 1M+ human evaluations
- **Last Sync**: December 23, 2025

### 🟡 Estimated

**Source**: Internal analysis based on model family and capabilities

Used when a model is not yet in LMSYS Arena but belongs to a known model family. We estimate Elo based on:

1. **Parent model performance** — e.g., Llama 3.1 70B estimated from verified Llama 3 70B
2. **Announced capabilities** — official benchmarks from model providers
3. **Architecture similarity** — parameter count, training approach

- **Confidence**: Medium — educated guess, may be 50-100 Elo off
- **Flag in UI**: Yellow "Est." badge

### 🟣 Heuristic

**Source**: Algorithmic calculation from observable characteristics

Used when we have no direct performance data. The heuristic formula considers:

```
baseElo = 1100  // GPT-3.5 level baseline

// Price signal (expensive often = capable)
priceBonus = log10(pricePerMillion) * 30

// Parameter count bonus
paramBonus = log10(parameters) * 20

// Model family bonuses
familyBonus = {
  'gpt-4': +150,
  'claude-3': +100,
  'gemini': +80,
  'llama-3': +50,
  ...
}

// Context length bonus (larger = more capable architecture)
contextBonus = min(50, log10(contextLength) * 10)

heuristicElo = baseElo + priceBonus + paramBonus + familyBonus + contextBonus
```

- **Confidence**: Low — should be treated as rough approximation
- **Flag in UI**: Purple "Heuristic" badge
- **When used**: New models, obscure providers, missing data

## Context Window Data

Context window sizes are sourced from:

1. **OpenRouter API** — Primary source (real-time from providers)
2. **Fallback Map** — Manual overrides for known incorrect values

Some providers report context windows incorrectly. We maintain a fallback map (`CONTEXT_FALLBACKS` in `static-eval-map.ts`) to correct known issues.

## Price Data

All pricing data comes directly from the [OpenRouter API](https://openrouter.ai) in real-time.

- **Format**: USD per token (converted to per-million for display)
- **Update Frequency**: Real-time on each page load
- **Caveats**: Prices may vary from direct provider APIs due to OpenRouter margin

## Transparency Principles

1. **Always show the source** — Every Elo score is labeled with its provenance
2. **Prefer verified data** — LMSYS > Estimated > Heuristic
3. **Document uncertainty** — Low-confidence scores are flagged
4. **Keep data fresh** — Regular syncs with LMSYS Arena

## Contributing

If you notice incorrect data:

1. Check the [LMSYS Arena leaderboard](https://chat.lmsys.org) for latest scores
2. Open an issue or PR to update `src/lib/static-eval-map.ts`
3. Include source links for verification

---

*Last updated: December 26, 2025*
