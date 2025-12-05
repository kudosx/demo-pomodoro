import { test, expect } from '@playwright/test';

test.describe('Pomodoro Timer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Initial State', () => {
    test('should display correct initial timer value', async ({ page }) => {
      await expect(page.locator('#timer')).toHaveText('25:00');
    });

    test('should show Work Time mode by default', async ({ page }) => {
      await expect(page.locator('#modeDisplay')).toHaveText('Work Time');
    });

    test('should have Start button initially', async ({ page }) => {
      await expect(page.locator('#startBtn')).toHaveText('Start');
    });

    test('should show 0 completed sessions initially', async ({ page }) => {
      await expect(page.locator('#sessionCount')).toHaveText('0');
    });

    test('should display page title', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('Pomodoro Timer');
    });
  });

  test.describe('Timer Controls', () => {
    test('should start timer when clicking Start', async ({ page }) => {
      await page.click('#startBtn');

      await expect(page.locator('#startBtn')).toHaveText('Pause');
    });

    test('should pause timer when clicking Pause', async ({ page }) => {
      await page.click('#startBtn');
      await expect(page.locator('#startBtn')).toHaveText('Pause');

      await page.click('#startBtn');
      await expect(page.locator('#startBtn')).toHaveText('Start');
    });

    test('should decrement timer when running', async ({ page }) => {
      await page.click('#startBtn');

      // Wait for timer to decrement
      await page.waitForTimeout(1500);

      const timerText = await page.locator('#timer').textContent();
      expect(timerText).not.toBe('25:00');
    });

    test('should reset timer to current mode duration', async ({ page }) => {
      await page.click('#startBtn');
      await page.waitForTimeout(1500);

      await page.click('button:has-text("Reset")');

      await expect(page.locator('#timer')).toHaveText('25:00');
      await expect(page.locator('#startBtn')).toHaveText('Start');
    });
  });

  test.describe('Mode Switching', () => {
    test('should switch to Short Break mode', async ({ page }) => {
      await page.click('button.mode-btn:has-text("Short Break")');

      await expect(page.locator('#modeDisplay')).toHaveText('Short Break');
      await expect(page.locator('#timer')).toHaveText('05:00');
    });

    test('should switch to Long Break mode', async ({ page }) => {
      await page.click('button.mode-btn:has-text("Long Break")');

      await expect(page.locator('#modeDisplay')).toHaveText('Long Break');
      await expect(page.locator('#timer')).toHaveText('15:00');
    });

    test('should switch back to Work mode', async ({ page }) => {
      await page.click('button.mode-btn:has-text("Short Break")');
      await page.click('button.mode-btn:has-text("Work")');

      await expect(page.locator('#modeDisplay')).toHaveText('Work Time');
      await expect(page.locator('#timer')).toHaveText('25:00');
    });

    test('should highlight active mode button', async ({ page }) => {
      const workBtn = page.locator('button.mode-btn:has-text("Work")');
      await expect(workBtn).toHaveClass(/active/);

      await page.click('button.mode-btn:has-text("Short Break")');

      const shortBreakBtn = page.locator('button.mode-btn:has-text("Short Break")');
      await expect(shortBreakBtn).toHaveClass(/active/);
      await expect(workBtn).not.toHaveClass(/active/);
    });

    test('should stop running timer when switching modes', async ({ page }) => {
      await page.click('#startBtn');
      await expect(page.locator('#startBtn')).toHaveText('Pause');

      await page.click('button.mode-btn:has-text("Short Break")');

      await expect(page.locator('#startBtn')).toHaveText('Start');
    });
  });

  test.describe('Timer Editing', () => {
    test('should show input when clicking timer', async ({ page }) => {
      await page.click('#timer');

      await expect(page.locator('#timerInput')).toBeVisible();
      await expect(page.locator('#timer')).toBeHidden();
    });

    test('should not allow editing while timer is running', async ({ page }) => {
      await page.click('#startBtn');
      await page.click('#timer');

      await expect(page.locator('#timerInput')).toBeHidden();
    });

    test('should apply custom time on Enter', async ({ page }) => {
      await page.click('#timer');
      await page.locator('#timerInput').fill('10');
      await page.keyboard.press('Enter');

      await expect(page.locator('#timer')).toHaveText('10:00');
      await expect(page.locator('#timerInput')).toBeHidden();
    });

    test('should cancel editing on Escape', async ({ page }) => {
      await page.click('#timer');
      await page.locator('#timerInput').fill('10');
      await page.keyboard.press('Escape');

      await expect(page.locator('#timer')).toHaveText('25:00');
      await expect(page.locator('#timerInput')).toBeHidden();
    });

    test('should enforce minimum time of 1 minute', async ({ page }) => {
      await page.click('#timer');
      await page.locator('#timerInput').fill('0');
      await page.keyboard.press('Enter');

      await expect(page.locator('#timer')).toHaveText('01:00');
    });

    test('should enforce maximum time of 60 minutes', async ({ page }) => {
      await page.click('#timer');
      await page.locator('#timerInput').fill('100');
      await page.keyboard.press('Enter');

      await expect(page.locator('#timer')).toHaveText('60:00');
    });
  });

  test.describe('Session Title', () => {
    test('should show Add session title toggle by default', async ({ page }) => {
      await expect(page.locator('#sessionTitleToggle')).toBeVisible();
    });

    test('should show input when clicking toggle', async ({ page }) => {
      await page.click('#sessionTitleToggle');

      await expect(page.locator('#sessionTitle')).toHaveClass(/visible/);
      await expect(page.locator('#sessionTitleToggle')).toBeHidden();
    });

    test('should display title after entering and pressing Enter', async ({ page }) => {
      await page.click('#sessionTitleToggle');
      await page.locator('#sessionTitle').fill('Working on tests');
      await page.keyboard.press('Enter');

      await expect(page.locator('#sessionTitleDisplay')).toHaveText('Working on tests');
      await expect(page.locator('#sessionTitleDisplay')).toBeVisible();
    });

    test('should start timer after entering title', async ({ page }) => {
      await page.click('#sessionTitleToggle');
      await page.locator('#sessionTitle').fill('My task');
      await page.keyboard.press('Enter');

      await expect(page.locator('#startBtn')).toHaveText('Pause');
    });

    test('should allow editing existing title', async ({ page }) => {
      await page.click('#sessionTitleToggle');
      await page.locator('#sessionTitle').fill('First title');
      await page.keyboard.press('Enter');

      // Stop timer first to allow editing
      await page.click('#startBtn');

      await page.click('#sessionTitleDisplay');

      await expect(page.locator('#sessionTitle')).toHaveClass(/visible/);
    });
  });
});
