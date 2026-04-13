import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Priority Broadcast Talkgroup', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_034: Create broadcast talkgroup
  test('TC_034 Create broadcast talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Broadcast');
  });

  // TC_035: Verify priority change
  test('TC_035 Verify priority change', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.changeTalkgroupScanPriorityForStandardUser('Broadcast');
    await page.waitForTimeout(7000);
  });

  // TC_036: Delete talkgroup
  test('TC_036 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup();
  });
});
