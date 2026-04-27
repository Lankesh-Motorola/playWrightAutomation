# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: CAT\User_Set\verify_modify_deletion_user_set.spec.ts >> One Portal CAT - Verify Modify and Delete User Set >> US-007 Verify Modifying created Userset
- Location: tests\CAT\User_Set\verify_modify_deletion_user_set.spec.ts:15:7

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
  18  | // Generate unique OSM list name starting with OSM-
  19  | export function generateUniqueOSMListName(): string {
  20  |   const timestamp = Date.now();
  21  |   const randomId = Math.floor(Math.random() * 1000);
  22  |   return `OSM-AutoTest-${timestamp}-${randomId}`;
  23  | }
  24  | 
  25  | // Generate unique code for OSM messages
  26  | export function generateUniqueCode(): string {
  27  |   // const timestamp = Date.now();
  28  |   const randomId = Math.floor(Math.random() * 100);
  29  |   return `${randomId}`;
  30  | }
  31  | 
  32  | // Generate unique short message
  33  | export function generateUniqueShortMessage(): string {
  34  |   const timestamp = Date.now();
  35  |   const randomId = Math.floor(Math.random() * 1000);
  36  |   return `ShortMsg-${timestamp.toString().slice(-6)}-${randomId}`;
  37  | }
  38  | 
  39  | // Generate unique long message
  40  | export function generateUniqueLongMessage(): string {
  41  |   const timestamp = Date.now();
  42  |   const randomId = Math.floor(Math.random() * 1000);
  43  |   return `LongMessage-${timestamp.toString().slice(-6)}-${randomId}`;
  44  | }
  45  | 
  46  | export async function wcsrLogin(page: Page): Promise<void> {
  47  |   await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  48  | 
  49  |   // Assert login page is ready before interacting
  50  |   await expect(page.getByRole('button', { name: 'Sign On' })).toBeVisible({ timeout: 15_000 });
  51  | 
  52  |   // Use positional locators since the label is not ARIA-linked to the inputs
  53  |   await page.locator('input[name="username"]').first().fill(USERNAME);
  54  |   await page.locator('input[name="password"]').fill(PASSWORD);
  55  |   await page.getByRole('button', { name: 'Sign On' }).click();
  56  | 
  57  |   // Wait for post-login navigation to the home page
> 58  |   await page.waitForURL('**/wcsr/home**', { timeout: 60_000 });
      |              ^ Error: page.waitForURL: Test timeout of 60000ms exceeded.
  59  | }
  60  | 
  61  | 
  62  | export async function verifyInvalidExternalUserSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  63  |   await pageObj.getExternalUserBox().clear();
  64  |   await pageObj.getExternalUserBox().fill(name);
  65  |   await expect(page.locator('text=Search Value should be more than 2 chars')).toBeVisible({ timeout: 10_000 });
  66  | }
  67  | 
  68  | export async function verifyExternalUsrSearch(page: Page, pageObj: CATPage, name: string): Promise<void> {
  69  |   await pageObj.getExternalUserBox().clear();
  70  |   await pageObj.getExternalUserBox().fill(name);
  71  |   await expect(page.locator(`text=${name}`).first()).toBeVisible({ timeout: 10_000 });
  72  | }
  73  | 
  74  | export async function launchAndGetNewPageObject(context: BrowserContext, pageObj: CATPage, corporateID: string): Promise<CATPage> {
  75  |   // Click Corporate Management
  76  |   await pageObj.clickCorporateManagement();
  77  |   
  78  |   // Enter Corporate ID
  79  |   await pageObj.enterCorporateID(corporateID);
  80  |   
  81  |   // Set up listener for new tab BEFORE clicking launch
  82  |   const pagePromise = context.waitForEvent('page');
  83  |   await pageObj.clickLaunch();
  84  |   
  85  |   // Wait for the new tab to open
  86  |   const newPage = await pagePromise;
  87  |   await newPage.waitForLoadState();
  88  |   
  89  |   // Return new PageObject instance for the NEW TAB
  90  |   return new CATPage(newPage);
  91  | }
  92  | 
  93  | export async function setupOSMPage(page: Page, context: BrowserContext): Promise<CATPage> {
  94  |   await wcsrLogin(page);
  95  |   const pageObj = new CATPage(page);
  96  |   
  97  |   const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  98  |   await newPageObj.getPage().waitForLoadState();
  99  |   await newPageObj.openOSMPage().click();
  100 |   
  101 |   // Close popup if present
  102 |   const closeBtn = newPageObj.getPage().locator('.msi-pop-up-modal-header-close');
  103 |   const isVisible = await closeBtn.isVisible({ timeout: 3000 });
  104 |   if (isVisible) {
  105 |     await closeBtn.click();
  106 |     await newPageObj.getPage().waitForTimeout(1000);
  107 |   }
  108 |   
  109 |   return newPageObj;
  110 | }
  111 | 
  112 | export async function enterIntoApplication(page: Page, context: BrowserContext): Promise<CATPage> {
  113 |   await wcsrLogin(page);
  114 |   const pageObj = new CATPage(page);
  115 |   
  116 |   const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  117 |   await newPageObj.getPage().waitForLoadState();
  118 |   return newPageObj;
  119 | }
```