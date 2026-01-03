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
        } catch (e) {
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
            const match = content.match(/generatedAt: '([^']+)'/);
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
        } catch (e) {
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
        console.error(`❌ API Error: ${response.status} ${response.statusText}`);
        process.exit(1);
    }

    const json = await response.json();
    const models = json.data;

    console.log(`📦 Received ${models.length} total models`);

    // Filter to models with intelligence index scores
    const scoredModels = models.filter(
        m => m.evaluations?.artificial_analysis_intelligence_index != null
    );

    console.log(`✅ ${scoredModels.length} models have Intelligence Index scores`);

    // Build the static score map
    const scoreEntries = [];
    const aliasEntries = [];

    // Track unique slugs to avoid duplicates
    const seenSlugs = new Set();

    for (const model of scoredModels) {
        const slug = model.slug?.toLowerCase();
        const score = model.evaluations.artificial_analysis_intelligence_index;
        const creator = model.model_creator?.slug?.toLowerCase() || '';

        if (!slug || seenSlugs.has(slug)) continue;
        seenSlugs.add(slug);

        // Add to score map
        scoreEntries.push(`    '${slug}': ${score},`);

        // Generate OpenRouter-style aliases
        if (creator) {
            // Map AA creator slugs to OpenRouter provider names
            const orProvider = creator === 'meta' ? 'meta-llama' :
                creator === 'alibaba' ? 'qwen' :
                    creator === 'mistral-ai' ? 'mistralai' :
                        creator === 'anthropic' ? 'anthropic' :
                            creator === 'openai' ? 'openai' :
                                creator === 'google' ? 'google' :
                                    creator === 'xai' ? 'x-ai' :
                                        creator === 'deepseek' ? 'deepseek' :
                                            creator === 'cohere' ? 'cohere' :
                                                creator;

            aliasEntries.push(`    '${orProvider}/${slug}': '${slug}',`);
        }
    }

    // Sort entries alphabetically
    scoreEntries.sort();
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
    source: 'https://artificialanalysis.ai',
};
`;

    // Write to file
    const outputPath = path.join(__dirname, '../src/lib/aa-static-scores.ts');
    fs.writeFileSync(outputPath, content, 'utf-8');

    console.log(`\n✅ Generated ${outputPath}`);
    console.log(`   - ${scoreEntries.length} scores`);
    console.log(`   - ${aliasEntries.length} aliases`);
}

generateStaticData().catch(err => {
    console.error('❌ Failed:', err);
    process.exit(1);
});
