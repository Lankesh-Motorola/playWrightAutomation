# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CAT\User_Set\verify_assign_user_set.spec.ts >> One Portal CAT - Verify Assign User Set >> US-03 Verify assiging user Sets to the Users
- Location: tests\CAT\User_Set\verify_assign_user_set.spec.ts:15:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/wcsr/home**" until "load"
============================================================
```

# Test source

```ts
  1   | import { Page, BrowserContext, expect } from '@playwright/test';
  2   | import { CATPage } from '../pages/CATPage';
  3   | 
  4   | // //15.0 CI Login Credentials
  5   | const LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/login';
  6   | const POST_LOGIN_URL = 'https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
  7   | const USERNAME = 'wcsr_automation@moto.com';
  8   | const PASSWORD = 'Motorola@123';
  9   | export const corp_id = 'WCSR_AUTO_1';
  10  | 
  11  | // 14.0 CI Login Credentials
  12  | // const LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/login';
  13  | // const POST_LOGIN_URL = 'https://wms-dev-cirhel8.msiidcitgcloud.com/csrkodiak/index.html#/wcsr/home';
  14  | // const USERNAME = 'ciwcsr4@gmail.com';
  15  | // const PASSWORD = 'Kodiak@1234567890';
  16  | // export const corp_id = '140_CI_Automation';
  17  | 
  18  | // CSRK
  19  | // const LOGIN_URL = 'https://wms-multisite.kodiakindmedia.com/csrkodiak/login';
  20  | // const POST_LOGIN_URL = 'https://wms-multisite.kodiakindmedia.com/csrkodiak/index.html#/wcsr/home';
  21  | // const USERNAME = 'mcx@msi.com';
  22  | // const PASSWORD = 'MotorolaKodiak@2026';
  23  | // export const corp_id = 'Multi-Site-2U';
  24  | 
  25  | 
  26  | // Generate unique OSM list name starting with OSM-
  27  | export function generateUniqueOSMListName(): string {
  28  |   const timestamp = Date.now();
  29  |   const randomId = Math.floor(Math.random() * 1000);
  30  |   return `OSM-AutoTest-${timestamp}-${randomId}`;
  31  | }
  32  | 
  33  | // Generate unique code for OSM messages
  34  | export function generateUniqueCode(): string {
  35  |   // const timestamp = Date.now();
  36  |   const randomId = Math.floor(Math.random() * 100);
  37  |   return `${randomId}`;
  38  | }
  39  | 
  40  | // Generate unique short message
  41  | export function generateUniqueShortMessage(): string {
  42  |   const timestamp = Date.now();
  43  |   const randomId = Math.floor(Math.random() * 1000);
  44  |   return `ShortMsg-${timestamp.toString().slice(-6)}-${randomId}`;
  45  | }
  46  | 
  47  | // Generate unique long message
  48  | export function generateUniqueLongMessage(): string {
  49  |   const timestamp = Date.now();
  50  |   const randomId = Math.floor(Math.random() * 1000);
  51  |   return `LongMessage-${timestamp.toString().slice(-6)}-${randomId}`;
  52  | }
  53  | 
  54  | export async function wcsrLogin(page: Page): Promise<void> {
  55  |   await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  56  | 
  57  |   // Assert login page is ready before interacting
  58  |   await expect(page.getByRole('button', { name: 'Sign On' })).toBeVisible({ timeout: 15_000 });
  59  | 
  60  |   // Use positional locators since the label is not ARIA-linked to the inputs
  61  |   await page.locator('input[name="username"]').first().fill(USERNAME);
  62  |   await page.locator('input[name="password"]').fill(PASSWORD);
  63  |   await page.getByRole('button', { name: 'Sign On' }).click();
  64  | 
  65  |   // Wait for post-login navigation to the home page
> 66  |   await page.waitForURL('**/wcsr/home**', { timeout: 60_000 });
      |              ^ Error: page.waitForURL: Test timeout of 60000ms exceeded.
  67  | }
  68  | 
  69  | 
  70  | export async function verifyInvalidExternalUserSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  71  |   await pageObj.getExternalUserBox().clear();
  72  |   await pageObj.getExternalUserBox().fill(name);
  73  |   await expect(page.locator('text=Search Value should be more than 2 chars')).toBeVisible({ timeout: 10_000 });
  74  | }
  75  | 
  76  | export async function verifyExternalUsrSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  77  |   await pageObj.getExternalUserBox().clear();
  78  |   await pageObj.getExternalUserBox().fill(name);
  79  |   await expect(page.locator(`text=${name}`).first()).toBeVisible({ timeout: 10_000 });
  80  | }
  81  | 
  82  | export async function launchAndGetNewPageObject(context: BrowserContext, pageObj: CATPage, corporateID: string): Promise<CATPage> {
  83  |   // Click Corporate Management
  84  |   await pageObj.clickCorporateManagement();
  85  |   
  86  |   // Enter Corporate ID
  87  |   await pageObj.enterCorporateID(corporateID);
  88  |   
  89  |   // Set up listener for new tab BEFORE clicking launch
  90  |   const pagePromise = context.waitForEvent('page');
  91  |   await pageObj.clickLaunch();
  92  |   
  93  |   // Wait for the new tab to open
  94  |   const newPage = await pagePromise;
  95  |   await newPage.waitForLoadState();
  96  |   
  97  |   // Return new PageObject instance for the NEW TAB
  98  |   return new CATPage(newPage);
  99  | }
  100 | 
  101 | export async function setupOSMPage(page: Page, context: BrowserContext): Promise<CATPage> {
  102 |   await wcsrLogin(page);
  103 |   const pageObj = new CATPage(page);
  104 |   
  105 |   const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  106 |   await newPageObj.getPage().waitForLoadState();
  107 |   await newPageObj.openOSMPage().click();
  108 |   
  109 |   // Close popup if present
  110 |   const closeBtn = newPageObj.getPage().locator('.msi-pop-up-modal-header-close');
  111 |   const isVisible = await closeBtn.isVisible({ timeout: 3000 });
  112 |   if (isVisible) {
  113 |     await closeBtn.click();
  114 |     await newPageObj.getPage().waitForTimeout(1000);
  115 |   }
  116 |   
  117 |   return newPageObj;
  118 | }
  119 | 
  120 | export async function enterIntoApplication(page: Page, context: BrowserContext): Promise<CATPage> {
  121 |   await wcsrLogin(page);
  122 |   const pageObj = new CATPage(page);
  123 |   
  124 |   const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  125 |   await newPageObj.getPage().waitForLoadState();
  126 |   return newPageObj;
  127 | }
```