import {
  MAX_TIMEOUT,
  click,
  clickAndNavigate,
  closePage,
  expectElementToBeVisible,
  expectElementToHaveText,
  fillAndEnter,
  getLocator,
  goBack,
  gotoURL,
  switchPage,
  switchToDefaultPage,
  waitForElementToBeStable,
} from 'vasu-playwright-utils';
import { Locator } from '@playwright/test';

const signIn = () => '//a[normalize-space()="Sign In"]';
const search = () => '#welcome-search-input';
const URL = 'https://anaconda.org';
const signinpage = "//h2[normalize-space()='Sign in to Anaconda.org']";

//header
const logo = "img[alt='Anaconda.org']";
const HeaderAbout = ".v2-link.v2-nav-item[href='https://www.anaconda.com/about-us']";
const HeaderAnaconda = ".v2-link.v2-nav-item[href='https://www.anaconda.com/pricing']";
const HeaderHelp = ".v2-link.v2-nav-item[href='https://docs.anaconda.com/free/anacondaorg/user-guide/']";
const HeaderDownloadAnaconda = ".v2-link.v2-nav-item[href='https://www.anaconda.com/download']";
const HeaderAnacondaCloud = "//a[normalize-space()='Anaconda.cloud']";

//main
const heading = () => getLocator('.v2-welcome-info-heading');
const summary = () => getLocator("div[class='v2-welcome-info-text'] strong");
const Datalist1 = () => getLocator('li:nth-child(1)');
const Datalist2 = () => getLocator('li:nth-child(2)');
const Datalist3 = () => getLocator('li:nth-child(3)');

//footer left panel
const footerLogo = "img[src='/static/img/anaconda-symbol.svg']";
const footertext = () => getLocator("//p[@class='footer-slogan']");

//social links
const facebook = "img[src='/static/img/social-icons/facebook-new.svg']";
/*const twiter = "img[src='/static/img/social-icons/twitter-new.svg']";
const linkdin= "img[src='/static/img/social-icons/linkedin-new.svg']";
const github = "img[src='/static/img/social-icons/github-new.svg']";
const insta = "img[src='/static/img/social-icons/instagram-new.svg']";
const youtube = "img[src='/static/img/social-icons/youtube-new.svg']";
*/
//Anaconda
const AbousUs = "//a[normalize-space()='About Us']";
const AnacondaCloud = "//a[normalize-space()='Anaconda Cloud']";
const DownloadAnaconda = "(//a[normalize-space()='Download Anaconda'])[2]";

//Anaconda.org
const About = "(//a[normalize-space()='About'])[1]";
/*
const Documentation = "body > footer:nth-child(3) > div:nth-child(1) > div:nth-child(3) > p:nth-child(2) > a:nth-child(3)";
const support = "a[href='https://anaconda.org/contact/report']";

//Community
const OpenSource = "(//a[normalize-space()='Open Source'])[1]";
const NumFocus = "//a[normalize-space()='NumFOCUS']";
const condaforge = "a[href='https://conda-forge.org']";
const blog = "a[href='https://www.anaconda.com/blog']";
*/

//license
const copywrite = () => getLocator('.licence-copyright');
const license = "(//*[@class='licence-policies']//a[@target='_blank'])[1]";
const policy = "a[href='https://www.anaconda.com/privacy-policy']";

//link verification in external links
const aboutTest = "h1[class='wp-block-heading has-pure-white-color has-text-color']";
const facebookcross = "div[aria-label='Close'] i[class='x1b0d499 x1d69dk1']";
const facebookheader = "h1[class='x1heor9g x1qlqyl8 x1pd3egz x1a2a7pz']";
const legaltext = "(//h1[normalize-space()='Anaconda.org Terms and Conditions'])[1]";
const privicytext = "h1[class='wp-block-heading']";
const anacondacloudtext = "//h1[normalize-space()='Welcome to Anaconda Cloud']";
const anacondadistribution = "//h1[normalize-space()='Free Download']";
const anacondaPricing = "//h1[normalize-space()='Plans and Pricing']";
const HelpTest = '//h1[1]';

export async function navigateToLoginPage() {
  await gotoURL(URL);
  await clickAndNavigate(signIn());
  await expectElementToBeVisible(signinpage);
}

export async function navigateToSearchPage() {
  await gotoURL(URL);
  await fillAndEnter(search(), '', { timeout: 5000 });
}

export async function verifyFooter() {
  await gotoURL(URL);
  await expectElementToBeVisible(footerLogo);
  await expectElementToHaveText(footertext(), 'By data scientists, for data scientists');
  await expectElementToHaveText(copywrite(), '© 2024 Anaconda, Inc. All Rights Reserved. (v3.0.3)');

  await click(facebook);
  await switchPage(2);
  await click(facebookcross);
  await expectElementToBeVisible(facebookheader);
  await closePage();
  await switchToDefaultPage();
  /* ================================ can be automate using API ==================
  await click(twiter);
  await click(linkdin);
  await click(github);
  await click(insta);
  await click(youtube);
  */
  await click(policy);
  await switchPage(2);
  await expectElementToBeVisible(privicytext);
  await closePage();
  await switchToDefaultPage();

  await waitForElementToBeStable(license);
  await click(license);
  await switchPage(2);
  await expectElementToBeVisible(legaltext);
  await closePage();
  await switchToDefaultPage();
}

export async function verifyFooterlinks() {
  await gotoURL(URL);
  await clickAndNavigate(AbousUs);
  await expectElementToBeVisible(aboutTest);
  await goBack();

  await click(AnacondaCloud);
  await switchPage(2);
  await expectElementToBeVisible(anacondacloudtext);
  await closePage();
  await switchToDefaultPage();

  await click(DownloadAnaconda);
  await switchPage(2);
  await expectElementToBeVisible(anacondadistribution);
  await closePage();
  await switchToDefaultPage();

  await clickAndNavigate(About);
  await expectElementToBeVisible(aboutTest);
  await goBack();

  /* ================================ can be automate using API ==================
  await click(Documentation);
  await click(support);
  await click(OpenSource);
  await click(NumFocus);
  await click(condaforge);
  await click(blog);
  */
}

export async function verifyMenuHeader(headerMenu: string | Locator, headerText: string | Locator) {
  await click(headerMenu);
  await switchPage(2);
  await expectElementToBeVisible(headerText);
  await closePage();
  await switchToDefaultPage();
}

export async function verifyAllmenuHeaders() {
  await gotoURL(URL, { timeout: MAX_TIMEOUT });
  await expectElementToBeVisible(logo);
  await click(logo);

  await verifyMenuHeader(HeaderAbout, aboutTest);
  await verifyMenuHeader(HeaderAnaconda, anacondaPricing);
  await verifyMenuHeader(HeaderHelp, HelpTest);
  await verifyMenuHeader(HeaderDownloadAnaconda, anacondadistribution);
  await verifyMenuHeader(HeaderAnacondaCloud, anacondacloudtext);
}

export async function UI() {
  await gotoURL(URL, { timeout: MAX_TIMEOUT });
  await expectElementToHaveText(
    heading(),
    'Anaconda.org allows anyone to distribute their conda and standard Python packages to the world.',
  );
  await expectElementToHaveText(summary(), 'We support package builders and their users:');
  await expectElementToHaveText(Datalist1(), 'Individuals and organizations can manage and distribute software');
  await expectElementToHaveText(
    Datalist2(),
    'Easy search and installation of packages from conda-forge, Bioconda, PyTorch, and more',
  );
  await expectElementToHaveText(Datalist3(), 'Over 120 million packages requests every day');
}
