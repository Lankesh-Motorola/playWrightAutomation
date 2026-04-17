import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - User Set Visit', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // US-001: Visit User Set Page
  test('US-001 visit User Set Page', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitUserSet();
    await page.waitForTimeout(2000);
    
    await pageObj.checkVisibility(pageObj.getSearchBox());
    await pageObj.checkVisibility(pageObj.getExportBtn());
    await pageObj.checkVisibility(pageObj.getCreateUserSetButton());
  });
});
