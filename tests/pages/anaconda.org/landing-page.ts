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
} from 'vasu-playwright-utils';
import { Locator } from '@playwright/test';

const signIn = '//a[normalize-space()="Sign In"]';
const search = '#welcome-search-input';
const URL = 'https://anaconda.org';
const signinpage = `//h2[normalize-space()='Sign in to Anaconda.org']`;

//header
const logo = `img[alt='Anaconda.org']`;
const HeaderAbout = `.v2-link.v2-nav-item[href='https://www.anaconda.com/about-us']`;
const HeaderAnaconda = `.v2-link.v2-nav-item[href='https://www.anaconda.com/pricing']`;
const HeaderHelp = `.v2-link.v2-nav-item[href='https://docs.anaconda.com/free/anacondaorg/user-guide/']`;
const HeaderDownloadAnaconda = `.v2-link.v2-nav-item[href='https://www.anaconda.com/download']`;
const HeaderAnacondaCloud = `.v2-link.v2-accent[href='https://anaconda.cloud/?utm_source=anacondaorg']`;

//main
const heading = () => getLocator('.v2-welcome-info-heading');
const summary = () => getLocator(`div[class='v2-welcome-info-text'] strong`);
const Datalist1 = () => getLocator('li:nth-child(1)');
const Datalist2 = () => getLocator('li:nth-child(2)');
const Datalist3 = () => getLocator('li:nth-child(3)');

//footer left panel
const footerLogo = `img[src='/static/img/anaconda-symbol.svg']`;
const footertext = () => getLocator(`//p[@class='footer-slogan']`);

//social links
const facebook = `img[src='/static/img/social-icons/facebook-new.svg']`;
/*const twiter = "img[src='/static/img/social-icons/twitter-new.svg']";
const linkdin= "img[src='/static/img/social-icons/linkedin-new.svg']";
const github = "img[src='/static/img/social-icons/github-new.svg']";
const insta = "img[src='/static/img/social-icons/instagram-new.svg']";
const youtube = "img[src='/static/img/social-icons/youtube-new.svg']";
*/
//Anaconda
const AbousUs = `//a[normalize-space()='About Us']`;
const AnacondaCloud = `//a[normalize-space()='Anaconda Cloud']`;
const DownloadAnaconda = `(//a[normalize-space()='Download Anaconda'])[2]`;

//Anaconda.org
const About = `(//a[normalize-space()='About'])[2]`;
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
const license = `(//*[@class='licence-policies']//a[@target='_blank'])[1]`;
const policy = `a[href='https://www.anaconda.com/privacy-policy']`;

//link verification in external links
const pageAboutusText = `//h1[contains(text(),'We’re not just a company; we’re a movement.')]`;
const pagefacebookheadertext = `h1[class='x1heor9g x1qlqyl8 x1pd3egz x1a2a7pz']`;
const pageLegaltext = `(//h1[normalize-space()='Anaconda.org Terms and Conditions'])[1]`;
const pagePrivicytext = `h1[class='wp-block-heading']`;
const pageAnacondacloudtext = `//h1[normalize-space()='Welcome to Anaconda Cloud']`;
const pageAnacondadistributiontext = `//h1[normalize-space()='Free Download']`;
const pageAnacondaPricingtext = `//h1[normalize-space()='Plans and Pricing']`;
const pageHelpTest = '//h1';

//===================================================== Function =======================================
export async function navigateToLandingPage() {
  await gotoURL(URL, { timeout: MAX_TIMEOUT });
}

export async function navigateToLoginPage() {
  await navigateToLandingPage();
  await clickAndNavigate(signIn);
  await expectElementToBeVisible(signinpage);
}

export async function navigateToSearchPage() {
  await navigateToLandingPage();
  await fillAndEnter(search, '', { timeout: 5000 });
}

//================================= External Links Navigation Method ====================================//
export async function verifyExternalLinks(menuItem: string | Locator, itemText: string | Locator) {
  await click(menuItem);
  await switchPage(2);
  await expectElementToBeVisible(itemText);
  await closePage();
  await switchToDefaultPage();
}

//================================= Internal Links Navigation Method ====================================//
export async function verifyInternalLinks(menuItem: string | Locator, itemText: string | Locator) {
  await clickAndNavigate(menuItem);
  await expectElementToBeVisible(itemText);
  await goBack();
}

export async function verifyFooter() {
  await expectElementToBeVisible(footerLogo);
  await expectElementToHaveText(footertext(), 'By data scientists, for data scientists');
  await expectElementToHaveText(copywrite(), '© 2024 Anaconda, Inc. All Rights Reserved. (v3.0.3)');
  //=================================Footer Links====================================
  await verifyInternalLinks(AbousUs, pageAboutusText);
  await verifyExternalLinks(AnacondaCloud, pageAnacondacloudtext);
  await verifyExternalLinks(DownloadAnaconda, pageAnacondadistributiontext);
  await verifyInternalLinks(About, pageAboutusText);
  /* ================================ can be automate using API ==================
  await click(Documentation);
  await click(support);
  await click(OpenSource);
  await click(NumFocus);
  await click(condaforge);
  await click(blog);
  */
  await verifyExternalLinks(facebook, pagefacebookheadertext);
  /* ================================ can be automate using API ==================
  await click(twiter);
  await click(linkdin);
  await click(github);
  await click(insta);
  await click(youtube);
  */
  await verifyExternalLinks(policy, pagePrivicytext);
  await verifyExternalLinks(license, pageLegaltext);
}

export async function verifyAllmenuHeaders() {
  await expectElementToBeVisible(logo);
  await click(logo);
  await verifyExternalLinks(HeaderAbout, pageAboutusText);
  await verifyExternalLinks(HeaderAnaconda, pageAnacondaPricingtext);
  await verifyExternalLinks(HeaderHelp, pageHelpTest);
  await verifyExternalLinks(HeaderDownloadAnaconda, pageAnacondadistributiontext);
  await verifyExternalLinks(HeaderAnacondaCloud, pageAnacondacloudtext);
}
export async function UI() {
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
