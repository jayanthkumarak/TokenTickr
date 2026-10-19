#!/usr/bin/env node
/**
 * Generate AA Static Scores
 * 
 * Fetches all models from Artificial Analysis API and generates
 * a complete TypeScript static map for use in TokenTickr.
 * 
 * Usage: node scripts/generate-aa-static-data.mjs [--force]
 * 
 * Requires: NEXT_PUBLIC_AA_API_KEY environment variable
 * Cache: Skips fetch if data is < 7 days old
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AA_API_URL = 'https://artificialanalysis.ai/api/v2/data/llms/models';

async function generateStaticData() {
    let apiKey = process.env.NEXT_PUBLIC_AA_API_KEY;

    // Fallback: Try reading .env.local manually if not in process.env (e.g. running via node directly)
    if (!apiKey && fs.existsSync(path.join(__dirname, '../.env.local'))) {
        try {
            const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8');
            const match = envContent.match(/NEXT_PUBLIC_AA_API_KEY=(.+)/);
            if (match && match[1]) {
                apiKey = match[1].trim();
                console.log('📖 Loaded API key from .env.local');
            }
        } catch {
            // ignore error
        }
    }

    if (!apiKey) {
        console.warn('⚠️  NEXT_PUBLIC_AA_API_KEY not found. Skipping Artificial Analysis data generation.');
        console.warn('   Using existing data from src/lib/aa-static-scores.ts');
        return; // Exit successfully, skipping generation
    }

    // Check for "Smart Refresh" (Skip if data is < 7 days old)
    const existingFilePath = path.join(__dirname, '../src/lib/aa-static-scores.ts');
    const forceUpdate = process.argv.includes('--force');
    const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

    if (!forceUpdate && fs.existsSync(existingFilePath)) {
        try {
            const content = fs.readFileSync(existingFilePath, 'utf-8');
            const match = content.match(/Generated: ([0-9]{4}-[0-9]{2}-[0-9]{2})/);
            if (match && match[1]) {
                const generatedDate = new Date(match[1]).getTime();
                const now = Date.now();
                const age = now - generatedDate;

                if (age < CACHE_DURATION_MS) {
                    const daysOld = (age / (24 * 60 * 60 * 1000)).toFixed(1);
                    console.log(`✨ Data is fresh enough (${daysOld} days old). Skipping API fetch.`);
                    console.log('   Run with --force to override.');
                    return;
                }
                console.log(`Creating new data (Cache expired: ${match[1]})`);
            }
        } catch {
            // If parsing fails, proceed to fetch
        }
    }

    console.log('🔄 Fetching models from Artificial Analysis API...');

    const response = await fetch(AA_API_URL, {
        headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.warn(`⚠️  AA API error: ${response.status} ${response.statusText}. Reusing existing src/lib/aa-static-scores.ts`);
        return; // Offline/transient-failure build must succeed on committed data
    }

    const json = await response.json();
    const models = json.data;

    console.log(`📦 Received ${models.length} total models`);

    // Filter to models with intelligence index scores
    const scoredModels = models.filter(
        m => m.evaluations?.artificial_analysis_intelligence_index != null
    );

    console.log(`✅ ${scoredModels.length} models have Intelligence Index scores`);

    const scoreEntries = [];
    const mmluEntries = [];
    const codingEntries = [];
    const ifbenchEntries = [];
    const aliasEntries = [];

    // Track unique slugs to avoid duplicates
    const seenSlugs = new Set();

    for (const model of scoredModels) {
        const slug = model.slug?.toLowerCase();
        const score = model.evaluations.artificial_analysis_intelligence_index;
        const mmlu = model.evaluations.mmlu_pro;
        const coding = model.evaluations.livecodebench ?? model.evaluations.scicode;
        const ifbench = model.evaluations.ifbench;
        const creator = model.model_creator?.slug?.toLowerCase() || '';

        if (!slug || seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        // Add to score map
        scoreEntries.push(`    '${slug}': ${score},`);

        // Add to MMLU map if available (store as 0-100)
        if (mmlu != null) {
            mmluEntries.push(`    '${slug}': ${Math.round(mmlu * 1000) / 10},`);
        }

        // Add to Coding Index map if available (LiveCodeBench preferred, SciCode fallback; store as 0-100)
        if (coding != null) {
            codingEntries.push(`    '${slug}': ${Math.round(coding * 1000) / 10},`);
        }

        // Add to IFBench map if available (store as 0-100)
        if (ifbench != null) {
            ifbenchEntries.push(`    '${slug}': ${Math.round(ifbench * 1000) / 10},`);
        }

        // Generate OpenRouter-style aliases (raw AA creator slug, no bogus fallback)
        if (creator) {
            // Map known AA creator slugs to OpenRouter provider names; otherwise use raw slug
            const orProvider = creator === 'meta' ? 'meta-llama' :
                creator === 'alibaba' ? 'qwen' :
                    creator === 'mistral-ai' ? 'mistralai' :
                        creator || 'unknown';

            aliasEntries.push(`    '${orProvider}/${slug}': '${slug}',`);
        }
    }

    // Sort entries alphabetically
    scoreEntries.sort();
    mmluEntries.sort();
    codingEntries.sort();
    ifbenchEntries.sort();
    aliasEntries.sort();

    // Generate the TypeScript file
    const now = new Date().toISOString().split('T')[0];

    const content = `/**
 * Auto-generated AA Intelligence Index Static Data
 * 
 * Generated: ${now}
 * Source: https://artificialanalysis.ai/api/v2/data/llms/models
 * Total models with scores: ${scoredModels.length}
 * 
 * DO NOT EDIT MANUALLY - Run 'npm run generate:aa-data' to regenerate
 */

