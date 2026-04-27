import { defineConfig, devices } from '@playwright/test';

// Generate daily report directory with current date
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
const reportDir = `playwright-report/${currentDate}`;
const resultsDir = `test-results-${currentDate}`;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never', outputFolder: reportDir }]],
  outputDir: resultsDir,

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
      slowMo: 1000, // Add a small delay between actions to help with stability
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