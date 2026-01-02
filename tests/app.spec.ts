import { test, expect } from '@playwright/test';

test.describe('TokenTickr Homepage', () => {
    test.beforeEach(async ({ page }) => {
        // Prevent NUX popup from appearing
        await page.addInitScript(() => {
            localStorage.setItem('tokentickr-nux-seen', 'true');
        });

        await page.goto('/');
    });

    test('has correct title and metadata', async ({ page }) => {
        await expect(page).toHaveTitle(/TokenTickr/);
    });

    test('renders header navigation', async ({ page }) => {
        // Check for logo in header specifically
        await expect(page.locator('header').getByRole('link')).toBeVisible();
        await expect(page.locator('header')).toBeVisible();
    });

    test('renders comparison layout elements', async ({ page }) => {
        const addButtons = page.getByRole('button', { name: /Select Model/i });
        // Should have at least 2 columns by default
        await expect(addButtons.first()).toBeVisible();
        await expect(page.getByText('Columns:')).toBeVisible();
    });

    test('can open model search modal', async ({ page }) => {
        const addButton = page.getByRole('button', { name: /Select Model/i }).first();
        await addButton.click();

        // The CommandDialog opens directly with search input
        const searchInput = page.locator('input[placeholder*="Search models"]');
        await expect(searchInput).toBeVisible();

        // Verify the dialog is open
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();
    });
});
