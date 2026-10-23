import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('IT English writes one sentence, preserves progress after reload, and unlocks sequentially', async ({ page }) => {
  await page.goto('/it-english');
  await expect(page.getByRole('heading', { name: /Practise the conversations engineers have at work/ })).toBeVisible();
  await expect(page.getByText('0 / 30 topics completed')).toBeVisible();
  await expect(page.getByRole('link', { name: /Start practice/i })).toHaveCount(1);
  await page.getByRole('link', { name: /Start practice/i }).click();

  await expect(page.getByText('Sentence 1 of 8')).toBeVisible();
  const sentence = 'Hi, I’m Maya, the tech lead for the payments team. What should I call you?';
  await expect(page.locator('body')).not.toContainText(sentence);
  await page.getByRole('tab', { name: 'Writing' }).click();
  await page.getByLabel('Type the English sentence').fill(sentence);
  await page.getByRole('button', { name: /Check sentence/i }).click();
  await expect(page.getByText('Sentence passed')).toBeVisible();
  await expect(page.locator('body')).toContainText(sentence);
  await page.getByRole('button', { name: /Next sentence/i }).click();
  await expect(page.getByText('Sentence 2 of 8')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Hi, I’m Minh. I’m a software engineer, and I joined the team this week.');
  await page.getByRole('tab', { name: 'Writing' }).click();
  await page.getByLabel('Type the English sentence').fill('wrong answer');
  await page.getByRole('button', { name: /Check sentence/i }).click();
  await expect(page.getByText('Lần thử: 1/3')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Hi, I’m Minh. I’m a software engineer, and I joined the team this week.');

  await page.reload();
  await expect(page.getByText('Sentence 2 of 8')).toBeVisible();
  await expect(page.getByText('Lần thử: 1/3')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Hi, I’m Minh. I’m a software engineer, and I joined the team this week.');
  await page.goto('/it-english');
  await expect(page.getByText('1 / 8 sentences')).toBeVisible();
  await expect(page.getByRole('link', { name: /Start practice/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Continue practice/i })).toHaveCount(1);
});
