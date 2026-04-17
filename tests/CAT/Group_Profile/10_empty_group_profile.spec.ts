import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Empty Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-053: Creating Standard empty group profile
  test('GP-053 Create Standard empty group profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Standard');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('Standard01');

    const groupTypeDropdown = pageObj.getDropDownGrpMnt();
    await expect(groupTypeDropdown).toBeVisible();
    await expect(groupTypeDropdown).toBeDisabled();

    const avatarDropdown = pageObj.getDropDownGrpMntAvatar();
    await avatarDropdown.click();
    
    const airplaneIcon = page.locator('li a img[alt="Airplane"]').first();
    if (await airplaneIcon.isVisible().catch(() => false)) {
      await airplaneIcon.click();
    }

    const mcxCheckbox = pageObj.getMcxCheckbox();
    await expect(mcxCheckbox).toBeVisible();
    await expect(mcxCheckbox).not.toBeChecked();

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await expect(autoCutInCheckbox).toBeVisible();
    await expect(autoCutInCheckbox).not.toBeChecked();

    const operationSelect = pageObj.getOperationSelectOption();
    await expect(operationSelect).toBeVisible();

    const createTalkgroupCheckbox = pageObj.getCreateTalkgroupGrpMnt();
    await expect(createTalkgroupCheckbox).toBeVisible();
    await expect(createTalkgroupCheckbox).not.toBeChecked();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });

  // GP-054: Creating Dispatch empty group profile
  test('GP-054 Creating Dispatch empty group profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Dispatch');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('Dispatch01');

    const groupTypeDropdown = pageObj.getDropDownGrpMnt();
    await expect(groupTypeDropdown).toBeVisible();
    await expect(groupTypeDropdown).toBeDisabled();

    const avatarDropdown = pageObj.getDropDownGrpMntAvatar();
    await avatarDropdown.click();
    
    const airplaneIcon = page.locator('li a img[alt="Airplane"]').first();
    if (await airplaneIcon.isVisible().catch(() => false)) {
      await airplaneIcon.click();
    }

    const mcxCheckbox = pageObj.getMcxCheckbox();
    await expect(mcxCheckbox).toBeVisible();
    await expect(mcxCheckbox).not.toBeChecked();

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await expect(autoCutInCheckbox).toBeVisible();
    await expect(autoCutInCheckbox).not.toBeChecked();

    const operationSelect = pageObj.getOperationSelectOption();
    await expect(operationSelect).toBeVisible();
    await expect(operationSelect).not.toBeChecked();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });

  // GP-055: Creating Broadcast empty group profile
  test('GP-055 Creating Broadcast empty group profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Broadcast');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('Broadcast01');

    const groupTypeDropdown = pageObj.getDropDownGrpMnt();
    await expect(groupTypeDropdown).toBeVisible();
    await expect(groupTypeDropdown).toBeDisabled();

    const avatarDropdown = pageObj.getDropDownGrpMntAvatar();
    await avatarDropdown.click();
    
    const airplaneIcon = page.locator('li a img[alt="Airplane"]').first();
    if (await airplaneIcon.isVisible().catch(() => false)) {
      await airplaneIcon.click();
    }

    const mcxCheckbox = pageObj.getMcxCheckbox();
    await expect(mcxCheckbox).toBeVisible();
    await expect(mcxCheckbox).not.toBeChecked();

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await expect(autoCutInCheckbox).toBeVisible();
    await expect(autoCutInCheckbox).not.toBeChecked();

    const operationSelect = pageObj.getOperationSelectOption();
    await expect(operationSelect).toBeVisible();
    await expect(operationSelect).not.toBeChecked();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });
});
