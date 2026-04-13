import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create and Verify Standard Talkgroup', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // TG-002: Create Standard TalkGroup
  test('TG-002 Create Standard TalkGroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    // Create standard talkgroup with assigned user
    await pageObj.createStandardTalkGr('TalkGr_Name', false, false, 'TalkGr_Assign_User');

    // Search for created talk group
    await pageObj.verifySearch('TalkGr_Name');

    // Validate count
    await pageObj.validateCount();

    // Validate group name display
    await pageObj.validateDisplayObj('TalkGr_Name');

    // Modify talkgroup
    await pageObj.modifyTalkGroup('Standard', 'TalkGr_Name');
  });

  // TG-003: Delete Talkgroup
  test('TG-003 Delete Talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('TalkGr_Name');
  });
});
