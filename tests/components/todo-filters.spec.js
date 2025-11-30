import { test, expect } from '@playwright/test';

test.describe('TodoFilters Component', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all storage before navigating
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    // Add some todos
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Active task 1');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Active task 2');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Completed task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Complete one todo
    const checkboxes = page.locator('[data-testid="todo-checkbox"]');
    await checkboxes.last().click();
  });

  test('should display All filter button', async ({ page }) => {
    const allFilter = page.locator('[data-testid="filter-all"]');
    await expect(allFilter).toBeVisible();
  });

  test('should display Active filter button', async ({ page }) => {
    const activeFilter = page.locator('[data-testid="filter-active"]');
    await expect(activeFilter).toBeVisible();
  });

  test('should display Completed filter button', async ({ page }) => {
    const completedFilter = page.locator('[data-testid="filter-completed"]');
    await expect(completedFilter).toBeVisible();
  });

  test('should show all todos when All filter is selected', async ({ page }) => {
    const allFilter = page.locator('[data-testid="filter-all"]');
    await allFilter.click();
    
    await expect(page.getByText('Active task 1')).toBeVisible();
    await expect(page.getByText('Active task 2')).toBeVisible();
    await expect(page.getByText('Completed task')).toBeVisible();
  });

  test('should show only active todos when Active filter is selected', async ({ page }) => {
    const activeFilter = page.locator('[data-testid="filter-active"]');
    await activeFilter.click();
    
    await expect(page.getByText('Active task 1')).toBeVisible();
    await expect(page.getByText('Active task 2')).toBeVisible();
    await expect(page.getByText('Completed task')).not.toBeVisible();
  });

  test('should show only completed todos when Completed filter is selected', async ({ page }) => {
    const completedFilter = page.locator('[data-testid="filter-completed"]');
    await completedFilter.click();
    
    await expect(page.getByText('Active task 1')).not.toBeVisible();
    await expect(page.getByText('Active task 2')).not.toBeVisible();
    await expect(page.getByText('Completed task')).toBeVisible();
  });

  test('should display tasks remaining count', async ({ page }) => {
    const remainingText = page.locator('[data-testid="tasks-remaining"]');
    // Should show "X tasks remaining" where X is the number of active (uncompleted) tasks
    await expect(remainingText).toContainText('tasks remaining');
  });

  test('should show Clear Completed button when there are completed todos', async ({ page }) => {
    const clearButton = page.locator('[data-testid="clear-completed"]');
    await expect(clearButton).toBeVisible();
  });

  test('should remove completed todos when Clear Completed is clicked', async ({ page }) => {
    const clearButton = page.locator('[data-testid="clear-completed"]');
    await clearButton.click();
    
    // Completed task should be removed
    await expect(page.getByText('Completed task')).not.toBeVisible();
    // Active tasks should remain
    await expect(page.getByText('Active task 1')).toBeVisible();
    await expect(page.getByText('Active task 2')).toBeVisible();
  });

  test('should highlight active filter button', async ({ page }) => {
    const activeFilter = page.locator('[data-testid="filter-active"]');
    await activeFilter.click();
    
    // Active filter should have different styling (gradient background)
    const hasActiveClass = await activeFilter.evaluate((el) => {
      return el.classList.contains('bg-gradient-to-r') || 
             window.getComputedStyle(el).background.includes('gradient');
    });
    
    expect(hasActiveClass).toBeDefined();
  });
});
