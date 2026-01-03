
import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from 'vitest';

/**
 * Theme Compliance Test
 * 
 * This static analysis test scans React components to ensure they support
 * Light Mode by flagging "Hardcoded Dark Mode" classes.
 * 
 * It looks for specific dark/black color utility classes that are NOT
 * prefixed with 'dark:'.
 * 
 * Example Risk: 'bg-zinc-950' (Will look black in light mode. Bad.)
 * Correct:      'dark:bg-zinc-950' (Only black in dark mode. Good.)
 */

// Define directory to scan
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');

// Define specific classes that are dangerous if valid in Light Mode
// (i.e., they are very dark backgrounds or very light text)
const FORBIDDEN_UNPREFIXED_CLASSES = [
    'bg-zinc-950',
    'bg-zinc-900',
    'bg-black',
    'bg-slate-950',
    'bg-slate-900',
    'text-zinc-100',
    'text-zinc-50',
    'text-white',
];

// Helper to recursively get all files
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

describe('Theme Compliance (Visual Regression Prevention)', () => {
    const files = getAllFiles(COMPONENTS_DIR);

    files.forEach(file => {
        const relativePath = path.relative(process.cwd(), file);

        // Skip definition files, tests, and UI primitives
        if (file.includes('.d.ts')) return;
        if (file.includes('__tests__')) return;
        if (file.includes('/ui/')) return;

        it(`should not have hardcoded dark colors in ${relativePath}`, () => {
            const content = fs.readFileSync(file, 'utf-8');
            const lines = content.split('\n');

            const errors: string[] = [];

            lines.forEach((line, index) => {
                FORBIDDEN_UNPREFIXED_CLASSES.forEach(riskyClass => {
                    // Regex explained:
                    // (?<!...) Negative lookbehind: ensure NOT preceded by 'dark:', 'hover:', 'group-hover:'
                    // \b... matches the exact class name
                    // We check for "dark:class" specifically.

                    // Simple check: does the line contain the class?
                    if (line.includes(riskyClass)) {
                        // Strict check: Is it prefixed by 'dark:'?
                        // We also search for common prefixes that might legitimize it like "hover:text-white" on a dark button.
                        // But for main layout backgrounds, even hover:bg-black is suspect in light mode.

                        // Let's enforce: MUST have 'dark:' prefix OR be inside a "dark" variant string
                        // For regex simplicity, let's just fail if we see ' bg-zinc-950 ' without 'dark:' immediately before.

                        const regex = new RegExp(`(?<!dark:|hover:|focus:|active:|group-hover:|data-\\[state=.*\\]:|file:|placeholder:)${riskyClass}(?![0-9-])`, 'g');

                        if (regex.test(line)) {
                            // Exclude false positives:
                            // 1. Comments
                            if (line.trim().startsWith('//') || line.trim().startsWith('/*')) return;
                            // 2. Explicit ignore
                            if (line.includes('theme-ignore')) return;
                            // 3. Inline styles (often implies dynamic colored background where text-white is valid)
                            if (line.includes('style={{')) return;

                            errors.push(`Line ${index + 1}: Found '${riskyClass}' without 'dark:' prefix.`);
                        }
                    }
                });
            });

            if (errors.length > 0) {
                console.error(`\n❌ Theme Error in ${relativePath}:`);
                errors.forEach(e => console.error(e));
                console.error(`   Fix: Add 'dark:' prefix (e.g. 'dark:bg-zinc-950') or use theme var (e.g. 'bg-background')\n`);
            }

            expect(errors).toEqual([]);
        });
    });
});
