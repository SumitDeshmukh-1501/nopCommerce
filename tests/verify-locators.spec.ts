import { test, expect } from '@playwright/test';

test('Test locators on actual nopCommerce login page', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Get information about the form elements
  const formInfo = await page.evaluate(() => {
    const form = document.querySelector('form');
    if (!form) return { error: 'No form found' };
    
    const inputs = form.querySelectorAll('input');
    const buttons = form.querySelectorAll('button');
    
    const inputsInfo = Array.from(inputs).map(i => ({
      type: i.getAttribute('type'),
      name: i.getAttribute('name'),
      id: i.getAttribute('id'),
      class: i.getAttribute('class'),
      placeholder: i.getAttribute('placeholder'),
      value: i.getAttribute('value'),
    }));
    
    const buttonsInfo = Array.from(buttons).map(b => ({
      type: b.getAttribute('type'),
      class: b.getAttribute('class'),
      name: b.getAttribute('name'),
      text: b.textContent?.trim(),
    }));
    
    return {
      formId: form.getAttribute('id'),
      formClass: form.getAttribute('class'),
      formAction: form.getAttribute('action'),
      inputs: inputsInfo,
      buttons: buttonsInfo,
    };
  });
  
  console.log('Form Information:');
  console.log(JSON.stringify(formInfo, null, 2));
  
  // Test our CSS selectors
  const emailElements = page.locator('input#Email, input[name="Email"], input[type="email"]');
  const emailCount = await emailElements.count();
  console.log(`Found ${emailCount} email input(s)`);
  
  const passwordElements = page.locator('input#Password, input[name="Password"], input[type="password"]');
  const passwordCount = await passwordElements.count();
  console.log(`Found ${passwordCount} password input(s)`);
  
  const submitElements = page.locator('button[type="submit"]');
  const submitCount = await submitElements.count();
  console.log(`Found ${submitCount} submit button(s)`);
  
  // Verify we can interact with the elements
  expect(emailCount).toBeGreaterThan(0);
  expect(passwordCount).toBeGreaterThan(0);
  expect(submitCount).toBeGreaterThan(0);
});


