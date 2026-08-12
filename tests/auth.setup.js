//@ts-check
import { test as setup, expect } from '@playwright/test';
// @ts-ignore
import { LoginPage } from '../pages/LoginPage';
// @ts-ignore
import { getTestData } from '../utils/readJSONFileData';
import { DashboardPage } from '../pages/DashboardPage';

const loginData = getTestData('./test-data/authentication.json');
const authFile = '.auth/loginedUser.json'

setup("", async ({ page }) => {
       setup.slow();
       const dp=new DashboardPage(page)
       const data = loginData.TS001;
       const { email, password } = data;
       const login = new LoginPage(page);
       await login.goto();
       await login.login(email, password);
       await page.waitForLoadState('domcontentloaded')
       await page.waitForLoadState('load')
       await page.waitForLoadState("networkidle")
       await expect(page).toHaveURL(/.*\/admin.*/i);
       await expect( page.locator(dp.dashboardTitle)).toBeVisible();
       await page.context().storageState({ path: authFile })
})

