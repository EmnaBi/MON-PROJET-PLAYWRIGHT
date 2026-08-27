import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { InstallationPage } from '../pages/InstallationPage';

test.describe('Navigation', () => {
  test('le lien Get started mène à la page Installation', async ({ page }) => {
    const accueil = new HomePage(page);
    await accueil.aller();
    await accueil.cliquerGetStarted();

    const installation = new InstallationPage(page);
    await installation.verifierVisible();
  });
});
