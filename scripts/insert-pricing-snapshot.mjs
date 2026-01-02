#!/usr/bin/env node
/**
 * Insert Pricing Snapshot into D1
 * 
 * Reads the current OpenRouter static data and inserts it as a pricing snapshot
 * into the D1 database. Also prunes old snapshots to keep only the last 5.
 * 
 * Usage: npx wrangler d1 execute tokentickr --file=- < scripts/pricing-snapshot.sql
 * OR run this script to generate SQL and execute via wrangler
 * 
 * This script generates SQL and outputs to stdout for piping to wrangler.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the static data
const staticDataPath = path.join(__dirname, '../src/lib/openrouter-static-data.ts');

if (!fs.existsSync(staticDataPath)) {
    console.error('❌ Static data not found. Run npm run generate:static-data first.');
    process.exit(1);
}

const content = fs.readFileSync(staticDataPath, 'utf-8');

// Extract the array from the TypeScript file
const match = content.match(/export const OPENROUTER_STATIC_DATA: OpenRouterModel\[\] = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('❌ Could not parse static data file.');
    process.exit(1);
}

const models = JSON.parse(match[1]);
const snapshotId = new Date().toISOString();
const capturedAt = snapshotId;

console.log(`-- TokenTickr Pricing Snapshot`);
console.log(`-- Generated: ${snapshotId}`);
console.log(`-- Models: ${models.length}`);
console.log('');

// Generate INSERT statements
console.log('BEGIN TRANSACTION;');
console.log('');

for (const model of models) {
    const escapedName = model.name.replace(/'/g, "''");
    const escapedId = model.id.replace(/'/g, "''");

    console.log(`INSERT INTO pricing_snapshots (snapshot_id, model_id, model_name, prompt_price, completion_price, context_length, captured_at)`);
    console.log(`VALUES ('${snapshotId}', '${escapedId}', '${escapedName}', '${model.pricing.prompt}', '${model.pricing.completion}', ${model.context_length || 'NULL'}, '${capturedAt}');`);
}

console.log('');

// Prune old snapshots (keep only last 5)
console.log('-- Prune old snapshots (keep last 5)');
console.log(`DELETE FROM pricing_snapshots`);
console.log(`WHERE snapshot_id NOT IN (`);
console.log(`  SELECT DISTINCT snapshot_id FROM pricing_snapshots`);
console.log(`  ORDER BY captured_at DESC`);
console.log(`  LIMIT 5`);
console.log(`);`);
console.log('');
console.log('COMMIT;');

console.error(`\n✅ Generated SQL for ${models.length} models`);
console.error(`   Run: node scripts/insert-pricing-snapshot.mjs | npx wrangler d1 execute tokentickr --file=-`);
