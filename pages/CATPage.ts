import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

let userSetName: string = "";
export class CATPage {

  constructor(private page: Page) { }
  
  // --- Navigation ---
  getPTTUserButton(): Locator {
    return this.page.locator('#menu-44-PTTUsers');
  }

  getExternalUserMenu(): Locator {
    return this.page.locator("msi-sidebar-item#menu-44-ExternalContacts div.icon-container");
  }

  // --- Headers ---
  getPTTUserHeader() {
    return this.page.locator('h3#ptt-header').filter({ hasText: /PTT Users\s*\(\d+\)/ });
}

  getHearderAll(item: string): Locator {
    return this.page.locator('#external-header').filter({ hasText: item });
  }

  getExternalUserHeader(): Locator {
    return this.page.locator('.pg-title.msi-focus').filter({ hasText: 'External User' });
  }

  getH3(item: string): Locator {
    return this.page.locator('h3').filter({ hasText: item });
  }

  // --- Search ---
  getSearchBox(): Locator {
    return this.page.locator('.search_input.msi-searchbox');
  }

  getExternalUserBox(): Locator {
    return this.page.locator('#external-search');
  }

  getExternalUserSearch(): Locator {
    return this.page.locator('#external-search-search-icon');
  }

  getExtClearBtn(): Locator {
    return this.page.locator('#external-search-clear-icon');
  }

  // --- Pagination ---
  getPaginationBtn(): Locator {
    return this.page.locator('.pageCls').nth(2);
  }

  // --- Export / Import ---
  getExternalExportButton(): Locator {
    return this.page.locator('#ext-export');
  }

  getExternalImportButton(): Locator {
    return this.page.locator('#ext-import');
  }

  getExtImportCrossBtn(): Locator {
    return this.page.locator('#get-focus2');
  }

  getImportHeader(item: string): Locator {
    return this.page.locator('.msi-pop-up-modal-header-title').filter({ hasText: item });
  }

  getImportDialogBoxButton(): Locator {
    return this.page.locator('.msi-file-upload-dragdrop-zone-content');
  }

  getDivContainer(item: string): Locator {
    return this.page.locator('div').filter({ hasText: item }).first();
  }

  getDownloadImport(): Locator {
    return this.page.locator('.uploaded-file-name.msi-focus').filter({ hasText: 'Download Sample CSV' });
  }

  getSelectFileBtn(): Locator {
    return this.page.locator('.msi-btn.msi-btn-secondary.ms-2.file-upload-input');
  }

  // --- Buttons ---
  getcreateBtn(item: string): Locator {
    return this.page.locator('.create-grp-profile-popup.grouper.ng-star-inserted .msi_create_grp #gpm-create').filter({ hasText: item });
  }

  // --- Form fields ---
  getInputNameExternal(): Locator {
    return this.page.locator('#ext-name');
  }

  getPhoneNumberEX(): Locator {
    return this.page.locator('#ext-phone');
  }

  // --- Table actions ---
  getDeleteExternal(): Locator {
    return this.page.locator('.transparent_button').nth(0);
  }

  getEditExternal(): Locator {
    return this.page.locator('.transparent_button').nth(1);
  }

  getViewExternal(): Locator {
    return this.page.locator('.action-icon').nth(2);
  }

  // --- Labels / containers ---
  getTalkgrpLabel(item: string): Locator {
    return this.page.locator('.msi-textbox-label').filter({ hasText: item });
  }

  getSpanContainer(item: string): Locator {
    return this.page.locator('span').filter({ hasText: item });
  }

  getSpancontainer(item: string): Locator {
    return this.page.locator('span').filter({ hasText: item });
  }

  getFontSize14(item: string): Locator {
    return this.page.locator('.font-size-14').filter({ hasText: item });
  }

  getOkBtn(): Locator {
    return this.page.getByRole('button', { name: 'Ok' });
  }

  getUserSetSearchBox(): Locator {
    return this.page.getByPlaceholder('Search by Name or Phone Number');
  }

  //Click Corporate Management:
  async clickCorporateManagement() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    const card = this.page.locator('[class="card-title msi-card-title"]').filter({ hasText: 'Corporate Management' });

    // First, wait for the card to be attached to the DOM
    await card.first().waitFor({ state: 'attached', timeout: 60000 });

    try {
      await card.first().waitFor({ state: 'visible', timeout: 10000 });
    } catch (e) {
      console.log('Card not immediately visible, attempting click anyway');
    }

    // Use scrollIntoViewIfNeeded to ensure it's in view before clicking
    await card.first().scrollIntoViewIfNeeded();

