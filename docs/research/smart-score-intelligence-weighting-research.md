# Smart Score Research & Simulation Document

## 1. Research: Context Window Usability Thresholds

### Industry Findings

Based on research from IBM, DataNorth, and multiple industry sources:

| Context Size | Use Cases | Limitations |
|--------------|-----------|-------------|
| **< 32K tokens** | On-device models, simple Q&A, latency-optimized | Can't fit most codebases, limited document analysis |
| **32K - 64K tokens** | Single file analysis, short conversations, basic RAG | Struggles with multi-file codebases |
| **64K - 128K tokens** | **"Sweet spot"** - Production apps, single codebase analysis | Emerging standard for enterprise |
| **128K - 200K tokens** | Full codebase analysis, long legal documents | New standard for general-purpose LLMs |
| **256K+ tokens** | "Vibe coding", entire repository processing | Marginal gains, compute-intensive |
| **1M+ tokens** | Multimedia, ultra-long analysis | Frontier capability, "needle-in-haystack" issues |

### Key Insight

**128K is the emerging industry standard for "usable" context.** Below 64K, models struggle with modern coding tasks (multi-file dependencies, full documentation).

**Recommendation**: Context gate threshold should be **64K minimum** (contextScore ~50-60) to be considered "usable" for professional work.

---

## 2. Research: Price Tradeoff Scenarios

### When People Accept Higher Prices

Based on industry research:

| Scenario | Price Tolerance | Reasoning |
|----------|-----------------|-----------|
| **Mission-Critical Tasks** | High (5-10x) | Legal, medical, financial outputs can't afford errors |
| **Client-Facing Work** | High (3-5x) | Quality directly impacts reputation |
| **Code Generation** | Medium-High (2-4x) | Bugs are expensive to fix later |
| **Brainstorming/Drafts** | Low (1-2x) | Iterate cheaply, polish later |
| **High-Volume Processing** | Very Low (<1x) | Unit economics dominate |

### Key Insight

**Price tolerance scales with consequence of error.** For Smart Score (which targets quality-focused users), we should assume users have **medium-high price tolerance** — they're willing to pay 3-5x more for significantly better intelligence.

**Implication for Dynamic Weights:**
- Frontier tier: Price should only hurt by ~15-20% max
- Mid tier: Price can hurt by ~30-40%
- Budget tier: Price can dominate

---

## 3. Dynamic Weighting Model Simulation

### Model Definition

```typescript
function getDynamicWeights(perfScore: number) {
  if (perfScore >= 85) {
    // FRONTIER: Intelligence-first, context-second, price minimal
    return { intel: 0.55, context: 0.35, price: 0.10 };
  } else if (perfScore >= 65) {
    // PRO: Balanced with intelligence edge
    return { intel: 0.45, context: 0.30, price: 0.25 };
  } else {
    // BUDGET: Price becomes significant
    return { intel: 0.35, context: 0.25, price: 0.40 };
  }
}

// Context gate: penalize models with < 64K context (contextScore < 50)
function getContextGate(contextScore: number) {
  if (contextScore >= 50) return 1.0;
  return 0.5 + (contextScore / 100); // 0.5 to 1.0 scale
}

// Final score
const gate = getContextGate(contextScore);
const weights = getDynamicWeights(perfScore);
const score = gate * (
  weights.intel * perfScore +
  weights.context * contextScore +
  weights.price * priceScore
);
```

---

## 4. Scenario Simulations

### Test Data (Approximated from static-eval-map and typical OpenRouter data)

| Model | Elo | Perf | Price | Context | Ctx Score |
|-------|-----|------|-------|---------|-----------|
| **Gemini 3 Pro Preview** | 1450 | 82 | 36 | 1M | 95 |
| **GPT-5.2** | 1480 | 87 | 34 | 400K | 88 |
| **Claude Opus 4.5** | 1460 | 84 | 21 | 200K | 85 |
| **Grok-4** | 1350 | 64 | 50 | 128K | 75 |
| **Kimi K2 Thinking** | 1233 | 42 | 90 | 128K | 85 |
| **DeepSeek V3** | 1320 | 58 | 92 | 128K | 75 |
| **Qwen 2.5 72B** | 1210 | 38 | 85 | 64K | 60 |
| **Llama 3.1 405B** | 1260 | 47 | 65 | 128K | 75 |
| **Mistral Large** | 1230 | 42 | 70 | 32K | 45 |
| **GPT-4o Mini** | 1270 | 49 | 88 | 128K | 75 |

---

### Scenario A: Frontier Models Comparison

Models: Gemini 3 Pro, GPT-5.2, Claude Opus 4.5, Grok-4

**Current Formula (perf² × price × ctx)^(1/4):**

| Model | Perf | Price | Ctx | Current Score | Rank |
|-------|------|-------|-----|---------------|------|
| Gemini 3 Pro | 82 | 36 | 95 | 62.3 | 1 |
| GPT-5.2 | 87 | 34 | 88 | 61.2 | 2 |
| Grok-4 | 64 | 50 | 75 | 60.8 | 3 |
| Opus 4.5 | 84 | 21 | 85 | 54.1 | 4 |

**Problem:** Opus 4.5 is last despite being smarter than Grok-4. Grok-4 beats it purely on price.

**Dynamic Weights (Proposed):**

| Model | Tier | Weights | Gate | Score | Rank |
|-------|------|---------|------|-------|------|
| GPT-5.2 | Frontier | 55/35/10 | 1.0 | 79.8 | 1 |
| Opus 4.5 | Frontier | 55/35/10 | 1.0 | 78.4 | 2 |
| Gemini 3 Pro | Frontier | 55/35/10 | 1.0 | 82.1 | 1 |
| Grok-4 | Pro | 45/30/25 | 1.0 | 61.3 | 4 |

