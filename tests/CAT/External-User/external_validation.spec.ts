import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - External User Validation', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // Ex-052: Enter Login
  test('Ex-052 Enter Login', async ({ page }) => {
    await wcsrLogin(page);
  });

  // Ex-053: Verify phone field error for more than 15 digit invalid MDN
  test('Ex-053 Verify phone field to show some error message if we pass more than 15 digit invalid MDN', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await page.waitForTimeout(5000);
    
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    await pageObj.getNameInput().fill('TestExternalUser');
    await pageObj.getPhoneInput().fill('12345678901234567');
    await page.waitForTimeout(3000);
    
    await pageObj.getPhoneError();
  });

  // Ex-054: Verify phone field error for alphabetical MDN
  test('Ex-054 Verify phone field to show some error message if we pass alphabetical MDN', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await page.waitForTimeout(5000);
    
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    await pageObj.getNameInput().fill('TestExternalUser');
    await pageObj.getPhoneInput().fill('ABCDEFGHIJKLMNO');
    await page.waitForTimeout(3000);
    
    await pageObj.getPhoneError();
  });
});
