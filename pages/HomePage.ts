import { type Page, type Locator, expect } from '@playwright/test';

// Page Object de la page d'accueil de playwright.dev
export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async aller() {
    await this.page.goto('/');
  }

  async verifierTitre() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

  async cliquerGetStarted() {
    await this.getStartedLink.click();
  }
}
