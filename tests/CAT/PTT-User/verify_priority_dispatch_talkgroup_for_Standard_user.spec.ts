import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Priority Dispatch Talkgroup', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_026: Create dispatch talkgroup
  test('TC_026 Create dispatch talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Dispatch');
  });

  // TC_027: Enable priority change
  test('TC_027 Enable priority change', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.changeTalkgroupScanPriorityForStandardUser('Dispatch');
    await page.waitForTimeout(7000);
  });

  // TC_028: Delete talkgroup
  test('TC_028 Delete talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.deleteTalkGroup();
  });
});
