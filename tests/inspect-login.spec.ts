import { test, expect } from '@playwright/test';

test('inspect login page structure', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login?returnUrl=%2Fadmin%2F');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Pause to inspect
  await page.pause();
});
