import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile Creation With Valid Data', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-051: Creating Dispatch group profile with valid data
  test('GP-051 Verify Creating Dispatch group profile with valid data', async ({ page, context }) => {
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
    await groupNameInput.fill('TestGrp2');

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

    // Operation select (generic)
    const operationSelect = page.locator('select, [id*="operation"]').first();
    if (await operationSelect.isVisible().catch(() => false)) {
      await operationSelect.click();
      const option = page.locator('#1377, option[value="1377"]').first();
      if (await option.isVisible().catch(() => false)) {
        await option.click();
      }
    }

    const createTalkgroupCheckbox = pageObj.getCreateTalkgroupGrpMnt();
    await expect(createTalkgroupCheckbox).toBeVisible();
    await expect(createTalkgroupCheckbox).not.toBeChecked();
    await createTalkgroupCheckbox.click();

    await page.waitForTimeout(2000);
    
    const addGroupBtn = pageObj.getAddGrp();
    await addGroupBtn.click();
    
    const groupNameInput2 = pageObj.getInputGroupName();
    await groupNameInput2.fill('grp1234');
    
    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });

  // GP-052: Creating Broadcast group profile with valid data
  test('GP-052 Verify Creating Broadcast group profile with valid data', async ({ page, context }) => {
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
    await groupNameInput.fill('TestGrp3');

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

    // Operation select (generic)
    const operationSelect = page.locator('select, [id*="operation"]').first();
    if (await operationSelect.isVisible().catch(() => false)) {
      await operationSelect.click();
      const option = page.locator('#1377, option[value="1377"]').first();
      if (await option.isVisible().catch(() => false)) {
        await option.click();
      }
    }

    const createTalkgroupCheckbox = pageObj.getCreateTalkgroupGrpMnt();
    await expect(createTalkgroupCheckbox).toBeVisible();
    await expect(createTalkgroupCheckbox).not.toBeChecked();
    await createTalkgroupCheckbox.click();

    await page.waitForTimeout(2000);
    
    const addGroupBtn = pageObj.getAddGrp();
    await addGroupBtn.click();
    
    const groupNameInput2 = pageObj.getInputGroupName();
    await groupNameInput2.fill('grp12345');
    
    const saveBtn = pageObj.getSaveButton();
    await expect(saveBtn).toContainText('Save');
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
  });
});
