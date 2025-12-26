# TokenTickr

TokenTickr is a web application for comparing Large Language Model (LLM) pricing and features using the OpenRouter API. It provides real-time cost analysis and model comparison capabilities.

## Architecture & Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui
- **State Management:** Zustand
- **Visualization:** VisX
- **Testing:**
  - **Unit:** Vitest
  - **E2E:** Playwright

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/jayanthkumarak/tokentickr.git
cd tokentickr
npm install
```

### Running Locally

```bash
npm run dev
```
Access the application at `http://localhost:3000`.

To run on a specific port:
```bash
npm run dev -- -p 4823
```

## Testing

### Unit Tests
Validates core logic including price calculations and API utility hardening.
```bash
npm run test
```

### End-to-End (E2E) Tests
Validates user flows (Search, Selection, Comparison) and rendering stability. Requires Playwright browsers to be installed.
```bash
npx playwright test
```

## Deployment

The application is configured for deployment on Cloudflare Pages or any static hosting compatible with `next build`.

**Build Command:**
```bash
npm run build
```

**Output Directory:**
`out`
