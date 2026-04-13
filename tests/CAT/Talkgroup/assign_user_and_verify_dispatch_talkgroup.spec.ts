import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Assign User and Verify Dispatch Talkgroup', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // TG-006: Create Dispatch TalkGroup and add user with supervisors and dispatchers
  test('TG-006 Create Dispatch TalkGroup and add user with supervisors and dispatchers', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupAndAddUser('Dispatch', 'TalkGr_DispatchName', 'TalkGr_Assign_User');
    await pageObj.verifySearch('TalkGr_DispatchName');

    // Navigate to Talkgroup from CAT
    await pageObj.visitTalkGroupFromCAT();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.clear();
    await searchBox.fill('TalkGr_DispatchName');
    await page.waitForTimeout(2000);

    // Edit talkgroup name
    await pageObj.clickEvent(pageObj.getEditBtn());
    
    const editNameBox = pageObj.getEditNameBox();
    await editNameBox.clear();
    await editNameBox.fill('TalkGr_DispatchNameEdit');

    await pageObj.clickEvent(pageObj.getSaveButton());
    await page.waitForTimeout(2000);

    // Add supervisors
    await pageObj.clickEvent(pageObj.getSupervisorsTab());
    await pageObj.clickEvent(pageObj.getAssignUsersIcon());
    
    const assignUserSearch = pageObj.getAssignUserPopupSearch();
    await assignUserSearch.fill('TalkGr_Assign_User');
    
    await pageObj.validateDisplayObj('TalkGr_Assign_User');
    
    const checkboxes = pageObj.getAssinedCheckBox();
    await pageObj.forceClickEvent(checkboxes.nth(4));
    await pageObj.clickEvent(pageObj.getAssignButton());
    await page.waitForTimeout(2000);

    // Add dispatchers
    await pageObj.clickEvent(pageObj.getDispatcherTab());
    await pageObj.clickEvent(pageObj.getAssignUsersIcon());
    
    const assignUserSearch2 = pageObj.getAssignUserPopupSearch();
    await assignUserSearch2.fill('TalkGr_Assign_Disp_User');
    
    await pageObj.validateDisplayObj('TalkGr_Assign_Disp_User');
    
    const checkboxes2 = pageObj.getAssinedCheckBox();
    await pageObj.forceClickEvent(checkboxes2.nth(4));
    await pageObj.clickEvent(pageObj.getAssignButton());
    await page.waitForTimeout(2000);

    await pageObj.clickEvent(pageObj.getOkButton());

    // Verify all lists
    await pageObj.validateDisplayObj('TalkGr_DispatchNameEdit');
    await pageObj.validateDisplayObj('TalkGr_Assign_Disp_User');
    await page.waitForTimeout(2000);

    await pageObj.clickEvent(pageObj.getUsersTab());
    await pageObj.validateDisplayObj('TalkGr_Assign_User');
    await page.waitForTimeout(2000);

    await pageObj.clickEvent(pageObj.getSupervisorsTab());
    await pageObj.validateDisplayObj('TalkGr_Assign_User');
  });

  // TG-007: Delete Dispatch Talkgroup
  test('TG-007 Delete Dispatch Talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('TalkGr_DispatchNameEdit');
  });
});
