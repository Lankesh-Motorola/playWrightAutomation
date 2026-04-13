import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile MCX Enabled', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-049: Creating Dispatch group profile with MCX enabled
  test('GP-049 Verify Creating Dispatch group profile with MCX enabled', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Dispatch');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('TestGrpWithMcx2');

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
    await mcxCheckbox.click();

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await expect(autoCutInCheckbox).toBeVisible();
    await autoCutInCheckbox.click();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });

  // GP-050: Creating Broadcast group profile with MCX enabled
  test('GP-050 Verify Creating Broadcast group profile with MCX enabled', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Broadcast');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('TestGrpwithMcx3');

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
    await mcxCheckbox.click();

    const autoCutInCheckbox = pageObj.getCheckboxGrpMntAutoCutIn();
    await expect(autoCutInCheckbox).toBeVisible();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });
});
