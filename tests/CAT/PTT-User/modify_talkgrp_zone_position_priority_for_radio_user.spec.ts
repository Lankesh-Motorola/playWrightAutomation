import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Modify Talkgroup Zone Position Priority', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_042: Create Standard Talk Group with assigning the Radio type User
  test('TC_042 Create Standard Talk Group with assigning the Radio type User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.createStandardTalkGr();
  });

  // TC_043: Verify Modifying Priorities for Radio type User
  test('TC_043 Verify Modifying Priorities for Radio type User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    await pageObj.getTalkgrpInPTTUser();
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('2');
    await pageObj.changeTalkgrpPriorityForRadioUser('Priority 1');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '2', 'Priority 1');
    
    await pageObj.changeTalkgrpPriorityForRadioUser('Priority 2');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '2', 'Priority 2');
  });

  // TC_044: Modify Zone, Channels and priorities for Radio type User
  test('TC_044 Modify Zone Channels and priorities for Radio type User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '2', 'Priority 2');
    
    await pageObj.changeTalkgrpZoneForRadioUser('1');
    await pageObj.changeTalkgrpPositionForRadioUser('3');
    await pageObj.changeTalkgrpPriorityForRadioUser('Priority 3');
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '3', 'Priority 3');
  });

  // TC_045: Verify Reverting Zone, Position and priority values for Radio type User
  test('TC_045 Verify Reverting Zone Position and priority values for Radio type User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('1', '3', 'Priority 3');
    
    await pageObj.changeTalkgrpZoneForRadioUser('not assigned');
    await pageObj.clickEvent(pageObj.getTLKGrpScan());
    await pageObj.clickEvent(pageObj.getSaveButton());
    
    await pageObj.forceClickEvent(pageObj.getCancelButton());
    await pageObj.forceClickEvent(pageObj.getEditBtn());
    await pageObj.getTalkgrpInPTTUser();
    await pageObj.verifyTalkgrpZonePosPriorityForRadioUser('not assigned', 'not assigned', 'Not in Scan List');
  });

  // TC_046: Delete talkgroup
  test('TC_046 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup();
  });
});
