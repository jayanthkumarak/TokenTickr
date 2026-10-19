#!/usr/bin/env node
/**
 * Generate OpenRouter Static Data
 * 
 * Fetches all models from OpenRouter API and generates
 * a complete TypeScript static map for use in TokenTickr.
 * 
 * Usage: node scripts/generate-openrouter-static-data.mjs
 * 
 * Requires: NEXT_PUBLIC_OPENROUTER_API_KEY environment variable (optional, but good for rate limits)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/models';
const SUPPORTED_PARAM_ALLOWLIST = new Set([
    'tools',
    'tool_choice',
    'structured_outputs',
    'response_format',
    'reasoning',
    'include_reasoning',
]);

function isNonZeroPricingValue(value) {
    return value !== undefined && value !== null && value !== '' && value !== '0' && value !== 0;
}

function splitLegacyModality(value) {
    if (!value) return [];
    return String(value)
        .split(/[+/>-]+/)
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean);
}

/**
 * Minify and validate raw OpenRouter models (pure, importable for tests).
 */
export function minifyOpenRouterModels(models) {
     return models.map(model => {
         // Basic validation
         if (!model.id || !model.name || !model.pricing) return null;
 
        // Preserve pricing extras only when present and non-zero
        const pricing = {
            prompt: model.pricing.prompt || '0',
            completion: model.pricing.completion || '0',
        };
        if (isNonZeroPricingValue(model.pricing.internal_reasoning)) {
            pricing.internal_reasoning = model.pricing.internal_reasoning;
        }
        if (isNonZeroPricingValue(model.pricing.input_cache_reads)) {
            pricing.input_cache_reads = model.pricing.input_cache_reads;
        }
        if (isNonZeroPricingValue(model.pricing.input_cache_writes)) {
            pricing.input_cache_writes = model.pricing.input_cache_writes;
        }

        // Prefer explicit input/output modalities; fall back to legacy
        // architecture.modality split on + / - > (never a combined token).
        const hasExplicitModalities = Array.isArray(model.architecture?.input_modalities) ||
            Array.isArray(model.architecture?.output_modalities);
        const legacySplit = splitLegacyModality(model.architecture?.modality);
        const architecture = {
            tokenizer: model.architecture?.tokenizer || 'unknown',
            input_modalities: Array.isArray(model.architecture?.input_modalities)
                ? model.architecture.input_modalities
                : legacySplit,
            output_modalities: Array.isArray(model.architecture?.output_modalities)
                ? model.architecture.output_modalities
                : legacySplit,
        };
        if (hasExplicitModalities && model.architecture?.instruct_type) {
            architecture.instruct_type = model.architecture.instruct_type;
        }

        // Preserve supported_parameters filtered to the allowlist
        const supportedParameters = Array.isArray(model.supported_parameters)
            ? model.supported_parameters.filter((param) => SUPPORTED_PARAM_ALLOWLIST.has(param))
            : [];

        // Create concise object
        return {
             id: model.id,
             name: model.name,
             description: model.description ? (model.description.length > 300 ? model.description.substring(0, 297) + '...' : model.description) : '',
             context_length: model.context_length || 0,
            pricing,
            architecture,
            ...(supportedParameters.length > 0 && { supported_parameters: supportedParameters }),
             top_provider: {
                 is_moderated: model.top_provider?.is_moderated || false
             },
             created: model.created || Math.floor(Date.now() / 1000)
         };
     }).filter(model => model !== null);
 }

async function generateStaticData() {
    console.log('🔄 Fetching models from OpenRouter API...');

    const headers = {
        'Content-Type': 'application/json',
    };

    // Use API key if available
    if (process.env.NEXT_PUBLIC_OPENROUTER_API_KEY) {
        headers['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`;
    }

    const response = await fetch(OPENROUTER_API_URL, {
        headers
    });

    if (!response.ok) {
        console.warn(`⚠️  OpenRouter API error: ${response.status} ${response.statusText}. Reusing existing src/lib/openrouter-static-data.ts`);
        return; // Exit successfully, skipping generation (mirror AA script pattern)
    }

    const json = await response.json();
    const models = json.data;

    console.log(`📦 Received ${models.length} total models`);

    // Minify and validate data
    const minifiedModels = minifyOpenRouterModels(models);

    console.log(`✅ ${minifiedModels.length} valid models processing`);

    const now = new Date().toISOString().split('T')[0];

    // Sort by name for consistency
    minifiedModels.sort((a, b) => a.name.localeCompare(b.name));

    const content = `/**
 * Auto-generated OpenRouter Static Data
 * 
 * Generated: ${now}
 * Source: https://openrouter.ai/api/v1/models
 * Total models: ${minifiedModels.length}
 * 
 * DO NOT EDIT MANUALLY - Run 'npm run generate:static-data' to regenerate
 */

import { OpenRouterModel } from '@/types/models';

export const OPENROUTER_STATIC_DATA: OpenRouterModel[] = ${JSON.stringify(minifiedModels, null, 2)};

export const OPENROUTER_DATA_META = {
    generatedAt: '${now}',
    totalModels: ${minifiedModels.length},
    source: 'https://openrouter.ai',
};
`;

    // Write to file
    const outputPath = path.join(__dirname, '../src/lib/openrouter-static-data.ts');
    fs.writeFileSync(outputPath, content, 'utf-8');

    console.log(`\n✅ Generated ${outputPath}`);
    console.log(`   - ${minifiedModels.length} models saved`);
}

// Only run when executed directly (importable for tests)
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
    generateStaticData().catch(err => {
        console.warn('⚠️  OpenRouter fetch failed, reusing existing src/lib/openrouter-static-data.ts:', err.message);
        return; // Offline build must succeed on committed data
    });
}
