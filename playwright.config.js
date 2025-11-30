// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  workers: 4, // Run tests in parallel with 4 workers
  fullyParallel: true, // Run all tests in parallel
  // Generate HTML report after tests complete
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true, // Run headless for faster parallel execution
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    // Clear storage state for each test
    storageState: undefined,
  },
  // Auto-start dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000,
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
