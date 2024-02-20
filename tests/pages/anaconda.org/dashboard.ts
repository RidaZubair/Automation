import {
  click,
  clickAndNavigate,
  expectElementToBeHidden,
  expectElementToBeVisible,
  expectElementToHaveText,
  waitForElementToBeStable,
} from 'vasu-playwright-utils';

const dashboard = "//h2[normalize-space()='My Anaconda Landscape']";
const view = "//label[@data-toggle-submenu='view']/..";
//const view = "label[data-toggle-submenu='view']";
const landscape = "//a[normalize-space()='Landscape']";
const favorites = "//a[contains(text(),'Favorites')]";
const favoritesText = "(//strong[normalize-space()='favorites'])[1]";
const packages = "//a[@class='v2-link v2-nav-item'][normalize-space()='Packages']";
const packageText = "//strong[normalize-space()='packages']";
const notebook = "//a[normalize-space()='Notebooks']";
const notebooText = "//strong[normalize-space()='notebooks']";
const environments = "//a[normalize-space()='Environments']";
const environmentsText = "//strong[normalize-space()='environments']";
const projects = "//a[normalize-space()='Projects']";
const projectText = "//strong[normalize-space()='projects']";

export async function verifyDashboard() {
  await expectElementToBeVisible(dashboard, { timeout: 1000 });
}

export async function verifyDashboardIsNotDisplayed() {
  await expectElementToBeHidden(dashboard);
}

export async function verifyViewDropdown() {
  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(landscape);
  await expectElementToHaveText(dashboard, 'My Anaconda Landscape');

  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(favorites);
  await expectElementToHaveText(favoritesText, 'favorites');

  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(packages);
  await expectElementToHaveText(packageText, 'packages');

  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(notebook);
  await expectElementToHaveText(notebooText, 'notebooks');

  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(environments);
  await expectElementToHaveText(environmentsText, 'environments');

  await waitForElementToBeStable(view);
  await click(view);
  await clickAndNavigate(projects);
  await expectElementToHaveText(projectText, 'projects');
}
