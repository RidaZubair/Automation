//import { click } from 'vasu-playwright-utils';
import { click, clickAndNavigate, expectElementToHaveText } from 'vasu-playwright-utils';

const packgesviewall = "(//*[@class='right']//a[@class='text-white'])[1]";
const headerMessage = "(//strong[normalize-space()='packages'])[1]";
const checkbox1 = "(//*[@id='repo-packages-table']//input[@name='package'])[1]";
//const checkall = "#checkbox";

export async function navigateToAllpackages() {
  await clickAndNavigate(packgesviewall);
  await expectElementToHaveText(headerMessage, 'packages');
}

export async function selectcheckbox() {
  await navigateToAllpackages();
  await click(checkbox1);
}
