import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { setupOSMPage } from '../../../helpers/common';

test.describe('One Portal CAT - OSM Landing Page', () => {
  let newPageObj: CATPage;

  // OSM-01: Visit the OSM landing page
  test('OSM-01 visit the OSM landing page', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const osmCreateButton = newPageObj.osmCreateButton();
    await expect(osmCreateButton).toBeVisible();
  });

  // OSM-02: Verify OSM tooltip
  test('OSM-02 verify OSM tooltip', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const textWrap = newPageObj.getPage().locator('.msi-text-wrap');
    await expect(textWrap).toBeVisible();
  });

  // OSM-03: Verify the OSM header
  test('OSM-03 verify the OSM header', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const headerElement = newPageObj.getPage().getByRole('heading', { name: 'OSM Configuration' });
    await expect(headerElement).toBeVisible();
  });

  // OSM-04: Verify the OSM searchbox
  test('OSM-04 verify the OSM searchbox', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const searchBox = newPageObj.getOSMSearchBox();
    await expect(searchBox).toBeVisible();
  });

  // OSM-05: Verify the OSM searchbox with less than 3 chars & clear functionality
  test('OSM-05 verify the OSM searchbox with lessthan 3 char & get the error message', async ({ page, context }) => {
    
    newPageObj = await setupOSMPage(page, context);
    
    const searchBox = newPageObj.getOSMSearchBox();
    
    // Wait for search box to be enabled before testing
    await expect(searchBox).toBeVisible();
    
    // Test search functionality with different inputs
    await searchBox.fill('a');
    await expect(newPageObj.getOSMSearchErrorMessage()).toBeVisible();
    
    await searchBox.fill('ab');  
    await expect(newPageObj.getOSMSearchErrorMessage()).toBeVisible();
    
    await searchBox.fill('abc');
    await expect(newPageObj.getOSMSearchErrorMessage()).toBeHidden();
  });

  // OSM-06: Clear the searchbox and verify functionality
  test('OSM-06 clear the searchbox', async ({ page, context }) => {
   
    newPageObj = await setupOSMPage(page, context);
    
    const searchBox = newPageObj.getOSMSearchBox();
    
    // Wait for search box to be enabled and fill with valid text  
    await expect(searchBox).toBeVisible();
    await searchBox.fill('test');
    await expect(searchBox).toHaveValue('test');
    
    // Clear the search box using keyboard shortcut
   
    await searchBox.clear();
    
    // Verify search box is cleared
    await expect(searchBox).toHaveValue('');
  });

  // OSM-07: Verify the OSM pagination
  test('OSM-07 verify the OSM pagination', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const pagination = newPageObj.getPagination();
    await expect(pagination).toBeVisible();
  });

  // OSM-08: Verify the OSM table header
  test('OSM-08 verify the OSM table header', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const dropList = newPageObj.getPage().locator('#cdk-drop-list-1');
    await expect(dropList).toBeVisible();
    
    const headerHandles = newPageObj.getPage().locator('.cdk-drag-handle');
    await expect(headerHandles.first()).toBeVisible();
    await expect(headerHandles.nth(1)).toBeVisible();
  });

  // OSM-09: Verify the OSM table body
  test('OSM-09 verify the OSM table body', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const tableContainer = newPageObj.getPage().locator('.msi-table');
    await expect(tableContainer).toBeVisible();
  });

  // OSM-10: Verify the OSM create list button
  test('OSM-10 verify the OSM create list button', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
  });

  // OSM-11: Verify the OSM export button
  test('OSM-11 verify the OSM export button', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const exportButton = newPageObj.getPage().locator('button[id="osm-export-btn"]');
    await expect(exportButton).toBeVisible();
  });
});
