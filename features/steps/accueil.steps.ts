import { Given, When, Then } from './fixtures';

// Les steps se contentent d'appeler les méthodes du POM (aucun locator ici).

Given('je suis sur la page d\'accueil', async ({ homePage }) => {
  await homePage.aller();
});

When('je clique sur le lien Get started', async ({ homePage }) => {
  await homePage.cliquerGetStarted();
});

Then('le titre de la page est correct', async ({ homePage }) => {
  await homePage.verifierTitre();
});

Then('la page Installation est affichée', async ({ installationPage }) => {
  await installationPage.verifierVisible();
});
