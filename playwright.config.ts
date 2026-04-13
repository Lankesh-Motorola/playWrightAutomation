import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://wms-dev-automtn.msiidcitgcloud.com',
    headless: false,
    // 1. Setting viewport to null is required for --start-maximized to work correctly
    viewport: null, 
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'off',
    
    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'chrome',
      use: {
        // 2. REMOVED: ...devices['Desktop Chrome'] 
        // 3. Explicitly set the channel to chrome
        channel: 'chrome',
      },
    },
  ],
});