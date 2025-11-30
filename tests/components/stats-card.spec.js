import { test, expect } from '@playwright/test';

test.describe('StatsCard Component', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all storage before navigating
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display Total stats card', async ({ page }) => {
    // Add a todo first to ensure stats cards are visible
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const totalCard = page.locator('[data-testid="stats-total"]');
    await expect(totalCard).toBeVisible();
    await expect(totalCard).toContainText('Total');
  });

  test('should display Active stats card', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const activeCard = page.locator('[data-testid="stats-active"]');
    await expect(activeCard).toBeVisible();
    await expect(activeCard).toContainText('Active');
  });

  test('should display Completed stats card', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const completedCard = page.locator('[data-testid="stats-completed"]');
    await expect(completedCard).toBeVisible();
    await expect(completedCard).toContainText('Completed');
  });

  test('should update Total count when adding todos', async ({ page }) => {
    // Get current count
    const totalCard = page.locator('[data-testid="stats-total"]');
    const initialText = await totalCard.textContent();
    const initialCount = parseInt(initialText.match(/\d+/)?.[0] || '0');
    
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Task 1');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await todoInput.fill('Task 2');
    await page.getByRole('button', { name: 'Add Task' }).click();

    // Count should increase by 2
    await expect(totalCard).toContainText(String(initialCount + 2));
  });

  test('should update Active and Completed counts when toggling todos', async ({ page }) => {
    // First add a fresh todo to toggle
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Toggle test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Get current counts
    const activeCard = page.locator('[data-testid="stats-active"]');
    const completedCard = page.locator('[data-testid="stats-completed"]');
    const initialActiveText = await activeCard.textContent();
    const initialCompletedText = await completedCard.textContent();
    const initialActive = parseInt(initialActiveText.match(/\d+/)?.[0] || '0');
    const initialCompleted = parseInt(initialCompletedText.match(/\d+/)?.[0] || '0');

    // Find and complete our new todo
    const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Toggle test task' });
    const checkbox = todoItem.locator('[data-testid="todo-checkbox"]');
    await checkbox.click();

    // Check updated counts (active -1, completed +1)
    await expect(activeCard).toContainText(String(initialActive - 1));
    await expect(completedCard).toContainText(String(initialCompleted + 1));
  });

  test('should show all three stats cards on page', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const statsCards = page.locator('[data-testid^="stats-"]');
    await expect(statsCards).toHaveCount(3);
  });
});
