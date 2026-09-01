import { test, expect } from '@playwright/test';

test.describe('Test de démonstration (échec volontaire)', () => {
  test('échoue volontairement', async ({ page }) => {
    await page.goto('/');
    // Assertion volontairement fausse pour démontrer un échec de test
    await expect(page).toHaveTitle('Titre qui n\'existe pas');
  });
});
