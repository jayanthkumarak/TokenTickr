import { test, expect } from '@playwright/test';

test.describe('User Flows', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Mock the API response to ensure deterministic testing
        await page.route('**/api/v1/models**', async route => {
            const json = {
                data: [
                    {
                        id: 'openai/gpt-4',
                        name: 'GPT-4',
                        pricing: { prompt: '0.00003', completion: '0.00006' },
                        context_length: 8192,
                        architecture: {
                            input_modalities: ['text'],
                            output_modalities: ['text'],
                            tokenizer: 'GPT'
                        },
                        top_provider: { is_moderated: false },
                        created: 1678099200,
                    },
                    {
                        id: 'anthropic/claude-3-opus',
                        name: 'Claude 3 Opus',
                        pricing: { prompt: '0.000015', completion: '0.000075' },
                        context_length: 200000,
                        architecture: {
                            input_modalities: ['text', 'image'],
                            output_modalities: ['text'],
                            tokenizer: 'Claude'
                        },
                        top_provider: { is_moderated: false },
                        created: 1709251200,
                    }
                ]
            };
            await route.fulfill({ json });
        });
    });

    test('can search and select a model', async ({ page }) => {
        // 1. Click select button - opens CommandDialog directly
        await page.getByRole('button', { name: /Select Model/i }).first().click();

        // 2. The search input appears directly in the CommandDialog
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();

        const searchInput = page.locator('input[placeholder*="Search models"]');
        await expect(searchInput).toBeVisible();
        await searchInput.fill('GPT');

        // 3. Select a model from list (use first match)
        await page.locator('[role="dialog"]').getByText(/GPT/i).first().click();

        // 4. Verify dialog closed (selection completed)
        await expect(dialog).not.toBeVisible();
    });

    test('can clear selected models', async ({ page }) => {
        // 1. Select a model first
        await page.getByRole('button', { name: /Select Model/i }).first().click();

        // Search input appears directly
        const searchInput = page.locator('input[placeholder*="Search models"]');
        await searchInput.fill('Claude');
        await page.getByText('Claude 3 Opus').first().click();

        // 2. Click Clear All
        const clearButton = page.locator('button', { hasText: 'Clear All' }).first();
        await clearButton.click();

        // 3. Verify model is gone and select button returns
        await expect(page.getByText('Claude 3 Opus', { exact: true })).not.toBeVisible();
        await expect(page.getByRole('button', { name: /Select Model/i }).first()).toBeVisible();
    });

    test('can add and remove columns', async ({ page }) => {
        // Initial state: 3 columns
        await expect(page.getByText('Columns:')).toBeVisible();

        // The columns control group
        const colControls = page.locator('.flex.items-center.gap-2.mb-6');
        const addColBtn = colControls.getByRole('button').last();
        const removeColBtn = colControls.getByRole('button').first();
        const countDisplay = colControls.locator('span.font-medium');

        await expect(countDisplay).toHaveText('3'); // Default

        // Add column (max is 4)
        await addColBtn.click();
        await expect(countDisplay).toHaveText('4');
        await expect(addColBtn).toBeDisabled();

        // Remove column
        await removeColBtn.click(); // 3
        await removeColBtn.click(); // 2
        await expect(countDisplay).toHaveText('2');
        await expect(removeColBtn).toBeDisabled();
    });
});
