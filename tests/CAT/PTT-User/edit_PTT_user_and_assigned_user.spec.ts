import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Edit PTT User and Assigned User', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_021: PTT User Edit
  test('TC_021 PTT User Edit', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();

    // Verify display name is disabled
    await pageObj.checkNotEnabled(pageObj.getDisplayName());
    
    // Verify phone number is disabled
    await pageObj.checkNotEnabled(pageObj.getPhoneNumberPTTUSer());
    
    // Verify billing number is disabled
    await pageObj.checkNotEnabled(pageObj.getBillingNumberPTTUser());
  });

  // TC_022: Assign User to PTT User and User Set
  test('TC_022 Assign User to PTT User and User Set', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();

    // Assign users
    await pageObj.assignPTTUser(0);
    await pageObj.assignPTTUser(0);

    // Assign user sets
    await pageObj.assignPTTUser(1);
  });

  // TC_023: Verify Authorized users of the subscriber
  test('TC_023 Verify Authorized users of the subscriber', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();

    // Check for authorized users
    await pageObj.verifyAuthorizedPTTUserExists();
  });

  // TC_024: Delete User
  test('TC_024 Delete User', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();

    // Delete assigned members
    await pageObj.deleteAssignedMember();
    await pageObj.deleteAssignedMember(true);
  });

  // TC_025: Delete User Set
  test('TC_025 Delete User Set', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();

    // Delete assigned user set
    await pageObj.deleteAssignedMember();
  });
});