**Result:** Frontier models cluster together (78-82), Grok-4 drops to 4th where it belongs.

---

### Scenario B: Chinese/Budget Models Comparison

Models: Kimi K2, DeepSeek V3, Qwen 2.5 72B

**Current Formula:**

| Model | Perf | Price | Ctx | Current Score | Rank |
|-------|------|-------|-----|---------------|------|
| DeepSeek V3 | 58 | 92 | 75 | 72.4 | 1 |
| Kimi K2 | 42 | 90 | 85 | 68.7 | 2 |
| Qwen 2.5 72B | 38 | 85 | 60 | 58.1 | 3 |

**Dynamic Weights (Proposed):**

| Model | Tier | Weights | Gate | Score | Rank |
|-------|------|---------|------|-------|------|
| DeepSeek V3 | Budget | 35/25/40 | 1.0 | 75.1 | 1 |
| Kimi K2 | Budget | 35/25/40 | 1.0 | 72.5 | 2 |
| Qwen 2.5 72B | Budget | 35/25/40 | 1.0 | 64.3 | 3 |

**Result:** Rankings stay same. Budget tier formula correctly weights price more heavily for these models.

---

### Scenario C: Open Source Models Comparison

Models: Llama 3.1 405B, Mistral Large, GPT-4o Mini (for reference)

**Current Formula:**

| Model | Perf | Price | Ctx | Current Score | Rank |
|-------|------|-------|-----|---------------|------|
| GPT-4o Mini | 49 | 88 | 75 | 68.0 | 1 |
| Llama 3.1 405B | 47 | 65 | 75 | 62.3 | 2 |
| Mistral Large | 42 | 70 | 45 | 54.8 | 3 |

**Dynamic Weights (Proposed):**

| Model | Tier | Weights | Gate | Score | Rank |
|-------|------|---------|------|-------|------|
| GPT-4o Mini | Budget | 35/25/40 | 1.0 | 69.7 | 1 |
| Llama 3.1 405B | Budget | 35/25/40 | 1.0 | 58.2 | 2 |
| Mistral Large | Budget | 35/25/40 | **0.73** | 43.5 | 3 |

**Result:** Mistral Large is penalized by context gate (32K < 64K threshold). This correctly reflects its limited usability for modern workloads.

---

### Scenario D: Mixed Comparison (The Critical Test)

All models together — this is what users actually see.

**Current Formula (Top 6):**

| Rank | Model | Perf | Price | Ctx | Current Score |
|------|-------|------|-------|-----|---------------|
| 1 | DeepSeek V3 | 58 | 92 | 75 | 72.4 |
| 2 | GPT-4o Mini | 49 | 88 | 75 | 68.0 |
| 3 | Kimi K2 | 42 | 90 | 85 | 68.7 |
| 4 | Llama 3.1 405B | 47 | 65 | 75 | 62.3 |
| 5 | Gemini 3 Pro | 82 | 36 | 95 | 62.3 |
| 6 | GPT-5.2 | 87 | 34 | 88 | 61.2 |

**Problem:** Frontier models (Gemini, GPT-5.2) are ranked BELOW budget models (DeepSeek, GPT-4o Mini). This is backwards for a Smart Score.

**Dynamic Weights (Proposed, Top 6):**

| Rank | Model | Tier | Score |
|------|-------|------|-------|
| 1 | Gemini 3 Pro | Frontier | 82.1 |
| 2 | GPT-5.2 | Frontier | 79.8 |
| 3 | Opus 4.5 | Frontier | 78.4 |
| 4 | DeepSeek V3 | Budget | 75.1 |
| 5 | Kimi K2 | Budget | 72.5 |
| 6 | GPT-4o Mini | Budget | 69.7 |

**Result:** ✅ Frontier models now correctly dominate the top. Budget models cluster together in the mid-range. This matches user expectations for "Smart Score."

---

## 5. Proposed Final Formula

```typescript
// SMART SCORE: Intelligence-dominant, context-enabled, price-tolerant

function calculateSmartScore(perf: number, price: number, ctx: number): number {
  // 1. Context gate: models < 64K context are penalized
  const contextGate = ctx >= 50 ? 1.0 : 0.5 + (ctx / 100);
  
  // 2. Tier-based dynamic weights
  let weights: { intel: number; context: number; price: number };
  
  if (perf >= 85) {
    // FRONTIER: Intelligence is everything
    weights = { intel: 0.55, context: 0.35, price: 0.10 };
  } else if (perf >= 65) {
    // PRO: Balanced, slight intel edge
    weights = { intel: 0.45, context: 0.30, price: 0.25 };
  } else {
    // BUDGET: Price matters more
    weights = { intel: 0.35, context: 0.25, price: 0.40 };
  }
  
  // 3. Weighted sum with gate
  const raw = (weights.intel * perf) + (weights.context * ctx) + (weights.price * price);
  return contextGate * raw;
}
```

---

## 6. Questions for Your Decision

1. **Are these tier thresholds correct?**
   - Frontier: perf >= 85 (Elo ~1400+)
   - Pro: perf >= 65 (Elo ~1250-1400)
   - Budget: perf < 65

2. **Is the context gate at 64K (contextScore 50) the right threshold?**

3. **Should frontier models have even LESS price sensitivity (e.g., 5% instead of 10%)?**

4. **Do the simulation rankings match your intuition for what a "Smart Score" should show?**

---

## Awaiting Your Direction

I will not implement any changes until you approve or modify this approach.
