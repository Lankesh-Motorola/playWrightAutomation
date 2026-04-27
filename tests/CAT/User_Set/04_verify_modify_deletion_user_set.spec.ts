import { test, expect, BrowserContext, Page } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { enterIntoApplication } from '../../../helpers/common';

test.describe('One Portal CAT - Verify Modify and Delete User Set', () => {

  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
   let page = p;
    await page.goto('about:blank');
  });

  // US-007: Verify Modifying created Userset
  test('US-007 Verify Modifying created Userset', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.createUserSet();
    await pageObj.verifySearch();
    await pageObj.assignSecondUserToUserSet();
    await pageObj.verifySearch();
  });

  // US-008: Delete User Set
  test('US-008 delete user Set', async ({ page, context }) => {
    pageObj = await enterIntoApplication(page, context);
    await pageObj.openUserSetPage();
    await pageObj.verifySearch();
    await pageObj.deleteUserSet();
  });
});

