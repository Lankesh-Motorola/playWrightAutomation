import { Page, BrowserContext, expect } from '@playwright/test';
import { CATPage } from '../pages/CATPage';

// // //15.0 CI Login Credentials
// const LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/login';
// const POST_LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
// const USERNAME = 'wcsr_automation@moto.com';
// const PASSWORD = 'Motorola@123';
// export const corp_id = 'WCSR_AUTO_1';

// 14.0 CI Login Credentials
// const LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/login';
// const POST_LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
// const USERNAME = 'ciwcsr4@gmail.com';
// const PASSWORD = 'Kodiak@1234567890';
// export const corp_id = '140_CI_Automation';

// CSRK
const LOGIN_URL = 'https://wms-multisite.kodiakindmedia.com/csrkodiak/login';
const POST_LOGIN_URL = 'https://wms-multisite.kodiakindmedia.com/csrkodiak/index.html#/wcsr/home';
const USERNAME = 'mcx@msi.com';
const PASSWORD = 'MotorolaKodiak@2026';
export const corp_id = 'Multi-Site-2U';


// Generate unique OSM list name starting with OSM-
export function generateUniqueOSMListName(): string {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 1000);
  return `OSM-AutoTest-${timestamp}-${randomId}`;
}

// Generate unique code for OSM messages
export function generateUniqueCode(): string {
  // const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 100);
  return `${randomId}`;
}

// Generate unique short message
export function generateUniqueShortMessage(): string {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 1000);
  return `ShortMsg-${timestamp.toString().slice(-6)}-${randomId}`;
}

// Generate unique long message
export function generateUniqueLongMessage(): string {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 1000);
  return `LongMessage-${timestamp.toString().slice(-6)}-${randomId}`;
}

export async function wcsrLogin(page: Page): Promise<void> {
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });

  // Assert login page is ready before interacting
  await expect(page.getByRole('button', { name: 'Sign On' })).toBeVisible({ timeout: 15_000 });

  // Use positional locators since the label is not ARIA-linked to the inputs
  await page.locator('input[name="username"]').first().fill(USERNAME);
  await page.locator('input[name="password"]').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign On' }).click();

  // Wait for post-login navigation to the home page
  await page.waitForURL('**/wcsr/home**', { timeout: 60_000 });
}


export async function verifyInvalidExternalUserSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  await pageObj.getExternalUserBox().clear();
  await pageObj.getExternalUserBox().fill(name);
  await expect(page.locator('text=Search Value should be more than 2 chars')).toBeVisible({ timeout: 10_000 });
}

export async function verifyExternalUsrSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  await pageObj.getExternalUserBox().clear();
  await pageObj.getExternalUserBox().fill(name);
  await expect(page.locator(`text=${name}`).first()).toBeVisible({ timeout: 10_000 });
}

export async function launchAndGetNewPageObject(context: BrowserContext, pageObj: CATPage, corporateID: string): Promise<CATPage> {
  // Click Corporate Management
  await pageObj.clickCorporateManagement();
  
  // Enter Corporate ID
  await pageObj.enterCorporateID(corporateID);
  
  // Set up listener for new tab BEFORE clicking launch
  const pagePromise = context.waitForEvent('page');
  await pageObj.clickLaunch();
  
  // Wait for the new tab to open
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  
  // Return new PageObject instance for the NEW TAB
  return new CATPage(newPage);
}

export async function setupOSMPage(page: Page, context: BrowserContext): Promise<CATPage> {
  await wcsrLogin(page);
  const pageObj = new CATPage(page);
  
  const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  await newPageObj.getPage().waitForLoadState();
  await newPageObj.openOSMPage().click();
  
  // Close popup if present
  const closeBtn = newPageObj.getPage().locator('.msi-pop-up-modal-header-close');
  const isVisible = await closeBtn.isVisible({ timeout: 3000 });
  if (isVisible) {
    await closeBtn.click();
    await newPageObj.getPage().waitForTimeout(1000);
  }
  
  return newPageObj;
}

export async function enterIntoApplication(page: Page, context: BrowserContext): Promise<CATPage> {
  await wcsrLogin(page);
  const pageObj = new CATPage(page);
  
  const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  await newPageObj.getPage().waitForLoadState();
  return newPageObj;
}