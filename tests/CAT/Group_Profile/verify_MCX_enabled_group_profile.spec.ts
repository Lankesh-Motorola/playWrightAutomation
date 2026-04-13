import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT: Verify MCX enabled Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-002: Verify MCX enabled Standard Group Profile from Talk Group
  test('GP-002 Verify MCX enabled Standard Group Profile from Talk Group', async ({ page }) => {
    // Verify added group in MCX enabled Group profile is displayed in Talkgroup screen: OnePortalCAT_39
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await pageObj.selectGroupProfile('Broadcast');
    await pageObj.createGroupProfileWithTalkgrp('Standard_Group_Profile_Tlk_Name', 'Test_Data_Standard_TalkGr');
    await pageObj.verifyMCXGroupProfileForTalkgroup('Test_Data_Standard_TalkGr', 'TalkGr_Assign_User', 'BROADCAST');
  });

  // GP-003: Delete talkgroup
  test('GP-003 Delete talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('Test_Data_Standard_TalkGr');
  });

  // GP-004: Delete group profile
  test('GP-004 Delete group profile', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteGroupProfile('Standard_Group_Profile_Tlk_Name');
  });
});
