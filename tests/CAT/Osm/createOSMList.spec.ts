import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Create OSM List', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    // Direct navigation to OSM landing page
    await page.goto('http://192.168.1.35:4200/');
  });

  // OSM-012: Visit the OSM landing page
  test('OSM-012 visit the OSM landing page', async ({ page }) => {
    pageObj = new CATPage(page);
    
    const sideMenu = pageObj.nagavateToSideMenu();
    await sideMenu.nth(8).click();
    await page.waitForTimeout(1000);
  });

  // OSM-013: Verify the OSM create list button
  test('OSM-013 verify the OSM create list button', async ({ page }) => {
    const createBtn = page.locator('.pg-title-bar > .msi-btn').filter({ hasText: 'Create List' });
    await expect(createBtn).toBeVisible();
    await createBtn.click();
  });

  // OSM-014: Verify the Create OSM header and details
  test('OSM-014 verify the Create OSM header title', async ({ page }) => {
    const headerTitle = page.locator('.pg-title').filter({ hasText: 'OSM Configuration Details' });
    await expect(headerTitle).toBeVisible();
    
    const cancelBtn = page.locator('.d-flex > div > .msi-btn-secondary').filter({ hasText: 'Cancel' });
    await expect(cancelBtn).toBeVisible();
    
    const pttName = page.locator('.ptt_name');
    await expect(pttName).toBeVisible();
    
    const expandIcon = page.locator('.opened > i').first();
    await expect(expandIcon).toBeVisible();
    await expandIcon.click();
    await expandIcon.click();
  });

  // OSM-015: Verify the OSM List page BasicInfo
  test('OSM-015 verify the OSM List page BasicInfo', async ({ page }) => {
    const basicInfoHeader = page.locator('.ptt-information-header').filter({ hasText: 'Basic Information' });
    await expect(basicInfoHeader).toBeVisible();
    
    const listNameLabel = page.locator('.msi-textbox-label').filter({ hasText: 'List Name' });
    await expect(listNameLabel).toBeVisible();
    
    const checkbox = page.locator('.msi-talk-checkbox > .msi-checkbox-label > .msi-checkbox-icon-wrapper > .msi-checkbox-icon > i');
    await expect(checkbox).toBeVisible();
    
    const input = page.locator('.row > :nth-child(1) > .msi-input');
    await expect(input).toBeVisible();
  });

  // OSM-016: Verify the group details
  test('OSM-016 verify the group details', async ({ page }) => {
    const tabGroup = page.locator('.msi-tab-group');
    await expect(tabGroup).toBeVisible();
    
    const tabLabel = page.locator('.msi-tab-label').filter({ hasText: 'List Messages' });
    await expect(tabLabel).toBeVisible();
  });

  // OSM-017: Verify searchbox with less than 3 chars
  test('OSM-017 verify the OSM details searchbox with less than 3 char & error message', async ({ page }) => {
    pageObj = new CATPage(page);
    const searchBox = pageObj.getSearchBox();
    await expect(searchBox).toBeVisible();
    await searchBox.fill('a');
    
    const errorMsg = page.locator('.error_msg').filter({ hasText: 'Search Value should be more than 2 chars' });
    await expect(errorMsg).toBeVisible();
  });

  // OSM-018: Check if OSM List exists and delete
  test('OSM-018 check the OSM List Exists or not, if Exists then delete', async ({ page }) => {
    pageObj = new CATPage(page);
    
    await pageObj.deleteOSMList('TestOSMList');
  });

  // OSM-019: Add the List Name and save
  test('OSM-019 add the List Name, click default for talkgroups & save', async ({ page }) => {
    const listNameInput = page.locator('.row > :nth-child(1) > .msi-input').first();
    await listNameInput.fill('TestOSMList');
    
    const checkbox = page.locator('.msi-talk-checkbox > .msi-checkbox-label > .msi-checkbox-icon-wrapper > .msi-checkbox-icon > i');
    await checkbox.click();
    
    pageObj = new CATPage(page);
    await pageObj.addOSMMssg('TestCode', 'ShortMsg', 'LongMessage');
    
    const saveBtn = page.locator('.ms-2');
    await saveBtn.click({ force: true });
  });

  // OSM-020: Verify the OSM LIST in Landing page
  test('OSM-020 verify the OSM LIST in Landing page', async ({ page }) => {
    pageObj = new CATPage(page);
    
    const sideMenu = pageObj.nagavateToSideMenu();
    await sideMenu.nth(8).click();
    
    await pageObj.verifySearch('TestOSMList');
  });
});
