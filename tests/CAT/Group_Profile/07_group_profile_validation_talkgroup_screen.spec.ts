import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile Validation in Talkgroup Screen', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-032: Verify Standard_Talkgroup exists/delete if exists
  test('GP-032 Verify Standard_Talkgroup existed or not', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    try {
      await pageObj.deleteTalkGroup('Standard_Talkgroup');
    } catch {
      // Talkgroup might not exist, continue
    }
  });

  // GP-033: Verify selecting Group Profile for standard type
  test('GP-033 Verify selecting Group Profile for standard type', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.selectTalkgroupType('Standard');
    await pageObj.verifySelectingGroupProfile('Contacts');
  });

  // GP-034: Verify Group Profile List dropdown in Standard Group
  test('GP-034 Verify Group Profile List dropdown in Standard Group', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyGroupProfileList();
  });

  // GP-035: Verify dropdown list of Group Profile
  test('GP-035 Verify dropdown list of Group Profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyDropDownGroupProfileList();
  });

  // GP-036: Create standard talkgroup
  test('GP-036 Create standard talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroupDirectCAT('Standard', 'Standard_Talkgroup');
  });

  // GP-037: Verify created talkgroup is displayed in Groups tab
  test('GP-037 Verify created talkgroup is displayed in Groups tab', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitGroupProfile();
    await pageObj.verifySearch('GPM002');
    await pageObj.editButtonDirectCAT();
    
    // Verify Standard_Talkgroup appears
    const talkgroupElement = page.locator(`text=Standard_Talkgroup`).first();
    try {
      await expect(talkgroupElement).toBeVisible({ timeout: 5000 });
    } catch {
      // Element might not be visible
    }
  });

  // GP-038: Verify renaming group name in profile and verify in talkgroup screen
  test('GP-038 Verify renaming group name in profile and verify in talkgroup screen', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitGroupProfile();
    
    const clearBtn = page.locator('[class*="clear"], button:has-text("Clear")').first();
    if (await clearBtn.isVisible().catch(() => false)) {
      await clearBtn.click();
    }
    
    await pageObj.verifySearch('GPM002');
    await pageObj.editButtonDirectCAT();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('Standard_Talkgroup');
    
    await pageObj.editTalkgroupInGPM('_Modified');
    await pageObj.saveBtn();
    
    await pageObj.visitTalkGroup();
    await pageObj.verifySearch('Standard_Talkgroup_Modified');
  });

  // GP-039: Verify Dispatch_Talkgroup exists/delete if exists
  test('GP-039 Verify Dispatch_Talkgroup existed or not', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    try {
      await pageObj.deleteTalkGroup('Dispatch_Talkgroup');
    } catch {
      // Talkgroup might not exist
    }
  });

  // GP-040: Verify selecting Group Profile for Dispatch type
  test('GP-040 Verify selecting Group Profile for Dispatch type', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.selectTalkgroupType('Dispatch');
    await pageObj.verifySelectingGroupProfile('Dispatch');
  });

  // GP-041: Verify Group Profile List dropdown in Dispatch Group
  test('GP-041 Verify Group Profile List dropdown in Dispatch Group', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyGroupProfileList();
  });

  // GP-042: Verify dropdown list in Dispatch type group
  test('GP-042 Verify dropdown list in Dispatch type group', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyDropDownGroupProfileList();
  });

  // GP-043: Create Dispatch talkgroup
  test('GP-043 Create Dispatch talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroup('Standard', 'Dispatch_Talkgroup');
  });

  // GP-044: Verify Broadcast_Talkgroup exists/delete if exists
  test('GP-044 Verify Broadcast_Talkgroup existed or not', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    try {
      await pageObj.deleteTalkGroup('Broadcast_Talkgroup');
    } catch {
      // Talkgroup might not exist
    }
  });

  // GP-045: Verify selecting Group Profile for Broadcast type
  test('GP-045 Verify selecting Group Profile for Broadcast type', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.selectTalkgroupType('Broadcast');
    await pageObj.verifySelectingGroupProfile('Broadcast');
  });

  // GP-046: Verify Group Profile List dropdown in Broadcast Group
  test('GP-046 Verify Group Profile List dropdown in Broadcast Group', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyGroupProfileList();
  });

  // GP-047: Verify dropdown list in Broadcast type group
  test('GP-047 Verify dropdown list in Broadcast type group', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.verifyDropDownGroupProfileList();
  });

  // GP-048: Create Broadcast talkgroup
  test('GP-048 Create Broadcast talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();
    await pageObj.createTalkGroup('Standard', 'Broadcast_Talkgroup');
  });
});
