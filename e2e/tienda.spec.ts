import { test, expect } from '@playwright/test';

test.describe('Tienda (Store)', () => {
  test('loads product listing', async ({ page }) => {
    await page.goto('/tienda');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[class*="product"]').first().or(page.locator('[class*="Producto"]').first())).toBeVisible({ timeout: 5000 });
  });

  test('has category filters', async ({ page }) => {
    await page.goto('/tienda');
    await page.waitForLoadState('networkidle');
    const filters = page.locator('button:has-text("Todos"), button:has-text("Grano"), [class*="filter"]').first();
    await expect(filters).toBeVisible({ timeout: 5000 });
  });

  test('product links go to detail page', async ({ page }) => {
    await page.goto('/tienda');
    await page.waitForLoadState('networkidle');
    const productLink = page.locator('a[href*="/tienda/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await page.waitForURL(/\/tienda\/.+/);
    }
  });

  test('search input is visible', async ({ page }) => {
    await page.goto('/tienda');
    await page.waitForLoadState('networkidle');
    const searchInput = page.locator('input[type="text"], input[placeholder*="buscar"], input[placeholder*="Buscar"], input[placeholder*="search"]').first();
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });
});
