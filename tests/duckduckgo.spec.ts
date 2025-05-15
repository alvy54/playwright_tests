import { test, expect } from '@playwright/test';
import { before } from 'node:test';

test.beforeEach(async ({ page, browserName, headless }) => {
  test.skip(browserName == 'chromium' && headless, 'Duckduckgo does not work in headless Chrome for some reason.');

  await page.goto('https://start.duckduckgo.com/');
});

test('search returns results with underdog', async ({ page }) => {
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('underdog');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'More results' }).scrollIntoViewIfNeeded();
  await expect(page.locator('article', { hasText: /underdog/i })).toHaveCount(20);
  expect(page.url()).toBe('https://duckduckgo.com/?t=h_&hps=1&start=1&q=underdog&ia=web');
});

test('search with GET request disabled', async({ page }) => {
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('link', { name: 'Privacy', exact: true }).click();
  await page.getByText('On', { exact: true }).first().click();
  await page.getByRole('link', { name: 'Save and Exit' }).click();
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('underdog');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('button', { name: 'More results' }).scrollIntoViewIfNeeded();
  await expect(page.locator('article', { hasText: /underdog/i })).toHaveCount(20);
  expect(page.url()).toBe('https://duckduckgo.com/?ia=web');
});

test('search with private reminder off', async({ page }) => {
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('underdog');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.locator('div').filter({ hasText: /^Always private$/ }).first()).toBeVisible();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('link', { name: 'Appearance' }).click();
  await page.locator('#content_internal form div').filter({ hasText: 'OnOff\'Always private\'' }).locator('span').first().click();
  await page.getByRole('link', { name: 'Save and Exit' }).click();
  await expect(page.locator('div').filter({ hasText: /^Always private$/ }).first()).not.toBeVisible();

  await page.locator('#search_form_input').fill('over-under');
  await page.getByTestId('search-form').getByRole('button', { name: 'search' }).click();
  await expect(page.locator('div').filter({ hasText: /^Always private$/ }).first()).not.toBeVisible();
});