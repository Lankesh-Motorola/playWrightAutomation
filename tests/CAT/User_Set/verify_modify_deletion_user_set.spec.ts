import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Verify Modify and Delete User Set', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // US-007: Verify Modifying created Userset
  test('US-007 Verify Modifying created Userset', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitUserSet();
    await pageObj.createUserSet();
    await pageObj.verifySearch('UpdatedUserSetName');
    
    await pageObj.clickEvent(pageObj.getEditBtn());
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetMemberCount());
    await page.waitForTimeout(1000);
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.clear();
    await searchBox.fill('TestUser');
    
    await pageObj.validateDisplayObj('TestUser');
    await pageObj.clickEvent(pageObj.getCancelButton());
    
    await page.waitForTimeout(5000);
    await pageObj.validateDisplayObj('UpdatedUserSetName');
  });

  // US-008: Delete User Set
  test('US-008 delete user Set', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.deleteUserSet('TestUserSet');
  });
});
