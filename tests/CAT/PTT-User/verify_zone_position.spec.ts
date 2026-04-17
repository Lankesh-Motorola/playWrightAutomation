import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Zone Position Verification', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_037: Create Broadcast Talk Group with assigning the Radio type User
  test('TC_037 Create Broadcast Talk Group with assigning the Radio type User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Broadcast');
  });

  // TC_038: Verify assigning Zone and channels
  test('TC_038 Verify assigning Zone and channels', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

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

  // TC_039: Modify Zone and channels and Verify modified zones and channels
  test('TC_039 Modify Zone and channels and Verify modified zones and channels', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    await pageObj.getTalkgrpInPTTUser();
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('1');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('2');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '2');
  });

  // TC_040: Verify assigning Priorities
  test('TC_040 Verify assigning Priorities', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.checkNotEnabled(pageObj.getTLKGrpScan());
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('2');
    await pageObj.changeTalkgrpPriorityForRadioUser('Priority 1');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '2', 'Priority 1');
  });

  // TC_041: Delete talkgroup
  test('TC_041 Delete talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.deleteTalkGroup();
  });
});
