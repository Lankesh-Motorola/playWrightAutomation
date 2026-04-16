const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto('https://wms-dev-automtn.msiidcitgcloud.com/csrkodiak/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.locator('input:not([type="password"])').first().fill('wcsr_automation@moto.com');
  await page.locator('input[type="password"]').fill('Motorola@123');
  await page.getByRole('button', { name: 'Sign On' }).click();
  await page.waitForURL('**/wcsr/home**', { timeout: 60000 });
  // Click corporate management
  await page.locator('[class="card-title msi-card-title"]').filter({ hasText: 'Corporate Management' }).first().click();
  await page.waitForLoadState('domcontentloaded');
  await page.locator('input[placeholder="Enter Corporate ID"]').fill('WCSR_AUTO_1');
  const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByRole('button', { name: /launch/i }).click()]);
  await newPage.waitForLoadState();
  // Navigate to Interop User
  await newPage.screenshot({ path: 'home-snap.png', fullPage: false });
  const html = await newPage.content();
  require('fs').writeFileSync('home-snap.html', html.substring(0, 5000));
  await browser.close();
})();
