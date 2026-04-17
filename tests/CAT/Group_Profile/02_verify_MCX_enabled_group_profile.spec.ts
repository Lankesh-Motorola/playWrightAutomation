import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin, launchAndGetNewPageObject, corp_id } from '../../../helpers/common';

test.describe('One Portal CAT: Verify MCX enabled Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-002: Verify MCX enabled Standard Group Profile from Talk Group
  test('GP-002 Verify MCX enabled Standard Group Profile from Talk Group', async ({ page, context }) => {
    // Verify added group in MCX enabled Group profile is displayed in Talkgroup screen: OnePortalCAT_39
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    //Switch to new tab
    await newPageObj.visitGroupProfile();
    await newPageObj.selectGroupProfile('Standard');
    await newPageObj.createGroupProfileWithTalkgrp('Standard_Group_Profile_Tlk_Name', 'Test_Data_Standard_TalkGr');
  });

  // GP-03: Delete group profile
  test('GP-03 Delete group profile', async ({ page, context }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);
    // Launch and get the new page object
    const newPageObj = await launchAndGetNewPageObject(context, pageObj, corp_id);

    //Switch to new tab
    await newPageObj.visitGroupProfile();
    await newPageObj.deleteGroupProfile('Standard_Group_Profile_Tlk_Name');
  });
});
