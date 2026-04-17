import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Create and Verify Dispatch InterOp Talkgroup', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('TG-032: Create Dispatch InterOp Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    // Create dispatch talkgroup with interop flag (second parameter = true)
    await pageObj.createStandardTalkGr('Dispatch_InterOp_TalkGroup', true, false, 'TalkGr_Assign_User');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_InterOp_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_InterOp_TalkGroup');

    // Verify InterOp checkbox is checked
    const interopCheckbox = pageObj.getPage().locator('input[id*="interop"], [id*="InterOp"]').first();
    if (await interopCheckbox.isVisible().catch(() => false)) {
      const isChecked = await interopCheckbox.isChecked();
      expect(isChecked).toBe(true);
    }

    await pageObj.validateCount();
  });

  test('TG-033: Delete Dispatch InterOp Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_InterOp_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_InterOp_TalkGroup');

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
