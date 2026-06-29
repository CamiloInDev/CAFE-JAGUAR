import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');

  await page.fill('input[type="email"]', 'admin@jaguarcoffee.com');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/mi-cuenta/);
  await expect(page.locator('text=Mi Cuenta').first()).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: authFile });
});

setup('authenticate as regular user', async ({ page }) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');

  await page.fill('input[type="email"]', 'cliente@jaguarcoffee.com');
  await page.fill('input[type="password"]', 'cliente123');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/mi-cuenta/);
  await expect(page.locator('text=Mi Cuenta').first()).toBeVisible({ timeout: 10000 });

  await page.context().storageState({ path: 'e2e/.auth/user.json' });
});
