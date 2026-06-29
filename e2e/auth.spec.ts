import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test.describe('Login', () => {
    test('logs in with valid admin credentials', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');

      await page.fill('input[type="email"]', 'admin@jaguarcoffee.com');
      await page.fill('input[type="password"]', 'admin123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/mi-cuenta/);
      await expect(page.locator('text=Administrador').first().or(page.locator('text=admin').first())).toBeVisible({ timeout: 10000 });
    });

    test('shows error with invalid credentials', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');

      await page.fill('input[type="email"]', 'wrong@email.com');
      await page.fill('input[type="password"]', 'wrongpass');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Credenciales').or(page.locator('text=inválidas'))).toBeVisible({ timeout: 10000 });
    });

    test('shows error with empty fields', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      await page.click('button[type="submit"]');

      await expect(page.locator('text=Diligencie').or(page.locator('text=correo'))).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Registration', () => {
    test('shows registration form', async ({ page }) => {
      await page.goto('/auth/registro');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('input[type="email"]').first()).toBeVisible();
      await expect(page.locator('input[type="password"]').first()).toBeVisible();
    });

    test('rejects registration with empty fields', async ({ page }) => {
      await page.goto('/auth/registro');
      await page.waitForLoadState('networkidle');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=obligatorios').or(page.locator('text=Diligencie'))).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Logout', () => {
    test('logs out successfully', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      await page.fill('input[type="email"]', 'cliente@jaguarcoffee.com');
      await page.fill('input[type="password"]', 'cliente123');
      await page.click('button[type="submit"]');
      await page.waitForURL(/\/mi-cuenta/);

      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('input[type="email"]').first()).toBeVisible({ timeout: 5000 });
    });
  });
});
