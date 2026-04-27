import { test, expect } from '@playwright/test';
import ExternalUserPage from '../../../pages/External_User_Page';
import {
  wcsrLogin,
  verifyInvalidExternalUserSearch,
  verifyExternalUsrSearch,
  launchAndGetNewPageObject,
  enterIntoApplication,
} from '../../../helpers/common';
import path from 'path/win32';
import { console } from 'inspector';

test.describe('One Portal CAT - External User List Page', () => {
  let pageObj: ExternalUserPage;
  let externalUserPageObj: ExternalUserPage;

  test.beforeEach(async ({ page, context }) => {
    pageObj = new ExternalUserPage(page);
     const newPageObj = await enterIntoApplication(page, context);
     externalUserPageObj = new ExternalUserPage(newPageObj.getPage());
  });

 test('Ex-001 Verify the PTT Users page header as PTT Users', async () => {  
   
    await externalUserPageObj.verifyPTTUsersPage();
});

test('Ex-002 Verify External User Menu Button', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPage();
  });

  test('Ex-003 Verify External User Heading', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserHeader();
  });

  test('Ex-004 Verify Search Box', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserSearchBox();
  });

  test('Ex-005 Verify Search Box with single char', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.enterCharInSearchBox('a');
    await externalUserPageObj.verifyExternalUserSearchBoxError();
  });

  test('Ex-006 Verify Search Box with double char', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.enterCharInSearchBox('ab');
    await externalUserPageObj.verifyExternalUserSearchBoxError();
  });

  test('Ex-007 Verify Search with 3 char', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.enterCharInSearchBox('abc');
    await externalUserPageObj.verifyExternalUserSearchBoxError(false);
  });

  test('Ex-008 Verify clear button in Basic Search', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.enterCharInSearchBox('abc');
    await externalUserPageObj.verifySearchBoxValue('abc');
    await externalUserPageObj.clickSearchClearButton();
    await externalUserPageObj.verifySearchBoxValueEmpty();
  });

  test('Ex-009 Verify Search icon', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifySearchIcon();
  });

  test('Ex-010 Verify Pagination', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyPagination();
  });

  test('Ex-011 Verify Export Button', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickExportButton();
  });

  test('Ex-012 Verify Import Button', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
  });

  test('Ex-014 Verify Import Button dialog box heading', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifyImportDialogHeader();
  });

  test('Ex-015 Verify Import Button dialog box', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifyandClickImportDialogBox();
  });

  test('Ex-016 Verify Import Button dialog box 0 files added', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifyFileCountZero();
  });

  test('Ex-017 Verify Import Button dialog box Download Sample CSV', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifySampleFileDownload();
  });

  test('Ex-018 Verify Import Button dialog box Select File Button', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifySelectFileButton();

  });

  test('Ex-019 Verify Import Button dialog box Import Button', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.verifySelectFileButton();
    await externalUserPageObj.uploadFile("Sample File to Import External Contacts.csv");
    await externalUserPageObj.verifyImportButtonEnabled();
  });

  test('Ex-020 Verify Import Button dialog box cross Button', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyandClickImportButton();
    await externalUserPageObj.clickDialogBoxCloseButton();
  });

  test('Ex-021 Verify Add External User', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPage();
  });

  // Create page
  test('Ex-022 Verify Create External User Heading', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserCreateHeader();
  });

  test('Ex-023 Verify Create External Basic Information Heading', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserBasicInfoHeader();
  });

  test('Ex-024 Verify Create External User Name label', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserNameLabel();
  });

  test('Ex-025 Verify Create External User Input Name', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserNameInput();
  });

  test('Ex-026 Verify Create External User Phone Number label', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPhoneNumberLabel();
  });

  test('Ex-027 Verify Create External User Phone Number input', async ({ page, context }) => {
     await externalUserPageObj.clickExternalUserButton();
     await externalUserPageObj.verifyExternalUserPhoneNumberInput();
  });

  test('Ex-028 Verify Create External User Phone Number invalid input (1 digit)', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPhoneNumberInput();
  });

  test('Ex-029 Verify Create External User Phone Number invalid input (2 digits)', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPhoneNumberInvalidInput();

  });

  test('Ex-030 Verify Create External User Phone Number valid input', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserPhoneNumberValidInput();
  });

  test('Ex-031 Verify Create External User Cancel Button', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserCancelButton();
  });

  test('Ex-032 Verify Create External User Save Button', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserSaveButton();
  });

  test('Ex-033 Verify Delete External User', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyDeleteExternalUser();
  });

  test('Ex-034 Verify Edit Page External User', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyEditExternalUser();
  });

  test('Ex-035 Verify Edit Page External User change in name', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyEditExternalUserChangeInName();
    
  });

  test('Ex-035 Verify Edit Page External User change in name modified', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifySearchExternalUserName();

  });

  // View page
  test('Ex-036 Verify View Page External User', async () => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserViewButton();
  });

  test('Ex-037 Verify View Page External User heading', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserViewButton();
    await externalUserPageObj.verifyExternalUserViewHeader();
  });

  test('Ex-038 Verify Create External User name Heading View Page', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserViewName();
  });

  test('Ex-039 Verify Create External Basic Information Heading View Page', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalBasicInformation();
  });

  test('Ex-040 Verify Create External User Name View Page', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalViewNameLabel();
  });

  test('Ex-041 Verify Create External User Phone Number View Page', async ({ page, context }) => {
    await externalUserPageObj.clickExternalUserButton();
    await externalUserPageObj.verifyExternalUserViewPhoneNumber();
  });

  test('Ex-042 Verify Create External User Edit Button View Page', async ({ page, context }) => {
   await externalUserPageObj.clickExternalUserButton();
   await externalUserPageObj.validateViewEditButton();
  //  await externalUserPageObj.verifyDeleteExternalUser();

  });
});