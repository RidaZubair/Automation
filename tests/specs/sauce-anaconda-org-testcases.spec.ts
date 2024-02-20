import { test } from '@pagesetup';
import * as LoginPage from '../pages/anaconda.org/login-page';
import * as dashboad from '../pages/anaconda.org/dashboard';
import * as landing from '../pages/anaconda.org/landing-page';
import * as search from '../pages/anaconda.org/search';
import * as packages from '../pages/anaconda.org/package';

/*
 To run the tests in parallel, you can utilize the test.describe.configure() method to set the mode to 'parallel'.
 By default, the tests will run sequentially when fullyParallel: false is set in playwright.config.
 The tests will not be skipped upon encountering a failure expect when the mode is set to 'serial'.
*/
//=================================================== Login testcase ========================================//
test.describe('Test login cases @Regression', () => {
  test('Successful login will move to dashboad Page', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    await dashboad.verifyDashboard();
  });

  test('Error message is displayed and dashboad page is not displayed on failed login', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithInvalidCredentials();
  });

  test('view in dashboad Page', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    await dashboad.verifyViewDropdown();
  });
});

//=================================================== Landing page UI testcase ========================================//
test.describe('Landing page UI verification @Regression', () => {
  test('Verify Header', async () => {
    await landing.verifyHeader();
  });

  test('Verify footer', async () => {
    await landing.verifyFooter();
    await landing.verifyFooterlinks();
  });

  test('Testing UI', async () => {
    await landing.UI();
  });
});

//=================================================== Search testcase ========================================//
test.describe('search cases @Regression', () => {
  test('Testing invalid search before login', async () => {
    await search.SearchInValidDataBeforLogin();
  });

  test('Testing empty search before login', async () => {
    await search.SearchEmptyDataBeforLogin();
  });

  test('Testing valid search before login', async () => {
    await search.SearchValidDataBeforLogin();
  });

  test('Testing invalid search after login', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    await search.SearchInvalidDataAfterLogin();
  });

  test('Testing empty search after login', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    await search.SearchEmptyDataAfterLogin();
  });

  test('Testing valid search after login', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    await search.SearchValidDataAfterLogin();
  });
});

//=================================================== packages testcase ========================================//
test.describe('packages @Regression', () => {
  test('Testing checkbox', async () => {
    await landing.navigateToLoginPage();
    await LoginPage.loginWithValidCredentials();
    packages.selectcheckbox;
  });
});
