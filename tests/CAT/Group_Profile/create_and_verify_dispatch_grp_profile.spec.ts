import { test, expect } from '@playwright/test';
import { CATPage } from '../../../pages/CATPage';
import { wcsrLogin } from '../../../helpers/common';

test.describe('One Portal CAT - Create/Verify Dispatch Group Profile', () => {
  let page: any;
  let pageObj: CATPage;

  test.beforeEach(async ({ page: p }) => {
    page = p;
    await page.goto('about:blank');
  });

  // GP-013: Dispatch Group Profile Management
  test('GP-013 Dispatch Group Profile Management', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.visitGroupProfile();
    await pageObj.selectGroupProfile('Dispatch');
    
    // Create a Group Profile and a talkgroup associated with it
    await pageObj.createGroupProfileWithTalkgrp('Dispatch_Group_Profile_Name', 'Dispatch_Talkgroup_Name', 'Dispatch');
    
    // Verify the newly created group profile is in the table
    await pageObj.verifySearch('Dispatch_Group_Profile_Name');
    
    // Navigate to Talkgroup and verify it exists
    await pageObj.visitTalkGroupFromCAT();
    await pageObj.verifySearch('Dispatch_Talkgroup_Name');
  });

  // GP-014: Delete dispatch talkgroup
  test('GP-014 Delete dispatch talkgroup', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteTalkGroup('Dispatch_Talkgroup_Name');
  });

  // GP-015: Delete dispatch group profile
  test('GP-015 Delete dispatch group profile', async ({ page }) => {
    await wcsrLogin(page);
    pageObj = new CATPage(page);

    await pageObj.deleteGroupProfile('Dispatch_Group_Profile_Name');
  });
});
