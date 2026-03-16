import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to Chinese using dropdown and verify text on the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByText('The perfect SaaS template to build')).toBeVisible();

      await page.getByRole('button', { name: 'lang-switcher' }).click();
      await page.getByText('中文').click();

      await expect(page.getByText('打造完美的 SaaS 模板')).toBeVisible();
    });

    test('should switch language from English to Chinese using URL and verify text on the sign-in page', async ({ page }) => {
      await page.goto('/sign-in');

      await expect(page.getByText('Email address')).toBeVisible();

      await page.goto('/zh/sign-in');

      await expect(page.getByText('电子邮箱')).toBeVisible();
    });
  });
});
