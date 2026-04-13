import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Dispatch Talkgroup Zone Position', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_047: Create Dispatch Talk Group with assigning the Radio type User
  test('TC_047 Create Dispatch Talk Group with assigning the Radio type User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Dispatch');
  });

  // TC_048: Verify Zone and channels for Dispatch Talk Group of Radio User
  test('TC_048 Verify Zone and channels for Dispatch Talk Group of Radio User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.checkVisibility(pageObj.getTLKGrpScan());
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('1');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '1');
  });

  // TC_049: Delete talkgroup
  test('TC_049 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup();
  });
});
