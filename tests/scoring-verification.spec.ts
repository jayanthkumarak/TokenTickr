import { test, expect } from '@playwright/test';

// Data-driven: selects the first options the app offers instead of
// hardcoding model names, so the spec survives data refreshes.
test('Smart Value Ranking renders for any three selected models', async ({ page }) => {
  await page.goto('/');

  // Dismiss NUX popup if present
  const startComparing = page.getByRole('button', { name: 'Start Comparing' });
  try {
    await startComparing.waitFor({ state: 'visible', timeout: 3000 });
    await startComparing.click();
    await expect(startComparing).not.toBeVisible();
  } catch {
    // Already dismissed; continue
  }

  const selectedNames: string[] = [];

  for (let slot = 0; slot < 3; slot++) {
    // Open the selector for the next empty slot
    await page.getByRole('button', { name: 'Select Model' }).first().click();

    const searchInput = page.getByPlaceholder(/Search models/i);
    await expect(searchInput).toBeVisible();

    // Pick the first offered option, whatever the data ships
    const options = page.getByRole('option');
    await expect(options.first()).toBeVisible({ timeout: 10000 });
    const name = ((await options.first().locator('span.font-medium').first().textContent()) ?? '').trim();
    selectedNames.push(name);
    await options.first().click();

    // Selector closes after picking
    await expect(searchInput).not.toBeVisible();
  }

  // Ranking card renders once 2+ models are selected
  const rankingCard = page
    .locator('div')
    .filter({ has: page.getByText('Smart Value Ranking') })
    .first();
  await expect(rankingCard).toBeVisible({ timeout: 10000 });

  // Every selected model appears in the ranking
  for (const name of selectedNames) {
    if (name) {
      await expect(rankingCard).toContainText(name.slice(0, 24));
    }
  }

  // Score provenance is always labeled one way or the other
  await expect(page.locator('body')).toContainText(/MMLU:|Verified|Insufficient/);
});
