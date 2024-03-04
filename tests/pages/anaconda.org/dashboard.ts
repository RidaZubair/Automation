import {
  click,
  clickAndNavigate,
  closePage,
  expectElementToBeHidden,
  expectElementToBeVisible,
  expectElementToHaveText,
  getLocator,
  getText,
  switchPage,
  switchToDefaultPage,
  waitForElementToBeStable,
} from 'vasu-playwright-utils';
import { Locator } from '@playwright/test';

const dashboard = `//h2[normalize-space()='My Anaconda Landscape']`;
//View
const view = `//label[@data-toggle-submenu='view']/..`;
const viewdropdown = () => getLocator(`//*[@data-submenu-item='view']//a`).count();
const landscape = `//a[contains(text(),'Landscape')]`;
const favorites = `//a[contains(text(),'Favorites')]`;
const favoritesText = `(//strong[normalize-space()='favorites'])`;
const packages = `//a[contains(text(),'Packages')]`;
const packageText = "//strong[normalize-space()='packages']";
const notebook = `//a[contains(text(),'Notebooks')]`;
const notebooText = "//strong[normalize-space()='notebooks']";
const environments = `//a[contains(text(),'Environments')]`;
const environmentsText = "//strong[normalize-space()='environments']";
const projects = `//a[contains(text(),'Projects')]`;
const projectText = "//strong[normalize-space()='projects']";

//Help
const help = `//label[@data-toggle-submenu='help']/..`;
const ViewDocs = `//a[normalize-space()='View Docs']`;
const docstitleTest = '//h1';
const reportBug = `//a[normalize-space()='Report a bug']`;
const reportbugHeadingText = `(//h1[normalize-space()='Report a Bug'])`;

export async function verifyDashboard() {
  await expectElementToBeVisible(dashboard, { timeout: 1000 });
}

export async function verifyDashboardIsNotDisplayed() {
  await expectElementToBeHidden(dashboard);
}

export async function RedirectToItemsFromDropdown(
  DropdownHeader: string | Locator,
  DropdownItem: string | Locator,
  ItemRedirection: string | Locator,
  ItemHeaderText: string,
) {
  await waitForElementToBeStable(DropdownHeader);
  await click(DropdownHeader);
  await clickAndNavigate(DropdownItem);
  await expectElementToHaveText(ItemRedirection, ItemHeaderText);
}

export async function ViewDropdown() {
  await waitForElementToBeStable(view);
  await click(view);
  const ViewArray: string[] = ['Landscape', 'Favorites', 'Packages', 'Notebooks', 'Environments', 'Projects'];
  const viewvalue = await viewdropdown();
  for (let i = 1; i <= viewvalue; i++) {
    const value = () => getLocator(`//*[@data-submenu-item='view']//a` + `[` + i + `]`);
    const text = await getText(value());
    console.log(text);
    await expectElementToHaveText(value(), ViewArray[i - 1]);
  }
}

export async function verifyViewDropdownRedirection() {
  await RedirectToItemsFromDropdown(view, landscape, dashboard, 'My Anaconda Landscape');
  await RedirectToItemsFromDropdown(view, favorites, favoritesText, 'favorites');
  await RedirectToItemsFromDropdown(view, packages, packageText, 'packages');
  await RedirectToItemsFromDropdown(view, notebook, notebooText, 'notebooks');
  await RedirectToItemsFromDropdown(view, environments, environmentsText, 'environments');
  await RedirectToItemsFromDropdown(view, projects, projectText, 'projects');
}

export async function verifyHelpDropdown() {
  await RedirectToItemsFromDropdown(help, reportBug, reportbugHeadingText, 'Report a Bug');
  //await RedirectToItemsFromDropdown(help, ViewDocs, docstitleTest, 'User guide');       //cant use this due to the exyernal link
  await waitForElementToBeStable(help);
  await click(help);
  await click(ViewDocs);
  await switchPage(2);
  await expectElementToBeVisible(docstitleTest);
  await closePage();
  await switchToDefaultPage();
}
