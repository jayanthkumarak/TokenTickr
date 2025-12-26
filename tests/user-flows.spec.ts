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
                        architecture: { input_modalities: ['text'], output_modalities: ['text'] },
                    },
                    {
                        id: 'anthropic/claude-3-opus',
                        name: 'Claude 3 Opus',
                        pricing: { prompt: '0.000015', completion: '0.000075' },
                        context_length: 200000,
                        architecture: { input_modalities: ['text', 'image'], output_modalities: ['text'] },
                    }
                ]
            };
            await route.fulfill({ json });
        });
    });

    test('can search and select a model', async ({ page }) => {
        // 1. Click select button
        await page.getByRole('button', { name: /Select Model/i }).first().click();

        // 2. Click search trigger
        const searchTrigger = page.locator('button').filter({ hasText: /Search/i }).first();
        await searchTrigger.click();

        // 3. Type in search
        const searchInput = page.locator('input[placeholder*="Search"]');
        await searchInput.fill('GPT-4');

        // 3. Select model from list
        // Verify the model item is visible first
        const modelItem = page.locator('[role="option"]').filter({ hasText: 'GPT-4' }).first();
        // fallback if roles aren't used in shadcn command
        // const modelItem = page.getByText('GPT-4', { exact: true }).first();

        // Just click the text
        await page.getByText('GPT-4').first().click();

        // 4. Verify model card appears
        // Wait for the card header with the name
        await expect(page.getByRole('heading', { name: 'GPT-4' })).toBeVisible();
        await expect(page.getByText('$30.00/M prompt')).toBeVisible(); // 0.00003 * 1M
    });

    test('can clear selected models', async ({ page }) => {
        // 1. Select a model first
        await page.getByRole('button', { name: /Select Model/i }).first().click();

        const searchTrigger = page.locator('button').filter({ hasText: /Search/i }).first();
        await searchTrigger.click();

        await page.locator('input[placeholder*="Search"]').fill('Claude');
        await page.getByText('Claude 3 Opus').click();

        // 2. Click Clear All
        // Use text filter as the icon might affect accessible name matching slightly, or just be safe
        const clearButton = page.locator('button', { hasText: 'Clear All' }).first();
        // Just click it, playwright waits for enabled state by default
        await clearButton.click();

        // 3. Verify model is gone and select button returns
        await expect(page.getByText('Claude 3 Opus', { exact: true })).not.toBeVisible();
        await expect(page.getByRole('button', { name: /Select Model/i }).first()).toBeVisible();
    });

    test('can add and remove columns', async ({ page }) => {
        // Initial state: usually 3 columns? (from comparison-store logic: maxModels: 3)
        // Let's verify text: "3"
        await expect(page.getByText('Columns:')).toBeVisible();

        const plusButton = page.locator('button:has(svg.lucide-plus)').last(); // There might be multiple plus icons
        // Or better locator:
        // The columns control group
        const colControls = page.locator('.flex.items-center.gap-2.mb-6');
        const addColBtn = colControls.getByRole('button').last();
        const removeColBtn = colControls.getByRole('button').first();
        // Use :scope > span to be very specific or just generic visible text checking if the structure varies
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
