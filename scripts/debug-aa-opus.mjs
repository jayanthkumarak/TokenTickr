
const target = 'claude-opus-4-5';
console.log(`Checking ${target}...`);

const AA_API_URL = 'https://artificialanalysis.ai/api/v2/data/llms/models';
// Manually read from .env.local if needed or just assume env var is passed
// I will rely on the run_command loading it, or I'll read it manually here since it's a script
import fs from 'fs';
import path from 'path';

let apiKey = process.env.NEXT_PUBLIC_AA_API_KEY;

if (!apiKey) {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/NEXT_PUBLIC_AA_API_KEY=(.+)/);
        if (match) apiKey = match[1].trim();
    } catch (e) {
        console.error("Could not read .env.local");
    }
}

if (!apiKey) {
    console.error("No API KEY found");
    process.exit(1);
}

async function check() {
    try {
        const res = await fetch(AA_API_URL, { headers: { 'x-api-key': apiKey } });
        if (!res.ok) throw new Error(res.statusText);

        const json = await res.json();
        const models = json.data;  // Adjust if structure is different

        const model = models.find(m => m.slug === target);

        if (model) {
            console.log("FOUND MODEL:", JSON.stringify(model, null, 2));
        } else {
            console.log("Model not found by slug, searching by name...");
            const match = models.find(m => m.name.toLowerCase().includes('opus 4.5'));
            console.log("Match:", match ? JSON.stringify(match, null, 2) : "None");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

check();
