import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Broadcast Talkgroup Zone', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_050: Create Broadcast Talk Group with assigning the Radio type User
  test('TC_050 Create Broadcast Talk Group with assigning the Radio type User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Broadcast');
  });

  // TC_051: Verify zone(N/A) for Broadcast Talk Group of Radio User
  test('TC_051 Verify zone(N/A) for Broadcast Talk Group of Radio User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    await pageObj.getTalkgrpInPTTUser();
    
    // Check for Zone = N/A
    const zoneCell = pageObj.getTableData(3);
    await pageObj.checkVisibility(zoneCell);
    const zoneText = await zoneCell.textContent();
    expect(zoneText).toContain('N/A');
    
    // Check for Position = N/A
    const positionCell = pageObj.getTableData(4);
    await pageObj.checkVisibility(positionCell);
    const positionText = await positionCell.textContent();
    expect(positionText).toContain('N/A');
  });

  // TC_052: Delete talkgroup
  test('TC_052 Delete talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.deleteTalkGroup();
  });
});
