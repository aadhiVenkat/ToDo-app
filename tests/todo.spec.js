// Playwright tests for ToDo app
import { test, expect, chromium } from '@playwright/test';

// Update the URL if your dev server runs on a different port
const APP_URL = 'http://localhost:5173';

// Shared browser and page - reused across all tests
let browser;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 500,
    args: ['--start-maximized'],
  });
  const context = await browser.newContext({
    viewport: null, // Maximized
  });
  page = await context.newPage();
  
  // Navigate once at the start
  await page.goto(APP_URL);
});

test.afterAll(async () => {
  await browser.close();
});

test.describe('Todo App', () => {

  test.describe('Page Load & Display', () => {
    
    test('should display the app title', async () => {
      await expect(page.getByRole('heading', { name: 'TaskMaster' })).toBeVisible();
    });

    test('should display the todo form', async () => {
      await expect(page.locator('form')).toBeVisible();
      await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    });

    test('should display the theme toggle button', async () => {
      await expect(page.getByLabel('Toggle theme')).toBeVisible();
    });

    test('should display search bar', async () => {
      await expect(page.getByPlaceholder('Search tasks...')).toBeVisible();
    });

    test('should display filter buttons', async () => {
      // Filter buttons contain emoji icons and text
      await expect(page.locator('button:has-text("📋")')).toBeVisible();
      await expect(page.locator('button:has-text("⚡")')).toBeVisible();
      await expect(page.locator('button:has-text("✅")')).toBeVisible();
    });
  });

  test.describe('Add Todo', () => {
    
    test('should add a new todo item', async () => {
      const todoText = 'Playwright Test Todo ' + Date.now();
      await page.getByPlaceholder('What needs to be done?').fill(todoText);
      await page.click('button[type="submit"]');
      await expect(page.locator(`text=${todoText}`)).toBeVisible();
    });

    test('should not add empty todo', async () => {
      const initialTodoCount = await page.locator('input[type="checkbox"]').count();
      await page.getByPlaceholder('What needs to be done?').fill('   ');
      await page.click('button[type="submit"]');
      // Count should remain the same
      const finalTodoCount = await page.locator('input[type="checkbox"]').count();
      expect(finalTodoCount).toBe(initialTodoCount);
    });

    test('should clear input after adding todo', async () => {
      const todoText = 'Clear input test ' + Date.now();
      const input = page.getByPlaceholder('What needs to be done?');
      await input.fill(todoText);
      await page.click('button[type="submit"]');
      await expect(input).toHaveValue('');
    });
  });

  test.describe('Toggle Todo', () => {
    
    test('should toggle todo completion status', async () => {
      // Add a new todo first
      const todoText = 'Toggle test ' + Date.now();
      await page.getByPlaceholder('What needs to be done?').fill(todoText);
      await page.click('button[type="submit"]');
      
      // Find the todo item and its checkbox
      const todoItem = page.locator(`text=${todoText}`).locator('xpath=ancestor::div[contains(@class, "group")]');
      const checkbox = todoItem.locator('input[type="checkbox"]');
      
      // Verify initially unchecked
      await expect(checkbox).not.toBeChecked();
      
      // Toggle it
      await checkbox.click();
      
      // Verify now checked
      await expect(checkbox).toBeChecked();
    });
  });

  test.describe('Delete Todo', () => {
    
    test('should delete a todo item', async () => {
      // Add a new todo first
      const todoText = 'Delete test ' + Date.now();
      await page.getByPlaceholder('What needs to be done?').fill(todoText);
      await page.click('button[type="submit"]');
      await expect(page.locator(`text=${todoText}`)).toBeVisible();
      
      // Find and hover over the todo item to reveal delete button
      const todoItem = page.locator(`text=${todoText}`).locator('xpath=ancestor::div[contains(@class, "group")]');
      await todoItem.hover();
      
      // Click the delete button (it has trash icon svg)
      const deleteButton = todoItem.locator('button').last();
      await deleteButton.click();
      
      // Verify it's removed
      await expect(page.locator(`text=${todoText}`)).not.toBeVisible();
    });
  });

  test.describe('Filter Todos', () => {
    
    test('should filter active todos', async () => {
      // Click Active filter (⚡ icon)
      await page.locator('button:has-text("⚡")').click();
      // Verify filter is selected (has gradient background)
      await expect(page.locator('button:has-text("⚡")')).toHaveClass(/bg-gradient/);
    });

    test('should filter completed todos', async () => {
      // Click Completed filter (✅ icon)
      await page.locator('button:has-text("✅")').click();
      // Verify filter is selected
      await expect(page.locator('button:has-text("✅")')).toHaveClass(/bg-gradient/);
    });

    test('should show all todos', async () => {
      // Click Completed first, then All
      await page.locator('button:has-text("✅")').click();
      await page.locator('button:has-text("📋")').click();
      // Verify All filter is selected
      await expect(page.locator('button:has-text("📋")')).toHaveClass(/bg-gradient/);
    });
  });

  test.describe('Search Todos', () => {
    
    test('should filter todos by search query', async () => {
      // Add a unique todo
      const uniqueText = 'UniqueSearchTerm' + Date.now();
      await page.getByPlaceholder('What needs to be done?').fill(uniqueText);
      await page.click('button[type="submit"]');
      
      // Search for it
      await page.getByPlaceholder('Search tasks...').fill(uniqueText);
      await expect(page.locator(`text=${uniqueText}`)).toBeVisible();
    });

    test('should show no results for non-matching search', async () => {
      await page.getByPlaceholder('Search tasks...').fill('xyznonexistent123456');
      // Count checkboxes (each todo has one)
      const todoItems = await page.locator('input[type="checkbox"]').count();
      expect(todoItems).toBe(0);
    });
  });

  test.describe('Theme Toggle', () => {
    
    test('should toggle between light and dark theme', async () => {
      const themeToggle = page.getByLabel('Toggle theme');
      
      // Get the main container with theme classes
      const mainContainer = page.locator('div.min-h-screen');
      
      // Check if initially in dark or light mode
      const hasDarkInitially = await mainContainer.evaluate(el => 
        el.className.includes('from-slate-900')
      );
      
      // Click to toggle theme
      await themeToggle.click();
      
      // Wait for transition
      await page.waitForTimeout(500);
      
      // Check if theme changed
      const hasDarkAfter = await mainContainer.evaluate(el => 
        el.className.includes('from-slate-900')
      );
      
      // Theme should have toggled
      expect(hasDarkInitially).not.toBe(hasDarkAfter);
    });
  });

  test.describe('Persistence', () => {
    
    test('should persist todos in localStorage', async () => {
      // Reload page for this test to start fresh
      await page.reload();
      
      // Add a unique todo
      const todoText = 'Persistence test ' + Date.now();
      await page.getByPlaceholder('What needs to be done?').fill(todoText);
      await page.click('button[type="submit"]');
      await expect(page.locator(`text=${todoText}`)).toBeVisible();
      
      // Reload the page to verify persistence
      await page.reload();
      
      // Todo should still be there after reload
      await expect(page.locator(`text=${todoText}`)).toBeVisible();
    });
  });
});