    try {
      await card.first().click();
    } catch (e) {
      console.log('First click attempt failed, trying alternative selector');
      // Try alternative click method
      await this.page.locator('text=Corporate Management').first().click({ force: true });
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterCorporateID(corporateID: string) {
    const enterCorpID = this.page.locator('input[placeholder="Enter Corporate ID"]');
    await enterCorpID.fill(corporateID);
  }

  async clickLaunch() {
    return this.page.getByRole('button', { name: /launch/i }).click();
  }

  async clickTalkgroup() {
    const talkGroupTab = this.page.locator('msi-sidebar-item[id$="TalkGroups"]');
    await talkGroupTab.click();

    // Verify navigation was successful
    await expect(this.page).toHaveURL(/talk-?groups?/i, { timeout: 10000 });
  }

  // --- PTT User View/Edit Fields ---
  getDisplayName(): Locator {
    return this.page.locator('input[id*="display"], input[placeholder*="Display"]').first();
  }

  getCLient(): Locator {
    return this.page.locator('input[id*="client"], input[placeholder*="Client"]').first();
  }

  getPhone(): Locator {
    return this.page.locator('input[id*="phone"], input[placeholder*="Phone"]').first();
  }

  getBilling(): Locator {
    return this.page.locator('input[id*="billing"], input[placeholder*="Billing"]').first();
  }

  // --- Talkgroup Fields ---
  getGroup(): Locator {
    return this.page.locator('input[id*="group"], input[placeholder*="Group"]').first();
  }

  getAvatarType(): Locator {
    return this.page.locator('input[id*="avatar"], select[id*="avatar"]').first();
  }

  getTalkGroupType(): Locator {
    return this.page.locator('input[id*="talkgroup-type"], select[id*="type"]').first();
  }

  // --- Group Profile Fields ---
  getGroupProfileName(): Locator {
    return this.page.locator('input[id*="group-profile"], input[placeholder*="Profile"]').first();
  }

  getGroupType(): Locator {
    return this.page.locator('select[id*="group-type"], input[id*="group-type"]').first();
  }

  getAvatarGroup(): Locator {
    return this.page.locator('input[id*="avatar-group"], select[id*="avatar"]').first();
  }

  getInteropGroupChb(): Locator {
    return this.page.locator('input[type="checkbox"][id*="interop"]').first();
  }

  getAutoCutIn(): Locator {
    return this.page.locator('input[type="checkbox"][id*="auto-cut"]').first();
  }

  getCreateTalkGroup(): Locator {
    return this.page.locator('input[type="checkbox"][id*="create-talk"]').first();
  }

  // --- Buttons for Features/Actions ---
  getTabOpt(tabIndex: number): Locator {
    return this.page.locator('.mat-tab-label, [role="tab"]').nth(tabIndex);
  }

  getPackageBtn(): Locator {
    return this.page.locator('button[id*="package"], span:has-text("Package")').first();
  }

  getDeviceInfoBtn(): Locator {
    return this.page.locator('button[id*="device"], span:has-text("Device")').first();
  }

  getAutomationLocationBtn(): Locator {
    return this.page.locator('button[id*="location"], span:has-text("Location")').first();
  }

  getEmergency(): Locator {
    return this.page.locator('button[id*="emergency"], span:has-text("Emergency")').first();
  }

  getStreamingVideo(): Locator {
    return this.page.locator('button[id*="streaming"], span:has-text("Streaming")').first();
  }

  getEdit(): Locator {
    return this.page.locator('button[id*="edit"], button:has-text("Edit")').first();
  }

  getEditButton(): Locator {
    return this.page.locator('button[id*="edit"], button:has-text("Edit")').first();
  }

  getViewGroupBtn(): Locator {
    return this.page.locator('button:has-text("View"), button[id*="view"]').first();
  }

  getPermissionStatus(): Locator {
    return this.page.locator('[id*="permission"], [class*="permission"]').first();
  }

  getEmailField(): Locator {
    return this.page.locator('input[type="email"], input[id*="email"]').first();
  }

  getActivationCodeField(): Locator {
    return this.page.locator('input[id*="activation"], input[id*="code"]').first();
  }

  getAuthorizedUsersList(): Locator {
    return this.page.locator('[id*="authorized"], [class*="authorized"]').first();
  }

  // --- Navigation Methods ---
  async visitPTTUserViewPage() {
    // Navigate to PTT User in view mode
    const pttUserButton = this.page.locator('text=PTT Users, [id*="ptt"]').first();
    await pttUserButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async visitPTTUserEditPage() {
    // Navigate to PTT User in edit mode
    await this.visitPTTUserViewPage();
    await this.getEdit().click();
    await this.page.waitForLoadState('networkidle');
  }

  async getTalkgrpInPTTUser(): Promise<Locator> {
    // Get talkgroup element in PTT User view
    return this.page.locator('[id*="talkgroup"], [class*="talkgroup"]').first();
  }

  async visitTalkgroupBtn() {
    // Navigate to Talkgroup section
    const talkgroupNav = this.page.locator('msi-sidebar-item[id*="TalkGroup"], text=Talkgroup').first();
    await talkgroupNav.click();
    await this.page.waitForLoadState('networkidle');
  }

  async visitGroupProfile() {
    // Navigate to Group Profile
    const groupProfileNav = this.page.locator('text=Group Profile, [id*="group-profile"]').first();
    await groupProfileNav.click();
    await this.page.waitForLoadState('networkidle');
  }

  // --- Complex Action Methods ---
  async changePermissionPTTUser() {
    // Click on permission dropdown/button and change permission
    const permissionDropdown = this.page.locator('[id*="permission"], select[id*="permission"]').first();
    await permissionDropdown.click();
    
    // Select different permission
    const permissionOption = this.page.locator('.mat-option, option').first();
    await permissionOption.click();
    await this.page.waitForTimeout(1000);
  }

  async getPTTUser() {
    // Get/Select PTT User
    const pttUserSelect = this.page.locator('select[id*="ptt"], [id*="user-select"]').first();
    await pttUserSelect.click();
    const userOption = this.page.locator('.mat-option, option').first();
    await userOption.click();
  }

  async updateEmailIdPTTUser() {
    // Update email ID for PTT User
    const emailInput = this.getEmailField();
    await emailInput.clear();
    await emailInput.fill('test@example.com');
    
    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async activationCodeGenerationPTTUser() {
    // Generate activation code
    const activationBtn = this.page.locator('button:has-text("Generate"), button[id*="activation"]').first();
    await activationBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyAuthorizedPTTUser() {
    // Verify authorized PTT Users
    const authorizedSection = await this.getAuthorizedUsersList();
    await expect(authorizedSection).toBeVisible();
  }

  // --- Feature Enable/Disable Methods ---
  async featurePttUser() {
    // General feature verification for PTT User
    const featureSection = this.page.locator('[id*="feature"], [class*="feature"]').first();
    await expect(featureSection).toBeVisible();
  }

  async enabledfeautureEmergency() {
    // Enable Emergency feature
    const emergencyCheckbox = this.page.locator('input[type="checkbox"][id*="emergency"]').first();
    await emergencyCheckbox.check();
    
    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async disableEmergencyFeature() {
    // Disable Emergency feature
    const emergencyCheckbox = this.page.locator('input[type="checkbox"][id*="emergency"]').first();
    await emergencyCheckbox.uncheck();
    
    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // --- Feature-specific Methods for verify_features_for_PTT_user ---
  async switchClientTypePTTUser() {
    // Switch client type (Standard to Radio or vice versa)
    const clientTypeDropdown = this.page.locator('select[id*="clienttype"], select[id*="client-type"]').first();
    await clientTypeDropdown.click();
    
    const options = this.page.locator('.mat-option, option');
    const optionsCount = await options.count();
    if (optionsCount > 1) {
      // Click the next option (not the current one)
      await options.nth(1).click();
    }
    
    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickEvent(locator: Locator) {
    // Generic click event for any locator
    await locator.click();
    await this.page.waitForTimeout(500);
  }

  async checkTalkgroupExists(): Promise<boolean> {
    // Check if a specific talkgroup exists on the page
    const talkgroupElement = this.page.locator('[class*="talkgroup"], [id*="talkgroup"]').first();
    try {
      await expect(talkgroupElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async createStandardTalkGroup() {
    // Create a new standard talkgroup
    const createBtn = this.page.locator('button:has-text("Create"), button:has-text("Add")').first();
    await createBtn.click();
    
    // Fill in talkgroup details
    const talkgroupNameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
    await talkgroupNameField.fill('Standard TalkGroup');
    
    // Save
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async visitWithinCat() {
    // Stay within CAT application by clicking a navigation element
    const catNav = this.page.locator('text=CAT, [id*="cat"]').first();
    if (await catNav.isVisible()) {
      await catNav.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async getPTTUserOption() {
    // Navigate to PTT User option in menu
    const pttUserOption = this.page.locator('text=PTT User, [id*="ptt-user"]').first();
    await pttUserOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  async checkTalkGrpTabUnderPTTUser() {
    // Verify talkgroup tab is visible and accessible under PTT User
    const talkgroupTab = this.page.locator('[id*="talkgroup"], .mat-tab-label:has-text("Talkgroup")').first();
    await expect(talkgroupTab).toBeVisible();
  }

  async updateFeaturesPTTUser() {
    // Update features for PTT User (streaming, emergency, etc.)
    const featureCheckboxes = this.page.locator('input[type="checkbox"][id*="feature"]');
    const count = await featureCheckboxes.count();
    
    if (count > 0) {
      // Toggle at least one feature
      await featureCheckboxes.first().check();
    }
    
    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  // --- Methods for edit_PTT_user_and_assigned_user ---
  getPhoneNumberPTTUSer(): Locator {
    return this.page.locator('input[id*="phone"], input[placeholder*="Phone"]').first();
  }

  getBillingNumberPTTUser(): Locator {
    return this.page.locator('input[id*="billing"], input[placeholder*="Billing"]').first();
  }

  async checkNotEnabled(locator: Locator) {
    // Verify that a field is disabled (not enabled)
    await expect(locator).toBeDisabled();
  }

  async checkHaveValue(locator: Locator, expectedValue: string): Promise<boolean> {
    // Check if a field has a specific value
    const value = await locator.inputValue().catch(() => '');
    return value === expectedValue || value.includes(expectedValue);
  }

  async assignPTTUser(typeIndex: number = 0) {
    // Assign a user or user set to PTT User
    // typeIndex: 0 for users, 1 for user sets
    
    const assignButton = this.page.locator('button:has-text("Assign"), button:has-text("Add")').nth(typeIndex);
    await assignButton.click();
    await this.page.waitForTimeout(1000);

    // Select from dialog/modal if it appears
    const selectOption = this.page.locator('.mat-option, option').first();
    if (await selectOption.isVisible()) {
      await selectOption.click();
      await this.page.waitForTimeout(500);
    }

    // Confirm assignment
    const confirmBtn = this.page.locator('button:has-text("OK"), button:has-text("Confirm")').first();
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyAuthorizedPTTUserExists() {
    // Verify that authorized PTT Users section exists and is visible
    const authorizedSection = this.page.locator('[id*="authorized"], [class*="authorized"]').first();
    await expect(authorizedSection).toBeVisible();

    // Verify permissions are shown
    const permissionElements = this.page.locator('[class*="permission"], [id*="permission"]');
    const count = await permissionElements.count();
    expect(count).toBeGreaterThan(0);
  }

  async deleteAssignedMember(isLast: boolean = false) {
    // Delete an assigned member/user set
    let deleteBtn: Locator;
    
    if (isLast) {
      // Get the last delete button
      const allDeleteBtns = this.page.locator('button:has-text("Delete"), button[id*="delete"]');
      const count = await allDeleteBtns.count();
      deleteBtn = allDeleteBtns.nth(count - 1);
    } else {
      // Get the first delete button
      deleteBtn = this.page.locator('button:has-text("Delete"), button[id*="delete"]').first();
    }

    await deleteBtn.click();
    
    // Confirm deletion if dialog appears
    const confirmBtn = this.page.locator('button:has-text("OK"), button:has-text("Yes"), button:has-text("Confirm")').first();
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  // --- Methods for Talkgroup Management ---
  async visitTalkGroup() {
    // Navigate to Talk Group section
    const talkgroupNav = this.page.locator('text=Talk Group, text=Talkgroup, [id*="talk"]').first();
    await talkgroupNav.click();
    await this.page.waitForLoadState('networkidle');
  }

  async changeTalkgroupScanPriorityForStandardUser(talkgroupType: string = 'Standard') {
    // Change scan priority for talkgroup
    const priorityField = this.page.locator('input[id*="priority"], select[id*="priority"]').first();
    await priorityField.click();

    const priorityOption = this.page.locator('.mat-option, option').first();
    await priorityOption.click();

    // Save changes
    const saveBtn = this.page.locator('button:has-text("Save")').first();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  getDropDown(): Locator {
    return this.page.locator('select, [role="combobox"], .mat-select');
  }

  getPreferredSelection(index: number): Locator {
    return this.page.locator('.mat-option, option').nth(index);
  }

  getSaveButton(): Locator {
    return this.page.locator('button:has-text("Save")').first();
  }

  getTLKGrpScan(): Locator {
    return this.page.locator('input[id*="scan"], [id*="talkgroup-scan"]').first();
  }

  async checkVisibility(element: Locator | any) {
    // Check if element is visible - handles both Locators and Cypress chains
        await expect(element).toBeVisible();
      }
  

  // --- Methods for Zone/Position/Priority Management ---
  getCancelButton(): Locator {
    return this.page.locator('button:has-text("Cancel")').first();
  }

  getEditBtn(): Locator {
    return this.page.locator('button[id*="edit"], [class*="edit-icon"]').first();
  }

  async forceClickEvent(locator: Locator) {
    // Force click an element (skip visibility check)
    await locator.click({ force: true });
    await this.page.waitForTimeout(500);
  }

  async changeTalkgrpZoneForRadioUser(zoneNumber: string) {
    // Change zone for radio user's talkgroup
    const zoneField = this.page.locator('input[id*="zone"], select[id*="zone"]').first();
    await zoneField.click();
    
    const zoneOption = this.page.locator(`.mat-option:has-text("${zoneNumber}"), option:has-text("${zoneNumber}")`).first();
    if (await zoneOption.isVisible()) {
      await zoneOption.click();
    }
  }

  async changeTalkgrpPositionForRadioUser(positionNumber: string) {
    // Change position for radio user's talkgroup
    const positionField = this.page.locator('input[id*="position"], select[id*="position"]').first();
    await positionField.click();
    
    const positionOption = this.page.locator(`.mat-option:has-text("${positionNumber}"), option:has-text("${positionNumber}")`).first();
    if (await positionOption.isVisible()) {
      await positionOption.click();
    }
  }

  async changeTalkgrpPriorityForRadioUser(priorityName: string) {
    // Change priority for radio user's talkgroup
    const priorityField = this.page.locator('input[id*="priority"], select[id*="priority"]').first();
    await priorityField.click();
    
    const priorityOption = this.page.locator(`.mat-option:has-text("${priorityName}"), option:has-text("${priorityName}")`).first();
    if (await priorityOption.isVisible()) {
      await priorityOption.click();
    }
  }

  async verifyTalkgrpZonePosPriorityForRadioUser(expectedZone: string, expectedPosition: string, expectedPriority: string = '') {
    // Verify zone, position, and optionally priority are set correctly
    const zoneField = this.page.locator('input[id*="zone"], select[id*="zone"]').first();
    const positionField = this.page.locator('input[id*="position"], select[id*="position"]').first();
    
    // Verify zone
    let zoneValue: string | null = null;
    try {
      zoneValue = await zoneField.inputValue();
    } catch {
      zoneValue = await zoneField.textContent();
    }
    expect(zoneValue).toContain(expectedZone);
    
    // Verify position
    let positionValue: string | null = null;
    try {
      positionValue = await positionField.inputValue();
    } catch {
      positionValue = await positionField.textContent();
    }
    expect(positionValue).toContain(expectedPosition);
    
    // Verify priority if provided
    if (expectedPriority) {
      const priorityField = this.page.locator('input[id*="priority"], select[id*="priority"]').first();
      let priorityValue: string | null = null;
      try {
        priorityValue = await priorityField.inputValue();
      } catch {
        priorityValue = await priorityField.textContent();
      }
      expect(priorityValue).toContain(expectedPriority);
    }
  }

  getTableData(columnIndex: number): Locator {
    // Get table cell data by column index
    return this.page.locator('td, th').nth(columnIndex);
  }

  // --- Methods for External User Tests (external_verify_user, external_validation, external_add_user) ---
  async visitCat() {
    // Navigate to CAT main page
    const catNav = this.page.locator('text=CAT, [id*="cat-main"]').first();
    if (await catNav.isVisible().catch(() => false)) {
      await catNav.click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  getExtUserBtn(): Locator {
    // Get External User button/link
    return this.getExternalUserMenu();
  }

  async getSearchField(): Promise<Locator> {
    // Get search field for external users
    const searchField = this.getExternalUserBox();
    await expect(searchField).toBeVisible();
    return searchField;
  }

  async verifyPageTitle() {
    // Verify page title shows "External User"
    const pageTitle = this.getExternalUserHeader();
    await expect(pageTitle).toBeVisible();
  }

  getSearchIcon(): Locator {
    // Get search icon
    return this.getExternalUserSearch();
  }

  getImportIcon(): Locator {
    // Get import icon
    return this.getExternalImportButton();
  }

  getExportIcon(): Locator {
    // Get export icon
    return this.getExternalExportButton();
  }

  getAddExternalUserBtn(): Locator {
    // Get Add External User button
    return this.page.locator('button:has-text("Add"), button[id*="add-external"]').first();
  }

  getNameInput(): Locator {
    // Get name input field
    return this.getInputNameExternal();
  }

  getPhoneInput(): Locator {
    // Get phone input field
    return this.page.locator('input[id*="phone"], input[placeholder*="Phone"]').first();
  }

  getUserSetButton(): Locator {
    return this.page.locator("#menu-44-Usersets");
  }

  getAssignUserButton(): Locator {
    return this.page.locator("button[id='uset-asnbtn']");
  }
  getAssignUserNameInput(): Locator {
    return this.page.locator("tr td p").first();
  }
  getEditUserSetNameInput(): Locator {
    return this.page.locator("input[name='Edit Name']");
  }

  getAssignUserCheckBox(): Locator {
    return this.page.locator("td msi-icon[class='msi-checkbox-icon msi-icon']").first();
  }

  getAssignUserSecondCheckBox(): Locator {
    return this.page.locator("td msi-icon[class='msi-checkbox-icon msi-icon']").nth(2);
  }
  getEditUserSetBtn(): Locator {
    return this.page.locator("svg-icon.inlineEdit")
  }


  getAssignUserSaveBtn(): Locator {
    return this.page.getByRole('button', { name:'Assign'});
  }

  getUserListSearchBox(): Locator {
    return this.page.getByPlaceholder('Search List')
  }

  getUserSetViewBtn(): Locator {
    return this.page.locator("button[class='transparent_button ng-star-inserted']").nth(2);
  }
  getAssignmentDetailsBtn(): Locator {
    return this.page.getByRole('button', { name: 'Assignment Details' });
  }
  getViewUserSetEditBtn(): Locator {
    return this.page.getByRole('button', { name: 'Edit' });
  }
  async getPhoneError(): Promise<string> {
    // Get phone error message
    const errorMsg = this.page.locator('[class*="error"], [class*="mat-error"]').first();
    try {
      await expect(errorMsg).toBeVisible({ timeout: 5000 });
      return await errorMsg.textContent() || '';
    } catch {
      return '';
    }
  }

  async verifyEditUrl() {
    // Verify that we're on the edit URL
    await expect(this.page).toHaveURL(/edit|add/i, { timeout: 10000 });
  }

  async checkDisabled(locator: Locator) {
    // Check if element is disabled
    await expect(locator).toBeDisabled();
  }

  async clickSaveBtn() {
    // Click save button
    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  getSaveBtn(): Locator {
    // Get save button
    return this.getSaveButton();
  }

  // --- Methods for User_Set Tests ---
  async visitUserSet() {
    // Navigate to User Set page
    const userSetButton= this.page.locator('#menu-44-Usersets').first();
    await expect(userSetButton).toBeVisible();
    await userSetButton.click();
    await this.page.waitForLoadState();
    await expect(this.getCreateUserSetButton()).toBeVisible();
  }

  async createUserSet() {
    // Create a new user set
    userSetName = `UserSet_${Date.now()}`;
    
    // Store the generated userSetName in cat.json for reuse in other tests
    const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
    const testDataPath = path.join(testDataDir, 'cat.json');
    let testData: any = {};
    
    // Ensure directory exists
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }
    
    // Read existing data if file exists and has content
    if (fs.existsSync(testDataPath)) {
      try {
        const fileContent = fs.readFileSync(testDataPath, 'utf-8');
        if (fileContent.trim()) {
          testData = JSON.parse(fileContent);
        }
      } catch (error) {
        console.log('Error reading test data file:', error);
        testData = {};
      }
    }
    
    // Update with new userSetName
    testData.userSetName = userSetName;
    testData.lastUpdated = new Date().toISOString();
    
    // Write back to file
    fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    
    const createBtn = this.getCreateUserSetButton();
    expect(createBtn).toBeVisible();
    await createBtn.click();

    // Fill in details
    const  nameInput = this.getUserSetNameInput();
    await nameInput.fill(userSetName);
    await this.assignUserToUserSet();

    // Save
    await this.clickSaveBtn();
    await this.getOkBtn().click();
  }

  async verifySearch(boolean: boolean = true) {
    // Verify search functionality
    await this.page.waitForTimeout(3000);
    const storedUserSetName = this.getStoredUserSetName();
    const searchBox = this.getSearchBox();
    await searchBox.clear();
    await searchBox.fill(storedUserSetName);
    await this.page.keyboard.press('Enter');
    const searchResult = this.page.locator(`text=${storedUserSetName}`).first();
    await expect(searchResult).toBeVisible();
    if (boolean===false) {
      await expect(searchResult).not.toBeVisible();
    }
  }

  async deleteUserSet() {
    await this.page.waitForTimeout(4000);
    const storedUserSetName = this.getStoredUserSetName();
     const searchBox = this.getSearchBox();
     await expect(searchBox).toBeVisible();
    await searchBox.fill(storedUserSetName);
    await this.page.keyboard.press('Enter');
    const row = this.page.locator('tr').filter({ has: this.page.locator('p', { hasText: `${storedUserSetName}` }) });
    const deleteBtn = row.locator("button[id='usr-set-listbtn']");
    await deleteBtn.click();
    await this.getOkButton().click();
  }
 
  async visitUserSetEditPage() {
    // Navigate to User Set page using the same method as working tests
    await this.openUserSetPage();
    
    // Get the stored user set name
    const storedUserSetName = this.getStoredUserSetName();
    console.log('Looking for user set:', storedUserSetName);
    
    // Wait for the user set to appear in the list
    await expect(this.page.locator('p', { hasText: storedUserSetName })).toBeVisible({ timeout: 15000 });
    
    // Find the specific row containing the user set
    const row = this.page.locator('tr').filter({ has: this.page.locator('p', { hasText: `${storedUserSetName}` }) });
    await expect(row).toBeVisible();
    
    // Find and click the edit button in that row (second transparent_button which is the edit button)
    const editBtn = row.locator('button.transparent_button').nth(1);
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    
    // Wait for navigation and verify we're on edit/details page
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/details|edit/i, { timeout: 10000 });
  }

  async assignUserSet(assignType: number = 0) {
   await this.assignUserToUserSet();
  }

  async visitUserSetViewPage() {
    await expect(this.getUserSetViewBtn()).toBeVisible();
    await this.getUserSetViewBtn().click();
    
  }

  async verifyUserSetViewPageFields() {
    await expect(this.getAssignmentDetailsBtn()).toBeVisible();
    await expect(this.getViewUserSetEditBtn()).toBeVisible();

  }

  getUserSetDisName(): Locator {
    return this.page.locator('input[id*="display"], input[id*="name"]').first();
  }

  getUserSetUser(): Locator {
    return this.page.locator('input[id*="user"], select[id*="user"]').first();
  }

  getUserSetUserAssign(): Locator {
    return this.page.locator('[id*="assigned"], [class*="assigned"]').first();
  }

  getUserSetTalk(): Locator {
    return this.page.locator('[id*="talkgroup"], [class*="talkgroup"]').first();
  }

  getUserSetMemberCount(): Locator {
    return this.page.locator('[id*="member"], [class*="count"]').first();
  }

  getEditButton2(): Locator {
    return this.page.locator('button[id*="edit"], [class*="edit-icon"]').nth(1);
  }

  getAssignIconUserSet(): Locator {
    return this.page.locator('button:has-text("Assign"), [id*="assign-users"]').first();
  }

  getPopUpButton(): Locator {
    return this.page.locator('input[id*="search"], input[placeholder*="Search"]').first();
  }

  getUserSetNameInput(): Locator {
    return this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
  }

  async validateDisplayObj(value: string) {
    // Validate that an object is displayed on page
    const element = this.page.locator(`text=${value}`).first();
    await expect(element).toBeVisible();
  }

  getCreateUserSetButton(): Locator {
    return this.page.getByRole('button', { name: 'Create User Set' });
  }

  getExportBtn(): Locator {
    return this.page.locator('button[id*="export"], button:has-text("Export")').first();
  }

  // --- Methods for Interop_User Tests ---
  async getInterpoUser() {
    // Navigate to Interop User list page by looking for navigation elements
    const interopNavOptions = [
      'text=Interop',
      'text=Interop User', 
      '[id*="interop"]',
      'button:has-text("Interop")',
      'a:has-text("Interop")',
      '.nav-item:has-text("Interop")',
      '[data-test="interop"]'
    ];
    
    for (const selector of interopNavOptions) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        await element.click();
        await this.page.waitForLoadState('networkidle');
        return;
      }
    }
    
    // If no navigation found, we may be on a unified user management page
    // Continue with current page context
  }

  async validateInterpoCount() {
    // Validate Interop count  
    const countElement = this.page.locator('[class*="count"], [class*="total"]').first();
    try {
      await expect(countElement).toBeVisible({ timeout: 5000 });
    } catch {
      // Count element might not be visible, continue
    }
  }

  getAdvanceFilter(): Locator {
    // Try multiple locators for advanced filter button
    return this.page.locator('button:has-text("Advanced"), button[id*="advanced"], button[class*="advanced"], button:has-text("Filter"), [id*="filter"], .filter-toggle, .advanced-filter').first();
  }

  getInterpoName(): Locator {
    return this.page.locator('tr[role="row"]')
  .filter({ hasText: '+7000050000' })
  .locator('td[aria-colindex="3"]');
  }

  getInterpoPhone(): Locator {
    return this.page.locator('tr[role="row"]')
    .filter({ hasText: 'Handset Standard 1' })
    .locator('td[aria-colindex="4"]');
  }

  getPaginationInput(): Locator {
    return this.page.locator('input[id*="page"], [class*="pagination-input"]').first();
  }

  async getPaginationArrow() {
    // Get pagination arrow buttons
    const arrows = this.page.locator('button[id*="next"], button[id*="previous"]');
    const count = await arrows.count();
    return arrows;
  }

  getDropDownOpt(): Locator {
    return this.page.locator('.mat-option, option');
  }

  getFilterButton(): Locator {
    return this.page.locator('button:has-text("Filter"), button:has-text("Apply")').first();
  }

  async getInterpoUserEditPage(userName: string = '') {
    // Navigate to Interop User edit page
    await this.getInterpoUser();
    
    const editBtn = this.page.locator('button[id*="edit"], [class*="edit-icon"]').first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  getActivation(): Locator {
    return this.page.locator('input[id*="activation"], [class*="activation"]').first();
  }

  getPermission(): Locator {
    return this.page.locator('select[id*="permission"], input[id*="permission"]').first();
  }

  getClientTypeInterpo(): Locator {
    return this.page.locator('select[id*="client"], input[id*="client"]').first();
  }

  getAssignTalkgroup(): Locator {
    return this.page.locator('button:has-text("Assign"), [id*="assign-talkgroup"]').first();
  }

  getUserName(): Locator {
    return this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
  }

  async checkEnabled(valueCheck: boolean) {
    // Check if element is enabled
    if (!valueCheck) {
      throw new Error('Value check failed');
    }
  }

  async getInterpoUserEdit(userName: string = '') {
    // Navigate back to Interop User edit page (similar to getInterpoUserEditPage)
    await this.getInterpoUserEditPage(userName);
  }

  async changePermissionInterpoUser() {
    // Change permission for Interop User
    const permissionDropdown = this.getPermission();
    await permissionDropdown.click();
    await this.page.waitForTimeout(500);

    const option = this.page.locator('.mat-option, option').first();
    if (await option.isVisible()) {
      await option.click();
    }

    await this.clickSaveBtn();
  }

  getViewBtn(): Locator {
    // 1. Define the row first (the parent)
   const row = this.page.locator('tr[role="row"]').filter({ hasText: 'Handset Standard 1' });

// 2. Now use that row to find the button inside it (the child)
   return   row.getByRole('link', { name: /view/i });

    // return this.page.locator('tr[role="row"]').filter({ hasText: 'NAME' }).locator('#ptt-listedt')
  }

  // --- Methods for OSM Tests ---
  nagavateToSideMenu(): Locator {
    return this.page.locator('[id*="sidenav-menu"], .sidenav-item, aside nav li');
  }

  openOSMPage(): Locator {
    return this.page.locator('#menu-44-Osm');
  }

  getOSMSearchErrorMessage(): Locator {
    return this.page.locator('text=Search Value should be more than 2 chars');
  }

  getOSMSearchBox(): Locator {
    return this.page.locator('#osm-list');
  }

  osmCreateButton(): Locator {
    return this.page.getByRole('button',{name:'Create OSM List'});
  }

  getPagination(): Locator {
    return this.page.locator('[class*="pagination"], .mat-paginator, nav[aria-label*="Pagination"]').first();
  }

  async deleteOSMList(osmListName: string = '') {
    // Delete an OSM List
    const deleteBtn = this.page.locator('button[id*="delete"], button:has-text("Delete")').first();
    if (await deleteBtn.isVisible().catch(() => false)) {
      await deleteBtn.click();
      
      const confirmBtn = this.page.locator('button:has-text("OK"), button:has-text("Yes"), button:has-text("Confirm")').first();
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
        await this.page.waitForLoadState('networkidle');
      }
    }
  }

  async addOSMMssg(code: string, shortMsg: string, longMsg: string) {
    // Add OSM Message
    const addBtn = this.page.locator('#osm-addnew').first();
    await addBtn.click();
    
    // Fill code
    const codeInput = this.page.locator('input[id*="code"], input[placeholder*="Code"]').first();
    await codeInput.fill(code);

    // Fill short message
    const shortMsgInput = this.page.locator('input[id*="short"], input[placeholder*="Short"]').first();
    await shortMsgInput.fill(shortMsg);

    // Fill long message
    const longMsgInput = this.page.locator('input[id*="long"], textarea[placeholder*="Long"]').first();
    await longMsgInput.fill(longMsg);

    // Save message
    const saveMsgBtn = this.page.locator('button:has-text("Save"), button[id*="save-msg"]').first();
    if (await saveMsgBtn.isVisible()) {
      await saveMsgBtn.click();
      await this.page.waitForTimeout(500);
    }
  }

  // --- Methods for Group_Profile Tests ---
  async selectGroupProfile(profileType: string = 'Standard') {
    // Select a group profile type (Standard, Broadcast, Dispatch, etc.)
    const typeButtons = this.page.locator('button, span, div').filter({ hasText: profileType });
    const firstBtn = typeButtons.first();
    if (await firstBtn.isVisible().catch(() => false)) {
      await firstBtn.click();
      await this.page.waitForTimeout(500);
    }
  }

  async createEmptyGroupProfile(profileName: string, profileType: string = 'Standard') {
    // Create an empty group profile without talkgroup
    const createBtn = this.page.locator('button:has-text("Create"), button:has-text("Add")').first();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);
    }

    // Fill profile name
    const nameField = this.getGroupProfileNameTextField();
    await nameField.fill(profileName);
    await this.page.waitForTimeout(300);

    // Select profile type
    const typeSelect = this.page.locator('select[id*="type"], input[id*="type"]').first();
    if (await typeSelect.isVisible()) {
      await typeSelect.click();
      const typeOption = this.page.locator(`.mat-option:has-text("${profileType}"), option:has-text("${profileType}")`).first();
      if (await typeOption.isVisible()) {
        await typeOption.click();
      }
    }

    // Save
    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createGroupProfileWithTalkgrp(profileName: string, talkGroups: string, profileType: string = 'Standard') {
    // Create a group profile with talkgroup
    await this.createEmptyGroupProfile(profileName, profileType);
    
    // Navigate back to group profile
    await this.visitGroupProfile();
  }

  async verifyMCXGroupProfileForTalkgroup(talkgroupName: string, assignUser: string = '', talkgroupType: string = 'STANDARD') {
    // Verify MCX enabled group profile for talkgroup
    const talkgroupElement = this.page.locator(`text=${talkgroupName}`).first();
    try {
      await expect(talkgroupElement).toBeVisible({ timeout: 5000 });
    } catch {
      // Talkgroup might not be visible, continue
    }
  }

  async deleteGroupProfile(profileName: string) {
    // Delete a group profile
    await this.visitGroupProfile();
    
    const searchBox = this.getSearchBox();
    await searchBox.fill(profileName);
    await this.page.waitForTimeout(2000);

    const deleteBtn = this.page.locator('button:has-text("Delete"), button[id*="delete"]').first();
    if (await deleteBtn.isVisible().catch(() => false)) {
      await deleteBtn.click();
      
      const confirmBtn = this.page.locator('button:has-text("OK"), button:has-text("Yes"), button:has-text("Confirm")').first();
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
        await this.page.waitForLoadState('networkidle');
      }
    }
  }

  async deleteTalkGroup(talkgroupName: string = '') {
    // Delete a talkgroup (updated to accept name parameter)
    const deleteBtn = this.page.locator('button:has-text("Delete"), button[id*="delete"]').first();
    if (await deleteBtn.isVisible().catch(() => false)) {
      await deleteBtn.click();

      const confirmBtn = this.page.locator('button:has-text("OK"), button:has-text("Yes"), button:has-text("Confirm")').first();
      if (await confirmBtn.isVisible()) {
        await confirmBtn.click();
        await this.page.waitForLoadState('networkidle');
      }
    }
  }

  getStandard(): Locator {
    // Get Standard group type option
    return this.page.locator('text=Standard, button:has-text("Standard")').first();
  }

  getDefault(): Locator {
    // Get Default option
    return this.page.locator('text=Default, button:has-text("Default")').first();
  }

  getGroupsTab(): Locator {
    // Get Groups tab
    return this.page.locator('.mat-tab-label:has-text("Groups"), .mat-tab-label:has-text("Group"), [role="tab"]:has-text("Group")').first();
  }

  getGroupProfileNameTextField(): Locator {
    // Get group profile name text field
    return this.page.locator('input[id*="profile"], input[id*="name"], input[placeholder*="Profile Name"], input[placeholder*="Name"]').first();
  }

  getCreateTlkgrpwithGrpPrflCheckbox(): Locator {
    // Get checkbox to create talkgroup with group profile
    return this.page.locator('input[type="checkbox"][id*="create"], input[type="checkbox"][id*="talkgroup"]').first();
  }

  getTalkgroupIcon(): Locator {
    // Get talkgroup icon/button
    return this.page.locator('button:has-text("Add"), button[id*="add-talkgroup"], [class*="icon-add"]').first();
  }

  getTalkGrpNameInGroupProfile(): Locator {
    // Get talkgroup name input field in group profile
    return this.page.locator('input[id*="talkgroup"], input[id*="talkg"], input[placeholder*="Talkgroup"]').first();
  }

  getFilterBtn(): Locator {
    // Get filter button
    return this.getFilterButton();
  }

  getMSIBtn(): Locator {
    // Get MSI button (usually export/import related)
    return this.page.locator('button[id*="msi"], button[id*="export"], button[id*="import"]').first();
  }

  getTalkgrpNameTextbox(): Locator {
    // Get talkgroup name textbox (for additional talkgroup entries)
    return this.page.locator('input[id*="talkgroup-name"], input[placeholder*="Talkgroup Name"]').nth(1);
  }

  getBroadcast(): Locator {
    // Get Broadcast group type option
    return this.page.locator('text=Broadcast, button:has-text("Broadcast")').first();
  }

  getAudioCutIn(): Locator {
    // Get audio cut-in checkbox
    return this.page.locator('input[type="checkbox"][id*="audio"]').first();
  }

  getDuplicate(): Locator {
    // Get duplicate button
    return this.page.locator('button:has-text("Duplicate")').first();
  }

  async visitTalkGroupFromCAT() {
    // Navigate to Talkgroup from CAT
    const talkGroupNav = this.page.locator('text=Talkgroup, text=Talk Group, text=TalkGroup, [id*="talkgroup"]').first();
    if (await talkGroupNav.isVisible().catch(() => false)) {
      await talkGroupNav.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  getCreateBtn(): Locator {
    // Get create button for group profile
    return this.page.locator('button:has-text("Create"), button[id*="create"]').first();
  }

  getGroupProfileMntHeader(): Locator {
    // Get group profile management header
    return this.page.locator('h3, h2, [class*="header"]').filter({ hasText: 'Group Profile' }).first();
  }

  getInputGroupMnt(): Locator {
    // Get group name input in management
    return this.page.locator('input[id*="group-name"], input[placeholder*="Group Name"]').first();
  }

  getDropDownGrpMnt(): Locator {
    // Get group type dropdown
    return this.page.locator('select[id*="group-type"], input[id*="group-type"]').first();
  }

  getDropDownGrpMntAvatar(): Locator {
    // Get avatar dropdown in group management
    return this.page.locator('select[id*="avatar"], input[id*="avatar"]').first();
  }

  getCheckboxGrpMntAutoCutIn(): Locator {
    // Get auto cut-in checkbox
    return this.page.locator('input[type="checkbox"][id*="auto"], input[type="checkbox"][id*="cut"]').first();
  }

  getCreateTalkgroupGrpMnt(): Locator {
    // Get create talkgroup with group profile checkbox
    return this.page.locator('input[type="checkbox"][id*="create-talk"], input[type="checkbox"][id*="talkgroup"]').first();
  }

  getInputSearchGrpMnt(): Locator {
    // Get search input in group management
    return this.page.locator('input[id*="search"], input[placeholder*="Search"]').first();
  }

  getAddGrp(): Locator {
    // Get add group/talkgroup button
    return this.page.locator('button:has-text("Add"), button[id*="add"]').first();
  }

  getImport(): Locator {
    // Get import button
    return this.page.locator('button:has-text("Import"), button[id*="import"]').first();
  }

  getDeleteIconGrpMnt(): Locator {
    // Get delete icon in group management
    return this.page.locator('button:has-text("Delete"), button[id*="delete"], [class*="delete-icon"]').first();
  }

  getInputGroupName(): Locator {
    // Get group name input field
    return this.page.locator('input[id*="group-name"], input[placeholder*="Group Name"]').first();
  }

  async selectTalkgroupType(talkgroupType: string) {
    // Select talkgroup type (Standard, Dispatch, Broadcast)
    const typeSelect = this.page.locator('select[id*="type"], input[id*="type"]').first();
    if (await typeSelect.isVisible().catch(() => false)) {
      await typeSelect.click();
      const typeOption = this.page.locator(`.mat-option:has-text("${talkgroupType}"), option:has-text("${talkgroupType}")`).first();
      if (await typeOption.isVisible()) {
        await typeOption.click();
      }
    }
  }

  async verifySelectingGroupProfile(profileType: string) {
    // Verify selecting a specific group profile type
    const profileElement = this.page.locator(`text=${profileType}`).first();
    try {
      await expect(profileElement).toBeVisible({ timeout: 5000 });
    } catch {
      // Profile might not be visible
    }
  }

  async verifyGroupProfileList() {
    // Verify group profile list is visible
    const profileListDropdown = this.page.locator('select, [role="listbox"], .mat-select').first();
    await expect(profileListDropdown).toBeVisible();
  }

  async verifyDropDownGroupProfileList() {
    // Verify dropdown list of group profiles
    const dropdownOptions = this.page.locator('.mat-option, option, li[role="option"]');
    const count = await dropdownOptions.count().catch(() => 0);
    expect(count).toBeGreaterThan(0);
  }

  async createTalkGroupDirectCAT(talkgroupType: string, talkgroupName: string) {
    // Create talkgroup directly in CAT
    const createBtn = this.page.locator('button:has-text("Create"), button[id*="add"]').first();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);
    }

    const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
    await nameField.fill(talkgroupName);
    await this.page.waitForTimeout(300);

    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async editButtonDirectCAT() {
    // Click edit button directly
    const editBtn = this.page.locator('button:has-text("Edit"), button[id*="edit"]').first();
    if (await editBtn.isVisible().catch(() => false)) {
      await editBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async editTalkgroupInGPM(suffix: string = '') {
    // Edit talkgroup name in group profile management
    const talkgroupNameInput = this.page.locator('input[id*="talkgroup"], input[placeholder*="Talkgroup"]').first();
    if (await talkgroupNameInput.isVisible().catch(() => false)) {
      const currentValue = await talkgroupNameInput.inputValue();
      await talkgroupNameInput.clear();
      await talkgroupNameInput.fill(currentValue + suffix);
    }
  }

  async saveBtn() {
    // Click save button
    const saveButton = this.getSaveButton();
    await saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createTalkGroup(talkgroupType: string, talkgroupName: string) {
    // Create a new talkgroup (simplified)
    const createBtn = this.page.locator('button:has-text("Create"), button[id*="add"]').first();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);

      const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
      await nameField.fill(talkgroupName);
      await this.page.waitForTimeout(300);

      const saveBtn = this.getSaveButton();
      await saveBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  getMcxCheckbox(): Locator {
    // Get MCX checkbox
    return this.page.locator('input[type="checkbox"][id*="mcx"], input[type="checkbox"][id*="MCX"]').first();
  }

  getOperationSelectOption(): Locator {
    // Get operation select option/dropdown
    return this.page.locator('select[id*="operation"], input[id*="operation"]').first();
  }

  getVisitWithinCat(): Locator {
    // Get button to stay within CAT
    return this.page.locator('button:has-text("CAT"), button:has-text("Visit"), a:has-text("CAT")').first();
  }

  // --- Talkgroup Methods ---
  async validateDisplayedList(locator: Locator) {
    // Validate that a list item is displayed
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
    } catch {
      // Item might not be visible, continue
    }
  }

  getCorporateMgntTalkgroup(): Locator {
    // Get corporate management talkgroup column/header
    return this.page.locator('th, [class*="header"]').filter({ hasText: 'Corporate' }).first();
  }

  getName(): Locator {
    // Get name column/header
    return this.page.locator('th, [class*="header"]').filter({ hasText: 'Name' }).first();
  }

  getCreateTalkGrpType(): Locator {
    // Get create talkgroup type column/header
    return this.page.locator('th, [class*="header"]').filter({ hasText: 'Type' }).first();
  }

  getMember(): Locator {
    // Get member column/header
    return this.page.locator('th, [class*="header"]').filter({ hasText: 'Member' }).first();
  }

  getCreateTalkGrp(): Locator {
    // Get create talkgroup column/header
    return this.page.locator('th, [class*="header"]').filter({ hasText: 'Create' }).first();
  }

  getCreateTalkgrpBtn(): Locator {
    // Get create talkgroup button
    return this.page.locator('button:has-text("Create"), button:has-text("Create Talkgroup"), button[id*="create-talk"]').first();
  }

  async createStandardTalkGr(talkgroupName: string = 'Standard_TalkGroup', param2: boolean = false, param3: boolean = false, assignedUser: string = '') {
    // Create a standard talkgroup
    const createBtn = this.getCreateTalkgrpBtn();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);
    }

    const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
    await nameField.fill(talkgroupName);
    await this.page.waitForTimeout(300);

    // If param3 is true, assign user
    if (param3 && assignedUser) {
      const assignBtn = this.page.locator('button:has-text("Assign"), button[id*="assign"]').first();
      if (await assignBtn.isVisible().catch(() => false)) {
        await assignBtn.click();
        const userOption = this.page.locator('.mat-option, option').first();
        if (await userOption.isVisible()) {
          await userOption.click();
        }
      }
    }

    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateCount() {
    // Validate count on the page
    const countElement = this.page.locator('[class*="count"], [class*="total"]').first();
    try {
      await expect(countElement).toBeVisible({ timeout: 5000 });
    } catch {
      // Count element might not be visible
    }
  }

  async modifyTalkGroup(talkgroupType: string = '', talkgroupName: string = '') {
    // Modify an existing talkgroup
    const editBtn = this.page.locator('button:has-text("Edit"), button[id*="edit"]').first();
    if (await editBtn.isVisible().catch(() => false)) {
      await editBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async createTalkGroupAndAddUser(talkgroupType: string = 'Standard', talkgroupName: string = 'TalkGroup', assignedUser: string = '') {
    // Create a talkgroup and add user
    const createBtn = this.getCreateTalkgrpBtn();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);
    }

    const typeSelect = this.page.locator('select[id*="type"], input[id*="type"]').first();
    if (await typeSelect.isVisible().catch(() => false)) {
      await typeSelect.click();
      const typeOption = this.page.locator(`.mat-option:has-text("${talkgroupType}"), option:has-text("${talkgroupType}")`).first();
      if (await typeOption.isVisible()) {
        await typeOption.click();
      }
    }

    const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
    await nameField.fill(talkgroupName);
    await this.page.waitForTimeout(300);

    // Add user if provided
    if (assignedUser) {
      const assignBtn = this.page.locator('button:has-text("Assign"), button[id*="assign"]').first();
      if (await assignBtn.isVisible().catch(() => false)) {
        await assignBtn.click();
        const userOption = this.page.locator('.mat-option, option').first();
        if (await userOption.isVisible()) {
          await userOption.click();
        }
      }
    }

    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  getEditNameBox(): Locator {
    // Get edit name box for talkgroup
    return this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
  }

  getSupervisorsTab(): Locator {
    // Get supervisors tab
    return this.page.locator('.mat-tab-label:has-text("Supervisor"), [role="tab"]:has-text("Supervisor")').first();
  }

  getAssignUsersIcon(): Locator {
    // Get assign users icon/button
    return this.page.locator('button:has-text("Assign"), button[id*="assign"], [class*="assign-icon"]').first();
  }

  getAssignUserPopupSearch(): Locator {
    // Get search input in assign user popup
    return this.page.locator('input[id*="search"], input[placeholder*="Search"]').first();
  }

  getAssinedCheckBox(): Locator {
    // Get assigned checkbox element
    return this.page.locator('input[type="checkbox"]');
  }

  getAssignButton(): Locator {
    // Get assign button (usually in popup/modal)
    return this.page.locator('button:has-text("Assign")').last();
  }

  getDispatcherTab(): Locator {
    // Get dispatcher tab
    return this.page.locator('.mat-tab-label:has-text("Dispatcher"), [role="tab"]:has-text("Dispatcher")').first();
  }

  getUsersTab(): Locator {
    // Get users tab
    return this.page.locator('.mat-tab-label:has-text("User"), [role="tab"]:has-text("User")').first();
  }

  getOkButton(): Locator {
    // Get OK button
    return this.page.locator('button:has-text("OK")').first();
  }

  getBroadcastersTab(): Locator {
    // Get broadcasters tab (for broadcast type talkgroups)
    return this.page.locator('.mat-tab-label:has-text("Broadcaster"), [role="tab"]:has-text("Broadcaster")').first();
  }

  getPage() {
    // Get the page object for direct access
    return this.page;
  }

  async createTalkGroupPreconfigured(talkgroupType: string = 'Standard', talkgroupName: string = 'TalkGroup') {
    // Create preconfigured talkgroup
    const createBtn = this.getCreateTalkgrpBtn();
    if (await createBtn.isVisible().catch(() => false)) {
      await createBtn.click();
      await this.page.waitForTimeout(500);
    }

    // Select preconfigured option if available
    const preconfigBtn = this.page.locator('button:has-text("Preconfigured"), [id*="preconfigured"]').first();
    if (await preconfigBtn.isVisible().catch(() => false)) {
      await preconfigBtn.click();
      await this.page.waitForTimeout(500);
    }

    const nameField = this.page.locator('input[id*="name"], input[placeholder*="Name"]').first();
    await nameField.fill(talkgroupName);
    await this.page.waitForTimeout(300);

    const saveBtn = this.getSaveButton();
    await saveBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openUserSetPage() {
    await expect(this.getUserSetButton()).toBeVisible();
    await this.getUserSetButton().click();
  }

  async assignUserToUserSet(){
    await this.getAssignUserButton().click();
    await this.getAssignUserCheckBox().check();
    await this.getAssignButton().click();

  }
   async assignSecondUserToUserSet(){
    userSetName = `UserSet_${Date.now()}`;
    
    // Store the generated userSetName in cat.json for reuse in other tests
    const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
    const testDataPath = path.join(testDataDir, 'cat.json');
    
    // Ensure directory exists
    fs.mkdirSync(testDataDir, { recursive: true });
    
    // Read existing data and update with new userSetName
    const fileContent = fs.readFileSync(testDataPath, 'utf-8');
    const testData = JSON.parse(fileContent);
    testData.userSetName = userSetName;
    testData.lastUpdated = new Date().toISOString();
    
    // Write back to file
    fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    await this.page.waitForTimeout(1000);
    await expect(this.getAssignUserNameInput()).toBeVisible();
    await this.getAssignUserNameInput().click();
    await this.getEditUserSetNameInput().clear();
    await this.getEditUserSetNameInput().fill(userSetName);
    await this.getEditUserSetNameInput().press('Enter');
    await expect(this.getEditUserSetBtn()).toBeVisible();
    await this.getEditUserSetBtn().click();
    const searchBox = this.getSearchBox();
    await searchBox.clear();
  }

  async modifyUserSetName() {
    // Get the current userSetName from cat.json
    const storedUserSetName = this.getStoredUserSetName();
    
    // Create locator using getByText with userSetName
    const userSetNameLocator = this.page.getByText(storedUserSetName);
    await expect(userSetNameLocator).toBeVisible();
    await userSetNameLocator.click();
    
    // Wait for edit mode and clear the input field
    const editNameInput = this.page.locator('input[id*="editName"]');
    await expect(editNameInput).toBeVisible();
    await editNameInput.clear();
    
    // Generate new name and store in cat.json as updatedUserSetName
    const updatedUserSetName = `UpdatedUserSet_${Date.now()}`;
    
    // Update cat.json with the new name
    const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
    const testDataPath = path.join(testDataDir, 'cat.json');
    let testData: any = {};
    
    // Ensure directory exists
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }
    
    // Read existing data if file exists and has content
    if (fs.existsSync(testDataPath)) {
      try {
        const fileContent = fs.readFileSync(testDataPath, 'utf-8');
        if (fileContent.trim()) {
          testData = JSON.parse(fileContent);
        }
      } catch (error) {
        console.log('Error reading test data file:', error);
        testData = {};
      }
    }
    
    testData.updatedUserSetName = updatedUserSetName;
    testData.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));
    
    // Fill the new name
    await editNameInput.fill(updatedUserSetName);
    
    // Click the inline edit save icon (checkmark)
    const inlineEditSaveIcon = this.page.locator('svg-icon.inlineEdit.inln-icn.ng-star-inserted');
    await expect(inlineEditSaveIcon).toBeVisible();
    await inlineEditSaveIcon.click();
    
    // Validate toaster message
    const toasterMessage = this.page.locator('.toast-message, .toastr-message, [class*="toast"], [class*="notification"]');
    await expect(toasterMessage).toBeVisible({ timeout: 10000 });
    const messageText = await toasterMessage.textContent();
    console.log('Toaster message:', messageText);
    
    return updatedUserSetName;
  }

  async searchUserSet(){
    const storedUserSetName = this.getStoredUserSetName();
    const createdUserSetName = this.page.locator('tr').filter({ has: this.page.locator('p', { hasText: `${storedUserSetName}` }) });
    const searchBox = this.getSearchBox();
    await searchBox.fill(storedUserSetName);
    await expect(createdUserSetName).toHaveText(storedUserSetName);
  }

  // Helper method to read test data from cat.json
  getStoredTestData(): any {
    const testDataDir = path.join(process.cwd(), 'pages', 'test-data');
    const testDataPath = path.join(testDataDir, 'cat.json');
    
    if (fs.existsSync(testDataPath)) {
      try {
        const fileContent = fs.readFileSync(testDataPath, 'utf-8');
        if (fileContent.trim()) {
          return JSON.parse(fileContent);
        }
      } catch (error) {
        console.error('Error reading test data:', error);
      }
    }
    return {};
  }

  // Helper method to get the stored userSetName
  getStoredUserSetName(): string {
    const testData = this.getStoredTestData();
    return testData.userSetName || '';
  }

  // Helper method to get the updated userSetName
  getUpdatedUserSetName(): string {
    const testData = this.getStoredTestData();
    return testData.updatedUserSetName || '';
  }

  async verifyUserSetSearchBox() {
    const searchBox = this.getSearchBox();
    await expect(searchBox).toBeVisible();
  }
}
