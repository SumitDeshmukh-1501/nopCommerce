import { Page, Locator } from '@playwright/test';

export class LoginPage {


  constructor(page) {
    this.page = page;
    // nopCommerce login form: try multiple strategies for email field
    // 1. Input with id="Email" or name="Email" (standard nopCommerce)
    // 2. Fallback to input[type="email"] if present
    // 3. Fallback to input by placeholder
    this.email = page.locator(
      'input#Email, input[name="Email"], input[type="email"]'
    ).first();
    
    // Password field: try multiple strategies
    // 1. Input with id="Password" or name="Password" 
    // 2. Fallback to input[type="password"] (most common)
    this.password = page.locator(
      'input#Password, input[name="Password"], input[type="password"]'
    ).first();
    
    // Submit button: try by type, then by text
    this.submit = page.locator('button[type="submit"]');
    
    // Error message locators
    this.topLevelErrorMessage = page.locator("div.message-error ul li");
    this.fieldLevelErrorMessage=page.locator("#Email-error")
  }

  async goto() {
    await this.page.goto('/login?returnUrl=%2Fadmin%2F');
    // Wait for the page to be loaded and interactive
    try {
      await this.page.waitForLoadState('domcontentloaded');
    } catch {
      // Page may have loaded before this check completes
    }
  }

  async login(email, password) {
    // Fill the email field
    await this.email.fill(email);
    // Fill the password field
    await this.password.fill(password);
    // Click the submit button
    await this.submit.click();
    
    // Wait for the form to be processed
    // Use load state instead of network idle to avoid timeouts
    try {
      // Wait for any navigation to happen OR page to stabilize
      // Use a shorter timeout and catch errors gracefully
      await Promise.race([
        this.page.waitForLoadState('load').catch(() => null),
        this.page.waitForNavigation().catch(() => null),
        this.page.waitForTimeout(2000), // Give it 2 seconds minimum
      ]);
    } catch {
      // Page might not navigate or load, which is fine - form might show errors
    }
  }

  async getErrorText(){

        if (await this.topLevelErrorMessage.isVisible()){
          return this.topLevelErrorMessage.innerText();
        }
        else if(await this.fieldLevelErrorMessage.isVisible()){
          return this.fieldLevelErrorMessage.innerText();
        }
        else{
          return null;
        }
  }
}
