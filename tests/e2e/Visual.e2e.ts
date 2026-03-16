import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText('The perfect SaaS template to build')).toBeVisible();

      await percySnapshot(page, 'Homepage');
    });

    test('should take screenshot of the Chinese homepage', async ({ page }) => {
      await page.goto('/zh');

      await expect(page.getByText('完美的 SaaS 模板')).toBeVisible();

      await percySnapshot(page, 'Homepage - Chinese');
    });
  });
});
