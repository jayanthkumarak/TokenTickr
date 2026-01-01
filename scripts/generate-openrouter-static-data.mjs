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
        console.error(`❌ API Error: ${response.status} ${response.statusText}`);
        process.exit(1);
    }

    const json = await response.json();
    const models = json.data;

    console.log(`📦 Received ${models.length} total models`);

    // Minify and validate data
    const minifiedModels = models.map(model => {
        // Basic validation
        if (!model.id || !model.name || !model.pricing) return null;

        // Create concise object
        return {
            id: model.id,
            name: model.name,
            description: model.description ? (model.description.length > 300 ? model.description.substring(0, 297) + '...' : model.description) : '',
            context_length: model.context_length || 0,
            pricing: {
                prompt: model.pricing.prompt || '0',
                completion: model.pricing.completion || '0',
            },
            architecture: {
                tokenizer: model.architecture?.tokenizer || 'unknown',
                input_modalities: model.architecture?.modality ? [model.architecture.modality] : [], // Old API
                output_modalities: model.architecture?.modality ? [model.architecture.modality] : [], // Old API
            },
            // Handle newer API fields if available, otherwise fallback
            ...((model.architecture?.input_modalities) && {
                architecture: {
                    input_modalities: model.architecture.input_modalities || [],
                    output_modalities: model.architecture.output_modalities || [],
                    tokenizer: model.architecture.tokenizer || 'unknown',
                    instruct_type: model.architecture.instruct_type || undefined
                }
            }),
            top_provider: {
                is_moderated: model.top_provider?.is_moderated || false
            },
            created: model.created || Math.floor(Date.now() / 1000)
        };
    }).filter(model => model !== null);

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

generateStaticData().catch(err => {
    console.error('❌ Failed:', err);
    process.exit(1);
});
