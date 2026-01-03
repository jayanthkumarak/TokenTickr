# TokenTickr Codebase Companion (AI Agent Edition)

> **Context Priority**: HIGH
> **Purpose**: Read this file to fully understand the project structure, data pipelines, and business logic before making changes.

## 1. Project Identity: "The Value Sweet Spot"

TokenTickr is a **comparative intelligence engine** for Large Language Models (LLMs).
**Core Mission**: Quantify the tradeoff between **Price**, **Intelligence**, and **Context Window** to help developers find the "Value Sweet Spot" — models that deliver ~90% of frontier capabilities for ~10% of the cost.

### Key Metrics
- **Smart Value Score**: A proprietary 0-100 score prioritizing Intelligence (50%), Price (25%), and Context (25%).
- **Intelligence Index**: Sourced primarily from [Artificial Analysis](https://artificialanalysis.ai).
- **Elo**: Sourced from [LMSYS](https://chat.lmsys.org) or heuristically estimated.

---

## 2. Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4 + Shadcn/UI (Radix Primitives)
- **State**: Zustand (with specialized selectors)
- **Charts**: VisX (Airbnb's visualization library)
- **Testing**: Vitest (Unit), Playwright (E2E)
- **Deployment**: Static Export (`output: 'export'`) -> Cloudflare Pages

---

## 3. Data Pipeline & Architecture

The app uses a **Static-First, Hybrid** data architecture to ensure speed and robustness.

### A. Data Sources
1.  **OpenRouter API**: Pricing, context window, model specs.
2.  **Artificial Analysis (AA) API**: High-fidelity intelligence scores (MMLU-Pro, AIME, etc.).
3.  **Static Eval Map**: Fallback Elo scores from LMSYS (`src/lib/static-eval-map.ts`).

### B. The Build-Time ETL Process
Data is fetched **during build time** to avoid runtime latency and secret exposure.
1.  **`scripts/generate-openrouter-static-data.mjs`**: Fetches all models, filters valid ones, generates `src/lib/openrouter-static-data.ts`.
2.  **`scripts/generate-aa-static-data.mjs`**: Fetches AA Intelligence Index scores, maps them to model slugs, generates `src/lib/aa-static-scores.ts`.

### C. Runtime Resolution & Matching
**File**: `src/lib/artificial-analysis-api.ts`
- **Challenge**: OpenRouter IDs (`anthropic/claude-sonnet-4.5`) rarely match AA IDs (`claude-4-5-sonnet`) exactly.
- **Solution**: **Token-Based Fuzzy Matching**.
    - IDs are tokenized: `anthropic/claude-sonnet-4.5` -> `{anthropic, claude, sonnet, 4, 5}`.
    - AA keys tokenized: `claude-4-5-sonnet` -> `{claude, 4, 5, sonnet}`.
    - Set intersection determines a match (Provider name is optional but helpful).
- **Sync Access**: `getAAIntelligenceIndexSync()` provides instant access for UI rendering.

---

## 4. Core Business Logic: The Smart Value Engine

**File**: `src/lib/price-calculation.ts`

### A. Smart Value Formula
The "Smart Value Score" is a **Weighted Geometric Mean**:
```typescript
// Weights: Performance (Intel) = 2, Price = 1, Context = 1
const weightedProduct = (perfScore^2 * priceScore * contextScore);
const valueScore = weightedProduct ^ (1/4); // 4th root to normalize
```
*Why?* A geometric mean penalizes failure in any single category (0 score -> 0 total). Weighting Intel x2 ensures "dumb but cheap" models don't dominate the rankings.

### B. Sub-Score Algorithms
1.  **Performance Score (0-100)**:
    - Source Cascade: **AA Index** > **LMSYS Elo** > **Heuristic**.
    - Normalized against `MIN_RELEVANT` (1000) and `MAX_SOTA` (1360+) bounds.
    - **Capability Bonuses** (`src/lib/capability-bonus.ts`): Adds points for "Thinking", "Tools", "Vision".

2.  **Price Score (0-100)**:
    - Logarithmic dampening of the inverse cost ratio.
    - Prevents $0.000001 models from breaking the scale.

3.  **Context Score (0-100)**:
    - Log-scaled with diminishing returns after 128k (the "sweet spot").

### C. Heuristic Fallback
**File**: `src/lib/heuristic-engine.ts`
Used when no benchmarks exist. estimates capability based on:
- **Price**: Expensive models are usually smarter.
- **Param Count**: 70B > 8B.
- **Keywords**: "Pro", "Ultra", "Sonnet" vs "Mini", "Nano".

---

## 5. State Management (Zustand)

**File**: `src/store/comparison-store.ts`

- **`selectedModels`**: Array of `OpenRouterModel | null` (Fixed size: 5 slots).
- **Actions**:
    - `setSelectedModel(index, model)`: User picks a model for a specific slot.
    - `fetchModels()`: Loads initial static data, then hydrates AA cache.
- **Selectors**:
    - `useActiveModels()`: Returns correctly filtered non-null comparisons.
    - `useComparisonStore.subscribe(...)`: Handles side-effects like basic usage logging.

---

## 6. Key Components

- **`ComparisonLayout`** (`src/components/comparison-layout.tsx`):
    - The main controller. Calculates `PriceComparisonData` on every render based on selected models.
- **`SmartValueRanking`** (`src/components/smart-value-ranking.tsx`):
    - Displays the "league table" with ranking badges (Frontier/Pro/Budget tiers).
- **`ModelCard`** (`src/components/model-card.tsx`):
    - Highly dense UI component. Handles "Compact" vs "Detailed" modes depending on column count.
- **`PriceComparisonChart`** (`src/components/price-comparison-chart.tsx`):
    - Uses VisX to render bar charts comparing Prompt vs Completion costs.

---

## 7. Testing Strategy

- **Unit Tests** (`npm test`):
    - **Critical**: `src/lib/artificial-analysis-api.test.ts` (Matching logic).
    - **Critical**: `src/lib/price-calculation.test.ts` (Scoring math).
    - Uses **Vitest**.
- **E2E Tests** (`npm run test:e2e`):
    - Uses **Playwright**.
    - Located in `tests/`.

## 8. Development Guidelines

1.  **Static Data**: If you change `generate-*.mjs` scripts, run `npm run generate:static-data` to update the `.ts` files.
2.  **Matching**: If a model isn't showing an AA score, check `artificial-analysis-api.ts` matching logic or adding an alias in `aa-static-scores.ts`.
3.  **New Features**: Always implement unit tests for new logic libraries.
