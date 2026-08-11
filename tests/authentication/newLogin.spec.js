import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { getTestData } from '../../utils/readJSONFileData';

//const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.TEST_ADMIN_USER || '';
//const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD;

const loginData = getTestData('./test-data/authentication.json');
test.describe('Authentication - Login', () => {
      for (const [testID, testData] of Object.entries(loginData)) {
         test(`${testData.description}`, async ({ page }) => {
            const { email, password } = testData;
            const login = new LoginPage(page);
            await login.goto();
            await login.login(email, password);
            if (testData['errorMessage'] === "NULL") {
                await expect(page).toHaveURL(/.*\/admin.*/i);
            }
            else {
                const err = await login.getErrorText();
                await expect(err).toBe(testData['errorMessage']);
            }
        });
   }
});

 

       

  



//     test('TS002 Invalid password rejected', async ({ page }) => {
//         test.skip(!ADMIN_EMAIL, 'ADMIN_EMAIL must be set');
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login(ADMIN_EMAIL!, 'wrongpass123');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS003 Unregistered email rejected', async ({ page }) => {
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login('not.exists@example.com', ADMIN_PASSWORD || 'whatever');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS004 Blank email and password validation', async ({ page }) => {
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login('', '');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS005 Missing email field validation', async ({ page }) => {
//         test.skip(!ADMIN_PASSWORD, 'ADMIN_PASSWORD must be set');
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login('', ADMIN_PASSWORD!);
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS006 Missing password field validation', async ({ page }) => {
//         test.skip(!ADMIN_EMAIL, 'ADMIN_EMAIL must be set');
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login(ADMIN_EMAIL!, '');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS007 Invalid email format rejected', async ({ page }) => {
//         const login = new LoginPage(page);
//         await login.goto();
//         await login.login('plainaddress', 'somepass');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//         const err = await login.getErrorText();
//         expect(err && err.length > 0).toBeTruthy();
//     });

//     test('TS008 Email max length boundary (100 chars)', async ({ page }) => {
//         const login = new LoginPage(page);
//         await login.goto();
//         const validEmail = 'a'.repeat(90) + '@example.com';
//         const oversizeEmail = 'a'.repeat(91) + '@example.com';

//         await login.goto();
//         await login.login(validEmail, 'pass');
//         await expect(page).toHaveURL(/.*\/login.*/i);

//         await login.goto();
//         await login.login(oversizeEmail, 'pass');
//         await expect(page).toHaveURL(/.*\/login.*/i);
//     });
 
