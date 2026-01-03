# TokenTickr v3.5
> **The Intelligent Model Compare Tool**

TokenTickr helps developers find the "Value Sweet Spot" for LLMs by comparing:
- **Price** (Prompt/Completion)
- **Intelligence** (Artificial Analysis Index, Elo)
- **Context Window** (Throughput Capacity)

## v3.5 Highlights: "Intelligence & Robustness"
- **Theme Compliance**: Visual regression testing ensures perfect Light/Dark mode consistency.
- **Smart Value Ranking**: New algorithm prioritizing intelligence (50% weight) for smarter tiering.
- **Data Robustness**: Hybrid build system supports static hosting while keeping intelligence data fresh.
- **New Models**: Includes Grok 3, Claude 3.5 Sonnet (New), and DeepSeek V3 support.

## Live Demo
[tokentickr.com](https://tokentickr.com)

## The Value Proposition

Users come to TokenTickr to answer one question: *"If I use this cheaper model instead of the frontier model, how much intelligence am I giving up for how much cost savings?"*

TokenTickr quantifies this tradeoff, helping teams find "good deal" models that deliver 70-90% of frontier intelligence at significantly lower cost.

## Smart Value Index

TokenTickr's core feature is the **Smart Value Index** — a dynamic scoring system that adapts based on model capability tiers.

### Scoring Philosophy

The formula uses **dynamic tier-based weighting** relative to the best model in the comparison:

| Tier | Definition | Intel | Context | Price | Philosophy |
|------|------------|-------|---------|-------|------------|
| **Frontier** | 90%+ of max perf | 60% | 35% | 5% | "Those that pay, will pay" |
| **Pro** | 70-90% of max | 50% | 30% | 20% | The "deals" zone — tradeoff land |
| **Budget** | <70% of max | 35% | 25% | 40% | Volume-first, price matters |

### Key Features

- **Context Gate**: Models with <64K context are penalized — intelligence without context capacity is limited
- **Dynamic Thresholds**: Tiers adjust automatically as model landscape evolves
- **Notable Mentions**: Elite intelligence models that rank lower due to price are highlighted separately

### Two Scoring Modes

- **Smart Score** — Intelligence-first. Best for quality-focused teams seeking optimal value.
- **Budget Score** — Efficiency-first. Values context capacity per dollar for high-volume workloads.

## Model Comparison Cards

Compare up to **5 models** side-by-side with cognitive-load-reducing design:

- **Visual Ranking Badges**: Instantly see cheapest, most expensive, largest context
- **5-Column Support**: Compare more models at once with compact mode at 4+ columns
- **Cost Gradient Charts**: Teal gradient encodes cost (light=cheap, dark=expensive)
- **Aligned Card Layouts**: Consistent card heights with bottom-anchored actions

See [docs/research/model-card-ui-redesign.md](docs/research/model-card-ui-redesign.md) for design rationale.

## Stack

- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui components
- Zustand state management
- VisX visualization

## Release History

### v3.5.1 (Intelligent Matching)
- **Fuzzy Model Matching**: Implemented token-based fuzzy matching to correctly link OpenRouter models (e.g., `anthropic/claude-sonnet-4.5`) with Artificial Analysis data (e.g., `claude-4-5-sonnet`) despite naming discrepancies.
- **Robustness**: Added comprehensive unit tests for the matching logic to prevent future regressions.


### v3.0.0 (The "Polished" Release)
- **Model Card UI Redesign**: Fixed visual overflow issues and layout consistency for high-density comparisons (5+ models) using advanced Grid/Flexbox.
- **Usage Telemetry**: Added lightweight, privacy-focused session and comparison logging to understand model popularity trends.
- **NUX Popup**: New "Frosted Glass" welcome modal for first-time visitors.
- **LLM Context**: Added `LLM_READ_ME_NOW.md` for AI agent optimization.

### v2.5.0 (The "Speed" Release)
- **Static Data Generation**: Moved OpenRouter data fetching to build-time, eliminating 800ms+ of initial load latency.
- **Lazy Loading**: Optimized bundle size by splitting heavy components (`ModelSelector`, `PriceComparison`) to load only on interaction.
- **Performance**: Significant reduction in Time to Interactive (TTI).

## For AI Agents
If you are an LLM or AI agent trying to understand this codebase, please read [LLM_READ_ME_NOW.md](LLM_READ_ME_NOW.md) first. It contains a high-density technical summary designed to save tokens and provide immediate context.

See [v2.5 Performance Notes](docs/v2.5-performance.md) for architectural details.

## Development

```bash
git clone https://github.com/jayanthkumarak/tokentickr.git
cd tokentickr
npm install
npm run dev
```

Opens at `http://localhost:3000`

## Testing

```bash
# Unit tests
npm run test

# E2E tests (requires Playwright)
npx playwright test
```

## Deployment

Static export to Cloudflare Pages.

```bash
npm run build
# Output: ./out
```

## Data Sources
- **Models & Pricing**: [OpenRouter API](https://openrouter.ai/docs#models)
- **Intelligence Scores**: [Artificial Analysis API](https://artificialanalysis.ai/api)

### Refreshing Static Data (Static Hosting)
For static hosting (e.g. Cloudflare Pages) where build-time secrets are restricted:
1. Ensure `.env.local` contains `NEXT_PUBLIC_AA_API_KEY`.
2. Run `npm run generate:static-data` locally.
3. Commit the updated `src/lib/aa-static-scores.ts`.
4. Push to deploy.

## Research

Scoring methodology research and simulations are documented in `docs/research/`.
