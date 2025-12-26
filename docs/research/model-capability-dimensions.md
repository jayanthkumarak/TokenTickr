# Model Capability Dimensions: Deep Research for Scoring Enhancement

*December 2025*

## Executive Summary

The current TokenTickr scoring uses three dimensions: **Price, Performance (Elo), and Context**. This research explores additional model capabilities that could enhance the value ranking system.

---

## Current vs Potential Dimensions

| Dimension | Status | Data Source | Quantifiable? |
|-----------|--------|-------------|---------------|
| **Price** | ✅ Active | OpenRouter API | Yes |
| **Performance (Elo)** | ✅ Active | LMSYS + Curated | Yes |
| **Context Length** | ✅ Active | OpenRouter API | Yes |
| **Multimodality** | 🔬 Potential | `architecture.input_modalities` | Partial |
| **Tool/Function Calling** | 🔬 Potential | `supported_parameters` | Partial |
| **Speed (TTFT)** | 🔬 Potential | External monitoring | Requires infra |
| **Reliability** | 🔬 Potential | Provider SLA/monitoring | Requires infra |
| **Safety/Moderation** | 🔬 Potential | `top_provider.is_moderated` | Boolean only |

---

## 1. Multimodality

### What It Means
Models that can process inputs beyond text:
- **Image** (most common): GPT-4o, Claude 3, Gemini 1.5
- **Audio/Voice**: Gemini 1.5 Pro, GPT-4o Realtime
- **Video**: Gemini 1.5 Pro (native), GPT-4o (frame extraction)
- **Output Modalities**: Image generation, audio generation

### Data Available (OpenRouter)

```typescript
architecture: {
  input_modalities: ["text", "image", "audio", "video"],
  output_modalities: ["text", "image"]
}
```

### Key Benchmarks (2024-2025)

| Benchmark | Focus | Notes |
|-----------|-------|-------|
| **MME** | General multimodal | Perception + cognition |
| **MMMU** | Multimodal understanding | University-level tasks |
| **AudioBench** | Audio LLMs | 8 tasks, 26 datasets |
| **Video-MME** | Video comprehension | 900 videos, multi-duration |

### Recommendation

**Implement multimodality bonus:**
- +10 points for image input support
- +5 points for audio/video support
- +5 points for image output (generation)

Simple to implement — data already available.

---

## 2. Tool/Function Calling

### What It Means
The ability to invoke external APIs, search the web, execute code, or use structured outputs.

### Key Benchmarks

| Benchmark | Focus | Top Performers (2024) |
|-----------|-------|----------------------|
| **BFCL v3** | Multi-step function calling | GPT-4o, Claude Sonnet |
| **ToolBench** | 16k+ real API calls | Varies by task |
| **SWE-bench** | GitHub issue resolution | Claude Sonnet 4: 72.7% |
| **TAU-bench** | Agentic tool use | Claude dominant |

### Data Available (OpenRouter)

```typescript
supported_parameters: [
  "tools",           // Function calling
  "response_format", // JSON mode
  "temperature",     // Standard
  // ...
]
```

### Recommendation

**Check for "tools" in `supported_parameters`:**
- +10 bonus for tool/function calling support
- Indicates agentic capability

---

## 3. Thinking/Reasoning Models (NEW PRIORITY)

### What It Means
Models that use **internal chain-of-thought** before answering:
- OpenAI o1, o3-mini, o3
- DeepSeek R1
- Claude with extended thinking
- Gemini 2.5+ Pro (built-in reasoning)

### Data Available (OpenRouter)

```typescript
pricing: {
  internal_reasoning?: string  // ← If present, it's a thinking model!
}
```

### Detection Methods

| Signal | Implementation |
|--------|----------------|
| `pricing.internal_reasoning` exists | Direct API field |
| Name contains "o1", "o3", "R1", "thinking" | Keyword match |
| Exceptionally high Elo (1400+) | Curated data |

### Key Benchmarks (2024-2025)

| Model | AIME 2024 | GPQA Diamond | SWE-bench |
|-------|-----------|--------------|-----------|
| **o3** | 96.7% | 87.7% | 71.7% |
| **DeepSeek R1** | ~90% | 71.5% | 49.2% |
| **o1** | 83.3% | 78% | 48.9% |
| GPT-4o | 12% | ~50% | ~30% |

### Recommendation

**Highest priority bonus:**
- +20 points for thinking models (detected via `internal_reasoning` pricing)
- These models are 3-8x better at complex reasoning tasks

---

## 4. Speed (Latency / TTFT)

### Data Challenge

**Not available in OpenRouter API.** Deferred.

---

## Implementation Priority (Updated)

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| **Thinking model bonus** | Low | **High** | ⭐⭐⭐⭐ P0 |
| **Multimodality bonus** | Low | Medium | ⭐⭐⭐ P1 |
| **Tool calling bonus** | Low | Low | ⭐⭐ P2 |
| **Speed/Latency** | High | High | Deferred |
| **Pareto visualization** | Medium | Medium | Deferred |

---

## Proposed Enhanced Scoring Formula

```typescript
// After implementing multimodality + tools
function enhancedValueScore(model) {
  // Base scores (0-100)
  const priceScore = calculatePriceScore(model);
  const perfScore = calculatePerfScore(model);
  const contextScore = calculateContextScore(model);
  
  // Capability bonuses
  const multimodalBonus = calculateMultimodalBonus(model); // 0-20
  const toolBonus = hasToolSupport(model) ? 10 : 0;        // 0-10
  
  // Apply bonuses to perfScore (intelligence dimension)
  const adjustedPerfScore = Math.min(100, 
    perfScore + multimodalBonus + toolBonus
  );
  
  // Geometric mean
  return geometricMean(priceScore, adjustedPerfScore, contextScore);
}
```

---

## Next Steps

1. **Implement multimodality bonus** in `heuristic-engine.ts`
2. **Add tool calling detection** in scoring logic
3. **Future**: Integrate TTFT data if external source becomes available
4. **Future**: Pareto frontier visualization (design approved, implementation deferred)
