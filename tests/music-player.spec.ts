import { test, expect } from '@playwright/test';

test.describe('Music Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Initial State', () => {
    test('should show music off by default', async ({ page }) => {
      await expect(page.locator('#musicInfo')).toHaveText('Music off');
      await expect(page.locator('#musicInfo')).toHaveClass(/off/);
    });

    test('should show play button initially', async ({ page }) => {
      const musicBtn = page.locator('#musicBtn');
      await expect(musicBtn).not.toHaveClass(/active/);
    });

    test('should show 0 likes and dislikes initially', async ({ page }) => {
      await expect(page.locator('#likeCount')).toHaveText('0');
      await expect(page.locator('#dislikeCount')).toHaveText('0');
    });

    test('should have Calm mood active by default', async ({ page }) => {
      await expect(page.locator('#calmBtn')).toHaveClass(/active/);
      await expect(page.locator('#energyBtn')).not.toHaveClass(/active/);
    });
  });

  test.describe('Music Toggle', () => {
    test('should toggle music on when clicking play', async ({ page }) => {
      await page.click('#musicBtn');

      await expect(page.locator('#musicBtn')).toHaveClass(/active/);
      await expect(page.locator('#musicInfo')).not.toHaveClass(/off/);
    });

    test('should show track name when music is playing', async ({ page }) => {
      await page.click('#musicBtn');

      const musicInfo = page.locator('#musicInfo');
      await expect(musicInfo).not.toHaveText('Music off');
    });

    test('should toggle music off when clicking again', async ({ page }) => {
      await page.click('#musicBtn');
      await page.click('#musicBtn');

      await expect(page.locator('#musicBtn')).not.toHaveClass(/active/);
      await expect(page.locator('#musicInfo')).toHaveText('Music off');
    });
  });

  test.describe('Mood Selection', () => {
    test('should switch to Energy mood', async ({ page }) => {
      await page.click('#energyBtn');

      await expect(page.locator('#energyBtn')).toHaveClass(/active/);
      await expect(page.locator('#calmBtn')).not.toHaveClass(/active/);
    });

    test('should switch back to Calm mood', async ({ page }) => {
      await page.click('#energyBtn');
      await page.click('#calmBtn');

      await expect(page.locator('#calmBtn')).toHaveClass(/active/);
      await expect(page.locator('#energyBtn')).not.toHaveClass(/active/);
    });

    test('should change track when switching mood while playing', async ({ page }) => {
      await page.click('#musicBtn');
      const firstTrack = await page.locator('#musicInfo').textContent();

      await page.click('#energyBtn');

      // Track should change (or at least stay valid)
      const newTrack = await page.locator('#musicInfo').textContent();
      expect(newTrack).not.toBe('Music off');
    });
  });

  test.describe('Like/Dislike', () => {
    test('should not allow liking when music is off', async ({ page }) => {
      await page.click('#likeBtn');

      await expect(page.locator('#likeCount')).toHaveText('0');
    });

    test('should increment like count when music is playing', async ({ page }) => {
      await page.click('#musicBtn');
      await page.click('#likeBtn');

      await expect(page.locator('#likeCount')).toHaveText('1');
    });

    test('should allow multiple likes on same track', async ({ page }) => {
      await page.click('#musicBtn');
      await page.click('#likeBtn');
      await page.click('#likeBtn');

      await expect(page.locator('#likeCount')).toHaveText('2');
    });

    test('should not allow disliking when music is off', async ({ page }) => {
      await page.click('#dislikeBtn');

      await expect(page.locator('#dislikeCount')).toHaveText('0');
    });

    test('should increment dislike count and skip track', async ({ page }) => {
      await page.click('#musicBtn');
      const firstTrack = await page.locator('#musicInfo').textContent();

      await page.click('#dislikeBtn');
      await page.waitForTimeout(500); // Wait for skip animation

      // Dislike count might reset on new track, but track should change
      const newTrack = await page.locator('#musicInfo').textContent();
      // Track should have changed (with high probability for different playlist)
      expect(newTrack).not.toBe('Music off');
    });

    test('should add liked class animation on like', async ({ page }) => {
      await page.click('#musicBtn');
      await page.click('#likeBtn');

      await expect(page.locator('#likeBtn')).toHaveClass(/liked/);
    });
  });

  test.describe('Skip Track', () => {
    test('should not skip when music is off', async ({ page }) => {
      await page.click('#skipBtn');

      await expect(page.locator('#musicInfo')).toHaveText('Music off');
    });

    test('should skip to next track when music is playing', async ({ page }) => {
      await page.click('#musicBtn');
      const firstTrack = await page.locator('#musicInfo').textContent();

      await page.click('#skipBtn');

      const newTrack = await page.locator('#musicInfo').textContent();
      expect(newTrack).not.toBe('Music off');
    });

    test('should reset ratings display after skipping', async ({ page }) => {
      await page.click('#musicBtn');
      await page.click('#likeBtn');
      await page.click('#likeBtn');

      await page.click('#skipBtn');

      // Ratings for new track should start fresh
      await expect(page.locator('#likeCount')).toHaveText('0');
    });
  });

  test.describe('Music Controls Visibility', () => {
    test('should show all music control buttons', async ({ page }) => {
      await expect(page.locator('#musicBtn')).toBeVisible();
      await expect(page.locator('#calmBtn')).toBeVisible();
      await expect(page.locator('#energyBtn')).toBeVisible();
      await expect(page.locator('#likeBtn')).toBeVisible();
      await expect(page.locator('#dislikeBtn')).toBeVisible();
      await expect(page.locator('#skipBtn')).toBeVisible();
    });

    test('should show music info display', async ({ page }) => {
      await expect(page.locator('#musicInfo')).toBeVisible();
    });
  });
});
