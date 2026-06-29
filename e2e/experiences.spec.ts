import { test, expect } from '@playwright/test';

test.describe('Experiences', () => {
  test('experiences page loads', async ({ page }) => {
    await page.goto('/experiencias');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Experiencias').first()).toBeVisible({ timeout: 5000 });
  });

  test('experience cards are visible', async ({ page }) => {
    await page.goto('/experiencias');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('[class*="card"], [class*="Card"], article, [class*="experience"]').first();
    await expect(cards).toBeVisible({ timeout: 5000 });
  });

  test('navigates to experience detail', async ({ page }) => {
    await page.goto('/experiencias');
    await page.waitForLoadState('networkidle');
    const detailLink = page.locator('a[href*="/experiencias/"]').first();
    if (await detailLink.isVisible()) {
      await detailLink.click();
      await page.waitForURL(/\/experiencias\/.+/);
    }
  });
});
