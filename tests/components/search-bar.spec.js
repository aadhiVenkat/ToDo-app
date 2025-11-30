import { test, expect } from '@playwright/test';

test.describe('SearchBar Component', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all storage before navigating
    await context.clearCookies();
    // Navigate with empty localStorage
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    // Add some todos for search testing
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Buy groceries');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Walk the dog');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Read a book');
    await page.getByRole('button', { name: 'Add Task' }).click();
  });

  test('should display search input with correct placeholder', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await expect(searchInput).toBeVisible();
  });

  test('should filter todos when typing in search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await searchInput.fill('groceries');
    
    // Should show only matching todo
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).not.toBeVisible();
    await expect(page.getByText('Read a book')).not.toBeVisible();
  });

  test('should show clear button when search has text', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await searchInput.fill('test');
    
    // Clear button should appear
    const clearButton = page.locator('[data-testid="search-clear"]');
    await expect(clearButton).toBeVisible();
  });

  test('should clear search when clear button is clicked', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await searchInput.fill('groceries');
    
    // Click clear button
    const clearButton = page.locator('[data-testid="search-clear"]');
    await clearButton.click();
    
    // Search should be empty and all todos visible
    await expect(searchInput).toHaveValue('');
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Read a book')).toBeVisible();
  });

  test('should be case-insensitive search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await searchInput.fill('BUY');
    
    await expect(page.getByText('Buy groceries')).toBeVisible();
  });

  test('should show no results for non-matching search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tasks...');
    await searchInput.fill('xyz123');
    
    // All todos should be hidden
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
    await expect(page.getByText('Walk the dog')).not.toBeVisible();
    await expect(page.getByText('Read a book')).not.toBeVisible();
  });
});
