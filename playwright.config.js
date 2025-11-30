// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 1, // Run tests sequentially in same worker
  fullyParallel: false,
  // Generate HTML report after tests complete
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    viewport: null, // Use full window size
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 500, // Slow down actions by 500ms so you can see them
      args: ['--start-maximized'], // Start browser maximized
    },
  },
  // Reuse browser across tests
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        // Keep browser context open
        contextOptions: {
          viewport: null,
        },
      },
    },
  ],
});
