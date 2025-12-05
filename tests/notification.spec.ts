import { test, expect } from '@playwright/test';

test.describe('Session Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Notification Panel', () => {
    test('should be hidden by default', async ({ page }) => {
      await expect(page.locator('#notificationOverlay')).not.toHaveClass(/active/);
    });

    test('should show work completion notification', async ({ page }) => {
      // Trigger notification via JS
      await page.evaluate(() => {
        (window as any).showNotification('work');
      });

      await expect(page.locator('#notificationOverlay')).toHaveClass(/active/);
      await expect(page.locator('#notificationTitle')).toHaveText('Session Complete!');
      await expect(page.locator('#notificationMessage')).toHaveText('Great work! Time to take a break.');
      await expect(page.locator('#notificationIcon')).toHaveText('🎉');
    });

    test('should show break completion notification', async ({ page }) => {
      await page.evaluate(() => {
        (window as any).showNotification('break');
      });

      await expect(page.locator('#notificationOverlay')).toHaveClass(/active/);
      await expect(page.locator('#notificationTitle')).toHaveText('Break is Over!');
      await expect(page.locator('#notificationMessage')).toContain('Ready to focus');
      await expect(page.locator('#notificationIcon')).toHaveText('💪');
    });

    test('should close notification when clicking button', async ({ page }) => {
      await page.evaluate(() => {
        (window as any).showNotification('work');
      });

      await page.click('.notification-btn');

      await expect(page.locator('#notificationOverlay')).not.toHaveClass(/active/);
    });

    test('should have break class for break notification', async ({ page }) => {
      await page.evaluate(() => {
        (window as any).showNotification('break');
      });

      await expect(page.locator('.notification-panel')).toHaveClass(/break/);
    });

    test('should not have break class for work notification', async ({ page }) => {
      await page.evaluate(() => {
        (window as any).showNotification('work');
      });

      await expect(page.locator('.notification-panel')).not.toHaveClass(/break/);
    });
  });

  test.describe('Got it Button', () => {
    test('should show Got it button', async ({ page }) => {
      await page.evaluate(() => {
        (window as any).showNotification('work');
      });

      await expect(page.locator('.notification-btn')).toHaveText('Got it');
    });
  });
});
