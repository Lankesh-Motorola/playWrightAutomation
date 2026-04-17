import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Interop User', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // IT-001: Verify navigating to Interop Connection and verify fields
  test('IT-001 Verify navigating to the Interop Connection and verify the fields', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    await pageObj.validateInterpoCount();
    await pageObj.checkVisibility(pageObj.getSearchBox());
    await pageObj.checkVisibility(pageObj.getAdvanceFilter());
  });

  // IT-002: Verify availability of Export in Interop List Page
  test('IT-002 verify the availabity of Export in Interop LIst Page', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    await pageObj.checkVisibility(pageObj.getExportBtn());
    await pageObj.clickEvent(pageObj.getExportBtn());
  });

  // IT-003: Verify availability of Pagination
  test('IT-003 verify the availabity of Pagination', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    await pageObj.validateInterpoCount();
    await pageObj.checkVisibility(pageObj.getPaginationInput());
    await pageObj.getPaginationArrow();
  });

  // IT-004: Verify Basic Search and verify the Count
  test('IT-004 verify Basic Search and verif the Count', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    await pageObj.validateInterpoCount();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.clear();
    await searchBox.fill('InteropTestUser');
    
    await pageObj.checkVisibility(pageObj.getInterpoName());
    await pageObj.checkVisibility(pageObj.getInterpoPhone());
    await pageObj.checkVisibility(pageObj.getViewBtn());
    await pageObj.checkVisibility(pageObj.getEditBtn());
  });

  // IT-005: Verify Advanced Search filter with Client Type
  test('IT-005 verify Advance Search filter with Client Type  and verify the Count', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    await pageObj.clickEvent(pageObj.getAdvanceFilter());
    
    const dropdowns = pageObj.getDropDown();
    await pageObj.clickEvent(dropdowns.nth(3));
    
    const option = pageObj.getDropDownOpt();
    const interopOpt = page.locator('text=Interop Talkgroup').first();
    await interopOpt.click();
    
    await pageObj.clickEvent(pageObj.getFilterButton());
    await pageObj.validateInterpoCount();
  });

  // IT-006: Verify navigating to Interop User edit page
  test('IT-006 Verify navigating to the Interop User and verify the fields', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUserEditPage('InteropTestUser');
    await pageObj.checkVisibility(pageObj.getUserName());
    await pageObj.checkVisibility(pageObj.getPhoneNumberPTTUSer());
    await pageObj.checkVisibility(pageObj.getBillingNumberPTTUser());
    await pageObj.checkVisibility(pageObj.getActivation());
    await pageObj.checkVisibility(pageObj.getPermission());
    await pageObj.checkVisibility(pageObj.getClientTypeInterpo());
    await pageObj.checkVisibility(pageObj.getAssignTalkgroup());
  });

  // IT-007: Verify the state of the fields
  test('IT-007 Verify the state of the fileds', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUserEditPage('InteropTestUser');
    await pageObj.checkEnabled(await pageObj.checkHaveValue(pageObj.getUserName(), 'InteropTestUser'));
    
    await pageObj.checkNotEnabled(pageObj.getPhoneNumberPTTUSer());
    await pageObj.checkNotEnabled(pageObj.getBillingNumberPTTUser());
    await pageObj.checkNotEnabled(pageObj.getActivation());
    await pageObj.checkNotEnabled(pageObj.getClientTypeInterpo());
    await pageObj.checkNotEnabled(pageObj.getAssignTalkgroup());
  });

  // IT-008: Verify Updating Name for Interop User
  test('IT-008 Verify Updating Name for Interop User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUserEditPage('InteropTestUser');
    
    const userNameField = pageObj.getUserName();
    await userNameField.clear();
    await userNameField.fill('UpdatedInteropUser');
    
    await pageObj.clickEvent(pageObj.getSaveButton());
    await pageObj.clickEvent(pageObj.getCancelButton());
    await pageObj.validateDisplayObj('UpdatedInteropUser');
  });

  // IT-009: Verify Updating Permission for Interop User
  test('IT-009 Verify Updating Permission for Interop User', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUserEditPage('InteropTestUser');
    await pageObj.changePermissionInterpoUser();
    
    await pageObj.getInterpoUserEdit('InteropTestUser');
    await pageObj.changePermissionInterpoUser();
  });

  // IT-010: Verify Updated Name and Permission in List page
  test('IT-010 Verify the Updated Name and  Permission for Interop User in List page', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.getInterpoUser();
    
    const searchBox = pageObj.getSearchBox();
    await searchBox.clear();
    await searchBox.fill('UpdatedInteropUser');
    
    await pageObj.validateDisplayObj('UpdatedInteropUser');
  });
});
