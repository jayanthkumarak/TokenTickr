// Shared token estimates for cost and impact calculations.
export const TOKEN_ESTIMATES = {
  // Average tokens per "query" (prompt + completion).
  // Assumes a mix of short/long tasks.
  PROMPT_TOKENS: 1000,
  COMPLETION_TOKENS: 500,
} as const;
