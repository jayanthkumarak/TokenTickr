/**
 * Usage Logger for TokenTickr
 * 
 * Tracks sessions and model comparisons. Logs are fire-and-forget
 * to avoid blocking the UI.
 * 
 * Session: A 30-minute activity window, stored in sessionStorage
 * Comparison: When 2+ models are selected simultaneously
 */

/**
 * Generate a UUID v4
 */
function generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const SESSION_KEY = 'tokentickr-session';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

interface SessionData {
    id: string;
    lastActivity: number;
    logged: boolean; // Whether session_start has been logged
}

interface ComparisonState {
    lastModels: string[]; // Last logged comparison
}

// In-memory state to avoid duplicate logs
let comparisonState: ComparisonState = {
    lastModels: [],
};

/**
 * Reset comparison state (for testing only)
 */
export function _resetComparisonState(): void {
    comparisonState = { lastModels: [] };
}

/**
 * Get or create a session ID
 */
function getOrCreateSession(): SessionData {
    if (typeof window === 'undefined') {
        // SSR - return a dummy session
        return { id: generateUUID(), lastActivity: Date.now(), logged: false };
    }

    const stored = sessionStorage.getItem(SESSION_KEY);
    const now = Date.now();

    if (stored) {
        try {
            const session: SessionData = JSON.parse(stored);

            // Check if session has expired (30 min of inactivity)
            if (now - session.lastActivity > SESSION_TIMEOUT_MS) {
                // Session expired, create new one
                const newSession: SessionData = {
                    id: generateUUID(),
                    lastActivity: now,
                    logged: false,
                };
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
                return newSession;
            }

            // Update last activity
            session.lastActivity = now;
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
            return session;
        } catch {
            // Invalid stored data, create new session
        }
    }

    // Create new session
    const newSession: SessionData = {
        id: generateUUID(),
        lastActivity: now,
        logged: false,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    return newSession;
}

/**
 * Fire-and-forget log to the API
 */
async function sendLog(payload: {
    session_id: string;
    event_type: 'session_start' | 'comparison';
    models?: string[];
}): Promise<void> {
    // Don't log in development (localhost)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        console.debug('[UsageLogger]', payload);
        return;
    }

    try {
        await fetch('/api/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true, // Survives page navigation
        });
    } catch {
        // Silently ignore - logging should never fail the app
    }
}

/**
 * Log session start (called once per session)
 */
export function logSessionStart(): void {
    const session = getOrCreateSession();

    if (session.logged) {
        return; // Already logged this session
    }

    // Mark as logged
    session.logged = true;
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    sendLog({
        session_id: session.id,
        event_type: 'session_start',
    });
}

/**
 * Log a comparison event
 * Only logs if the set of models is different from last logged comparison
 * 
 * @param modelIds - Array of model IDs being compared (must be >= 2)
 */
export function logComparison(modelIds: string[]): void {
    // Need at least 2 models for a comparison
    if (modelIds.length < 2) {
        return;
    }

    // Sort to normalize order for comparison
    const sortedModels = [...modelIds].sort();
    const modelsKey = sortedModels.join(',');
    const lastKey = comparisonState.lastModels.sort().join(',');

    // Don't re-log the same comparison
    if (modelsKey === lastKey) {
        return;
    }

    // Update state and log
    comparisonState.lastModels = sortedModels;

    const session = getOrCreateSession();
    sendLog({
        session_id: session.id,
        event_type: 'comparison',
        models: sortedModels,
    });
}

/**
 * Get current session ID (for debugging)
 */
export function getCurrentSessionId(): string | null {
    if (typeof window === 'undefined') return null;

    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
        const session: SessionData = JSON.parse(stored);
        return session.id;
    } catch {
        return null;
    }
}
