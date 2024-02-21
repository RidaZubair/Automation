import {
  expectElementToHaveText,
  fillAndEnter,
  gotoURL,
  isElementVisible,
  waitForElementToBeStable,
} from 'vasu-playwright-utils';
import {
  EmptySearch,
  InValidSearchAfterLogin,
  InValidSearchBeforLogin,
  ValidSearch,
} from '@testdata/sauce-anaconda.org-test-data';

const search = () => '#welcome-search-input';
const searchafterAfterlogin = () => '#navbar-search-input';
const emptytext = () => '.alert-box.warning';
const errortext = () => '.alert-box.danger';
const infotext = () => '.alert-box.info';
const ResultTable = () => "(//div[@class='row'])[6]";

const URL = 'https://anaconda.org';

export async function SearchValidDataBeforLogin(searchdata = ValidSearch) {
  await gotoURL(URL);
  await fillAndEnter(search(), searchdata.value, { timeout: 5000 });
  await isElementVisible(ResultTable());
}

export async function SearchInValidDataBeforLogin(searchdata = InValidSearchBeforLogin) {
  await gotoURL(URL);
  await fillAndEnter(search(), searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(errortext(), searchdata.message);
}

export async function SearchEmptyDataBeforLogin(searchdata = EmptySearch) {
  await gotoURL(URL);
  await fillAndEnter(search(), searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(emptytext(), searchdata.message);
}

export async function SearchValidDataAfterLogin(searchdata = ValidSearch) {
  await fillAndEnter(searchafterAfterlogin(), searchdata.value, { timeout: 5000 });
  await isElementVisible(ResultTable());
}

export async function SearchInvalidDataAfterLogin(searchdata = InValidSearchAfterLogin) {
  await fillAndEnter(searchafterAfterlogin(), searchdata.value, { timeout: 5000 });
  await waitForElementToBeStable(infotext());
  await expectElementToHaveText(infotext(), searchdata.message);
}

export async function SearchEmptyDataAfterLogin(searchdata = EmptySearch) {
  await fillAndEnter(searchafterAfterlogin(), searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(emptytext(), searchdata.message);
}
