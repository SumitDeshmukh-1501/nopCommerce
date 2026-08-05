// Lightweight auth helper for tests. Keep fixtures minimal and reusable per TEST_GENERATOR_AGENT rules.
import { Page } from '@playwright/test';

export async function loginThroughUI(page: Page, email: string, password: string) {
  // Navigate to the login page and perform login via the LoginPage locators
  await page.goto('/login?returnUrl=%2Fadmin%2F');
  const emailLocator = page.getByLabel('Email');
  const passwordLocator = page.getByLabel('Password');
  const submit = page.getByRole('button', { name: /log in|sign in|login/i });

  await emailLocator.fill(email);
  await passwordLocator.fill(password);
  await Promise.all([
    page.waitForLoadState('networkidle'),
    submit.click()
  ]).catch(() => {});
}
