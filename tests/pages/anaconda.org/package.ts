//import { click } from 'vasu-playwright-utils';
import { click, clickAndNavigate, expectElementToHaveText } from 'vasu-playwright-utils';

const packgesviewall = `//*[@class='title']//a[contains(@href,'/repo')]`;
const headerMessage = `//h2//strong[normalize-space()='packages']`;
const firstPackageCheckbox = `(//*[@id='repo-packages-table']//input[@name='package'])[1]`;

export async function navigateToAllpackages() {
  await clickAndNavigate(packgesviewall);
  await expectElementToHaveText(headerMessage, 'packages');
}

export async function selectFirstPackageCheckbox() {
  await click(firstPackageCheckbox);
}
