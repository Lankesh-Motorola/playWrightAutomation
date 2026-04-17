import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Verify Assign User Set', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // US-004: Verify assigning user Sets to the Users
  test('US-004 Verify assiging user Sets to the Users', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitUserSetEditPage();
    await pageObj.assignUserSet(1);
  });

  // US-005: Verify navigating to Created Userset in View Mode
  test('US-005 Verify navigating to the Created Userset in View Mode and verify the fields', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitUserSetViewPage();
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetDisName());
    await pageObj.checkVisibility(pageObj.getUserSetUser());
    await pageObj.checkVisibility(pageObj.getUserSetUserAssign());
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetTalk());
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetMemberCount());
  });

  // US-006: Verify Adding Members from View to Edit Mode
  test('US-006 Verify Adding Members to the from View to Edit Mode', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitUserSetViewPage();
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetDisName());
    await pageObj.checkVisibility(pageObj.getUserSetUser());
    await pageObj.checkVisibility(pageObj.getUserSetUserAssign());
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetTalk());
    await page.waitForTimeout(1000);
    
    await pageObj.checkVisibility(pageObj.getUserSetMemberCount());
    
    // Click edit button
    await pageObj.clickEvent(pageObj.getEditButton2());
    await pageObj.checkVisibility(pageObj.getAssignIconUserSet());
    
    // Click assign button
    await pageObj.clickEvent(pageObj.getAssignIconUserSet());
    await page.waitForTimeout(1000);
    
    // Search and select
    const popupBtn = pageObj.getPopUpButton();
    await popupBtn.clear();
    await popupBtn.fill('TestUser');
    
    await pageObj.clickEvent(pageObj.getAssinedCheckBox().nth(3));
    await page.waitForTimeout(2000);
    
    // Click assign
    await pageObj.clickEvent(pageObj.getAssignButton());
    await page.waitForTimeout(2000);
    
    // Click OK on popup
    await pageObj.clickEvent(pageObj.getOkButton());
    await pageObj.checkVisibility(pageObj.getUserSetMemberCount());
    
    await page.waitForTimeout(1000);
    
    // Search and update
    const searchBox = pageObj.getSearchBox();
    await searchBox.clear();
    await searchBox.fill('TestUser');
    
    await pageObj.clickEvent(pageObj.getAssinedCheckBox().nth(3));
    
    const nameInput = pageObj.getUserSetNameInput();
    await nameInput.clear();
    await nameInput.fill('UpdatedUserSetName');
    
    await pageObj.clickEvent(pageObj.getSaveButton());
    await pageObj.clickEvent(pageObj.getOkButton());
    await pageObj.clickEvent(pageObj.getCancelButton());
    
    await page.waitForTimeout(5000);
    await pageObj.validateDisplayObj('UpdatedUserSetName');
  });
});
