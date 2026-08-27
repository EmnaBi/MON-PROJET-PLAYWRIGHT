import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Génère des tests Playwright à partir des fichiers .feature (Gherkin) + leurs steps.
// Renvoie le dossier généré (.features-gen), utilisé comme testDir des projets BDD.
const bddTestDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.ts',
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Projets BDD / Cucumber (Gherkin) — testDir pointe vers les tests générés.
    {
      name: 'bdd-chromium',
      testDir: bddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'bdd-firefox',
      testDir: bddTestDir,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'bdd-webkit',
      testDir: bddTestDir,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
