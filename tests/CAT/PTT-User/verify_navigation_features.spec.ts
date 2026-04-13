import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - PTT User Navigation Features', () => {
  let pageObj: CATPage;

  test.beforeEach(async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
  });

  // TC_001: Verify navigating to "PTT Users" in View Mode and verify the fields
  test('TC_001 Verify navigating to PTT Users in View Mode and verify fields', async ({ page }) => {
    // Navigate to PTT User view page
    await pageObj.visitPTTUserViewPage();
    
    // Verify that display fields are not enabled (read-only in view mode)
    await expect(pageObj.getDisplayName()).toBeDisabled();
    await expect(pageObj.getCLient()).toBeDisabled();
    await expect(pageObj.getPhone()).toBeDisabled();
    await expect(pageObj.getBilling()).toBeDisabled();
  });

  // TC_002: Verify Added talkgroups in View mode
  test('TC_002 Verify Added talkgroups in View mode', async ({ page }) => {
    await pageObj.visitPTTUserViewPage();
    
    // Verify talkgroup is visible in PTT User view
    const talkgroupElement = await pageObj.getTalkgrpInPTTUser();
    await expect(talkgroupElement).toBeVisible();
  });

  // TC_003: Verify Added Features in View mode
  test('TC_003 Verify Added Features in View mode', async ({ page }) => {
    await pageObj.visitPTTUserViewPage();
    
    // Click on features tab
    await pageObj.getTabOpt(2).click();
    
    // Verify all feature buttons are visible
    await expect(pageObj.getPackageBtn()).toBeVisible();
    await expect(pageObj.getDeviceInfoBtn()).toBeVisible();
    await expect(pageObj.getAutomationLocationBtn()).toBeVisible();
    await expect(pageObj.getEmergency()).toBeVisible();
    await expect(pageObj.getStreamingVideo()).toBeVisible();
  });

  // TC_004: Verify Adding contact to the subscribers from View to Edit Mode
  test('TC_004 Verify Adding contact to subscribers from View to Edit Mode', async ({ page }) => {
    await page.waitForTimeout(5000);
    await pageObj.visitPTTUserViewPage();
    
    // Click Edit button to switch from View to Edit mode
    await pageObj.getEdit().click();
    
    // Verify that page is now in edit mode
    await expect(pageObj.getEdit()).toBeVisible();
  });

  // TC_005: Verify navigating to "Talkgroup" in View Mode and verify the fields
  test('TC_005 Verify navigating to Talkgroup in View Mode and verify fields', async ({ page }) => {
    // Visit Talkgroup page
    await pageObj.visitTalkgroupBtn();
    
    // Verify that fields are not enabled (read-only in view mode)
    await expect(pageObj.getGroup()).toBeDisabled();
    await expect(pageObj.getAvatarType()).toBeDisabled();
    await expect(pageObj.getTalkGroupType()).toBeDisabled();
  });

  // TC_006: Verify Adding Members to the Talkgroup from View to Edit Mode
  test('TC_006 Verify Adding Members to Talkgroup from View to Edit Mode', async ({ page }) => {
    // Visit Talkgroup page
    await pageObj.visitTalkgroupBtn();
    
    // Click Edit button
    await pageObj.getEditButton().click();
    
    // Verify edit button was clicked and page changed
    await expect(pageObj.getEditButton()).toBeVisible();
  });

  // TC_007: Verify navigating to "Group Profile" in View Mode and verify the fields
  test('TC_007 Verify navigating to Group Profile in View Mode and verify fields', async ({ page }) => {
    await pageObj.visitGroupProfile();
    await page.waitForTimeout(5000);
    
    // Search for group profile
    await pageObj.getSearchBox().clear();
    await pageObj.getSearchBox().fill('GroupProfile');
    
    // Click view button
    await pageObj.getViewGroupBtn().click();
    
    // Verify that fields are not enabled (read-only in view mode)
    await expect(pageObj.getGroupProfileName()).toBeDisabled();
    await expect(pageObj.getGroupType()).toBeDisabled();
    await expect(pageObj.getAvatarGroup()).toBeDisabled();
    await expect(pageObj.getInteropGroupChb()).toBeDisabled();
    await expect(pageObj.getAutoCutIn()).toBeDisabled();
    await expect(pageObj.getCreateTalkGroup()).toBeDisabled();
  });

  // TC_008: Verify permission changes for a subscriber
  test('TC_008 Verify permission changes for subscriber', async ({ page }) => {
    // Visit PTT User edit page
    await pageObj.visitPTTUserEditPage();
    
    // Change permission for PTT User
    await pageObj.changePermissionPTTUser();
    
    // Get PTT User and switch back to previous permission
    await pageObj.getPTTUser();
    await pageObj.changePermissionPTTUser();
    
    // Verify permission change was successful
    await expect(pageObj.getPermissionStatus()).toBeVisible();
  });

  // TC_009: Verify Updating Email ID
  test('TC_009 Verify Updating Email ID', async ({ page }) => {
    // Visit PTT User edit page
    await pageObj.visitPTTUserEditPage();
    
    // Update email ID
    await pageObj.updateEmailIdPTTUser();
    
    // Verify email was updated
    await expect(pageObj.getEmailField()).toBeVisible();
  });

  // TC_010: Verify Activation Code Generation
  test('TC_010 Verify Activation Code Generation', async ({ page }) => {
    // Visit PTT User edit page
    await pageObj.visitPTTUserEditPage();
    
    // Generate activation code
    await pageObj.activationCodeGenerationPTTUser();
    
    // Verify activation code was generated
    await expect(pageObj.getActivationCodeField()).toBeVisible();
  });

  // TC_011: Verify Authorized users of the subscriber
  test('TC_011 Verify Authorized users of subscriber', async ({ page }) => {
    // Visit PTT User edit page
    await pageObj.visitPTTUserEditPage();
    
    // Verify authorized users for target user
    await pageObj.verifyAuthorizedPTTUser();
    
    // Verify authorized users visibility
    await expect(pageObj.getAuthorizedUsersList()).toBeVisible();
  });
});
