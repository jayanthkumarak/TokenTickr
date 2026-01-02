# TokenTickr Codebase Context

**Start Here: High-Density Technical Overview**

## Core Application Structure
- **Framework**: Next.js 14+ (App Router), TypeScript, TailwindCSS.
- **State Management**: Zustand (`src/store/comparison-store.ts`).
- **Data Source**: OpenRouter API (`https://openrouter.ai/api/v1/models`).

## Key Directories
- `src/app`: App router pages. `page.tsx` is the main entry point. `layout.tsx` handles global providers (Theme).
- `src/components`: UI components.
  - `comparison-layout.tsx`: Main dashboard container. Orchestrates the grid and controls.
  - `model-card.tsx`: Individual model display (Compact/Detailed variants).
  - `model-selector.tsx`: Modal for selecting models from the OpenRouter list.
  - `nux-popup.tsx`: New User Experience popup (frosted glass, localStorage tracking).
  - `price-comparison-*.tsx`: Components for the pricing visualization charts.
  - `ui/`: Reusable Shadcn/ui primitives.
- `src/lib`: Utilities.
  - `openrouter-api.ts`: API client and data fetching.
  - `utils.ts`: Class name merging (twMerge/clsx).

## Data Flow
1. **Fetch**: `comparison-store.ts` initializes and fetches models from OpenRouter via `OpenRouterAPI.getModels()`.
2. **Select**: User selects models in `ModelSelector`. Store updates `selectedModels`.
3. **Render**: `ComparisonLayout` reads `selectedModels` and renders a grid of `ModelCard`s.
4. **Compare**: Costs are calculated on the fly in `ComparisonLayout` (Prompt/Completion * tokens). charts render based on this data.

## Important Constants
- **Tokens**: 150 Prompt / 300 Completion (default assumption for cost calc).
- **Max Columns**: 5 (Desktop).

## Styling
- **Theme**: Dark/Light mode support via `next-themes`.
- **CSS**: Tailwind utility classes.
- **Glassmorphism**: Used in Header and NUX Popup (`backdrop-blur`).

## Recent Changes
- **NUX**: Added `NUXPopup` for first-time visitors.
- **Layout**: Consolidated header controls in `ComparisonLayout`, removed duplicate branding.
