import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    // Dashboard typically shows a title or header; use text locator as a resilient check
    this.header = page.getByText('Dashboard', { exact: false });
  }

  async isVisible(): Promise<boolean> {
    return await this.header.isVisible().catch(() => false);
  }

  // Attempt to logout using either link or button with name "logout"
  async logout(): Promise<void> {
    const logoutLink = this.page.getByRole('link', { name: /logout/i });
    if (await logoutLink.count() > 0) {
      await Promise.all([this.page.waitForLoadState('networkidle'), logoutLink.first().click()]);
      return;
    }
    const logoutButton = this.page.getByRole('button', { name: /logout/i });
    if (await logoutButton.count() > 0) {
      await Promise.all([this.page.waitForLoadState('networkidle'), logoutButton.first().click()]);
      return;
    }
    // If no explicit control, try to click generic logout text
    const logoutByText = this.page.getByText('Log out', { exact: false });
    if (await logoutByText.count() > 0) {
      await Promise.all([this.page.waitForLoadState('networkidle'), logoutByText.first().click()]);
    }
  }
}
