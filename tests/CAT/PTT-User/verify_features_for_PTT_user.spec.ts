import { test, expect, BrowserContext } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - PTT User Features', () => {
  let context: BrowserContext;
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ context: ctx, page: p }) => {
    context = ctx;
    page = p;
  });

  // TC_015: Verify client type change from standard to radio and vice versa
  test('TC_015 Verify client type change from standard to radio and vice versa', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.switchClientTypePTTUser();
    await pageObj.getPTTUser();
    await pageObj.switchClientTypePTTUser();
  });

  // TC_016: Verify permission changes for a subscriber
  test('TC_016 Verify permission changes for a subscriber', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.changePermissionPTTUser();
    await pageObj.getPTTUser();
    await pageObj.changePermissionPTTUser();
  });

  // TC_017: Verify Updating Email ID
  test('TC_017 Verify Updating Email ID', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.updateEmailIdPTTUser();
  });

  // TC_018: Verify Activation Code Generation
  test('TC_018 Verify Activation Code Generation', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.activationCodeGenerationPTTUser();
  });

  // TC_019: Verify setting up zones, position and scan list for PTT Radio type of client
  test('TC_019 Verify setting up zones position and scan list for PTT Radio type of client', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.clickEvent(pageObj.getTabOpt(1));
    
    const talkgroupExists = await pageObj.checkTalkgroupExists();
    if (!talkgroupExists) {
      await pageObj.createStandardTalkGroup();
      await pageObj.visitWithinCat();
      await pageObj.getPTTUserOption();
      await pageObj.getPTTUser();
    }
    
    await pageObj.checkTalkGrpTabUnderPTTUser();
  });

  // TC_020: Verify Updating Features for the subscriber
  test('TC_020 Verify Updating Features for the subscriber', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitPTTUserEditPage();
    await pageObj.updateFeaturesPTTUser();
  });
});
