import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Priority Standard Talkgroup', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_029: Create standard talkgroup
  test('TC_029 Create standard talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.createStandardTalkGr();
  });

  // TC_030: Enable priority change
  test('TC_030 Enable priority change', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.changeTalkgroupScanPriorityForStandardUser('Standard');
  });

  // TC_031: Modify priority change
  test('TC_031 Modify priority change', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_TalkGroup');
    await page.waitForTimeout(3000);

    // Select priority dropdown and change to priority 2
    const dropdowns = pageObj.getDropDown();
    await pageObj.clickEvent(dropdowns.nth(4));
    await pageObj.clickEvent(pageObj.getPreferredSelection(2));
    await pageObj.clickEvent(pageObj.getSaveButton());
  });

  // TC_032: Reverting priority change
  test('TC_032 Reverting priority change', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_TalkGroup');
    await page.waitForTimeout(3000);

    // Set to no priority
    const dropdowns = pageObj.getDropDown();
    await pageObj.clickEvent(dropdowns.nth(4));
    await pageObj.clickEvent(pageObj.getPreferredSelection(1));
    
    // Disable talkgroup scan
    await pageObj.clickEvent(pageObj.getTLKGrpScan());
    await pageObj.clickEvent(pageObj.getSaveButton());
  });

  // TC_033: Delete talkgroup
  test('TC_033 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup();
  });
});
