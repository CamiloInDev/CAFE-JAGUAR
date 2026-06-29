import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('checkout page requires authentication', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('authenticated user can access checkout', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="email"]', 'cliente@jaguarcoffee.com');
    await page.fill('input[type="password"]', 'cliente123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/mi-cuenta/);

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Checkout').or(page.locator('text=checkout').or(page.locator('text=Pago'))).first()).toBeVisible({ timeout: 10000 });
  });

  test('checkout has shipping form', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('input[type="email"]', 'cliente@jaguarcoffee.com');
    await page.fill('input[type="password"]', 'cliente123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/mi-cuenta/);

    await page.goto('/checkout');
    await page.waitForLoadState('networkidle');

    const formInput = page.locator('input[placeholder*="dirección"], input[placeholder*="Dirección"], input[placeholder*="ciudad"], input[placeholder*="Ciudad"]').first();
    await expect(formInput).toBeVisible({ timeout: 5000 });
  });

  test('confirmation page loads', async ({ page }) => {
    await page.goto('/checkout/confirmacion');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Confirmación').or(page.locator('text=confirmacion')).or(page.locator('text=gracias')).first()).toBeVisible({ timeout: 5000 });
  });
});
