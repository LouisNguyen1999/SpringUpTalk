import { expect, test, type Page } from '@playwright/test';

async function storedState(page: Page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem('lingotalk-progress') ?? '{}').state);
}

async function finishDailyVocabulary(page: Page) {
  await expect(page.getByLabel('YOUR ENGLISH')).toBeVisible();
  await page.getByRole('button', { name: 'Tôi chưa biết' }).click();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await expect(page.getByText('Practice Complete')).toBeVisible();
  await page.getByRole('link', { name: 'Tiếp tục kế hoạch hôm nay' }).click();
}

async function finishDailyConversation(page: Page) {
  const dailyReturn = page.getByRole('link', { name: 'Tiếp tục kế hoạch hôm nay' });
  for (let turn = 0; turn < 10; turn += 1) {
    if (await dailyReturn.isVisible().catch(() => false)) break;
    await expect(page.getByLabel('Câu trả lời bằng tiếng Anh')).toBeVisible();
    await page.getByRole('button', { name: 'Mình chưa biết' }).click();
    await page.getByRole('button', { name: /Tiếp tục/ }).click();
  }
  await expect(page.getByText(/Role [AB] completed|Conversation complete/)).toBeVisible();
  await dailyReturn.click();
}

async function finishDailyWriting(page: Page) {
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill('I am writing a short response that communicates my current plan and the next practical step.');
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await page.getByRole('button', { name: 'Tiếp tục kế hoạch' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('Daily Practice orchestrates all three modules, restores after refresh and does not duplicate XP', async ({ page }) => {
  await page.goto('/daily');
  await expect(page.getByRole('heading', { name: 'Luyện tập hôm nay' })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('0 / 7 hoạt động')).toBeVisible();
  const initialId = (await storedState(page)).dailyLearningSession.id;
  const visited = new Set<string>();

  for (let activity = 0; activity < 7; activity += 1) {
    await expect(page.locator('.daily-page')).toBeVisible();
    if (await page.getByText('Daily Practice Complete').isVisible().catch(() => false)) break;
    const start = page.getByRole('button', { name: /Bắt đầu học|Tiếp tục buổi học/ });
    await expect(start).toBeVisible();
    await start.click();
    const pathname = new URL(page.url()).pathname;
    if (pathname.includes('/vocabulary/')) {
      visited.add('vocabulary');
      await finishDailyVocabulary(page);
    } else if (pathname.includes('/lesson/')) {
      visited.add('conversation');
      await finishDailyConversation(page);
    } else if (pathname.includes('/writing/')) {
      visited.add('writing');
      await finishDailyWriting(page);
    }
    if (activity === 0) {
      await page.reload();
      expect((await storedState(page)).dailyLearningSession.id).toBe(initialId);
      await expect(page.getByText('1 / 7 hoạt động')).toBeVisible();
    }
  }

  await expect(page.getByText('Daily Practice Complete')).toBeVisible();
  expect([...visited].sort()).toEqual(['conversation', 'vocabulary', 'writing']);
  const finished = await storedState(page);
  const xpAfterModules = finished.xp;
  await page.reload();
  expect((await storedState(page)).xp).toBe(xpAfterModules);
  expect(finished.dailyLearningHistory.at(-1).completed).toBeGreaterThanOrEqual(5);
});

test('Daily mode/preference regenerate keeps existing item status and skip is not completion', async ({ page }) => {
  await page.goto('/daily');
  await expect(page.getByRole('heading', { name: 'Luyện tập hôm nay' })).toBeVisible({ timeout: 30_000 });
  await page.getByRole('button', { name: /Focus.*30 phút/ }).click();
  await page.getByRole('button', { name: 'Writing', exact: true }).click();
  let state = await storedState(page);
  expect(state.dailyLearningPreferences).toEqual({ mode: 'focus', focus: 'writing' });
  await page.locator('.daily-item').first().getByRole('button', { name: 'Bỏ qua' }).click();
  state = await storedState(page);
  expect(state.dailyLearningSession.items[0].status).toBe('skipped');
  expect(state.dailyLearningSession.status).toBe('in-progress');
  await page.reload();
  expect((await storedState(page)).dailyLearningSession.items[0].status).toBe('skipped');
});

test('due Vocabulary is prioritized and completing it updates the original module progress', async ({ page }) => {
  await page.goto('/daily');
  await expect(page.getByRole('heading', { name: 'Luyện tập hôm nay' })).toBeVisible({ timeout: 30_000 });
  await page.evaluate(() => {
    const stored = JSON.parse(localStorage.getItem('lingotalk-progress') ?? '{}');
    stored.state.vocabulary = [{ id: 'vocab:deadline', sourceTopic: 'work', timesSeen: 2, timesCorrect: 0, practiceCount: 2, incorrectCount: 2, mastery: 'new', favorite: false, nextReviewAt: '2020-01-01T00:00:00.000Z' }];
    delete stored.state.dailyLearningSession;
    localStorage.setItem('lingotalk-progress', JSON.stringify(stored));
  });
  await page.reload();
  const review = page.locator('.daily-item.review').filter({ hasText: 'deadline' });
  await expect(review).toBeVisible();
  await review.getByRole('button', { name: /Mở deadline/ }).click();
  await finishDailyVocabulary(page);
  const progress = (await storedState(page)).vocabulary.find((item: { id: string }) => item.id === 'vocab:deadline');
  expect(progress.practiceCount).toBe(3);
  const dailyItem = (await storedState(page)).dailyLearningSession.items.find((item: { vocabularyId?: string }) => item.vocabularyId === 'vocab:deadline');
  expect(dailyItem.status).toBe('completed');
  expect(dailyItem.nextReviewAt).toBeUndefined();
});
