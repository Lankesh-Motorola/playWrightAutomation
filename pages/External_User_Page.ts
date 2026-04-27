import { Locator, Page, expect } from '@playwright/test';
import path from 'path/win32';

export default class ExternalUserPage  {
  readonly page: Page;
  readonly PTT_Users_button: Locator;
  readonly PTT_User_header: Locator;
  readonly externalUserButton: Locator;
  readonly externalUserAddButton: Locator;
  readonly externalUserHeader: Locator;
  readonly externalUserSearchBox: Locator;
  readonly externalUserSearchBoxError: Locator;
  readonly externalUserBody: Locator;
  readonly searchClearButton: Locator;
  readonly searchIcon: Locator;
  readonly pagination: Locator;
  readonly exportButton: Locator;
  readonly importButton: Locator;
  readonly importDialogHeader: Locator;
  readonly importDialogBoxButton: Locator;
  readonly fileCountZero: Locator;
  readonly sampleFileDownload: Locator;
  readonly selectFileBtn: Locator;
  readonly fileInput: Locator;
  readonly fileImportButton: Locator;
  readonly dailogBoxCloseButton: Locator;
  readonly externalUserCreateHeader: Locator;
  readonly externalUserBasciInfoHeader: Locator;
  readonly externalUserNameLabel: Locator;
  readonly externalUserNameInput: Locator;
  readonly externalUserPhoneNumberLabel: Locator;
  readonly externalUserPhoneNumberInput: Locator;
  readonly externalUserPhoneNumberErrorMessage: Locator;
  readonly externalUserCancelButton: Locator;
  readonly externalUserSaveButton: Locator;
  readonly externalUserDeleteButton: Locator;
  readonly externalUserOkButton: Locator;
  readonly externalUserEditButton: Locator;
  readonly EditNameExternalUserButton: Locator;
  readonly nameSaveButton: Locator;
  readonly externalUserViewButton: Locator;
  readonly viewEdit: Locator;
  constructor(page: Page) {    this.page = page;    this.PTT_Users_button = page.locator("#menu-44-PTTUsers");
    this.PTT_User_header =  page.locator(".pg-title-bar");
    this.externalUserButton = page.locator("#menu-44-ExternalContacts");
    this.externalUserAddButton = page.getByRole('button', { name: 'Add External User' });
    this.externalUserHeader = page.locator("#external-header");
    this.externalUserSearchBox = page.getByPlaceholder('Search by Name or Phone Number');
    this.externalUserSearchBoxError = page.locator("//span[contains(.,'Search Value should be more than 2 chars')]");
    this.searchClearButton = page.locator("#external-search-clear-icon");
    this.searchIcon = page.locator("#external-search-search-icon");
    this.pagination = page.locator("div[class*='paginator']");
    this.externalUserBody = page.locator('body');
    this.exportButton = page.locator("#ext-export");
    this.importButton = page.locator("#ext-import");
    this.importDialogHeader = page.locator(".msi-pop-up-modal-header-title");
    this.importDialogBoxButton = page.locator(".msi-file-upload-dragdrop-zone-content");
    this.fileCountZero = page.getByText('0 files added.');
    this.sampleFileDownload = page.getByText('Download Sample CSV');
    this.selectFileBtn = page.getByText('Select File');
    this.fileInput = page.locator('input[type="file"][accept=".csv"]');
    this.fileImportButton = page.getByRole('button', { name: 'Import' });
    this.dailogBoxCloseButton = page.locator("#get-focus2");
    this.externalUserCreateHeader = page.locator(".pg-title.msi-focus");
    this.externalUserBasciInfoHeader = page.getByText("Basic Information");
    this.externalUserNameLabel = page.getByText("Name");
    this.externalUserNameInput = page.locator('#ext-name');
    this.externalUserPhoneNumberLabel = page.getByText("Phone Number");
    this.externalUserPhoneNumberInput = page.locator('#ext-phone');
    this.externalUserPhoneNumberErrorMessage = page.getByText('Please enter a valid Phone Number')
    this.externalUserCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.externalUserSaveButton= page.getByRole('button', { name: 'Save' });
    this.externalUserDeleteButton = page.locator("#ext-listbtn");
    this.externalUserOkButton = page.getByRole('button', { name: 'Ok' });
    this.externalUserEditButton = page.locator("#ext-listedt .action-icon"); 
    this.EditNameExternalUserButton = page.locator("input[name='Edit Name']");
    this.nameSaveButton = page.locator("//input[@name='Edit Name']/following-sibling::svg-icon[@class[contains(.,'inlineEdit')]]");
    this.externalUserViewButton = page.locator("button #ext-listview svg");
    this.viewEdit= page.getByRole('button', { name: 'Edit' });
  } 
  
