import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from '../../pages/HomePage';
import { InstallationPage } from '../../pages/InstallationPage';

// Fixtures : instancient les Page Objects et les rendent disponibles dans les steps.
type Fixtures = {
  homePage: HomePage;
  installationPage: InstallationPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  installationPage: async ({ page }, use) => {
    await use(new InstallationPage(page));
  },
});

// Given / When / Then liés à ce `test` étendu (avec nos fixtures POM).
export const { Given, When, Then } = createBdd(test);
