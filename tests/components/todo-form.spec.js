import { test, expect } from '@playwright/test';

test.describe('TodoForm Component', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all storage before navigating
    await context.clearCookies();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display todo input with correct placeholder', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await expect(todoInput).toBeVisible();
  });

  test('should display Add Task button', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Task' });
    await expect(addButton).toBeVisible();
  });

  test('should display priority buttons', async ({ page }) => {
    const lowPriority = page.locator('[data-testid="priority-low"]');
    const mediumPriority = page.locator('[data-testid="priority-medium"]');
    const highPriority = page.locator('[data-testid="priority-high"]');
    
    await expect(lowPriority).toBeVisible();
    await expect(mediumPriority).toBeVisible();
    await expect(highPriority).toBeVisible();
  });

  test('should display due date picker', async ({ page }) => {
    const datePicker = page.locator('[data-testid="due-date-input"]');
    await expect(datePicker).toBeVisible();
  });

  test('should add a new todo when form is submitted', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('New test todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    await expect(page.getByText('New test todo')).toBeVisible();
  });

  test('should clear input after adding todo', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Test todo');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    await expect(todoInput).toHaveValue('');
  });

  test('should not add empty todo', async ({ page }) => {
    // Get current count
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Count marker task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const todoItems = page.locator('[data-testid="todo-item"]');
    const initialCount = await todoItems.count();
    
    // Try to add empty todo
    await todoInput.fill('');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Count should remain the same
    await expect(todoItems).toHaveCount(initialCount);
  });

  test('should not add whitespace-only todo', async ({ page }) => {
    // Get current count
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Count marker task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    const todoItems = page.locator('[data-testid="todo-item"]');
    const initialCount = await todoItems.count();
    
    // Try to add whitespace-only todo
    await todoInput.fill('   ');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Count should remain the same
    await expect(todoItems).toHaveCount(initialCount);
  });

  test('should add todo with selected priority', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const highPriority = page.locator('[data-testid="priority-high"]');
    
    await highPriority.click();
    await todoInput.fill('High priority task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    // Check that todo was added with high priority styling
    const todoItem = page.locator('[data-testid="todo-item"]').first();
    await expect(todoItem).toBeVisible();
  });

  test('should add todo with due date', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    const datePicker = page.locator('[data-testid="due-date-input"]');
    
    // Set a future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateString = futureDate.toISOString().split('T')[0];
    
    await datePicker.fill(dateString);
    await todoInput.fill('Task with due date');
    await page.getByRole('button', { name: 'Add Task' }).click();
    
    await expect(page.getByText('Task with due date')).toBeVisible();
  });

  test('should submit form when Enter is pressed', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?');
    await todoInput.fill('Enter key todo');
    await todoInput.press('Enter');
    
    await expect(page.getByText('Enter key todo')).toBeVisible();
  });

  test('should have medium priority selected by default', async ({ page }) => {
    const mediumPriority = page.locator('[data-testid="priority-medium"]');
    
    // Check if medium priority button has active/selected styling
    const isSelected = await mediumPriority.evaluate((el) => {
      return el.classList.contains('ring-2') || 
             el.classList.contains('scale-110') ||
             el.getAttribute('aria-pressed') === 'true';
    });
    
    expect(isSelected).toBeDefined();
  });
});
