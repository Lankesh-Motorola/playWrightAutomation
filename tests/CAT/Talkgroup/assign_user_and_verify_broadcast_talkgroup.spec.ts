import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Assign User and Verify Broadcast Talkgroup', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // TG-008: Create Broadcast TalkGroup and add broadcasters
  test('TG-008 Create Broadcast TalkGroup and add broadcasters', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    // Visit Talk Group page
    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Broadcast', 'TalkGr_BroadName', 'TalkGr_Assign_User');
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('TalkGr_BroadName');
    await pageObj.validateDisplayObj('TalkGr_BroadName');

    // Edit broadcast talkgroup and add broadcasters
    await pageObj.visitTalkGroupFromCAT();
    await searchBox.clear();
    await searchBox.fill('TalkGr_BroadName');
    await page.waitForTimeout(5000);

    await pageObj.clickEvent(pageObj.getEditBtn());
    
    const editNameBox = pageObj.getEditNameBox();
    await editNameBox.clear();
    await editNameBox.fill('TalkGr_BroadNameEdit');

    await pageObj.clickEvent(pageObj.getSaveButton());
    await page.waitForTimeout(5000);

    // Add broadcasters
    await pageObj.clickEvent(pageObj.getBroadcastersTab());
    await pageObj.clickEvent(pageObj.getAssignUsersIcon());
    
    const assignUserSearch = pageObj.getAssignUserPopupSearch();
    await assignUserSearch.fill('TalkGr_Assign_Broad_User');
    await page.waitForTimeout(5000);

    const checkboxes = pageObj.getAssinedCheckBox();
    await pageObj.forceClickEvent(checkboxes.nth(5));
    await pageObj.clickEvent(pageObj.getAssignButton());
    await page.waitForTimeout(5000);

    await pageObj.validateDisplayObj('TalkGr_BroadNameEdit');
    await pageObj.validateDisplayObj('TalkGr_Assign_Broad_User');
  });

  // TG-009: Delete Broadcast Talkgroup
  test('TG-009 Delete Broadcast Talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('TalkGr_BroadNameEdit');
  });
});
