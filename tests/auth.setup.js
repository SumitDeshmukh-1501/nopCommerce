//@ts-check
import { test as setup, expect } from '@playwright/test';
// @ts-ignore
import { LoginPage } from '../pages/LoginPage';
// @ts-ignore
import { getTestData } from '../utils/readJSONFileData';

const loginData = getTestData('./test-data/authentication.json');
const authFile = '.auth/loginedUser.json'

setup("", async ({ page }) => {
       const data = loginData.TS001;
       const { email, password } = data;
       const login = new LoginPage(page);
       await login.goto();
       await login.login(email, password);
       await expect(page).toHaveURL(/.*\/admin.*/i);
       await page.context().storageState({ path: authFile })
})

