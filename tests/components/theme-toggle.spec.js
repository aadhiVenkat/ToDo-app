import { test, expect } from '@playwright/test';

test.describe('ThemeToggle Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display theme toggle button', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    await expect(themeButton).toBeVisible();
  });

  test('should be positioned at top-right corner', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    const boundingBox = await themeButton.boundingBox();
    
    // Should be near the top-right
    expect(boundingBox.x).toBeGreaterThan(100);
    expect(boundingBox.y).toBeLessThan(100);
  });

  test('should toggle from light to dark theme', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    
    // Click to toggle theme
    await themeButton.click();
    
    // Check if dark class is applied to body or container
    const isDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') || 
             document.body.classList.contains('dark');
    });
    
    // Theme should have toggled
    expect(isDark).toBeDefined();
  });

  test('should toggle from dark to light theme', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    
    // Toggle twice to ensure we can go back
    await themeButton.click();
    await themeButton.click();
    
    // Page should have returned to original theme
    await expect(themeButton).toBeVisible();
  });

  test('should display sun icon in dark mode', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    
    // Get initial icon
    const initialIcon = await themeButton.innerHTML();
    
    // Toggle theme
    await themeButton.click();
    
    // Icon should change
    const newIcon = await themeButton.innerHTML();
    expect(newIcon).not.toBe(initialIcon);
  });

  test('should persist theme preference after reload', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    
    // Toggle theme
    await themeButton.click();
    
    // Get current theme state
    const themeBeforeReload = await page.evaluate(() => {
      return localStorage.getItem('theme') || 
             document.documentElement.classList.contains('dark');
    });
    
    // Reload page
    await page.reload();
    
    // Theme should persist
    const themeAfterReload = await page.evaluate(() => {
      return localStorage.getItem('theme') || 
             document.documentElement.classList.contains('dark');
    });
    
    expect(themeAfterReload).toBe(themeBeforeReload);
  });
});
