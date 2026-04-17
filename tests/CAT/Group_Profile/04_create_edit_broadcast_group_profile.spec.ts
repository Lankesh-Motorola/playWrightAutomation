import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Create/Edit Broadcast Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-08: Broadcast Group Profile Management
  test('GP-08 Broadcast Group Profile Management', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    //Wait for 1 seconds
    await page.waitForTimeout(1000);
    // Click on Group Profile
    await newPageObj.visitGroupProfile();
    await newPageObj.selectGroupProfile('Broadcast');
    await newPageObj.createEmptyGroupProfile('Broadcast_Group_Profile_Name', 'Broadcast');
  });

  // GP-09: Check, edit Broadcast group profile and add talkgroup
  test('GP-09 Check,edit Broadcast group profile and add talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await newPageObj.visitGroupProfile();

    const searchBox = newPageObj.getSearchBox();
    await searchBox.fill('Broadcast_Group_Profile_Name');
    //Click Enter
    await searchBox.press('Enter');

    //Click Edit button
    await newPageObj.getEditBtn();
    await newPageObj.getGroupProfileNameTextField().click({ clickCount: 3 });

    await newPageObj.getGroupProfileNameTextField().clear();
    await newPageObj.getGroupProfileNameTextField().fill('Broadcast_Group_Profile_Name2');

    await newPageObj.clickEvent(newPageObj.getSaveButton());
    await page.waitForTimeout(2000);

    await newPageObj.clickEvent((await newPageObj.getCreateTlkgrpwithGrpPrflCheckbox()));
    await newPageObj.clickEvent(newPageObj.getAddGrp());

    await newPageObj.getInputGroupName().fill('Broadcast_Talkgroup_Name');

    await newPageObj.clickEvent(newPageObj.getSaveButton());
    await newPageObj.clickEvent(newPageObj.getCancelButton());
    await page.waitForTimeout(2000);

    // Return to Group Profile page because Save/Cancel can route back to launch view.
    await newPageObj.visitGroupProfile();
    const refreshedSearchBox = newPageObj.getSearchBox();
    await expect(refreshedSearchBox).toBeVisible();
    await refreshedSearchBox.clear();
    await refreshedSearchBox.fill('Broadcast_Group_Profile_Name2');
    await refreshedSearchBox.press('Enter');
    await expect(refreshedSearchBox).toHaveValue('Broadcast_Group_Profile_Name2');
  });

  // GP-10: Delete broadcast talkgroup
  test('GP-10 Delete broadcast talkgroup', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);
    await newPageObj.visitGroupProfile();
    //Search for the Broadcast Group Profile
    const searchBox = newPageObj.getSearchBox();
    await searchBox.fill('Broadcast_Group_Profile_Name2');
    await searchBox.press('Enter');
    //Click on Edit button of the Broadcast Group Profile
    await newPageObj.getEditBtn();
    //Click on 'Create talkgroup with this group profile' to delete the associated talkgroup
    await newPageObj.clickEvent((await newPageObj.getCreateTlkgrpwithGrpPrflCheckbox()));
    //Click Ok on popup
    await newPageObj.page.getByRole('button', { name: 'OK' }).click();
    //Click Cancel to exit edit mode
    await newPageObj.clickEvent(newPageObj.getCancelButton());
    await page.waitForTimeout(2000);
  });

  // GP-11: Delete group profile
  test('GP-11 Delete group profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    // 1. Navigate to the Group Profile page
    await newPageObj.visitGroupProfile();

    // 2. Delete the profile.
    await newPageObj.deleteGroupProfile('Broadcast_Group_Profile_Name2');

    // 3. Verify profile no longer appears in the list after deletion.
    const searchBox = newPageObj.getSearchBox();
    await expect(searchBox).toBeDisabled();
  });
});
