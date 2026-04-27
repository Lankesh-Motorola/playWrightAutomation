import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { generateUniqueOSMListName, setupOSMPage } from '../../../helpers/common';

test.describe('One Portal CAT - OSM Landing Page', () => {
  let newPageObj: CATPage;

    test('OSM-01 create complete OSM List with verification', async ({ page, context }) => {
      // Step 1: Enter OSM page using existing functions
      newPageObj = await setupOSMPage(page, context);
      
      // Step 2: Click Create OSM List button
      const createButton = newPageObj.osmCreateButton();
      await expect(createButton).toBeVisible();
      await createButton.click();
      
      // Wait for create form to load
      await newPageObj.getPage().waitForLoadState();
      await newPageObj.getPage().waitForTimeout(2000);
      
      // Step 3: Enter unique list name starting with OSM-
      const uniqueListName = generateUniqueOSMListName();
      const listNameInput = newPageObj.getPage().locator('.row > :nth-child(1) > .msi-input').first();
      await expect(listNameInput).toBeVisible();
      await listNameInput.fill(uniqueListName);
      
      // Verify the name was entered correctly
      await expect(listNameInput).toHaveValue(uniqueListName);
      
      // Step 4: Click Save button
      const saveBtn = newPageObj.getPage().locator('button:has-text("Save"), .ms-2').first();
      await expect(saveBtn).toBeVisible();
      await saveBtn.click({ force: true });
      
      // Step 5: Wait for save operation to complete
      await newPageObj.getPage().waitForTimeout(3000);
      
      // Alternative: Wait for page navigation or list to load
      try {
        // Try to wait for URL change or page reload  
        await newPageObj.getPage().waitForLoadState('networkidle', { timeout: 10000 });
      } catch (error) {
        console.log('Page did not change significantly, continuing...');
      }
      
      // Step 6: Navigate back to OSM list to verify created list
      await newPageObj.openOSMPage();
      await newPageObj.getPage().waitForLoadState();
      await newPageObj.getPage().waitForTimeout(2000);
      
      // Wait for any toast messages to disappear
      await newPageObj.getPage().locator('.msi-toast-message').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
      
      // Step 7: Verify the created list name is present in the list using specific selector
      const createdListItem = newPageObj.getPage().locator(`p.ellipse_pp:has-text("${uniqueListName}")`);
      await expect(createdListItem).toBeVisible();
      
      
    });

  // OSM-02: Visit the OSM landing page
  test('OSM-02 visit the OSM landing page', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    const osmCreateButton = newPageObj.osmCreateButton();
    await expect(osmCreateButton).toBeVisible();
  });

  // OSM-03: Verify OSM tooltip
  test('OSM-03 verify OSM tooltip', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const textWrap = newPageObj.getPage().locator('.msi-text-wrap');
    await expect(textWrap).toBeVisible();
  });

  // OSM-04: Verify the OSM header
  test('OSM-04 verify the OSM header', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const headerElement = newPageObj.getPage().getByRole('heading', { name: 'OSM Configuration' });
    await expect(headerElement).toBeVisible();
  });

  // OSM-05: Verify the OSM searchbox
  test('OSM-05 verify the OSM searchbox', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const searchBox = newPageObj.getOSMSearchBox();
    await expect(searchBox).toBeVisible();
  });

  // OSM-06: Verify the OSM searchbox with less than 3 chars & clear functionality
  test('OSM-06 verify the OSM searchbox with lessthan 3 char & get the error message', async ({ page, context }) => {
    
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

  // OSM-07: Clear the searchbox and verify functionality
  test('OSM-07 clear the searchbox', async ({ page, context }) => {
   
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

  // OSM-08: Verify the OSM pagination
  test('OSM-08 verify the OSM pagination', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const pagination = newPageObj.getPagination();
    await expect(pagination).toBeVisible();
  });

  // OSM-09: Verify the OSM table header
  test('OSM-09 verify the OSM table header', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const dropList = newPageObj.getPage().locator('#cdk-drop-list-1');
    await expect(dropList).toBeVisible();
    
    const headerHandles = newPageObj.getPage().locator('.cdk-drag-handle');
    await expect(headerHandles.first()).toBeVisible();
    await expect(headerHandles.nth(1)).toBeVisible();
  });

  // OSM-10: Verify the OSM table body
  test('OSM-10 verify the OSM table body', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const tableContainer = newPageObj.getPage().locator('.msi-table');
    await expect(tableContainer).toBeVisible();
  });

  // OSM-11: Verify the OSM create list button
  test('OSM-11 verify the OSM create list button', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
  });

  // OSM-12: Verify the OSM export button
  test('OSM-12 verify the OSM export button', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    const exportButton = newPageObj.getPage().locator('button[id="osm-export-btn"]');
    await expect(exportButton).toBeVisible();
  });
});
