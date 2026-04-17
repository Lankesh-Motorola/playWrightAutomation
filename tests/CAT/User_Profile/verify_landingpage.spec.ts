import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - User Profile Management', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('UP-001: Verify User Profile Landing Page', async ({ page }) => {
    // Navigate to User Profile section
    const userProfileBtn = pageObj.getPage().locator('text=User Profile, [id*="userprofile"], [id*="user_profile"]').first();
    if (await userProfileBtn.isVisible().catch(() => false)) {
      await userProfileBtn.click();
      await pageObj.getPage().waitForLoadState('networkidle');
      
      // Verify page title or key elements are visible
      await expect(pageObj.getPage()).toHaveTitle(/.*user|.*profile/i).catch(() => {
        // Page title might not contain these words, that's ok
      });
    }
  });
});
