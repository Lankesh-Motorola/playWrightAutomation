import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create Group Profile Button Validation', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-016: Click on Create Group Profile button
  test('GP-016 Click on Create Group Profile button', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    
    const createGroupProfileBtn = page.locator('button:has-text("Create Group Profile")').first();
    await expect(createGroupProfileBtn).toBeVisible();
    await createGroupProfileBtn.click();
    await page.waitForTimeout(5000);
    
    const createBtn = pageObj.getCreateBtn();
    await pageObj.clickEvent(createBtn);
    await page.waitForTimeout(5000);
  });

  // GP-017: Verify Create group profile page is displayed
  test('GP-017 Verify Create group profile page is displayed', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const groupProfileHeader = pageObj.getGroupProfileMntHeader();
    await expect(groupProfileHeader).toContainText('Group Profile Details');
  });

  // GP-018: Verify save button visibility
  test('GP-018 Verify save button visibility', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
  });

  // GP-019: Verify cancel button visibility
  test('GP-019 Verify cancel button visibility', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const cancelBtn = pageObj.getCancelButton();
    await expect(cancelBtn).toContainText('Cancel');
  });

  // GP-020: Verify group name field
  test('GP-020 Verify group name field', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await expect(groupNameInput).toBeFocused();
  });

  // GP-021: Verify Group Type dropdown
  test('GP-021 Verify Group Type dropdown', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const groupTypeDropdown = pageObj.getDropDownGrpMnt();
    await expect(groupTypeDropdown).toBeVisible();
    await expect(groupTypeDropdown).toBeDisabled();
  });

  // GP-022: Verify Avatar dropdown
  test('GP-022 Verify Avatar dropdown', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const avatarDropdown = pageObj.getDropDownGrpMntAvatar();
    await expect(avatarDropdown).toBeVisible();
    await expect(avatarDropdown).toBeEnabled();
  });

  // GP-023: Verify interop checkbox
  test('GP-023 Verify interop checkbox', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const interopCheckbox = page.locator('msi-checkbox[name="ugwInteropFlag_GP"]').first();
    if (await interopCheckbox.isVisible().catch(() => false)) {
      await interopCheckbox.click();
      await page.waitForTimeout(500);
    }
  });

  // GP-024: Verify Avatar Dropdown selection
  test('GP-024 Verify Avatar Dropdown selection', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const avatarDropdown = pageObj.getDropDownGrpMntAvatar();
    await avatarDropdown.click();
    
    const airplaneIcon = page.locator('li a img[alt="Airplane"]').first();
    if (await airplaneIcon.isVisible().catch(() => false)) {
      await airplaneIcon.click();
      await page.waitForTimeout(500);
    }
  });

  // GP-025: Verify Audio Cut-in checkbox
  test('GP-025 Verify Audio Cut-in checkbox', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await autoCutInCheckbox.click();
    await page.waitForTimeout(500);
  });

  // GP-026: Verify Create talkgroup with group profile checkbox
  test('GP-026 Verify Create talkgroup with group profile checkbox', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const createTalkgroupCheckbox = pageObj.getCreateTalkgroupGrpMnt();
    await expect(createTalkgroupCheckbox).toBeVisible();
    await expect(createTalkgroupCheckbox).not.toBeChecked();
    await createTalkgroupCheckbox.click();
    await page.waitForTimeout(500);
  });

  // GP-027: Verify talkgroup tab displayed after checkbox selection
  test('GP-027 Verify talkgroup tab displayed after checkbox selection', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const searchInput = pageObj.getInputSearchGrpMnt();
    await expect(searchInput).toBeVisible();
    
    const addGroupBtn = pageObj.getAddGrp();
    await expect(addGroupBtn).toBeVisible();
    
    const importBtn = pageObj.getImport();
    await expect(importBtn).toBeVisible();
    
    const deleteIcon = pageObj.getDeleteIconGrpMnt();
    await expect(deleteIcon).toBeVisible();
    await expect(deleteIcon).toBeDisabled();
  });

  // GP-028: Verify Add Groups and Import icons state
  test('GP-028 Verify Add Groups and Import icons state', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const addGroupBtn = pageObj.getAddGrp();
    await expect(addGroupBtn).toBeVisible();
    await expect(addGroupBtn).toBeEnabled();
    
    const importBtn = pageObj.getImport();
    await expect(importBtn).toBeVisible();
    await expect(importBtn).toBeEnabled();
  });

  // GP-029: Verify Search field default state
  test('GP-029 Verify Search field default state in Talkgroup tab', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const searchInput = pageObj.getInputSearchGrpMnt();
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeDisabled();
  });

  // GP-030: Verify click on Add Group icon
  test('GP-030 Verify click on Add Group icon', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await page.waitForTimeout(2000);
    
    const addGroupBtn = pageObj.getAddGrp();
    await addGroupBtn.click();
    
    const groupNameInput = pageObj.getInputGroupName();
    await expect(groupNameInput).toBeVisible();
  });

  // GP-031: Verify adding duplicate groups
  test('GP-031 Verify adding duplicate groups', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const groupNameInput = pageObj.getInputGroupName();
    await groupNameInput.fill('grp123');
    await page.waitForTimeout(2000);
    
    const addGroupBtn = pageObj.getAddGrp();
    await addGroupBtn.click();
    
    const groupNameInputs = page.locator('input[placeholder*="Group Name"], input[id*="group-name"]');
    const secondInput = groupNameInputs.nth(1);
    await secondInput.fill('grp123');
    
    const duplicateError = page.locator('span:has-text("Group Name already exists")').first();
    await expect(duplicateError).toBeVisible();
  });
});
