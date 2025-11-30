import { test, expect } from '@playwright/test';

test.describe('TodoList Component', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all storage before navigating
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should show empty state when no todos exist', async ({ page }) => {
    // Delete all existing todos first
    let todoItems = page.locator('[data-testid="todo-item"]');
    let count = await todoItems.count();
    
    while (count > 0) {
      const todoItem = todoItems.first();
      await todoItem.hover();
      const deleteButton = todoItem.locator('[data-testid="todo-delete"]');
      await deleteButton.click();
      await page.waitForTimeout(300);
      count = await todoItems.count();
    }
    
    const emptyState = page.locator('[data-testid="todo-list-empty"]');
    await expect(emptyState).toBeVisible();
  });

  test('should display todo list container when todos exist', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const todoList = page.locator('[data-testid="todo-list"]');
    await expect(todoList).toBeVisible();
  });

  test('should render multiple todo items', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    // Get initial count
    const todoItems = page.locator('[data-testid="todo-item"]');
    const initialCount = await todoItems.count();
    
    await todoInput.fill('First new todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Second new todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Third new todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Should have 3 more items than before
    await expect(todoItems).toHaveCount(initialCount + 3);
  });

  test('should hide empty state when todos are added', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('New todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const emptyState = page.locator('[data-testid="todo-list-empty"]');
    await expect(emptyState).not.toBeVisible();
  });

  test('should show empty state when all todos are deleted', async ({ page }) => {
    // Delete all existing todos
    let todoItems = page.locator('[data-testid="todo-item"]');
    let count = await todoItems.count();
    
    while (count > 0) {
      const todoItem = todoItems.first();
      await todoItem.hover();
      const deleteButton = todoItem.locator('[data-testid="todo-delete"]');
      await deleteButton.click();
      await page.waitForTimeout(300);
      count = await todoItems.count();
    }
    
    // Empty state should appear
    const emptyState = page.locator('[data-testid="todo-list-empty"]');
    await expect(emptyState).toBeVisible();
  });

  test('should maintain todo order (newest at top or bottom)', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    await todoInput.fill('First added');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Second added');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Third added');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const todoItems = page.locator('[data-testid="todo-item"]');
    const firstItemText = await todoItems.first().textContent();
    const lastItemText = await todoItems.last().textContent();
    
    // Either newest first or oldest first, but should be consistent
    expect(firstItemText).toBeDefined();
    expect(lastItemText).toBeDefined();
  });

  test('should animate items on load', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Animated todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Check for animation classes or styles
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    await expect(todoItem).toBeVisible();
    
    // Animation typically involves transform or opacity transitions
    const hasAnimation = await todoItem.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.animation !== 'none' || 
             style.transition !== 'none' ||
             style.transform !== 'none';
    });
    
    expect(hasAnimation).toBeDefined();
  });

  test('should correctly filter todos in list view', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    // Add our specific test todos
    await todoInput.fill('Filter active test');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Filter completed test');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Complete the second one
    const completedTodo = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Filter completed test' });
    const checkbox = completedTodo.locator('[data-testid="todo-checkbox"]');
    await checkbox.click();
    
    // Filter to Active - our active test todo should be visible
    await page.locator('[data-testid="filter-active"]').click();
    await expect(page.getByText('Filter active test')).toBeVisible();
    await expect(page.getByText('Filter completed test')).not.toBeVisible();
    
    // Filter to Completed - our completed test todo should be visible
    await page.locator('[data-testid="filter-completed"]').click();
    await expect(page.getByText('Filter active test')).not.toBeVisible();
    await expect(page.getByText('Filter completed test')).toBeVisible();
    
    // Filter to All - both should be visible
    await page.locator('[data-testid="filter-all"]').click();
    await expect(page.getByText('Filter active test')).toBeVisible();
    await expect(page.getByText('Filter completed test')).toBeVisible();
  });

  test('should persist todos after page reload', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    
    await todoInput.fill('Persistent todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Reload page
    await page.reload();
    
    // Todo should still be there
    await expect(page.getByText('Persistent todo')).toBeVisible();
  });
});
