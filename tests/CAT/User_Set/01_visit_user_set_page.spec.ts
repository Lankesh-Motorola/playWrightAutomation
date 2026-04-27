import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { enterIntoApplication, verifyExternalUsrSearch, wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - User Set Visit', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // US-01: Visit User Set Page
  test('US-01 visit User Set Page', async ({ page, context }) => {
     pageObj = await enterIntoApplication(page, context);
     await pageObj.openUserSetPage();
     await pageObj.verifyUserSetSearchBox();
  });
});
