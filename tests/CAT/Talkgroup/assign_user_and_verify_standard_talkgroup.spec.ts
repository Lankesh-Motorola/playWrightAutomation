import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Assign User and Verify Standard Talkgroup', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // TG-004: Create Standard TalkGroup and add user
  test('TG-004 Create Standard TalkGroup and add user', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    // Create standard talkgroup with user assignment
    await pageObj.createStandardTalkGr('TalkGr_Name', false, true, 'TalkGr_Assign_User');

    // Search for created talk group
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('TalkGr_Name');
    await page.waitForTimeout(5000);

    // Validate talkgroup is displayed
    await pageObj.validateDisplayObj('TalkGr_Name');
  });

  // TG-005: Delete User/Talkgroup
  test('TG-005 Delete User/Talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.deleteTalkGroup('TalkGr_Name');
  });
});
