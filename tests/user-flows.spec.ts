import { test, expect } from '@playwright/test';

test.describe('User Flows', () => {
    test.beforeEach(async ({ page }) => {
        // Prevent NUX popup from appearing
        await page.addInitScript(() => {
            localStorage.setItem('tokentickr-nux-seen', 'true');
        });

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

        // Find the column control section
        const columnsSection = page.locator('text=Columns:').locator('..');

        // The column count is the text between Minus and Plus buttons
        // Use a more specific selector - find span with just number text
        const countDisplay = columnsSection.locator('span.font-medium');

        // Find the column control buttons
        const addColBtn = columnsSection.getByRole('button').nth(1); // Plus button
        const removeColBtn = columnsSection.getByRole('button').first(); // Minus button

        await expect(countDisplay).toHaveText('3'); // Default

        // Add column (max is 5)
        await addColBtn.click();
        await expect(countDisplay).toHaveText('4');

        // At 4 columns, View toggle buttons should appear
        await expect(page.getByRole('button', { name: 'Compact View' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Detailed View' })).toBeVisible();

        // Add one more to reach max
        await addColBtn.click();
        await expect(countDisplay).toHaveText('5');
        await expect(addColBtn).toBeDisabled();

        // Remove columns: 5 -> 4 -> 3 -> 2
        await removeColBtn.click(); // 4
        await removeColBtn.click(); // 3
        await removeColBtn.click(); // 2
        await expect(countDisplay).toHaveText('2');
        await expect(removeColBtn).toBeDisabled();

        // View buttons should be hidden at 2 columns
        await expect(page.getByRole('button', { name: 'Compact View' })).not.toBeVisible();
    });

    test('can toggle between compact and detailed view at 4 columns', async ({ page }) => {
        // Select two models first
        await page.getByRole('button', { name: /Select Model/i }).first().click();
        const searchInput = page.locator('input[placeholder*="Search models"]');
        await searchInput.fill('GPT');
        await page.locator('[role="dialog"]').getByText(/GPT/i).first().click();

        await page.getByRole('button', { name: /Select Model/i }).first().click();
        await searchInput.fill('Claude');
        await page.getByText('Claude 3 Opus').first().click();

        // Add columns to reach 4
        const colControls = page.locator('text=Columns:').locator('..');
        const addColBtn = colControls.getByRole('button').nth(1);
        await addColBtn.click(); // 4 columns

        // Verify View toggle buttons appear
        await expect(page.getByRole('button', { name: 'Compact View' })).toBeVisible();

        // Default should be Compact mode
        const compactBtn = page.getByRole('button', { name: 'Compact View' });
        const detailedBtn = page.getByRole('button', { name: 'Detailed View' });

        // Compact mode should show "View Details" buttons
        await expect(page.getByRole('button', { name: 'View Details' }).first()).toBeVisible();

        // Toggle to Detailed view
        await detailedBtn.click();

        // In detailed view, "More details" should be visible instead
        await expect(page.getByText('More details').first()).toBeVisible();
    });
});