  async clickPTTUsers() {
    await this.PTT_Users_button.click();
  }

  async verifyPTTUsersPage() {
    await expect(this.PTT_User_header).toBeVisible();
  }

  async clickExternalUserButton() {
    await this.externalUserButton.click();
  }

  async verifyExternalUserPage() {
    await expect(this.externalUserAddButton).toBeVisible();
  }

  async verifyExternalUserHeader() {
    await expect(this.externalUserHeader).toBeVisible();
  }

  async verifyExternalUserSearchBox() {
    await expect(this.externalUserSearchBox).toBeVisible();
  }

  async verifyExternalUserSearchBoxError(boolean: boolean = true) {
    if (boolean) {
      await expect(this.externalUserSearchBoxError).toBeVisible();
    } else {
      await expect(this.externalUserSearchBoxError).toBeHidden();
    }
  }

  async enterCharInSearchBox( text: string) {
    await this.externalUserSearchBox.fill(text);
  }

  async clearSearchBox() {
    await this.externalUserSearchBox.fill('');
  }

  async clickSearchClearButton() {
    await this.searchClearButton.click();
    await expect(this.externalUserSearchBox).toBeEmpty();
  }
  async verifySearchBoxValue(value: string) {
    await expect(this.externalUserSearchBox).toHaveValue(value);
  }
  async verifySearchBoxValueEmpty() {
    await expect(this.externalUserSearchBox).toBeEmpty();
  }
  async verifySearchIcon() {
    await expect(this.searchIcon).toBeVisible();
  }
  async verifyPagination() {
    await expect(this.pagination).toBeVisible();
  }
  async verifyandClickExportButton() {
    await expect(this.exportButton).toBeVisible();
    await this.exportButton.click();
  }
  async verifyandClickImportButton() {
    await expect(this.importButton).toBeVisible();
    await this.importButton.click();
  }
  async verifyImportDialogHeader() {
    await expect(this.importDialogHeader).toBeVisible();
  }
  async verifyandClickImportDialogBox() {
    await expect(this.importDialogBoxButton).toBeVisible();
    await this.importDialogBoxButton.click();
  }
  async verifyFileCountZero() {
    await expect(this.fileCountZero).toBeVisible();
  }
  async verifySampleFileDownload() {
    await expect(this.sampleFileDownload).toBeVisible();
  }
  async verifySelectFileButton() {
    await expect(this.selectFileBtn).toBeVisible();
  }


async uploadFile(fileName: string) {
  // process.cwd() starts at your project root (OnePortal Automation)
  const filePath = path.resolve(process.cwd(), 'test-data', fileName);
  
  // Log it to your console so you can see exactly where it's looking
  console.log('Looking for file at:', filePath);
  
  // Use the file input element for uploading files
  await this.fileInput.setInputFiles(filePath);
}
async verifyImportButtonEnabled() {
 await expect(this.fileImportButton).toBeEnabled();
}
async clickDialogBoxCloseButton() {
  await this.dailogBoxCloseButton.click();
  await expect(this.importDialogHeader).toBeHidden(); 
}
async verifyExternalUserCreateHeader() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserCreateHeader).toBeVisible();
}
async verifyExternalUserBasicInfoHeader() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserBasciInfoHeader).toBeVisible();
}
async verifyExternalUserNameLabel() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserNameLabel).toBeVisible();
}
async verifyExternalUserNameInput() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserNameInput).toBeEditable();
}
async verifyExternalUserPhoneNumberLabel() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserPhoneNumberLabel).toBeVisible();
}
async verifyExternalUserPhoneNumberInput() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserPhoneNumberInput).toBeEditable();
}
async verifyExternalUserPhoneNumberInvalidInput() {
  await this.externalUserAddButton.click();
  await this.externalUserPhoneNumberInput.fill('9');
  await this.externalUserBody.click(); // Click outside to trigger validation
  await expect(this.externalUserPhoneNumberErrorMessage).toBeVisible(); 
}
async verifyExternalUserPhoneNumberValidInput() {
   await this.externalUserAddButton.click();
  await this.externalUserPhoneNumberInput.fill('919100000028');
  await this.externalUserBody.click(); // Click outside to trigger validation
  await expect(this.externalUserPhoneNumberErrorMessage).toBeHidden();
}
async verifyExternalUserCancelButton() {
  await this.externalUserAddButton.click();
  await expect(this.externalUserCancelButton).toBeVisible();
  await this.externalUserCancelButton.click();
  await expect(this.externalUserSearchBox).toBeVisible();
}

