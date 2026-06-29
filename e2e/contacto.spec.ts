import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('contact page loads with form', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('input[type="email"], input[placeholder*="email"], input[placeholder*="correo"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('submits contact form', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input[placeholder*="nombre"], input[placeholder*="Nombre"], input[name="nombre"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const subjectInput = page.locator('input[placeholder*="asunto"], input[placeholder*="Asunto"], input[name="asunto"]').first();
    const messageInput = page.locator('textarea').first();
    const submitButton = page.locator('button[type="submit"]').first();

    if (await nameInput.isVisible() && await submitButton.isVisible()) {
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      if (await subjectInput.isVisible()) {
        await subjectInput.fill('Test Subject');
      }
      await messageInput.fill('This is a test message from Playwright E2E tests.');
      await submitButton.click();
      await page.waitForTimeout(2000);
      await expect(page.locator('text=recibido').or(page.locator('text=gracias').or(page.locator('text=success'))).first()).toBeVisible({ timeout: 10000 });
    }
  });
});
