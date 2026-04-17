import { Page, BrowserContext, expect } from '@playwright/test';
import { CATPage } from '../pages/CATPage';

// //15.0 CI Login Credentials
// const LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/login';
// const POST_LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
// const USERNAME = 'wcsr_automation@moto.com';
// const PASSWORD = 'Motorola@123';
// export const corp_id = 'WCSR_AUTO_1';

// //14.0 CI Login Credentials
const LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/login';
const POST_LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
const USERNAME = 'ciwcsr4@gmail.com';
const PASSWORD = 'Kodiak@1234567890';
export const corp_id = '140_CI_Automation';

export async function wcsrLogin(page: Page): Promise<void> {
  await page.goto(LOGIN_URL, { waitUntil: 'commit', timeout: 60_000 });
  await expect(page.locator("input[name='username']")).toBeVisible({ timeout: 30_000 });
  await page.locator("input[name='username']").fill(USERNAME);
  await page.locator("input[name='password']").fill(PASSWORD);
  
  // Wait for navigation with networkidle to handle SPA routing
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 60_000 }),
    page.locator("button[title='Sign On']").click()
  ]);
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
  // 1. Setup navigation steps
  await pageObj.clickCorporateManagement();
  await pageObj.enterCorporateID(corporateID);
  
  // 2. Setup the listener
  const pagePromise = context.waitForEvent('page');
  
  // 3. Trigger the action that opens the new tab
  await pageObj.clickLaunch();
  
  // 4. Capture and wait for the new page
  const newPage = await pagePromise;

  // IMPORTANT: Wait for 'networkidle' to ensure APIs are done loading 
  // and 'domcontentloaded' to ensure the HTML is parsed.
  await newPage.waitForLoadState('domcontentloaded');
  await newPage.waitForLoadState('networkidle');

  // 5. Ensure the new page is focused
  await newPage.bringToFront();
  
  // 6. Return initialized instance
  return new CATPage(newPage);
}
