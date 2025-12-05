---
name: qc-web
description: Generate end-to-end (e2e) tests using Playwright for web applications. Use when creating automated browser tests, testing user flows, UI testing, or writing integration tests for web pages.
---

# QC Web - Playwright E2E Test Generator

## Instructions

When generating e2e tests with Playwright, follow these steps:

### 1. Analyze the Target
- Read the HTML/JavaScript files to understand the page structure
- Identify key user interactions (clicks, inputs, navigation)
- Note important DOM selectors (IDs, classes, data-testid attributes)
- Understand the expected behavior and state changes

### 2. Test Structure
Create tests in the `tests/` directory with `.spec.ts` extension:

```
tests/
  example.spec.ts
  fixtures/
    test-data.json
  utils/
    helpers.ts
```

### 3. Writing Tests

Use this template for each test file:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should describe expected behavior', async ({ page }) => {
    // Arrange - setup test data/state

    // Act - perform user actions
    await page.click('button#start');

    // Assert - verify expected outcomes
    await expect(page.locator('.result')).toBeVisible();
  });
});
```

### 4. Best Practices

**Selectors (in order of preference):**
1. `data-testid` attributes: `page.locator('[data-testid="submit-btn"]')`
2. Role-based: `page.getByRole('button', { name: 'Submit' })`
3. Text content: `page.getByText('Click me')`
4. CSS selectors: `page.locator('.class-name')`

**Assertions:**
- Use `expect` with specific matchers
- Wait for elements: `await expect(locator).toBeVisible()`
- Check text: `await expect(locator).toHaveText('expected')`
- Check attributes: `await expect(locator).toHaveAttribute('disabled')`

**Test Independence:**
- Each test should be independent and isolated
- Use `beforeEach` for common setup
- Clean up state in `afterEach` if needed

### 5. Configuration

Create `playwright.config.ts` if not exists:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 8000',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 6. Running Tests

```bash
# Install Playwright
yarn add -D @playwright/test
yarn playwright install

# Run tests
yarn playwright test

# Run with UI mode
yarn playwright test --ui

# Run specific test file
yarn playwright test tests/example.spec.ts

# Debug mode
yarn playwright test --debug
```

## Examples

### Timer Application Test

```typescript
import { test, expect } from '@playwright/test';

test.describe('Pomodoro Timer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should start timer when clicking start button', async ({ page }) => {
    await page.click('#start-btn');

    await expect(page.locator('#timer')).toBeVisible();
    await expect(page.locator('#status')).toHaveText('Running');
  });

  test('should switch between work and break modes', async ({ page }) => {
    await page.click('[data-mode="work"]');
    await expect(page.locator('.mode-indicator')).toHaveText('Work');

    await page.click('[data-mode="shortBreak"]');
    await expect(page.locator('.mode-indicator')).toHaveText('Short Break');
  });

  test('should save progress to localStorage', async ({ page }) => {
    await page.click('#start-btn');
    await page.waitForTimeout(1000);
    await page.click('#pause-btn');

    const savedData = await page.evaluate(() => {
      return localStorage.getItem('pomodoroTimeline');
    });

    expect(savedData).not.toBeNull();
  });
});
```

### Modal/Settings Test

```typescript
test.describe('Settings Modal', () => {
  test('should open and close settings modal', async ({ page }) => {
    await page.click('#settings-btn');
    await expect(page.locator('.modal')).toBeVisible();

    await page.click('.modal-close');
    await expect(page.locator('.modal')).toBeHidden();
  });

  test('should switch between tabs', async ({ page }) => {
    await page.click('#settings-btn');

    await page.click('[data-tab="sound"]');
    await expect(page.locator('.tab-content[data-tab="sound"]')).toBeVisible();

    await page.click('[data-tab="library"]');
    await expect(page.locator('.tab-content[data-tab="library"]')).toBeVisible();
  });
});
```

### Form Interaction Test

```typescript
test('should handle form submission', async ({ page }) => {
  await page.fill('input[name="duration"]', '30');
  await page.selectOption('select#mode', 'work');
  await page.check('input#notifications');

  await page.click('button[type="submit"]');

  await expect(page.locator('.success-message')).toBeVisible();
});
```

## Version History
- v1.0.0 (2025-12-03): Initial release
