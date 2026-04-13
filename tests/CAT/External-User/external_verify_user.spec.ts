import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - External User Verification', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // Ex-048: Enter Login
  test('Ex-048 Enter Login', async ({ page }) => {
    await wcsrLogin(page);
  });

  // Ex-049: Navigate to external User
  test('Ex-049 navigate to external User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await page.waitForTimeout(2000);
    await pageObj.verifyPageTitle();
  });

  // Ex-050: Verify the Search placeholder and Availability of Search field
  test('Ex-050 Verify the Search placeholder and Availability of Search field', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.getSearchField();
  });

  // Ex-051: Verify Visibility of Search Icon, Import and Export icon
  test('Ex-051 Verify Visibility of Search Icon Import and Export icon Tooltip of Import and Export icons', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.checkVisibility(pageObj.getSearchIcon());
    await pageObj.getImportIcon();
    await pageObj.getExportIcon();
  });
});
