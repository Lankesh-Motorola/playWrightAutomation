import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Modify Dispatch Type Talkgroup', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TG-016: Create and Modify Dispatch Type Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Dispatch', 'Dispatch_Modify_TalkGroup');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_Modify_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_Modify_TalkGroup');

    // Modify the dispatch talkgroup
    await pageObj.modifyTalkGroup();
  });

  test('TG-017: Delete Modified Dispatch Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_Modify_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_Modify_TalkGroup');

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
