import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Page d\'accueil', () => {
  test('a le bon titre', async ({ page }) => {
    const accueil = new HomePage(page);
    await accueil.aller();
    await accueil.verifierTitre();
  });
});
