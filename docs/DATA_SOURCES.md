# Data Sources & Methodology

This document explains how TokenTickr obtains and validates model performance data.

## Performance Score Sources

TokenTickr uses three tiers of data quality, clearly labeled in the UI:

### 🔵 AA Intelligence Index (Composite Fallback)

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

**Coverage**: 367 models (auto-generated from API)

- **Confidence**: High — objective, multi-source composite
- **Flag in UI**: Blue "AA Index" badge
- **Update**: Run `npm run generate:aa-data` to refresh from API

---

### 🟢 LMSYS Verified (Curated Fallback)

**Source**: [LMSYS Chatbot Arena](https://chat.lmsys.org)

The standard for human preference evaluation. LMSYS Arena uses anonymous pairwise comparisons where users interact with two models and choose their preferred response. These votes are aggregated using a Bradley-Terry model to produce Elo-like ratings.

- **Methodology**: Crowdsourced, blind A/B testing
- **Update Frequency**: Periodic syncs
- **Confidence**: High — backed by 1M+ human evaluations
- **Flag in UI**: Green "Verified" badge

---

### ⚪ Insufficient Data (No Guessing)

Models with no benchmark coverage are **excluded from the Smart Value Ranking** and labeled "Insufficient Data". TokenTickr does not estimate, interpolate, or heuristically invent intelligence scores — a missing score is shown as missing. (The former heuristic Elo engine was removed in the 2026-10 redesign.)

---

## Scoring Cascade

When calculating performance scores, we check sources in order:

```
1. Curated static overrides   — hand-verified frontier models
2. MMLU-Pro (Artificial Analysis)
3. AA Intelligence Index      — mapped to Elo scale (367 scored models)
4. LMSYS / estimated evals    — curated fallback map
5. Insufficient Data          — excluded from ranking (never guessed)
```

## Context Window Data

Context window sizes are sourced from:

1. **OpenRouter API** — Primary source, fetched at build time into committed static data
2. **Fallback Map** — Manual overrides for known incorrect values

## Price Data

All pricing data comes from the [OpenRouter API](https://openrouter.ai), fetched at build time (not live at runtime).

- **Format**: USD per token (converted to per-million for display)
- **Update Frequency**: Refreshed manually via `npm run generate:static-data`, committed, then rebuilt

## Transparency Principles

1. **Always show the source** — Every score is labeled with its provenance
2. **Prefer objective data** — Benchmarks > human preference > curated estimates; never guessed
3. **Document uncertainty** — Low-confidence scores are flagged
4. **Keep data fresh** — Auto-generate from APIs

## Updating AA Data

To refresh the Intelligence Index data from Artificial Analysis:

```bash
# Requires NEXT_PUBLIC_AA_API_KEY environment variable
npm run generate:aa-data
```

This generates `src/lib/aa-static-scores.ts` with latest scores for all 367+ models.

## Attribution

- **Intelligence Index**: Data provided by [ArtificialAnalysis.ai](https://artificialanalysis.ai)
- **Human Preference**: Data from [LMSYS Chatbot Arena](https://chat.lmsys.org)
- **Model Pricing**: [OpenRouter](https://openrouter.ai)

---

*Last updated: October 19, 2026*
