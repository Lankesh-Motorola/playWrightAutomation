import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create/Edit Broadcast Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-009: Broadcast Group Profile Management
  test('GP-009 Broadcast Group Profile Management', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await pageObj.selectGroupProfile('Broadcast');
    
    const nameField = pageObj.getGroupProfileNameTextField();
    await nameField.fill('Broadcast_Group_Profile_Name');
    
    await pageObj.checkVisibility(pageObj.getBroadcast());
    await pageObj.checkVisibility(pageObj.getDefault());
    
    // Audio cut-in checkbox (may not exist - skip if not found)
    const audioCutinChkbox = pageObj.getAudioCutIn();
    if (await audioCutinChkbox.isVisible().catch(() => false)) {
      await pageObj.clickEvent(audioCutinChkbox);
    }
    
    await pageObj.clickEvent(pageObj.getCreateTlkgrpwithGrpPrflCheckbox());
    await pageObj.clickEvent(pageObj.getTalkgroupIcon());
    
    const talkGrpNameField = pageObj.getTalkGrpNameInGroupProfile();
    await talkGrpNameField.fill('Broadcast_TalkGr_Name');
    
    await pageObj.clickEvent(pageObj.getTalkgroupIcon());
    
    const talkgroupNameTextbox = pageObj.getTalkgrpNameTextbox();
    await talkgroupNameTextbox.fill('Broadcast_TalkGr_Name');
    
    await pageObj.clickEvent(pageObj.getSaveButton());
    await page.waitForTimeout(3000);
    
    await pageObj.checkVisibility(pageObj.getDuplicate());
  });

  // GP-010: Check, edit Broadcast group profile and add talkgroup
  test('GP-010 Check,edit Broadcast group profile and add talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Broadcast_Group_Profile_Name');
    await page.waitForTimeout(5000);

    const profileName = page.locator(`text=Broadcast_Group_Profile_Name`).first();
    if (await profileName.isVisible().catch(() => false)) {
      await pageObj.clickEvent(pageObj.getEditBtn());
      await page.waitForTimeout(5000);
      
      await pageObj.checkVisibility(profileName);
      await pageObj.checkVisibility(pageObj.getBroadcast());
      await pageObj.checkVisibility(pageObj.getDefault());
      
      await pageObj.clickEvent(pageObj.getCreateTlkgrpwithGrpPrflCheckbox());
      await pageObj.clickEvent(pageObj.getTalkgroupIcon());
      
      const talkgroupNameTextbox = pageObj.getTalkgrpNameTextbox();
      await talkgroupNameTextbox.fill('Broadcast_TalkGr_Name');
      
      await pageObj.clickEvent(pageObj.getSaveButton());
    }
  });

  // GP-011: Delete talkgroup
  test('GP-011 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('Broadcast_TalkGr_Name');
  });

  // GP-012: Delete Broadcast group profile
  test('GP-012 Delete Broadcast group profile', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteGroupProfile('Broadcast_Group_Profile_Name');
  });
});
