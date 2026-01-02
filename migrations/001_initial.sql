-- TokenTickr D1 Schema
-- Migration 001: Initial setup for pricing snapshots and usage logs

-- Pricing snapshots (keep only last 5 builds)
CREATE TABLE IF NOT EXISTS pricing_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id TEXT NOT NULL,           -- Build ID/timestamp (e.g., "2026-01-02T12:00:00Z")
  model_id TEXT NOT NULL,              -- OpenRouter model ID (e.g., "openai/gpt-4")
  model_name TEXT NOT NULL,            -- Human-readable name
  prompt_price TEXT NOT NULL,          -- USD per token (string for precision)
  completion_price TEXT NOT NULL,      -- USD per token
  context_length INTEGER,              -- Context window size
  captured_at TEXT NOT NULL            -- ISO 8601 timestamp
);

-- Index for efficient snapshot queries and pruning
CREATE INDEX IF NOT EXISTS idx_pricing_snapshot ON pricing_snapshots(snapshot_id);
CREATE INDEX IF NOT EXISTS idx_pricing_model ON pricing_snapshots(model_id, snapshot_id);

-- Usage logs (sessions + comparisons)
CREATE TABLE IF NOT EXISTS usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,            -- UUID for browser session
  event_type TEXT NOT NULL,            -- 'session_start' | 'comparison'
  models TEXT,                         -- JSON array of model IDs (null for session_start)
  user_agent TEXT,                     -- Browser user agent
  referrer TEXT,                       -- Traffic source
  created_at TEXT NOT NULL             -- ISO 8601 timestamp
);

-- Index for session grouping and date-based queries
CREATE INDEX IF NOT EXISTS idx_logs_session ON usage_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_logs_date ON usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_type ON usage_logs(event_type);
