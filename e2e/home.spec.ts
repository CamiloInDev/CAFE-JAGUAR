import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads and displays title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jaguar Coffee/);
  });

  test('displays hero carousel', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hero = page.locator('[class*="hero"]').first();
    await expect(hero).toBeVisible({ timeout: 5000 });
  });

  test('displays navigation bar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    await expect(nav.locator('text=Tienda').first()).toBeVisible();
    await expect(nav.locator('text=Experiencias').first()).toBeVisible();
    await expect(nav.locator('text=Academia').first()).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('nav a:has-text("Tienda")').first().click();
    await page.waitForURL(/\/tienda/);
  });

  test('footer is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });
});
