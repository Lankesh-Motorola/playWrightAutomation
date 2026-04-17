import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Verify Updated Call Permission for Standard Talkgroup', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('TG-028: Create and Modify Call Permission for Standard Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();

    // Check if standard talkgroup exists, if not create it
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_CallPerm_TalkGroup');
    
    let exists = await pageObj.getPage().locator('text=Standard_CallPerm_TalkGroup').isVisible().catch(() => false);
    
    if (!exists) {
      await pageObj.createTalkGroupAndAddUser('Standard', 'Standard_CallPerm_TalkGroup');
    }

    // Verify and modify call permission
    await pageObj.validateDisplayObj('Standard_CallPerm_TalkGroup');
    await pageObj.modifyTalkGroup();
  });

  test('TG-029: Delete Standard Talkgroup with Modified Permissions', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_CallPerm_TalkGroup');
    await pageObj.validateDisplayObj('Standard_CallPerm_TalkGroup');

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
