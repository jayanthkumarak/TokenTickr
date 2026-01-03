# TokenTickr

**Find the smart model that saves you 20-30% while sacrificing minimal intelligence.**

TokenTickr is an LLM cost comparison tool with intelligence-weighted scoring. Compare models across price, performance, and context window capacity to find the best value for your needs.

**Live:** [tokentickr.com](https://tokentickr.com)

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

## v3.0.0 Release
- **Model Card UI Redesign**: Fixed visual overflow issues and layout consistency for high-density comparisons (5+ models).
- **Grid Layout Improvements**: Enhanced responsiveness for model cards using advanced CSS Grid and Flexbox techniques.
- **NUX Popup**: "Frosted Glass" welcome modal for first-time visitors.
- **Layout Polish**: Refined header and column controls.
- **LLM Context**: Added `LLM_READ_ME_NOW.md` for AI agent optimization.

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

## Data Source

- **Model Pricing**: Statically generated (updated daily) via [OpenRouter API](https://openrouter.ai)
- **Intelligence Index**: Composite benchmark scores from [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) — aggregates MMLU-Pro, LiveBench, AIME 2024/2025, GPQA Diamond, and IFBench
- **LMSYS Elo**: Human preference ratings from [LMSYS Chatbot Arena](https://chat.lmsys.org/?leaderboard)

## Research

Scoring methodology research and simulations are documented in `docs/research/`.
