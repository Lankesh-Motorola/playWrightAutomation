import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject } from '../../../helpers/common';

test.describe('One Portal CAT - Feature Enable/Disable', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_012: Verify Enabling Feature for the subscriber
  test('TC_012 Verify Enabling Feature for the subscriber', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.featurePttUser();
    await page.waitForTimeout(2000);
  });

  // TC_013: Verify enabling Emergency feature for the subscriber
  test('TC_013 Verify enabling Emergency feature for the subscriber', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.enabledfeautureEmergency();
    await page.waitForTimeout(2000);
  });

  // TC_014: Verify disabling Emergency feature for the subscriber
  test('TC_014 Verify disabling Emergency feature for the subscriber', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitPTTUserEditPage();
    await pageObj.disableEmergencyFeature();
    await page.waitForTimeout(2000);
  });
});
