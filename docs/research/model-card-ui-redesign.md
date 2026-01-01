# Model Card UI Redesign Research

**Date**: January 2025  
**Version**: 2.2.0

## Problem Statement

When comparing 3-5 LLM models side-by-side, users experienced:

1. **Asymmetric card heights** — Long model descriptions caused cards to have vastly different heights
2. **Information overload at 4+ columns** — Same full-length descriptions in narrower columns created walls of text
3. **No visual ranking** — Users had to mentally compare prices and context windows
4. **Arbitrary chart colors** — Multi-color bar graphs didn't encode cost meaning

---

## Solution Design

### 1. Description Truncation

Descriptions clamp to 3 lines with expandable "Read more..." toggle using CSS `line-clamp-3`.

---

### 2. Adaptive Card Variants

| Columns | Variant | Features |
|---------|---------|----------|
| 2-3 | Detailed | Full card with truncated description |
| 4-5 | Compact (default) | Minimal card, "View Details" modal |

---

### 3. Visual Ranking Badges

Rankings calculated using combined weighted cost: `(promptPrice * 150) + (completionPrice * 300)`

| Rank | Badge | Color |
|------|-------|-------|
| Lowest cost | "Cheapest" | Teal (#009688) |
| Highest cost | "Most Expensive" | Amber (#fb8c00) |

---

### 4. 5-Column Support (New)

Extended max columns from 4 to 5 for comprehensive model comparison:

- `selectedModels` array expanded to 5 slots
- Added `grid-cols-5` Tailwind class
- Compact mode triggers at 4+ columns

---

### 5. Cost Gradient Bar Graph (New)

Replaced arbitrary multi-color bars with **single-hue teal gradient**:

```typescript
const getCostGradientColor = (rank: number, total: number) => {
  const lightTeal = { r: 77, g: 182, b: 172 };  // Cheapest
  const darkTeal = { r: 0, g: 105, b: 92 };     // Most expensive
  const t = (rank - 1) / (total - 1);
  // Linear interpolation
  return `rgb(${lerp(...)})`;
};
```

**Rationale**: Single hue encodes cost magnitude intuitively — darker = more expensive.

---

### 6. Card Alignment (New)

Fixed misaligned "View Details" buttons using flexbox:

```tsx
<Card className="flex flex-col min-h-[220px]">
  <CardContent className="flex-1 flex flex-col">
    <div>/* content */</div>
    <Button className="mt-auto">View Details</Button>
  </CardContent>
</Card>
```

---

## Files Modified

| File | Changes |
|------|---------|
| `model-card.tsx` | Flex layout, min-height, mt-auto for button |
| `comparison-layout.tsx` | 5-column grid, ranking calcs |
| `comparison-store.ts` | 5-slot array, max=5 |
| `price-comparison-chart.tsx` | Teal cost gradient |
| `colorblind-colors.ts` | Purple 5th color (fallback) |

---

## References

- Apple HIG: Information Hierarchy
- WCAG 2.1: Color accessibility (4.5:1 contrast)
- Data Viz: Sequential color scales for quantitative data

