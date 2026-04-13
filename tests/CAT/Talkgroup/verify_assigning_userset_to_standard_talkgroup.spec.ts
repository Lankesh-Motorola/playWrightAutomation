import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Verify Assigning UserSet to Standard Talkgroup', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TG-022: Create UserSet for Standard Talkgroup', async ({ page }) => {
    await pageObj.visitUserSet();
    await pageObj.createUserSet();

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('TestUserSet_Standard');
    await pageObj.validateDisplayObj('TestUserSet_Standard');
  });

  test('TG-023: Create Standard Talkgroup with UserSet Assignment', async ({ page }) => {
    await pageObj.visitTalkGroup();
    // Create standard talkgroup with UserSet flag (third parameter = true)
    await pageObj.createStandardTalkGr('Standard_UserSet_TalkGroup', false, true, 'TestUserSet_Standard');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_UserSet_TalkGroup');
    await pageObj.validateDisplayObj('Standard_UserSet_TalkGroup');

    // Verify the assignment
    await pageObj.validateCount();
  });
});
