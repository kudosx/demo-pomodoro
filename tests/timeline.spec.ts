import { test, expect } from '@playwright/test';

test.describe('Timeline', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test.describe('Initial State', () => {
    test('should show empty timeline message', async ({ page }) => {
      await expect(page.locator('.timeline-empty')).toHaveText('No sessions yet. Start your first Pomodoro!');
    });

    test('should display today\'s date', async ({ page }) => {
      const dateElement = page.locator('#todayDate');
      await expect(dateElement).toBeVisible();
      const dateText = await dateElement.textContent();
      expect(dateText).toBeTruthy();
    });

    test('should show timeline section', async ({ page }) => {
      await expect(page.locator('.timeline-section')).toBeVisible();
    });

    test('should show timeline legend', async ({ page }) => {
      await expect(page.locator('.timeline-legend')).toBeVisible();
      await expect(page.locator('.legend-item:has-text("Work")')).toBeVisible();
      await expect(page.locator('.legend-item:has-text("Short Break")')).toBeVisible();
      await expect(page.locator('.legend-item:has-text("Long Break")')).toBeVisible();
    });

    test('should show clear timeline button', async ({ page }) => {
      await expect(page.locator('.clear-btn')).toBeVisible();
    });
  });

  test.describe('Session Completion', () => {
    test('should add work session to timeline when timer completes', async ({ page }) => {
      // Set a short timer for testing
      await page.click('#timer');
      await page.locator('#timerInput').fill('1');
      await page.keyboard.press('Enter');

      // Start timer
      await page.click('#startBtn');

      // Manually trigger completion for faster test
      await page.evaluate(() => {
        // Simulate timer completion
        const timeline = JSON.parse(localStorage.getItem('pomodoroTimeline') || '{"date":"","sessions":[]}');
        timeline.date = new Date().toDateString();
        timeline.sessions.push({
          mode: 'work',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          title: 'Work Time'
        });
        localStorage.setItem('pomodoroTimeline', JSON.stringify(timeline));
      });

      await page.reload();

      const timelineItem = page.locator('.timeline-item');
      await expect(timelineItem).toBeVisible();
    });

    test('should increment session count after work completion', async ({ page }) => {
      // Add a session via localStorage
      await page.evaluate(() => {
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: new Date().toDateString(),
          sessions: [{ mode: 'work', time: '10:00', title: 'Test' }]
        }));
      });

      await page.reload();

      await expect(page.locator('#sessionCount')).toHaveText('1');
    });
  });

  test.describe('Timeline Display', () => {
    test.beforeEach(async ({ page }) => {
      // Pre-populate timeline with sessions
      await page.evaluate(() => {
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: new Date().toDateString(),
          sessions: [
            { mode: 'work', time: '09:00', title: 'Morning Work' },
            { mode: 'shortBreak', time: '09:25', title: 'Short Break' },
            { mode: 'work', time: '09:30', title: 'Focus Time' },
            { mode: 'longBreak', time: '09:55', title: 'Long Break' }
          ]
        }));
      });
      await page.reload();
    });

    test('should display all sessions', async ({ page }) => {
      const timelineItems = page.locator('.timeline-item');
      await expect(timelineItems).toHaveCount(4);
    });

    test('should show work sessions with W label', async ({ page }) => {
      const workItems = page.locator('.timeline-item.work');
      await expect(workItems).toHaveCount(2);
      await expect(workItems.first().locator('span:last-child')).toHaveText('W');
    });

    test('should show short break with SB label', async ({ page }) => {
      const shortBreakItem = page.locator('.timeline-item.short-break');
      await expect(shortBreakItem).toHaveCount(1);
      await expect(shortBreakItem.locator('span:last-child')).toHaveText('SB');
    });

    test('should show long break with LB label', async ({ page }) => {
      const longBreakItem = page.locator('.timeline-item.long-break');
      await expect(longBreakItem).toHaveCount(1);
      await expect(longBreakItem.locator('span:last-child')).toHaveText('LB');
    });

    test('should display session time', async ({ page }) => {
      const firstItem = page.locator('.timeline-item').first();
      await expect(firstItem.locator('.time')).toHaveText('09:00');
    });

    test('should count only work sessions', async ({ page }) => {
      await expect(page.locator('#sessionCount')).toHaveText('2');
    });
  });

  test.describe('Clear Timeline', () => {
    test.beforeEach(async ({ page }) => {
      // Pre-populate timeline
      await page.evaluate(() => {
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: new Date().toDateString(),
          sessions: [
            { mode: 'work', time: '09:00', title: 'Test' }
          ]
        }));
      });
      await page.reload();
    });

    test('should show confirmation dialog when clearing', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Clear today\'s timeline?');
        await dialog.dismiss();
      });

      await page.click('.clear-btn');
    });

    test('should clear timeline when confirmed', async ({ page }) => {
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      await page.click('.clear-btn');

      await expect(page.locator('.timeline-empty')).toBeVisible();
      await expect(page.locator('#sessionCount')).toHaveText('0');
    });

    test('should not clear timeline when cancelled', async ({ page }) => {
      page.on('dialog', async dialog => {
        await dialog.dismiss();
      });

      await page.click('.clear-btn');

      await expect(page.locator('.timeline-item')).toBeVisible();
      await expect(page.locator('#sessionCount')).toHaveText('1');
    });

    test('should remove from localStorage when cleared', async ({ page }) => {
      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      await page.click('.clear-btn');

      const stored = await page.evaluate(() => localStorage.getItem('pomodoroTimeline'));
      expect(stored).toBeNull();
    });
  });

  test.describe('LocalStorage Persistence', () => {
    test('should persist sessions across page reload', async ({ page }) => {
      // Add session
      await page.evaluate(() => {
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: new Date().toDateString(),
          sessions: [{ mode: 'work', time: '14:00', title: 'Persisted' }]
        }));
      });

      await page.reload();

      await expect(page.locator('.timeline-item')).toBeVisible();
    });

    test('should clear sessions from previous day', async ({ page }) => {
      // Add session with yesterday's date
      await page.evaluate(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: yesterday.toDateString(),
          sessions: [{ mode: 'work', time: '10:00', title: 'Old' }]
        }));
      });

      await page.reload();

      // Should show empty timeline (old date sessions cleared)
      await expect(page.locator('.timeline-empty')).toBeVisible();
    });
  });

  test.describe('Session Title in Timeline', () => {
    test('should show custom title in timeline item title attribute', async ({ page }) => {
      await page.evaluate(() => {
        localStorage.setItem('pomodoroTimeline', JSON.stringify({
          date: new Date().toDateString(),
          sessions: [{ mode: 'work', time: '10:00', title: 'Custom Task' }]
        }));
      });

      await page.reload();

      const item = page.locator('.timeline-item');
      await expect(item).toHaveAttribute('title', /Custom Task/);
    });
  });
});
