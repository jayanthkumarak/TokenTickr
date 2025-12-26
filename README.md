# TokenTickr

LLM cost comparison tool with intelligence-weighted scoring. Compare models across price, performance, and context window capacity.

**Live:** [tokentickr.com](https://tokentickr.com)

## Smart Value Index

TokenTickr's core feature is the **Smart Value Index** — an intelligence-first scoring system that helps teams find the best model for their needs.

The scoring formula uses a weighted geometric mean:

```
Score = (Performance² × Price × Context)^(1/4)
```

Performance carries 50% weight. This ensures capable models rank higher even at premium prices, while still rewarding cost efficiency.

Two scoring modes:
- **Smart Score** — Intelligence-first. Best for quality-focused teams.
- **Budget Score** — Cost-conscious. Best for high-volume workloads.

## Stack

- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui components
- Zustand state management
- VisX visualization

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

Real-time model data and pricing via [OpenRouter API](https://openrouter.ai).
