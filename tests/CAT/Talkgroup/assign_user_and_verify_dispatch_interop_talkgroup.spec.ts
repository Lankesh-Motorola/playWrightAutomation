import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Assign User and Verify Dispatch InterOp Talkgroup', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('TG-038: Create and Assign User to Dispatch InterOp Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    // Create dispatch interop talkgroup with user assignment
    await pageObj.createTalkGroupAndAddUser('Dispatch', 'Dispatch_InterOp_Assign_TalkGroup', 'Interop_User');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_InterOp_Assign_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_InterOp_Assign_TalkGroup');

    // Verify InterOp checkbox for assignment
    await pageObj.validateCount();
  });

  test('TG-039: Delete Dispatch InterOp Talkgroup with Assignment', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_InterOp_Assign_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_InterOp_Assign_TalkGroup');

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
