import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

let pageObj: CATPage;

test.describe('CAT - Verify Assigning UserSet to Broadcast Talkgroup', () => {
  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  test('TG-026: Create UserSet for Broadcast Talkgroup', async ({ page }) => {
    await pageObj.visitUserSet();
    await pageObj.createUserSet();

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('TestUserSet_Broadcast');
    await pageObj.validateDisplayObj('TestUserSet_Broadcast');
  });

  test('TG-027: Create Broadcast Talkgroup with UserSet Assignment', async ({ page }) => {
    await pageObj.visitTalkGroup();
    // Create broadcast talkgroup with UserSet flag (third parameter = true)
    await pageObj.createStandardTalkGr('Broadcast_UserSet_TalkGroup', false, true, 'TestUserSet_Broadcast');

    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Broadcast_UserSet_TalkGroup');
    await pageObj.validateDisplayObj('Broadcast_UserSet_TalkGroup');

    // Verify the assignment
    await pageObj.validateCount();
  });
});
