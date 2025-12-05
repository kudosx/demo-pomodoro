import { test, expect } from '@playwright/test';

test.describe('Settings Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Modal Open/Close', () => {
    test('should open settings modal when clicking settings button', async ({ page }) => {
      await page.click('.settings-btn');

      await expect(page.locator('#settingsOverlay')).toHaveClass(/active/);
    });

    test('should close settings modal when clicking close button', async ({ page }) => {
      await page.click('.settings-btn');
      await page.click('.settings-close');

      await expect(page.locator('#settingsOverlay')).not.toHaveClass(/active/);
    });

    test('should close settings modal when clicking overlay', async ({ page }) => {
      await page.click('.settings-btn');
      await page.click('#settingsOverlay', { position: { x: 10, y: 10 } });

      await expect(page.locator('#settingsOverlay')).not.toHaveClass(/active/);
    });

    test('should show Preferences title', async ({ page }) => {
      await page.click('.settings-btn');

      await expect(page.locator('.settings-title')).toHaveText('Preferences');
    });
  });

  test.describe('Tab Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('.settings-btn');
    });

    test('should show Mood tab by default', async ({ page }) => {
      await expect(page.locator('[data-tab="mood"]')).toHaveClass(/active/);
      await expect(page.locator('#panel-mood')).toHaveClass(/active/);
    });

    test('should switch to Sound tab', async ({ page }) => {
      await page.click('[data-tab="sound"]');

      await expect(page.locator('[data-tab="sound"]')).toHaveClass(/active/);
      await expect(page.locator('#panel-sound')).toHaveClass(/active/);
      await expect(page.locator('#panel-mood')).not.toHaveClass(/active/);
    });

    test('should switch to Library tab', async ({ page }) => {
      await page.click('[data-tab="library"]');

      await expect(page.locator('[data-tab="library"]')).toHaveClass(/active/);
      await expect(page.locator('#panel-library')).toHaveClass(/active/);
    });

    test('should switch back to Mood tab', async ({ page }) => {
      await page.click('[data-tab="library"]');
      await page.click('[data-tab="mood"]');

      await expect(page.locator('[data-tab="mood"]')).toHaveClass(/active/);
      await expect(page.locator('#panel-mood')).toHaveClass(/active/);
    });

    test('should show all three tabs', async ({ page }) => {
      await expect(page.locator('[data-tab="mood"]')).toBeVisible();
      await expect(page.locator('[data-tab="sound"]')).toBeVisible();
      await expect(page.locator('[data-tab="library"]')).toBeVisible();
    });
  });

  test.describe('Mood Tab', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('.settings-btn');
    });

    test('should show mood selection buttons', async ({ page }) => {
      await expect(page.locator('#settingsCalmBtn')).toBeVisible();
      await expect(page.locator('#settingsEnergyBtn')).toBeVisible();
    });

    test('should set Calm mood from settings', async ({ page }) => {
      await page.click('#settingsEnergyBtn');
      await page.click('#settingsCalmBtn');

      await expect(page.locator('#settingsCalmBtn')).toHaveClass(/active/);
      await expect(page.locator('#calmBtn')).toHaveClass(/active/);
    });

    test('should set Energy mood from settings', async ({ page }) => {
      await page.click('#settingsEnergyBtn');

      await expect(page.locator('#settingsEnergyBtn')).toHaveClass(/active/);
      await expect(page.locator('#energyBtn')).toHaveClass(/active/);
    });

    test('should sync mood buttons with main controls', async ({ page }) => {
      await page.click('.settings-close');
      await page.click('#energyBtn');

      await page.click('.settings-btn');

      await expect(page.locator('#settingsEnergyBtn')).toHaveClass(/active/);
    });
  });

  test.describe('Sound Tab', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('.settings-btn');
      await page.click('[data-tab="sound"]');
    });

    test('should show volume slider', async ({ page }) => {
      await expect(page.locator('#volumeSlider')).toBeVisible();
    });

    test('should show volume value', async ({ page }) => {
      await expect(page.locator('#volumeValue')).toBeVisible();
    });

    test('should have default volume of 70%', async ({ page }) => {
      await expect(page.locator('#volumeValue')).toHaveText('70%');
      await expect(page.locator('#volumeSlider')).toHaveValue('70');
    });

    test('should update volume display when slider changes', async ({ page }) => {
      await page.locator('#volumeSlider').fill('50');

      await expect(page.locator('#volumeValue')).toHaveText('50%');
    });

    test('should allow setting volume to 0', async ({ page }) => {
      await page.locator('#volumeSlider').fill('0');

      await expect(page.locator('#volumeValue')).toHaveText('0%');
    });

    test('should allow setting volume to 100', async ({ page }) => {
      await page.locator('#volumeSlider').fill('100');

      await expect(page.locator('#volumeValue')).toHaveText('100%');
    });
  });

  test.describe('Library Tab', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('.settings-btn');
      await page.click('[data-tab="library"]');
    });

    test('should show search input', async ({ page }) => {
      await expect(page.locator('#librarySearch')).toBeVisible();
    });

    test('should show music list', async ({ page }) => {
      await expect(page.locator('#musicList')).toBeVisible();
    });

    test('should display Calm category', async ({ page }) => {
      await expect(page.locator('.music-category-header:has-text("Calm")')).toBeVisible();
    });

    test('should display Energy category', async ({ page }) => {
      await expect(page.locator('.music-category-header:has-text("Energy")')).toBeVisible();
    });

    test('should show music items', async ({ page }) => {
      const musicItems = page.locator('.music-item');
      const count = await musicItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should filter music list by search', async ({ page }) => {
      await page.locator('#librarySearch').fill('cosmic');

      // Should show only matching tracks
      const musicItems = page.locator('.music-item');
      const count = await musicItems.count();
      expect(count).toBeGreaterThanOrEqual(0);

      // Should hide non-matching categories if no results
      const itemTexts = await musicItems.allTextContents();
      for (const text of itemTexts) {
        expect(text.toLowerCase()).toContain('cosmic');
      }
    });

    test('should show empty message when no results', async ({ page }) => {
      await page.locator('#librarySearch').fill('xyznonexistent');

      await expect(page.locator('.music-list-empty')).toBeVisible();
    });

    test('should clear filter and show all tracks', async ({ page }) => {
      await page.locator('#librarySearch').fill('test');
      await page.locator('#librarySearch').fill('');

      const musicItems = page.locator('.music-item');
      const count = await musicItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display track statistics', async ({ page }) => {
      const firstItem = page.locator('.music-item').first();
      await expect(firstItem.locator('.music-item-stat.plays')).toBeVisible();
      await expect(firstItem.locator('.music-item-stat.skips')).toBeVisible();
      await expect(firstItem.locator('.music-item-stat.likes')).toBeVisible();
      await expect(firstItem.locator('.music-item-stat.dislikes')).toBeVisible();
    });
  });
});
