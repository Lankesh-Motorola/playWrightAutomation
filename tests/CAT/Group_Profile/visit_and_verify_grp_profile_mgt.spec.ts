import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Group Profile Management', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-001: Group Profile Management
  test('GP-001 Group Profile Management', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await pageObj.checkVisibility(pageObj.getSearchBox());
    await pageObj.checkVisibility(pageObj.getFilterBtn());
    await pageObj.checkVisibility(pageObj.getExportBtn());
    
    const createBtn = pageObj.getMSIBtn().filter({ hasText: 'Create Group Profile' });
    await pageObj.checkVisibility(createBtn);
  });
});
