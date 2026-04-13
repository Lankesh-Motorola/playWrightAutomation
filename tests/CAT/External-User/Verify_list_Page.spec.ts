import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import {
  wcsrLogin,
  verifyInvalidExternalUserSearch,
  verifyExternalUsrSearch,
  launchAndGetNewPageObject,
} from '../../../helpers/common';

test.describe('One Portal CAT - External User List Page', () => {
  let pageObj: CATPage;

  test.beforeEach(async ({ page }) => {
    pageObj = new CATPage(page);
  });

 test('Ex-001 Verify the PTT Users page title as PTT Users', async ({ page, context }) => {
    await wcsrLogin(page);

    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');

    // Perform actions on the NEW TAB
    await newPageObj.clickTalkgroup();

    // Click PTT Users on the new tab
    const pttBtn = newPageObj.getPTTUserButton();
    await pttBtn.click();

    // Final Assertion
    await expect(newPageObj.getPTTUserHeader()).toBeVisible({ timeout: 15000 });
});

  test('Ex-002 Verify External User Menu Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await expect(newPageObj.getExternalUserMenu()).toBeVisible();
    await newPageObj.getExternalUserMenu().click();
  });

  test('Ex-003 Verify External User Heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getHearderAll('External User')).toBeVisible();
  });

  test('Ex-004 Verify Search Box', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getSearchBox()).toBeVisible();
    await newPageObj.getSearchBox().click();
  });

  test('Ex-005 Verify Search Box with single char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyInvalidExternalUserSearch(page, newPageObj, '9');
  });

  test('Ex-006 Verify Search Box with double char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyInvalidExternalUserSearch(page, newPageObj, '98');
  });

  test('Ex-007 Verify Search with 3 char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, '984');
  });

  test('Ex-008 Verify clear button in Basic Search', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, '984');
    await expect(newPageObj.getExtClearBtn()).toBeVisible();
    await newPageObj.getExtClearBtn().click();
  });

  test('Ex-009 Verify Search icon', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalUserSearch()).toBeVisible();
  });

  test('Ex-010 Verify Pagination', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getPaginationBtn()).toBeVisible();
  });

  test('Ex-011 Verify Export Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalExportButton()).toBeVisible();
    await newPageObj.getExternalExportButton().click();
  });

  test('Ex-012 Verify Import Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
  });

  test('Ex-014 Verify Import Button dialog box heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getImportHeader('ngCat_messages.text_import_from_file ')).toBeVisible();
  });

  test('Ex-014b Verify Import Button dialog box', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getImportDialogBoxButton()).toBeVisible();
    await newPageObj.getImportDialogBoxButton().click();
  });

  test('Ex-015 Verify Import Button dialog box reverse', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getImportDialogBoxButton()).toBeVisible();
    await newPageObj.getImportDialogBoxButton().click();
  });

  test('Ex-016 Verify Import Button dialog box 0 files added', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getDivContainer('0 fileAdded')).toBeVisible();
  });

  test('Ex-017 Verify Import Button dialog box Download Sample CSV', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getDownloadImport()).toBeVisible();
  });

  test('Ex-018 Verify Import Button dialog box Select File Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getSelectFileBtn()).toBeVisible();
  });

  test('Ex-019 Verify Import Button dialog box Import Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getcreateBtn('Import')).toBeVisible();
  });

  test('Ex-020 Verify Import Button dialog box cross Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getExternalImportButton()).toBeVisible();
    await newPageObj.getExternalImportButton().click();
    await expect(newPageObj.getExtImportCrossBtn()).toBeVisible();
    await newPageObj.getExtImportCrossBtn().click();
  });

  test('Ex-021 Verify Add External User', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await expect(newPageObj.getcreateBtn('Add External User')).toBeVisible();
    await newPageObj.getcreateBtn('Add External User').click();
  });

  // Create page
  test('Ex-022 Verify Create External User Heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getExternalUserHeader()).toBeVisible();
  });

  test('Ex-023 Verify Create External User name Heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getH3('External User')).toBeVisible();
  });

  test('Ex-024 Verify Create External Basic Information Heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getSpanContainer('Basic Information')).toBeVisible();
  });

  test('Ex-025 Verify Create External User Name label', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getTalkgrpLabel('Name')).toBeVisible();
  });

  test('Ex-026 Verify Create External User Input Name', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getInputNameExternal()).toBeVisible();
    await newPageObj.getInputNameExternal().click();
  });

  test('Ex-027 Verify Create External User Input Name with 1 char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getInputNameExternal().fill('H');
  });

  test('Ex-028 Verify Create External User Input Name with 2 char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getInputNameExternal().clear();
    await newPageObj.getInputNameExternal().fill('Ha');
  });

  test('Ex-029a Verify Create External User Input Name with more 3 char', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getInputNameExternal().clear();
    await newPageObj.getInputNameExternal().fill('Harsh');
  });

  test('Ex-029b Verify Create External User Phone Number label', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getTalkgrpLabel('Phone Number')).toBeVisible();
  });

  test('Ex-030 Verify Create External User Phone Number input', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getPhoneNumberEX()).toBeVisible();
    await newPageObj.getPhoneNumberEX().click();
  });

  test('Ex-031 Verify Create External User Phone Number invalid input (1 digit)', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getPhoneNumberEX().fill('9');
  });

  test('Ex-032 Verify Create External User Phone Number invalid input (2 digits)', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getPhoneNumberEX().clear();
    await newPageObj.getPhoneNumberEX().fill('99');
  });

  test('Ex-033 Verify Create External User Phone Number valid input', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getPhoneNumberEX().clear();
    await newPageObj.getPhoneNumberEX().fill('919100000028');
  });

  test('Ex-034 Verify Create External User Cancel Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await expect(newPageObj.getcreateBtn('Cancel')).toBeVisible();
  });

  test('Ex-035 Verify Create External User Save Button', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getcreateBtn('Add External User').click();
    await newPageObj.getInputNameExternal().clear();
    await newPageObj.getInputNameExternal().fill('Harsh');
    await newPageObj.getPhoneNumberEX().clear();
    await newPageObj.getPhoneNumberEX().fill('919100000028');
    await expect(newPageObj.getcreateBtn('Save')).toBeVisible();
    await newPageObj.getcreateBtn('Save').click();
  });

  test('Ex-036 Verify Delete External User', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, '919845630046');
    await expect(newPageObj.getDeleteExternal()).toBeVisible();
    await newPageObj.getDeleteExternal().click();
    await newPageObj.getcreateBtn('Ok').click();
  });

  test('Ex-037 Verify Edit Page External User', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await expect(newPageObj.getEditExternal()).toBeVisible();
    await newPageObj.getEditExternal().click();
  });

  test('Ex-038 Verify Edit Page External User change in name', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await newPageObj.getEditExternal().click();
    await newPageObj.getInputNameExternal().clear();
    await newPageObj.getInputNameExternal().fill('Wi-Fi Standard_001');
    await newPageObj.getcreateBtn('Save').click();
  });

  test('Ex-039 Verify Edit Page External User reverse', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard_001');
    await newPageObj.getEditExternal().click();
    await expect(newPageObj.getEditExternal()).toBeVisible();
    await newPageObj.getEditExternal().click();
  });

  test('Ex-040 Verify Edit Page External User change in name modified', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard_001');
    await newPageObj.getEditExternal().click();
    await newPageObj.getInputNameExternal().clear();
    await newPageObj.getInputNameExternal().fill('Wi-Fi Standard');
    await newPageObj.getcreateBtn('Save').click();
  });

  // View page
  test('Ex-041 Verify View Page External User', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await expect(newPageObj.getViewExternal()).toBeVisible();
    await newPageObj.getViewExternal().click();
  });

  test('Ex-042 Verify View Page External User heading', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await newPageObj.getViewExternal().click();
    await expect(newPageObj.getExternalUserHeader()).toBeVisible();
  });

  test('Ex-043 Verify Create External User name Heading View Page', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await newPageObj.getViewExternal().click();
    await expect(newPageObj.getSpancontainer('Wi-Fi Standard')).toBeVisible();
  });

  test('Ex-044 Verify Create External Basic Information Heading View Page', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await newPageObj.getViewExternal().click();
    await expect(newPageObj.getHearderAll('Basic Information')).toBeVisible();
  });

  test('Ex-045 Verify Create External User Name View Page', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await verifyExternalUsrSearch(page, newPageObj, 'Wi-Fi Standard');
    await expect(newPageObj.getTalkgrpLabel('Name')).toBeVisible();
    await expect(newPageObj.getFontSize14('Wi-Fi Standard')).toBeVisible();
  });

  test('Ex-046 Verify Create External User Phone Number View Page', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getViewExternal().click();
    await expect(newPageObj.getTalkgrpLabel('Phone Number')).toBeVisible();
    await expect(newPageObj.getFontSize14('884467781001')).toBeVisible();
  });

  test('Ex-047 Verify Create External User Edit Button View Page', async ({ page, context }) => {
    await wcsrLogin(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, '140_CI_Automation');
    await newPageObj.getExternalUserMenu().click();
    await newPageObj.getViewExternal().click();
    await expect(newPageObj.getcreateBtn('Edit')).toBeVisible();
    await newPageObj.getcreateBtn('Edit').click();
    await newPageObj.getcreateBtn('Cancel').click();
  });
});