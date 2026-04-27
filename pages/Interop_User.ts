import { test, expect } from '@playwright/test';
import  from '../../../pages/External_User_Page';

export default class InteropConnectionsPage  {
  readonly interrop_connections_button: Locator;
  readonly interrop_connections_header: Locator;
 

  constructor(page: Page) {
    this.interrop_connections_button = page.locator("#menu-44-RadioInterops");
    this.interrop_connections_header =  page.locator("#intrp-header");
   
  }
}