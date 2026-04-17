import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT - Visit and Verify Talkgroup', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // TG-001: Visit TalkGroup Page
  test('TG-001 Visit TalkGroup Page', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    await pageObj.visitTalkGroup();

    // Validation of displayed list columns
    await pageObj.validateDisplayedList(pageObj.getCorporateMgntTalkgroup());
    await pageObj.validateDisplayedList(pageObj.getName());
    await pageObj.validateDisplayedList(pageObj.getCreateTalkGrpType());
    await pageObj.validateDisplayedList(pageObj.getMember());
    await pageObj.validateDisplayedList(pageObj.getCreateTalkGrp());

    // Filter option validation
    await pageObj.checkVisibility(pageObj.getFilterBtn());

    // Export option validation
    await pageObj.checkVisibility(pageObj.getExportBtn());
    await pageObj.checkVisibility(pageObj.getCreateTalkgrpBtn());
  });
});