/**
 * Intelligence Index scores by AA model slug
 * Higher = better. Range: 0-100.
 */
export const AA_INTELLIGENCE_INDEX: Record<string, number> = {
${scoreEntries.join('\n')}
};

/**
 * MMLU-Pro scores by AA model slug (if available)
 * Range: 0-100
 */
export const AA_MMLU_PRO: Record<string, number> = {
${mmluEntries.join('\n')}
};

/**
 * Coding Index scores by AA model slug (LiveCodeBench preferred, SciCode fallback; if available)
 * Range: 0-100
 */
export const AA_CODING_INDEX: Record<string, number> = {
${codingEntries.join('\n')}
};

/**
 * IFBench scores by AA model slug (if available)
 * Range: 0-100
 */
export const AA_IFBENCH: Record<string, number> = {
${ifbenchEntries.join('\n')}
};

/**
 * OpenRouter ID → AA slug aliases for matching
 */
export const AA_ID_ALIASES: Record<string, string> = {
${aliasEntries.join('\n')}
};

/**
 * Metadata about this data
 */
export const AA_DATA_META = {
    generatedAt: '${now}',
    totalModels: ${scoredModels.length},
    source: 'https://artificialanalysis.ai?utm_source=tokentickr',
};
`;

    // Write to file
    const outputPath = path.join(__dirname, '../src/lib/aa-static-scores.ts');
    fs.writeFileSync(outputPath, content, 'utf-8');

    console.log(`\n✅ Generated ${outputPath} `);
    console.log(`   - ${scoreEntries.length} scores`);
    console.log(`   - ${mmluEntries.length} mmlu`);
    console.log(`   - ${codingEntries.length} coding`);
    console.log(`   - ${ifbenchEntries.length} ifbench`);
    console.log(`   - ${aliasEntries.length} aliases`);
}

generateStaticData().catch(err => {
    console.warn('⚠️  AA fetch failed, reusing existing src/lib/aa-static-scores.ts:', err.message);
    return; // Offline build must succeed on committed data
});
