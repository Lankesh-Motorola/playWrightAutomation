import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create/Edit Standard Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-005: Standard Group Profile Management
  test('GP-005 Standard Group Profile Management', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await pageObj.selectGroupProfile('Standard');
    await pageObj.createEmptyGroupProfile('Standard_Group_Profile_Name', 'Standard');
  });

  // GP-006: Check, edit Standard group profile and add talkgroup
  test('GP-006 Check,edit Standard group profile and add talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_Group_Profile_Name');
    await page.waitForTimeout(5000);

    const profileName = page.locator(`text=Standard_Group_Profile_Name`).first();
    if (await profileName.isVisible().catch(() => false)) {
      await pageObj.clickEvent(pageObj.getEditBtn());
      await page.waitForTimeout(5000);
      
      await pageObj.checkVisibility(profileName);
      await pageObj.checkVisibility(pageObj.getStandard());
      await pageObj.checkVisibility(pageObj.getDefault());
      
      await pageObj.getGroupsTab();
      
      const nameField = pageObj.getGroupProfileNameTextField();
      await nameField.clear();
      await nameField.fill('Standard_Group_Profile_Name2');
      
      await pageObj.clickEvent(pageObj.getSaveButton());
      await page.waitForTimeout(5000);
      
      await pageObj.clickEvent(pageObj.getCreateTlkgrpwithGrpPrflCheckbox());
      await pageObj.clickEvent(pageObj.getTalkgroupIcon());
      
      const talkGrpNameField = pageObj.getTalkGrpNameInGroupProfile();
      await talkGrpNameField.fill('TalkGroup_Name1');
      
      await pageObj.clickEvent(pageObj.getSaveButton());
      await pageObj.clickEvent(pageObj.getCancelButton());
      await page.waitForTimeout(5000);
      
      const searchBox2 = pageObj.getSearchBox();
      await searchBox2.clear();
      await searchBox2.fill('Standard_Group_Profile_Name2');
      await page.waitForTimeout(5000);
      
      const updatedProfile = page.locator(`text=Standard_Group_Profile_Name2`).first();
      await pageObj.checkVisibility(updatedProfile);
      
      await pageObj.verifyMCXGroupProfileForTalkgroup('TalkGroup_Name1', 'TalkGr_Assign_User', 'STANDARD');
    }
  });

  // GP-007: Delete talkgroup
  test('GP-007 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('TalkGroup_Name1');
  });

  // GP-008: Delete group profile
  test('GP-008 Delete group profile', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteGroupProfile('Standard_Group_Profile_Name2');
  });
});
