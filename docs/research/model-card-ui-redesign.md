# Model Card UI Redesign Research

**Date**: January 2025  
**Version**: 2.1.0

## Problem Statement

When comparing 3-4 LLM models side-by-side, users experienced:

1. **Asymmetric card heights** — Long model descriptions (Claude Sonnet 4.5 ~280 words vs GPT-5.2 ~80 words) caused cards to have vastly different heights, making cost comparisons difficult.

2. **Information overload at 4 columns** — Same full-length descriptions in narrower columns created walls of text.

3. **No visual ranking** — Users had to mentally compare prices and context windows across cards with no at-a-glance indicators.

---

## Solution Design

### 1. Description Truncation

Descriptions now clamp to 3 lines with expandable "Read more..." toggle:

```tsx
<p className={cn(
  "text-sm text-muted-foreground leading-relaxed",
  !isDescriptionExpanded && needsTruncation && "line-clamp-3"
)}>
  {model.description}
</p>
{needsTruncation && (
  <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
    {isDescriptionExpanded ? "Show less" : "Read more..."}
  </button>
)}
```

**Implementation**: Uses CSS `line-clamp-3` utility (already defined in `globals.css`).

---

### 2. Adaptive Card Variants

Two card variants based on column count:

| Columns | Variant | Features |
|---------|---------|----------|
| 2-3 | Detailed | Full card with truncated description, all stats visible |
| 4 | Compact (default) | Minimal card, inline costs, "View Details" modal |

Users can toggle between Compact and Detailed view when using 4 columns.

**Compact mode layout**:
- Model name + ID (truncated)
- Ranking badges
- Modality badges (inline)
- Single-line cost display
- "View Details" button → opens modal

---

### 3. Visual Ranking System

Rankings calculated in `ComparisonLayout` using combined weighted cost formula:

```typescript
const calculateCombinedCost = (model: OpenRouterModel): number => {
  const promptPrice = parseFloat(model.pricing.prompt) || 0;
  const completionPrice = parseFloat(model.pricing.completion) || 0;
  return (promptPrice * 150) + (completionPrice * 300); // 150 prompt + 300 completion tokens
};
```

**Ranking badges** (using colorblind-accessible palette):

| Rank | Badge | Color |
|------|-------|-------|
| Lowest cost | "Cheapest" | Blue-green (#009688) |
| Highest cost | "Most Expensive" | Amber (#fb8c00) |
| Largest context | "Largest Context" | Blue-green (#009688) |
| Smallest context | "Smallest Context" | Amber (#fb8c00) |

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/model-card.tsx` | Added `variant` prop, ranking badges, modality badges in header, description truncation |
| `src/components/comparison-layout.tsx` | Added ranking calculations, view toggle, details modal |

---

## Cognitive Load Reduction

The redesign addresses cognitive load through:

1. **Consistent card heights** — Eyes can scan horizontally without jumping
2. **Information hierarchy** — Most important data (rankings, costs) visible first
3. **Progressive disclosure** — Details hidden behind expandable sections
4. **Visual encoding** — Color-coded badges reduce need to mentally compare numbers
5. **Reduced density at 4 columns** — Compact mode prevents text walls

---

## References

- Apple Human Interface Guidelines: Information Hierarchy
- Nielsen Norman Group: Progressive Disclosure
- WCAG 2.1: Color accessibility (4.5:1 contrast ratio)
