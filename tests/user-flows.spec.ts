
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/TokenTickr/i);
});

test('loads main UI components', async ({ page }) => {
    await page.goto('/');

    // Check for the header branding
    await expect(page.getByRole('banner')).toBeVisible();

    // Check for the main comparison layout
    await expect(page.getByRole('main')).toBeVisible();
});
