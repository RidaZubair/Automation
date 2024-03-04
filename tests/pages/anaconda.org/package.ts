//import { click } from 'vasu-playwright-utils';
import {
  click,
  clickAndNavigate,
  expectElementToHaveText,
  getLocator,
  waitForElementToBeStable,
} from 'vasu-playwright-utils';
import { Locator } from '@playwright/test';

const packgesviewall = `//*[@class='title']//a[contains(@href,'/repo')]`;
const headerMessage = `//h2//strong[normalize-space()='packages']`;
const firstPackageCheckbox = `(//*[@id='repo-packages-table']//input[@name='package'])[1]`;
const AccessFilter = `//*[@data-dropdown='Access']`;
const publicAccessfilter = `(//*[@id='Access']//li)[2]`;
const privateAccessfilter = `(//*[@id='Access']//li)[3]`;
const authenticatedAccessfilter = `(//*[@id='Access']//li)[4]`;
const rowcount = () => getLocator(`(//*[@id='repo-packages-table']//tr)`).count();
const publicaccesspackages = () => getLocator(`//td[contains(text(),'public')]`).count();
const privateaccesspackages = () => getLocator(`//td[contains(text(),'private')]`).count();
const authenticatedaccesspackages = () => getLocator(`//td[contains(text(),'authenticated')]`).count();

export async function navigateToAllpackages() {
  await clickAndNavigate(packgesviewall);
  await expectElementToHaveText(headerMessage, 'packages');
}

//Incomplete function
export async function selectFirstPackageCheckbox() {
  await click(firstPackageCheckbox);
}

export async function checkfilter(
  dropdown: string | Locator,
  filterdropdown: string | Locator,
  packagecountInTable: number | Locator,
) {
  await waitForElementToBeStable(dropdown);
  await click(dropdown);
  await click(filterdropdown);
  let row = await rowcount();
  if (row != 0) {
    row = row - 1;
  }
  if (row == packagecountInTable) {
    console.log('pass');
    console.log(row);
    console.log(packagecountInTable);
  } else {
    console.log('fail');
    console.log(row);
    console.log(packagecountInTable);
  }
}

export async function checkaccessfilter() {
  await checkfilter(AccessFilter, publicAccessfilter, await publicaccesspackages());
  await checkfilter(AccessFilter, privateAccessfilter, await privateaccesspackages());
  await checkfilter(AccessFilter, authenticatedAccessfilter, await authenticatedaccesspackages());
}
