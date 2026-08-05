import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Quick verification that LoginPage locators work on nopCommerce demo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to login
  await loginPage.goto();
  
  // Verify all required elements are visible before trying to use them
  const emailVisible = await loginPage.email.isVisible();
  const passwordVisible = await loginPage.password.isVisible();
  const submitVisible = await loginPage.submit.isVisible();
  
  console.log('Email field visible:', emailVisible);
  console.log('Password field visible:', passwordVisible);
  console.log('Submit button visible:', submitVisible);
  
  // All fields must be visible for login to work
  expect(emailVisible).toBe(true);
  expect(passwordVisible).toBe(true);
  expect(submitVisible).toBe(true);
  
  // Try a simple test - attempt login with invalid credentials
  await loginPage.login('test@example.com', 'wrongpass');
  
  // After login attempt, we should still be on the login page
  await expect(page).toHaveURL(/.*\/login.*/i);
});
