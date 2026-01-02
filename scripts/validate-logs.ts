#!/usr/bin/env npx tsx
/**
 * Validate Usage Logs
 * 
 * Validates the structure and integrity of usage logs from D1.
 * Reads JSON from stdin (output of wrangler d1 execute).
 * 
 * Usage: 
 *   npx wrangler d1 execute tokentickr --command "SELECT * FROM usage_logs" --json | npx tsx scripts/validate-logs.ts
 */

import * as readline from 'readline';

interface LogEntry {
    id: number;
    session_id: string;
    event_type: string;
    models: string | null;
    user_agent: string | null;
    referrer: string | null;
    created_at: string;
}

// UUID v4 regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ISO 8601 regex (simplified)
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

interface ValidationResult {
    total: number;
    valid: number;
    errors: string[];
    warnings: string[];
}

async function readStdin(): Promise<string> {
    const rl = readline.createInterface({ input: process.stdin });
    const lines: string[] = [];

    for await (const line of rl) {
        lines.push(line);
    }

    return lines.join('\n');
}

function validateLogs(logs: LogEntry[]): ValidationResult {
    const result: ValidationResult = {
        total: logs.length,
        valid: 0,
        errors: [],
        warnings: [],
    };

    const seenSessionComparisons = new Set<string>();

    for (const log of logs) {
        let isValid = true;

        // Validate session_id is a UUID
        if (!UUID_REGEX.test(log.session_id)) {
            result.errors.push(`ID ${log.id}: Invalid session_id format: ${log.session_id}`);
            isValid = false;
        }

        // Validate event_type
        if (!['session_start', 'comparison'].includes(log.event_type)) {
            result.errors.push(`ID ${log.id}: Invalid event_type: ${log.event_type}`);
            isValid = false;
        }

        // Validate created_at is ISO 8601
        if (!ISO_DATE_REGEX.test(log.created_at)) {
            result.errors.push(`ID ${log.id}: Invalid created_at format: ${log.created_at}`);
            isValid = false;
        }

        // For comparisons, validate models JSON
        if (log.event_type === 'comparison') {
            if (!log.models) {
                result.errors.push(`ID ${log.id}: Comparison missing models`);
                isValid = false;
            } else {
                try {
                    const models = JSON.parse(log.models);
                    if (!Array.isArray(models) || models.length < 2) {
                        result.errors.push(`ID ${log.id}: Comparison requires at least 2 models`);
                        isValid = false;
                    }

                    // Check for duplicate comparisons in same session
                    const key = `${log.session_id}:${models.sort().join(',')}`;
                    if (seenSessionComparisons.has(key)) {
                        result.warnings.push(`ID ${log.id}: Duplicate comparison in session ${log.session_id}`);
                    }
                    seenSessionComparisons.add(key);
                } catch {
                    result.errors.push(`ID ${log.id}: Invalid models JSON: ${log.models}`);
                    isValid = false;
                }
            }
        }

        if (isValid) {
            result.valid++;
        }
    }

    return result;
}

async function main() {
    try {
        const input = await readStdin();

        if (!input.trim()) {
            console.log('No input received. Usage:');
            console.log('  npx wrangler d1 execute tokentickr --command "SELECT * FROM usage_logs" --json | npx tsx scripts/validate-logs.ts');
            process.exit(0);
        }

        const data = JSON.parse(input);

        // Wrangler output format: { results: [...] }
        const logs: LogEntry[] = data.results || data;

        const result = validateLogs(logs);

        console.log('\n📊 Validation Results');
        console.log('═══════════════════════════════════════');
        console.log(`Total logs:  ${result.total}`);
        console.log(`Valid:       ${result.valid} (${((result.valid / result.total) * 100).toFixed(1)}%)`);
        console.log(`Errors:      ${result.errors.length}`);
        console.log(`Warnings:    ${result.warnings.length}`);

        if (result.errors.length > 0) {
            console.log('\n❌ Errors:');
            result.errors.forEach(e => console.log(`   ${e}`));
        }

        if (result.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            result.warnings.forEach(w => console.log(`   ${w}`));
        }

        console.log('\n' + (result.errors.length === 0 ? '✅ All logs valid!' : '❌ Validation failed'));

        process.exit(result.errors.length === 0 ? 0 : 1);
    } catch (error) {
        console.error('❌ Failed to parse input:', error);
        process.exit(1);
    }
}

main();
