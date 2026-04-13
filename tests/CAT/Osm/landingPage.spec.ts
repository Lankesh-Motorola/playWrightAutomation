import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - OSM Landing Page', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    // Direct navigation to OSM landing page
    await page.goto('http://192.168.1.35:4200/');
  });

  // OSM-001: Visit the OSM landing page
  test('OSM-001 visit the OSM landing page', async ({ page }) => {
    pageObj = new CATPage(page);
    
    const sideMenu = pageObj.nagavateToSideMenu();
    await sideMenu.nth(8).click();
    await page.waitForTimeout(1000);
  });

  // OSM-002: Verify OSM tooltip
  test('OSM-002 verify OSM tooltip', async ({ page }) => {
    const textWrap = page.locator('.msi-text-wrap').first();
    await expect(textWrap).toBeVisible();
  });

  // OSM-003: Verify the OSM header
  test('OSM-003 verify the OSM header', async ({ page }) => {
    const header = page.locator('h3').filter({ hasText: 'OSM Configuration List' });
    await expect(header).toBeVisible();
  });

  // OSM-004: Verify the OSM searchbox
  test('OSM-004 verify the OSM searchbox', async ({ page }) => {
    pageObj = new CATPage(page);
    const searchBox = pageObj.getSearchBox();
    await expect(searchBox).toBeVisible();
  });

  // OSM-005: Verify the OSM searchbox with less than 3 chars
  test('OSM-005 verify the OSM searchbox with lessthan 3 char & get the error message', async ({ page }) => {
    pageObj = new CATPage(page);
    const searchBox = pageObj.getSearchBox();
    await searchBox.fill('a');
    
    const errorMsg = page.locator('.error_msg').filter({ hasText: 'Search Value should be more than 2 chars' });
    await expect(errorMsg).toBeVisible();
  });

  // OSM-006: Clear the searchbox
  test('OSM-006 clear the searchbox', async ({ page }) => {
    const clearBtn = page.locator('.iconCls.ic_remove.msi-focus svg').first();
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
  });

  // OSM-007: Verify the OSM pagination
  test('OSM-007 verify the OSM pagination', async ({ page }) => {
    pageObj = new CATPage(page);
    const pagination = pageObj.getPagination();
    await expect(pagination).toBeVisible();
  });

  // OSM-008: Verify the OSM table header
  test('OSM-008 verify the OSM table header', async ({ page }) => {
    const dropList = page.locator('#cdk-drop-list-1');
    await expect(dropList).toBeVisible();
    
    const headerLeft = page.locator('.msi-col-float-left > .msi-table-header-wrapper > .msi-table-header-left > .msi-header-text > .cdk-drag-handle');
    await expect(headerLeft).toBeVisible();
    
    const headerRight = page.locator('.cdk-drag > .msi-table-header-wrapper > .msi-table-header-left > .msi-header-text > .cdk-drag-handle');
    await expect(headerRight).toBeVisible();
  });

  // OSM-009: Verify the OSM table body
  test('OSM-009 verify the OSm table body', async ({ page }) => {
    const tableRow = page.locator('[aria-rowindex="2"] > .visible-row');
    await expect(tableRow).toBeVisible();
    
    const col1 = page.locator('[aria-rowindex="2"] > .visible-row > [aria-colindex="1"]');
    await expect(col1).toBeVisible();
    
    const col2 = page.locator('[aria-rowindex="2"] > .visible-row > [aria-colindex="2"]');
    await expect(col2).toBeVisible();
    
    const viewIcon = page.locator('[aria-rowindex="2"] > .visible-row > .msi-col-float-right > .cell-wrapper > .table-rtl > [title="VIEW"] > .action-icon > svg');
    await expect(viewIcon).toBeVisible();
  });

  // OSM-010: Verify the OSM create list button
  test('OSM-010 verify the OSM create list button', async ({ page }) => {
    const createBtn = page.locator('.pg-title-bar > .msi-btn').filter({ hasText: 'Create List' });
    await expect(createBtn).toBeVisible();
  });

  // OSM-011: Verify the OSM export button
  test('OSM-011 verify the OSM export button', async ({ page }) => {
    const exportBtn = page.locator('.col-md-10 > .msi-btn').first();
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();
  });
});
