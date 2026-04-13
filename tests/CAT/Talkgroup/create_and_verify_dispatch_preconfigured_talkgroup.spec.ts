import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Create and Verify Dispatch Preconfigured Talkgroup', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TG-012: Create Dispatch Preconfigured Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupPreconfigured('Dispatch', 'Dispatch_Preconfigured_TalkGroup');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_Preconfigured_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_Preconfigured_TalkGroup');
  });

  test('TG-013: Delete Dispatch Preconfigured Talkgroup', async ({ page }) => {
    await pageObj.visitTalkGroup();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_Preconfigured_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_Preconfigured_TalkGroup');

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
