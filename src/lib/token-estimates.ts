// Shared token estimates for cost and impact calculations.
export const TOKEN_ESTIMATES = {
  // Average tokens per "query" (prompt + completion).
  // Assumes a mix of short/long tasks.
  PROMPT_TOKENS: 1000,
  COMPLETION_TOKENS: 500,
} as const;

export interface AgentWorkloadProfile {
  id: string;
  label: string;
  tasksPerMonth: number;
  turnsPerTask: number;
  promptTokensPerTurn: number;
  completionTokensPerTurn: number;
  cachedInputRatio: number;
}

export const AGENT_WORKLOAD_PRESETS: Record<string, AgentWorkloadProfile> = {
  'chat-default': {
    id: 'chat-default',
    label: 'Chat Default',
    tasksPerMonth: 1000,
    turnsPerTask: 1,
    promptTokensPerTurn: 1000,
    completionTokensPerTurn: 500,
    cachedInputRatio: 0,
  },
  'tool-agent': {
    id: 'tool-agent',
    label: 'Tool Agent',
    tasksPerMonth: 1000,
    turnsPerTask: 5,
    promptTokensPerTurn: 3000,
    completionTokensPerTurn: 600,
    cachedInputRatio: 0,
  },
  'coding-agent': {
    id: 'coding-agent',
    label: 'Coding Agent',
    tasksPerMonth: 1000,
    turnsPerTask: 10,
    promptTokensPerTurn: 8000,
    completionTokensPerTurn: 1500,
    cachedInputRatio: 0,
  },
  'deep-research': {
    id: 'deep-research',
    label: 'Deep Research',
    tasksPerMonth: 1000,
    turnsPerTask: 8,
    promptTokensPerTurn: 15000,
    completionTokensPerTurn: 2000,
    cachedInputRatio: 0,
  },
};
