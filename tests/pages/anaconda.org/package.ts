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
const rowcount = () => getLocator(`(//*[@id='repo-packages-table']//tr)`).count();

//=========================================== Access filter ================================
const AccessFilter = `//*[@data-dropdown='Access']`;
const publicAccessfilter = `(//*[@id='Access']//li)[2]`;
const privateAccessfilter = `(//*[@id='Access']//li)[3]`;
const authenticatedAccessfilter = `(//*[@id='Access']//li)[4]`;
const publicaccesspackages = `//td[contains(text(),'public')]`;
const privateaccesspackages = `//td[contains(text(),'private')]`;
const authenticatedaccesspackages = `//td[contains(text(),'authenticated')]`;

//=========================================== Type filter ================================
const TypeFilter = `//*[@data-dropdown='Type']`;
const pythonTypefilter = `(//*[@id='Type']//li)[2]`;
const condaTypefilter = `(//*[@id='Type']//li)[3]`;
const rTypefilter = `(//*[@id='Type']//li)[4]`;
const pythoniconpackages = `(//*[@class='ca ca-pypi'])`;
const condaiconpackages = `(//*[@class='ca ca-conda'])`;
const riconpackages = `(//*[@class='ca ca-r'])`;

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
  packagecountInTable: string | Locator,
) {
  await waitForElementToBeStable(dropdown);
  await click(dropdown);
  await click(filterdropdown);
  const packages = () => getLocator(packagecountInTable);
  const count = await packages().count();
  let row = await rowcount();
  if (row != 0) {
    row = row - 1;
  }
  if (dropdown == `//*[@data-dropdown='Type']`) {
    row = await rowcount();
  }
  if (row == count) {
    console.log('pass');
    console.log(row);
    console.log(count);
  } else {
    console.log('fail');
    console.log(row);
    console.log(count);
  }
}

export async function checkaccessfilter() {
  await checkfilter(AccessFilter, publicAccessfilter, publicaccesspackages);
  await checkfilter(AccessFilter, authenticatedAccessfilter, authenticatedaccesspackages);
  await checkfilter(AccessFilter, privateAccessfilter, privateaccesspackages);
}
export async function checktypefilter() {
  await checkfilter(TypeFilter, pythonTypefilter, pythoniconpackages);
  await checkfilter(TypeFilter, condaTypefilter, condaiconpackages);
  await checkfilter(TypeFilter, rTypefilter, riconpackages);
}
