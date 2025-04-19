import { test, expect } from '@playwright/test';

test('test search returns underdog', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('underdog');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  // await page.getByRole('list').filter({ hasText: 'underdog' }).click();

  // await expect(page.getByTestId('web-vertical').getByTestId('mainline')).toContainText('Underdog Fantasy: Pick\'em and Season-long Fantasy for NFL, NBA & more');
  // await expect(page.getByTestId('web-vertical').getByTestId('mainline')).toContainText('Underdog (TV series) - Wikipedia');
});