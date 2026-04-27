import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { enterIntoApplication, setupOSMPage, wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create User Set', () => {
  let page: any;
  let pageObj: CATPage;

  // US-02: Create User Set
  test('US-02 Create User Set', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.createUserSet();
    await pageObj.verifySearch();
  });

  // US-03: Delete User Set
  test('US-03 Delete User Set', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.deleteUserSet();
    await pageObj.verifySearch(false);
  });
});
