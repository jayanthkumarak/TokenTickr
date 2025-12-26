# Data Sources & Methodology

This document explains how TokenTickr obtains and validates model performance data.

## Performance Score Sources

TokenTickr uses three tiers of data quality, clearly labeled in the UI:

### 🔵 AA Intelligence Index (Highest Priority)

**Source**: [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models)

A composite benchmark aggregating multiple independent evaluations:

- **MMLU-Pro** — Multi-task reasoning (harder than MMLU)
- **LiveBench** — Contamination-resistant with monthly updates
- **AIME 2024/2025** — Mathematical olympiad problems
- **GPQA Diamond** — Graduate-level science questions
- **IFBench** — Instruction following

**Why we prefer this:**
- Aggregates multiple benchmarks for reliability
- Less prone to training data contamination than single benchmarks
- More objective than human preference voting
- Measures raw capability rather than "vibes"

**Coverage**: 361 models (auto-generated from API)

- **Confidence**: High — objective, multi-source composite
- **Flag in UI**: Blue "AA Index" badge
- **Update**: Run `npm run generate:aa-data` to refresh from API

---

### 🟢 LMSYS Verified (Fallback #1)

**Source**: [LMSYS Chatbot Arena](https://chat.lmsys.org)

The standard for human preference evaluation. LMSYS Arena uses anonymous pairwise comparisons where users interact with two models and choose their preferred response. These votes are aggregated using a Bradley-Terry model to produce Elo-like ratings.

- **Methodology**: Crowdsourced, blind A/B testing
- **Update Frequency**: Periodic syncs
- **Confidence**: High — backed by 1M+ human evaluations
- **Flag in UI**: Green "Verified" badge

---

### 🟣 Heuristic (Last Resort)

**Source**: Algorithmic calculation from observable characteristics

Used when we have no benchmark data. The heuristic formula considers:

```
baseElo = 1100  // GPT-3.5 level baseline

// Parameter count bonus
paramBonus = log10(parameters) * 20

// Model family bonuses
familyBonus = {
  'gpt-4': +100,
  'claude-3': +80,
  'gemini': +60,
  'llama-3': +40,
  ...
}

// Context length bonus
contextBonus = min(40, log10(contextLength) * 8)

heuristicElo = baseElo + paramBonus + familyBonus + contextBonus
```

**Ceiling**: Maximum 1280 Elo (conservative to avoid overestimating)

- **Confidence**: Low — should be treated as rough approximation
- **Flag in UI**: Purple "Heuristic" badge
- **When used**: Brand new models, obscure providers

---

## Scoring Cascade

When calculating performance scores, we check sources in order:

```
1. AA Intelligence Index (best) — 361 models
2. LMSYS Chatbot Arena Elo    — fallback
3. Heuristic engine           — last resort (ceiling: 1280)
```

## Context Window Data

Context window sizes are sourced from:

1. **OpenRouter API** — Primary source (real-time from providers)
2. **Fallback Map** — Manual overrides for known incorrect values

## Price Data

All pricing data comes directly from the [OpenRouter API](https://openrouter.ai) in real-time.

- **Format**: USD per token (converted to per-million for display)
- **Update Frequency**: Real-time on each page load

## Transparency Principles

1. **Always show the source** — Every score is labeled with its provenance
2. **Prefer objective data** — AA Index > LMSYS > Heuristic
3. **Document uncertainty** — Low-confidence scores are flagged
4. **Keep data fresh** — Auto-generate from APIs

## Updating AA Data

To refresh the Intelligence Index data from Artificial Analysis:

```bash
# Requires NEXT_PUBLIC_AA_API_KEY environment variable
npm run generate:aa-data
```

This generates `src/lib/aa-static-scores.ts` with latest scores for all 361+ models.

## Attribution

- **Intelligence Index**: Data provided by [ArtificialAnalysis.ai](https://artificialanalysis.ai)
- **Human Preference**: Data from [LMSYS Chatbot Arena](https://chat.lmsys.org)
- **Model Pricing**: [OpenRouter](https://openrouter.ai)

---

*Last updated: December 26, 2025*
