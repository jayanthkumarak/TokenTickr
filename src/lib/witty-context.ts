// Token calibration: ~0.75 words per token
// 128k tokens ~= 96,000 words
// 1M tokens ~= 750,000 words

const BASE_UNITS = [
    { limit: 4096, text: "A standard CVS receipt" },
    { limit: 8192, text: "A university term paper" },
    { limit: 16384, text: "A short story (e.g., 'The Metamorphosis')" },
    { limit: 32768, text: "Shakespeare's 'Macbeth'" }, // ~17k words
];

const MULTIPLIERS = [
    { name: "The Great Gatsby", tokens: 60000 },
    { name: "Harry Potter & The Sorcerer's Stone", tokens: 120000 },
    { name: "The Lord of the Rings Trilogy", tokens: 600000 },
    { name: "The Entire Harry Potter Series", tokens: 1500000 },
];

export function getWittyAnalogy(tokens: number): string {
    // 1. Handle small contexts (static)
    if (tokens <= 32768) {
        for (const unit of BASE_UNITS) {
            if (tokens <= unit.limit) return unit.text;
        }
        return "A novella";
    }

    // 2. Handle large contexts (dynamic multipliers)
    // Find the largest unit that fits at least 0.8 times (to allow for "Almost 1x")
    // Iterate backwards to find the "biggest" unit that makes sense
    for (let i = MULTIPLIERS.length - 1; i >= 0; i--) {
        const unit = MULTIPLIERS[i];
        const ratio = tokens / unit.tokens;

        // If it fits at least once (or close to it, e.g. 0.8x), use this unit
        if (ratio >= 0.8) {
            if (ratio < 1.3) return `The entire '${unit.name}'`;
            // Use decimal for precision if small multiplier (1.5x), integer for large (4x)
            const multiplier = ratio < 5 ? ratio.toFixed(1) : Math.floor(ratio);
            return `Fits '${unit.name}' ${multiplier}x times`;
        }
    }

    // Fallback for massive or weird middle grounds
    return `Approx ${Math.floor(tokens / 500).toLocaleString()} pages of text`;
}
