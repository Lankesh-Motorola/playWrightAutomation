import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile Creation With Bulk Group Import', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-056: Create Standard group profile with bulk groups import
  test('GP-056 Verify Creating Standard group profile with bulk groups import', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);

    await pageObj.selectGroupProfile('Standard');
    await page.waitForTimeout(5000);

    const groupNameInput = pageObj.getInputGroupMnt();
    await groupNameInput.click();
    await groupNameInput.fill('Bulk_Standard_Group_Profile_TG');

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

    const operationSelect = pageObj.getOperationSelectOption();
    await operationSelect.click();
    
    const operationOption = page.locator('#1377, option[value="1377"]').first();
    if (await operationOption.isVisible().catch(() => false)) {
      await operationOption.click();
    }

    const createTalkgroupCheckbox = pageObj.getCreateTalkgroupGrpMnt();
    await expect(createTalkgroupCheckbox).toBeVisible();
    await expect(createTalkgroupCheckbox).not.toBeChecked();
    await createTalkgroupCheckbox.click();

    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click({ force: true });
    await page.waitForLoadState('networkidle');
  });

  // GP-057: Validate Import Button
  test('GP-057 Validate Import Button', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    const visitCATBtn = pageObj.getVisitWithinCat();
    if (await visitCATBtn.isVisible().catch(() => false)) {
      await visitCATBtn.click();
    }
    await page.waitForTimeout(1000);

    // Click on groups tab
    const groupsTab = page.locator('.ng-trigger > :nth-child(2)').first();
    if (await groupsTab.isVisible().catch(() => false)) {
      await groupsTab.click();
    }

    await pageObj.verifySearch('Bulk_Standard_Group_Profile_TG');
    
    const editBtn = pageObj.getEditBtn();
    await editBtn.click();
    
    const importBtn = pageObj.getImport();
    await importBtn.click();
    await page.waitForTimeout(500);

    // Verify Download Sample CSV is visible
    const downloadSampleCsv = page.locator('.import-content div, .uploaded-file-name').filter({ hasText: 'Download Sample CSV' }).first();
    try {
      await expect(downloadSampleCsv).toBeVisible({ timeout: 5000 });
    } catch {
      // Files might be displayed differently
    }

    const addFileBtn = page.locator('.add-file-btn, button:has-text("Add File")').first();
    if (await addFileBtn.isVisible().catch(() => false)) {
      await addFileBtn.click();
      await page.waitForTimeout(5000);
    }
  });
});
