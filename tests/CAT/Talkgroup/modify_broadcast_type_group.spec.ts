import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Modify Broadcast Type Talkgroup', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('TG-018: Create and Modify Broadcast Type Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Broadcast', 'Broadcast_Modify_TalkGroup');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Broadcast_Modify_TalkGroup');
    await pageObj.validateDisplayObj('Broadcast_Modify_TalkGroup');

    // Modify the broadcast talkgroup
    await pageObj.modifyTalkGroup();
  });

  test('TG-019: Delete Modified Broadcast Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Broadcast_Modify_TalkGroup');
    await pageObj.validateDisplayObj('Broadcast_Modify_TalkGroup');

    await pageObj.modifyTalkGroup();
    
    const deleteBtn = pageObj.getPage().locator('button:has-text("Delete"), [id*="delete"]').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      await pageObj.getPage().waitForTimeout(500);
      
      const confirmBtn = pageObj.getPage().locator('button:has-text("Yes"), button:has-text("OK")').first();
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
        await pageObj.getPage().waitForLoadState('networkidle');
      }
    }
  });
});
