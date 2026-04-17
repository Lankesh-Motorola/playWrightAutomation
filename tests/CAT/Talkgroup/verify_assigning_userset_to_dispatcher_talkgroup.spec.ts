import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Verify Assigning UserSet to Dispatcher Talkgroup', () => {
  test.beforeEach(async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
  });

  test('TG-024: Create UserSet for Dispatcher Talkgroup', async ({ page }) => {
    await pageObj.visitUserSet();
    await pageObj.createUserSet();

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('TestUserSet_Dispatcher');
    await pageObj.validateDisplayObj('TestUserSet_Dispatcher');
  });

  test('TG-025: Create Dispatcher Talkgroup with UserSet Assignment', async ({ page }) => {
    await pageObj.visitTalkGroup();
    // Create dispatch talkgroup with UserSet flag (third parameter = true)
    await pageObj.createStandardTalkGr('Dispatch_UserSet_TalkGroup', false, true, 'TestUserSet_Dispatcher');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Dispatch_UserSet_TalkGroup');
    await pageObj.validateDisplayObj('Dispatch_UserSet_TalkGroup');

    // Verify the assignment
    await pageObj.validateCount();
  });
});
