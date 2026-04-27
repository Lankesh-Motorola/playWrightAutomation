import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { enterIntoApplication, wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Verify Assign User Set', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // US-04: Verify assigning user Sets to the Users
  test('US-04 Verify assiging user Sets to the Users', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    
    await pageObj.openUserSetPage();
    await pageObj.createUserSet();
    await pageObj.verifySearch();
    await pageObj.openUserSetPage();
    await pageObj.deleteUserSet();
    await pageObj.verifySearch(false);
  });

  // US-05: Verify navigating to Created Userset in View Mode
  test('US-05 Verify navigating to the Created Userset in View Mode and verify the fields', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.createUserSet();
    await pageObj.verifySearch();
    await pageObj.visitUserSetViewPage();
    await pageObj.verifyUserSetViewPageFields();
    await pageObj.openUserSetPage();
    await pageObj.deleteUserSet();
    await pageObj.verifySearch(false);
  });

  // US-06: Verify Adding Members from View to Edit Mode
  test('US-06 Verify Adding Members to the from View to Edit Mode', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.createUserSet();
    await pageObj.verifySearch();
    await pageObj.visitUserSetViewPage();
    await pageObj.getViewUserSetEditBtn().click();
    await pageObj.openUserSetPage();
    await pageObj.deleteUserSet();
    await pageObj.verifySearch(false);
  });
});
