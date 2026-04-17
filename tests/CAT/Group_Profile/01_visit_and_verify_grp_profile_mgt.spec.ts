import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile Management', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-001: Group Profile Management
  test('GP-01 Group Profile Management', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    //Switch to new tab
    await newPageObj.visitGroupProfile();
    await newPageObj.checkVisibility(newPageObj.getSearchBox());
    await newPageObj.checkVisibility(newPageObj.getFilterBtn());
    await newPageObj.checkVisibility(newPageObj.getExportBtn());
    
    const createBtn = newPageObj.getMSIBtn().filter({ hasText: 'Create Group Profile' });
    await newPageObj.checkVisibility(createBtn);
  });
});
