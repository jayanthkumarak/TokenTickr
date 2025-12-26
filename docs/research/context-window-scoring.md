# TokenTickr Scoring Research: Context Windows & Value Quantification

*December 2025*

## Executive Summary

This research document explores the nuances of context window utility and proposes enhanced scoring models for LLM comparison.

The current 25% weight with logarithmic normalization **doesn't properly capture context value** because:

1. **Context windows have diminishing returns** — 1M tokens isn't 4x more useful than 256k
2. **Effective context ≠ Claimed context** — Most models degrade before hitting their limit
3. **Use case matters** — A 32k coder may be more valuable than a 1M model for most users

---

## The Research Findings

### 1. "Lost in the Middle" Phenomenon

> **Key Insight**: LLMs perform best when key information is at the **beginning or end** of the context. Performance degrades significantly when important content is buried in the middle.

```
Performance by Position in Context:
Beginning ██████████ 95%
End       █████████░ 88%
Middle    ██████░░░░ 62%
```

**Implication**: A 1M context window doesn't mean uniform utility across all 1M tokens.

---

### 2. Effective vs Claimed Context (RULER Benchmark)

| Model | Claimed | Effective (maintains 90%+ performance) |
|-------|---------|----------------------------------------|
| GPT-4 Turbo | 128k | ~64-80k |
| Claude 2.1 | 200k | ~130k |
| Gemini 1.5 Pro | 1M | ~800k (for retrieval), ~128k (for reasoning) |
| Llama 3.1 | 128k | ~32k |

> **Critical Finding**: Performance degradation can be **13.9% to 85%** even with perfect retrieval, because reasoning and synthesis degrade faster than retrieval.

---

### 3. Task-Specific Degradation

| Task Type | Degradation at Long Context |
|-----------|----------------------------|
| Simple Retrieval ("Needle in Haystack") | ★☆☆☆☆ Low |
| Multi-hop Reasoning | ★★★★☆ High |
| Complex Summarization | ★★★★★ Very High |
| Code Analysis | ★★★☆☆ Moderate |

---

## Proposed Scoring Models

### 1. Geometric Mean (Default)

Instead of additive weights, multiply normalized scores:

- A model scoring 0 in ANY dimension gets 0 overall (can't compensate with others)
- Rewards balanced excellence, not one extreme strength
- 5x better context with same price/perf → ~1.7x better score (cube root of 5)

### 2. Utility Function (Advanced Option)

Model real-world value using economic utility theory with diminishing returns coefficients for each dimension.

### 3. Pareto Frontier (Visual)

Instead of a single score, show users which models are **non-dominated** - offering the best trade-offs.

---

## Context Advantage Ratio

When comparing models with vastly different context windows (e.g., 1M vs 32k = 31x ratio), we use sqrt scaling to reward but not over-reward massive contexts:

- 5x context = ~2.2x score boost
- 31x context = ~5.6x score boost

This reflects the reality that 1M context is very useful, but not 31x more useful than 32k for most tasks.

---

## References

- RULER Benchmark (NVIDIA, 2024)
- "Lost in the Middle" research (Multiple sources)
- LOFT Benchmark (Google DeepMind, 2024)
- LongBench v2
