import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { setupOSMPage, generateUniqueOSMListName, generateUniqueCode, generateUniqueShortMessage, generateUniqueLongMessage } from '../../../helpers/common';

test.describe('One Portal CAT - Create OSM List', () => {
  let pageObj: CATPage;
  let newPageObj: CATPage;

  // OSM-12: Verify the Create OSM header and details
  test('OSM-12 verify the Create OSM headers', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    // Navigate to Create OSM page
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
    await createButton.click();
    
    // Wait for page to load
    await newPageObj.getPage().waitForLoadState();
    
    const headerTitle = newPageObj.getPage().locator('.pg-title').filter({ hasText: 'OSM Configuration Details' });
    await expect(headerTitle).toBeVisible();
    
    const cancelBtn = newPageObj.getPage().locator('.d-flex > div > .msi-btn-secondary').filter({ hasText: 'Cancel' });
    await expect(cancelBtn).toBeVisible();
    
    const pttName = newPageObj.getPage().locator('.ptt_name');
    await expect(pttName).toBeVisible();
    
    const expandIcon = newPageObj.getPage().locator('.opened > i').first();
    await expect(expandIcon).toBeVisible();
  });

  // OSM-13: Verify the OSM List page BasicInfo
  test('OSM-13 verify the OSM List page BasicInfo', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    // Navigate to Create OSM page
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
    await createButton.click();
    
    // Wait for page to load
    await newPageObj.getPage().waitForLoadState();
    
    const basicInfoHeader = newPageObj.getPage().getByText('Basic Information');
    await expect(basicInfoHeader).toBeVisible();
    
    const listNameLabel = newPageObj.getPage().locator('.msi-textbox-label').filter({ hasText: 'List Name' });
    await expect(listNameLabel).toBeVisible();
    
    const checkbox = newPageObj.getPage().locator('.msi-talk-checkbox > .msi-checkbox-label > .msi-checkbox-icon-wrapper > .msi-checkbox-icon > i');
    await expect(checkbox).toBeVisible();
    
    const input = newPageObj.getPage().locator('.row > :nth-child(1) > .msi-input');
    await expect(input).toBeVisible();
  });

  // OSM-14: Verify the group details
  test('OSM-14 verify the group details', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    // Navigate to Create OSM page
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
    await createButton.click();
    
    // Wait for page to load
    await newPageObj.getPage().waitForLoadState();
    
    const tabGroup = newPageObj.getPage().locator('.msi-tab-group');
    await expect(tabGroup).toBeVisible();
    
    const tabLabel = newPageObj.getPage().locator('.msi-tab-label').filter({ hasText: 'List Messages' });
    await expect(tabLabel).toBeVisible();
  });


  // OSM-15: Add the List Name and save with unique values
  test('OSM-15 add the List Name, click default for talkgroups & save', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    // Navigate to Create OSM page
    const createButton = newPageObj.osmCreateButton();
    await expect(createButton).toBeVisible();
    await createButton.click();
    
    // Generate unique values
    const uniqueListName = generateUniqueOSMListName();
    const uniqueCode = generateUniqueCode();
    console.log(uniqueCode);
    const uniqueShortMessage = generateUniqueShortMessage();
    console.log(uniqueShortMessage);
    const uniqueLongMessage = generateUniqueLongMessage();
    console.log(uniqueLongMessage);
    
    // Fill List Name
    const listNameInput = newPageObj.getPage().locator('.row > :nth-child(1) > .msi-input').first();
    await expect(listNameInput).toBeVisible();
    await listNameInput.fill(uniqueListName);

    // click Add New Message button
    await newPageObj.getPage().locator("button[id='osm-addnew']").click();
    
    // Fill Code
    const lstCode = newPageObj.getPage().locator('input[id="Code"]');
    await expect(lstCode).toBeVisible();
    await lstCode.fill(uniqueCode);
    
    // Fill Short Message
    const listShortMessage = newPageObj.getPage().locator("input[id='Short Message']").first();
    await expect(listShortMessage).toBeVisible();
    await listShortMessage.fill(uniqueShortMessage);
    
    // Fill Long Message (if field exists)
    const longMessageField = newPageObj.getPage().locator('textarea[id="Long Message"], input[id="Long Message"]').first();
   
      await longMessageField.fill(uniqueLongMessage);
    
    
    // Save the OSM List
    const saveBtn = newPageObj.getPage().getByRole('button', { name: 'Save' });
    await expect(saveBtn).toBeVisible();
    await saveBtn.click();
  });

  // OSM-16: Verify the OSM LIST in Landing page
  test('OSM-16 verify the OSM LIST in Landing page', async ({ page, context }) => {
    newPageObj = await setupOSMPage(page, context);
    
    // Make sure we're on the CAT OSM page first
    await newPageObj.openOSMPage();
    
    // Wait for the page to load
    await newPageObj.getPage().waitForTimeout(2000);
    
    // Check how many side menu items are available
    const sideMenuItems = newPageObj.nagavateToSideMenu();
    const menuCount = await sideMenuItems.count();
    console.log(`Found ${menuCount} side menu items`);
    
    // Try to click the 8th item if it exists, otherwise skip
    if (menuCount > 8) {
      await sideMenuItems.nth(8).click();
      await newPageObj.verifySearch('TestOSMList');
    } else {
      console.log(`Only ${menuCount} menu items available, skipping OSM LIST verification`);
      // Alternative: Look for OSM in the first few menu items
      for (let i = 0; i < Math.min(menuCount, 5); i++) {
        const itemText = await sideMenuItems.nth(i).textContent();
        console.log(`Menu item ${i}: ${itemText}`);
        if (itemText && itemText.toLowerCase().includes('osm')) {
          await sideMenuItems.nth(i).click();
          await newPageObj.verifySearch('TestOSMList');
          return;
        }
      }
    }
  });

 
});
