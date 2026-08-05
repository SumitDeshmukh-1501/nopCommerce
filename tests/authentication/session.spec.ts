import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.TEST_ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD;
const SESSION_TIMEOUT_SECONDS = process.env.SESSION_TIMEOUT_OVERRIDE ? Number(process.env.SESSION_TIMEOUT_OVERRIDE) : 0;

test.describe('Authentication - Session & Logout', () => {
  test('TS012 Session expires after idle timeout @session', async ({ page }) => {
    test.skip(!SESSION_TIMEOUT_SECONDS || SESSION_TIMEOUT_SECONDS <= 0, 'SESSION_TIMEOUT_OVERRIDE required for this test');
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const login = new LoginPage(page);
    await login.goto();
    await login.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/.*\/admin.*/i);
    
    const waitMs = (SESSION_TIMEOUT_SECONDS + 5) * 1000;
    await page.waitForTimeout(waitMs);
    
    await page.reload();
    await expect(page).toHaveURL(/.*\/login.*/i);
  });

  test('TS013 Logout invalidates session @smoke', async ({ page }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/.*\/admin.*/i);
    
    await dashboard.logout();
    await expect(page).toHaveURL(/.*\/login.*/i);
    
    await page.goBack();
    await page.reload();
    await expect(page).not.toHaveURL(/.*\/admin.*/i);
  });

  test('TS014 Back button protection after logout @smoke', async ({ page }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/.*\/admin.*/i);
    
    await dashboard.logout();
    await page.goBack();
    await expect(page).not.toHaveURL(/.*\/admin.*/i);
  });
});
