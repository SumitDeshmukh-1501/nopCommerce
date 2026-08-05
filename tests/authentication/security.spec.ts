import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const SQL_PAYLOADS = ["' OR '1'='1", "'; DROP TABLE users; --", "' OR 1=1 --"];
const XSS_PAYLOADS = ["<script>alert('xss')</script>", '\"\'><img src=x onerror=alert(1)>'];

const RUN_SECURITY = process.env.TEST_ASSUME_ISOLATED === 'true' || process.env.RUN_SECURITY === 'true';

test.describe('Authentication - Security', () => {
  test.beforeEach(({ page }) => {
    page.on('dialog', async dialog => {
      throw new Error(`Unexpected dialog: ${dialog.message()}`);
    });
  });

  test('TS010 SQL Injection protection @security', async ({ page }) => {
    test.skip(!RUN_SECURITY, 'Security tests disabled—set RUN_SECURITY=true or TEST_ASSUME_ISOLATED=true');
    const login = new LoginPage(page);
    for (const payload of SQL_PAYLOADS) {
      await login.goto();
      await login.login(payload, 'whatever');
      await expect(page).toHaveURL(/.*\/login.*/i);
      const err = await login.getErrorText();
      expect(err && err.length > 0).toBeTruthy();
    }
  });

  test('TS011 XSS sanitization @security', async ({ page }) => {
    test.skip(!RUN_SECURITY, 'Security tests disabled—set RUN_SECURITY=true or TEST_ASSUME_ISOLATED=true');
    const login = new LoginPage(page);
    for (const payload of XSS_PAYLOADS) {
      await login.goto();
      let dialogShown = false;
      page.once('dialog', async dialog => {
        dialogShown = true;
        await dialog.dismiss();
      });
      await login.login(payload, 'whatever');
      await expect(page).toHaveURL(/.*\/login.*/i);
      expect(dialogShown).toBeFalsy();
      const err = await login.getErrorText();
      expect(err && err.length > 0).toBeTruthy();
    }
  });
});
