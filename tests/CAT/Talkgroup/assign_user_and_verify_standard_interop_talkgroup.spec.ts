import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Assign User and Verify Standard InterOp Talkgroup', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TG-036: Create and Assign User to Standard InterOp Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    // Create standard interop talkgroup with user assignment
    await pageObj.createTalkGroupAndAddUser('Standard', 'Standard_InterOp_Assign_TalkGroup', 'Interop_User');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_InterOp_Assign_TalkGroup');
    await pageObj.validateDisplayObj('Standard_InterOp_Assign_TalkGroup');

    // Verify InterOp checkbox for assignment
    await pageObj.validateCount();
  });

  test('TG-037: Delete Standard InterOp Talkgroup with Assignment', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_InterOp_Assign_TalkGroup');
    await pageObj.validateDisplayObj('Standard_InterOp_Assign_TalkGroup');

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
