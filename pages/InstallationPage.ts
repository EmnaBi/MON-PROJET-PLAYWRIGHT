import { type Page, type Locator, expect } from '@playwright/test';

// Page Object de la page Installation (atteinte via "Get started")
export class InstallationPage {
  readonly page: Page;
  readonly titre: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titre = page.getByRole('heading', { name: 'Installation' });
  }

  async verifierVisible() {
    await expect(this.titre).toBeVisible();
  }
}
