import {
  expectElementToHaveText,
  fillAndEnter,
  getLocatorByText,
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

const searchbarBeforeLogin = '#welcome-search-input';
const searchbatafterAfterlogin = '#navbar-search-input';
const messageForEmptytext = () => getLocatorByText('Search query is empty');
const messageforlogintext = () => getLocatorByText('You must login to search private');
const messageforNoResult = () => getLocatorByText('no items found for this search');
const ResultTable = "(//div[@class='row'])[6]";

const URL = 'https://anaconda.org';

export async function SearchValidDataBeforLogin(searchdata = ValidSearch) {
  await gotoURL(URL);
  await fillAndEnter(searchbarBeforeLogin, searchdata.value, { timeout: 5000 });
  await isElementVisible(ResultTable);
}

export async function SearchInValidDataBeforLogin(searchdata = InValidSearchBeforLogin) {
  await gotoURL(URL);
  await fillAndEnter(searchbarBeforeLogin, searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(messageforlogintext(), searchdata.message);
}

export async function SearchEmptyDataBeforLogin(searchdata = EmptySearch) {
  await gotoURL(URL);
  await fillAndEnter(searchbarBeforeLogin, searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(messageForEmptytext(), searchdata.message);
}

export async function SearchValidDataAfterLogin(searchdata = ValidSearch) {
  await fillAndEnter(searchbatafterAfterlogin, searchdata.value, { timeout: 5000 });
  await isElementVisible(ResultTable);
}

export async function SearchInvalidDataAfterLogin(searchdata = InValidSearchAfterLogin) {
  await fillAndEnter(searchbatafterAfterlogin, searchdata.value, { timeout: 5000 });
  await waitForElementToBeStable(messageforNoResult());
  await expectElementToHaveText(messageforNoResult(), searchdata.message);
}

export async function SearchEmptyDataAfterLogin(searchdata = EmptySearch) {
  await fillAndEnter(searchbatafterAfterlogin, searchdata.value, { timeout: 5000 });
  await expectElementToHaveText(messageForEmptytext(), searchdata.message);
}
