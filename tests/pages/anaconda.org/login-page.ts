import {
  click,
  clickAndNavigate,
  expectElementToBeVisible,
  fill,
  getLocatorByRole,
  getLocatorByText,
} from 'vasu-playwright-utils';
import { InValidLogin, ValidLogin } from '@testdata/sauce-anaconda.org-test-data';

const userName = '#username';
const password = '#password';
const loginButton = '#logInButton';
const errorMessage = () => getLocatorByText('Could not log you in');
const dashboardMessage = () => getLocatorByRole('heading', { name: 'My Anaconda Landscape' });

//===================================================== Function =======================================
export async function loginWithValidCredentials(validCredentials = ValidLogin) {
  await fill(userName, validCredentials.username);
  await fill(password, validCredentials.password);
  await clickAndNavigate(loginButton);
  await expectElementToBeVisible(dashboardMessage());
}

export async function loginWithInvalidCredentials(invalidCredentials = InValidLogin) {
  await fill(userName, invalidCredentials.username);
  await fill(password, invalidCredentials.password);
  await click(loginButton);
  await expectElementToBeVisible(errorMessage());
}
