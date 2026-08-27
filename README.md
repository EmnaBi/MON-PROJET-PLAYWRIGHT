# mon-projet-playwright

Suite de tests end-to-end écrite avec **Playwright** et **TypeScript**. Les tests
s'exécutent contre le site en ligne `https://playwright.dev` (défini comme `baseURL`
dans `playwright.config.ts`). Le projet ne contient pas de code applicatif : ce sont
uniquement des tests. Les commentaires et titres de tests sont rédigés en français.

## Prérequis

- **Node.js 18 ou supérieur** (vérifie avec `node -v`)
- **npm** (installé avec Node.js)

> `playwright-bdd` est volontairement figé en v7 : la v9 exige Node 20+, or le projet
> cible Node 18. Ne monte pas cette dépendance en v9 tant que Node reste en 18.

## Installation

Une fois le projet récupéré (clone ou copie du dossier), place-toi à la racine du
projet puis exécute, dans l'ordre :

```bash
# 1. Installer les dépendances (Playwright, TypeScript…)
npm install

# 2. Télécharger les navigateurs utilisés par Playwright (chromium, firefox, webkit)
#    Obligatoire la première fois, sinon les tests ne peuvent pas démarrer.
npx playwright install
```

> Sur Linux, si `npx playwright install` signale des dépendances système manquantes,
> lance `npx playwright install --with-deps`.

## Lancer les tests

Chaque script `test*` lance d'abord `bddgen` (regénère les tests à partir des
fichiers `.feature`) puis `playwright test`.

```bash
npm test              # tous les tests, sans interface (chromium + firefox + webkit + les 3 projets BDD)
npm run test:ui       # mode interactif (interface Playwright UI)
npm run test:headed   # avec les navigateurs visibles à l'écran
npm run test:bdd      # uniquement les scénarios BDD/Cucumber (projets bdd-chromium/firefox/webkit)
npm run report        # ouvrir le dernier rapport HTML
```

### Lancer un sous-ensemble

```bash
npx playwright test tests/navigation.spec.ts   # un seul fichier
npx playwright test navigation                 # tous les fichiers dont le chemin contient "navigation"
npx playwright test -g "le bon titre"          # les tests dont le titre contient ce texte
npx playwright test --project=chromium         # un seul navigateur
npx playwright test --debug                    # pas à pas avec l'inspecteur
```

## Structure du projet

```
tests/                    Les tests Playwright, découpés par fonctionnalité
  accueil.spec.ts           « Page d'accueil »
  navigation.spec.ts        « Navigation »
pages/                    Page Object Model — une classe par page
  HomePage.ts               locators + actions de la page d'accueil
  InstallationPage.ts       locators + vérifications de la page Installation
features/                 Couche BDD/Cucumber (Gherkin en français)
  accueil.feature           scénarios en Gherkin (# language: fr)
  steps/
    fixtures.ts             étend le test playwright-bdd avec les Page Objects
    accueil.steps.ts        steps qui appellent les méthodes du POM (sans locator)
playwright.config.ts      Configuration unique (baseURL, navigateurs, traces, BDD…)
```

Le dossier `.features-gen/` (tests générés par `bddgen` à partir des `.feature`) est
créé automatiquement et ignoré par git.

Les tests suivent le **Page Object Model** : les locators et actions vivent dans les
classes de `pages/`, et les fichiers de test — comme les steps BDD — appellent leurs
méthodes. Si un locator change sur le site, il se corrige à un seul endroit (la classe
de page).

## En cas d'échec d'un test

- Une **trace** est capturée à la première nouvelle tentative (`on-first-retry`) et une
  **capture d'écran** en cas d'échec (`only-on-failure`).
- Regarde le dossier `test-results/` et ouvre le rapport HTML avec `npm run report`.
