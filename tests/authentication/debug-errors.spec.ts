import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('DEBUG: Find error message selectors', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to login
  await loginPage.goto();
  
  // Submit form with empty credentials
  await loginPage.login('', '');
  
  // Wait a moment for any validation to appear
  await page.waitForTimeout(1000);
  
  // Inspect the DOM for error elements
  const errorInfo = await page.evaluate(() => {
    const errorElements = {
      validationSummary: null,
      messageError: null,
      fieldValidationError: null,
      roleAlert: null,
      allText: [] as any[],
    };
    
    // Check specific selectors
    const valSummary = document.querySelector('.validation-summary-errors');
    if (valSummary) {
      errorElements.validationSummary = valSummary.textContent?.trim();
    }
    
    const msgError = document.querySelector('.message-error');
    if (msgError) {
      errorElements.messageError = msgError.textContent?.trim();
    }
    
    const fieldError = document.querySelector('.field-validation-error');
    if (fieldError) {
      errorElements.fieldValidationError = fieldError.textContent?.trim();
    }
    
    const roleAlert = document.querySelector('[role="alert"]');
    if (roleAlert) {
      errorElements.roleAlert = roleAlert.textContent?.trim();
    }
    
    // Find all elements that contain "Please enter" or "error" text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const text = el.textContent?.trim() || '';
      if ((text.includes('Please enter') || 
           text.toLowerCase().includes('error') ||
           text.includes('invalid')) && 
          text.length < 100) { // Only short text
        errorElements.allText.push({
          tag: el.tagName,
          text: text.substring(0, 50),
          class: el.className,
          id: el.id,
        });
      }
    });
    
    return errorElements;
  });
  
  console.log('Error Element Information:');
  console.log(JSON.stringify(errorInfo, null, 2));
  
  // Also try to get current page HTML around the form
  const formHTML = await page.evaluate(() => {
    const form = document.querySelector('form');
    return form?.innerHTML.substring(0, 1000); // First 1000 chars
  });
  
  console.log('Form HTML (first 1000 chars):');
  console.log(formHTML);
  
  // Now test our error detection
  const errorText = await loginPage.getErrorText();
  console.log('Detected error text:', errorText);
  
  expect(page).toBeTruthy(); // Dummy assertion to keep test running
});
