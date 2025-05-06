import { test, expect } from '@playwright/test';

test('search returns results with underdog', async ({ page, browserName, headless }) => {
  test.skip(browserName == 'chromium' && headless, 'Duckduckgo does not work in headless Chrome for some reason.');

  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('underdog');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'More results' }).scrollIntoViewIfNeeded();
  await expect(page.locator('article', { hasText: /underdog/i })).toHaveCount(20);
});