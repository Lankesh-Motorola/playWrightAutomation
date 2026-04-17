import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - External User Add', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // Ex-055: Enter Login
  test('Ex-055 Enter Login', async ({ page }) => {
    await wcsrLogin(page);
  });

  // Ex-056: Verify Add External User Button functionality
  test('Ex-056 Verify Add External User Button has to be enabled by default and functionality of Add External user Button', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await page.waitForTimeout(2000);
    
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    await pageObj.verifyEditUrl();
  });

  // Ex-057: Verify default state of Save and Cancel buttons
  test('Ex-057 Verify the default state of Save and Cancel button on add external Page', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    await page.waitForTimeout(2000);
    
    await pageObj.checkDisabled(pageObj.getSaveBtn());
    await pageObj.checkVisibility(pageObj.getCancelButton());
  });

  // Ex-058: Verify Name and Phone input field error messages
  test('Ex-058 Verify the Name and Phone input field to show some error message if we do not pass any input', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    
    await pageObj.forceClickEvent(pageObj.getNameInput());
    await pageObj.forceClickEvent(pageObj.getPhoneInput());
    await page.waitForTimeout(3000);
  });

  // Ex-059: Verify Create External User Subscriber and Success message
  test('Ex-059 Verify Create External User Subscriber and Success message after creating external User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    
    await pageObj.getNameInput().fill('DispatchType');
    await pageObj.getPhoneInput().fill('1234567890123');
    await pageObj.clickSaveBtn();
    
    await page.goBack();
    await pageObj.verifyPageTitle();
  });

  // Ex-060: Validate Create External subscriber using special characters Name
  test('Ex-060 Validate Create External subscriber using special characters Name', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitCat();
    await pageObj.forceClickEvent(pageObj.getExtUserBtn());
    await pageObj.forceClickEvent(pageObj.getAddExternalUserBtn());
    
    await pageObj.getNameInput().fill('External_Subs@#$');
    await pageObj.getPhoneInput().fill('1234567890123');
    await pageObj.clickSaveBtn();
    
    await page.goBack();
    await pageObj.verifyPageTitle();
  });
});