async verifyExternalUserSaveButton() {
  await this.externalUserAddButton.click();
  await this.externalUserNameInput.fill("External User 2");
  await this.externalUserPhoneNumberInput.fill('917000050004');
  await expect(this.externalUserSaveButton).toBeEnabled();
  await this.externalUserSaveButton.click();
  await expect(this.externalUserSearchBox).toBeVisible();
}

async verifyDeleteExternalUser() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserDeleteButton.click();
  await this.externalUserOkButton.click();
  await this.clearSearchBox();
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await expect(this.externalUserDeleteButton).toBeHidden()
  
}

async verifyEditExternalUser() {
  await this.verifyExternalUserSaveButton();
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserEditButton.click();
  await expect(this.externalUserBasciInfoHeader).toBeVisible();
}

async verifyEditExternalUserChangeInName() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserEditButton.click();
  await this.externalUserNameInput.clear();
  await this.externalUserNameInput.fill("External User 22");
  await this.externalUserSaveButton.click();
  await this.clickExternalUserButton();
  await this.enterCharInSearchBox('External User 22');
  await this.externalUserSearchBox.press('Enter');
  await expect(this.page.getByText('External User 2').nth(1)).toBeVisible();

}

async verifySearchExternalUserName() {
  await this.enterCharInSearchBox('External User 22');
  await this.externalUserSearchBox.press('Enter');
  await this.page.getByText('External User 22').nth(0).click();
  // await this.page.getByText('External User 22').clear();
  await this.EditNameExternalUserButton.clear();
  await this.EditNameExternalUserButton.fill('External User 2');
  await this.EditNameExternalUserButton.press('Enter');
  await this.nameSaveButton.click();
  await this.externalUserSearchBox.clear();
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await expect(this.page.getByText('External User 2').nth(0)).toBeVisible();
}

async verifyExternalUserViewButton() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserViewButton.click();
  await expect(this.page.getByText('External User 2').nth(0)).toBeVisible();
}
  async verifyExternalUserViewHeader() {
  await expect(this.page.getByText('External Users - External User 2')).toBeVisible();
}
async verifyExternalUserViewName() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  

  
  await this.externalUserViewButton.click();
  
  // More stable locator: Find the Name label in form and get the value in the same container
  await expect(this.page.locator('form div:has(.msi-textbox-label:text("Name"))').getByText('External User 2')).toBeVisible({ timeout: 10000 });
}
async verifyExternalBasicInformation() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserViewButton.click();
  await expect(this.externalUserBasciInfoHeader).toBeVisible();

}
async verifyExternalViewNameLabel() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await this.externalUserViewButton.click();
  await expect(this.externalUserNameLabel).toBeVisible();
}
async verifyExternalUserViewPhoneNumber() {
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  

  
  await this.externalUserViewButton.click();
  
  // More stable locator: Find the Phone Number label in form and get the value in the same container
  await expect(this.page.locator('form div:has(.msi-textbox-label:text("Phone Number"))').getByText('917000050004')).toBeVisible({ timeout: 10000 });
}

async validateViewEditButton(){
  await this.enterCharInSearchBox('External User 2');
  await this.externalUserSearchBox.press('Enter');
  await expect(this.externalUserViewButton).toBeVisible();
  await this.externalUserViewButton.click();
  await expect(this.viewEdit).toBeVisible();
  await this.viewEdit.click();
  await this.externalUserCancelButton.click();
  await expect(this.externalUserSearchBox).toBeVisible();
}
}