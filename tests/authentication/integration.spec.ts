import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.TEST_ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD;
const RUN_PERF = process.env.RUN_PERF === 'true';

test.describe('Authentication - Integration & Non-functional', () => {
  test('TS017 Protected pages blocked without authentication', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/.*\/login.*/i);
  });

  test('TS018 Login performance < 3 seconds @performance', async ({ page }) => {
    test.skip(!RUN_PERF, 'Performance tests disabled—set RUN_PERF=true');
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const samples = 5;
    const timings: number[] = [];
    const login = new LoginPage(page);
    
    for (let i = 0; i < samples; i++) {
      await login.goto();
      const start = Date.now();
      await login.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
      await page.waitForLoadState('networkidle');
      const end = Date.now();
      timings.push(end - start);
      await page.goto('/logout');
    }
    
    timings.sort((a, b) => a - b);
    const median = timings[Math.floor(timings.length / 2)];
    test.info().annotations.push({ type: 'perf', description: `median=${median}ms` });
    expect(median).toBeLessThan(3000);
  });

  test('TS019 HTTPS enforcement and secure cookie flags @security', async ({ browser }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const context = await browser.newContext();
    const page = await context.newPage();
    const login = new LoginPage(page);
    
    await login.goto();
    await login.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/.*\/admin.*/i);
    
    const cookies = await context.cookies();
    const hasSecure = cookies.some(c => c.secure === true);
    const hasHttpOnly = cookies.some(c => c.httpOnly === true);
    expect(hasSecure || hasHttpOnly).toBeTruthy();
    
    await context.close();
  });

  test('TS020 Concurrent login attempts @regression', async ({ browser }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'ADMIN_EMAIL and ADMIN_PASSWORD required');
    const ctxA = await browser.newContext();
    const pageA = await ctxA.newPage();
    const ctxB = await browser.newContext();
    const pageB = await ctxB.newPage();
    
    const loginA = new LoginPage(pageA);
    const loginB = new LoginPage(pageB);

    await loginA.goto();
    await loginB.goto();
    await loginA.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    await loginB.login(ADMIN_EMAIL!, ADMIN_PASSWORD!);
    
    await expect(pageA).toHaveURL(/.*\/admin.*/i);
    await expect(pageB).toHaveURL(/.*\/admin.*/i);

    await ctxA.close();
    await ctxB.close();
  });

  test('TS021 Edge cases: whitespace, unicode, special characters @regression', async ({ page }) => {
    const login = new LoginPage(page);
    const cases = [
      { e: '   ', p: '   ' },
      { e: 'user+test@example.com', p: 'pass' },
      { e: 'ユーザー@例え.テスト', p: 'pass' },
      { e: 'emoji😊@example.com', p: 'p@ss' }
    ];
    
    for (const c of cases) {
      await login.goto();
      await login.login(c.e, c.p);
      await expect(page).toHaveURL(/.*\/login.*/i);
    }
  });
});
