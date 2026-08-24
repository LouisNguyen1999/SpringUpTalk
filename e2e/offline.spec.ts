import { expect, test } from '@playwright/test';

test('PWA scenarios A, B and C keep cached lessons usable and uncached lessons graceful', async ({page,context}) => {
  await page.goto('/');
  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service worker is unavailable');
    await navigator.serviceWorker.ready;
  });

  // Vocabulary details, practice shards and a custom local definition stay available offline.
  await page.goto('/vocabulary/vocab%3Adeadline');
  await expect(page.getByRole('heading',{name:'deadline'})).toBeVisible();
  await page.getByRole('link',{name:/Luyện từ này/}).click();
  await expect(page.getByRole('heading',{name:'Luyện “deadline”'})).toBeVisible();
  await page.goto('/vocabulary/custom?term=offline-latency');
  await page.getByLabel('Vietnamese meaning').fill('độ trễ ngoại tuyến');
  await page.getByRole('button',{name:/Lưu từ/}).click();
  await expect(page.getByRole('heading',{name:'offline-latency'})).toBeVisible();
  await page.getByRole('button',{name:/Add Practice Sentence/}).click();
  await page.getByLabel('Vietnamese prompt').fill('Độ trễ đang quá cao.');
  await page.getByLabel('Canonical answer').fill('The offline-latency is too high.');
  await page.getByLabel('Target expression').fill('offline-latency');
  await page.getByRole('button',{name:'Lưu câu luyện'}).click();
  await expect(page.getByText('1 active · 1 total')).toBeVisible();
  const customVocabularyPath=new URL(page.url()).pathname;
  await page.goto('/vocabulary/vocab%3Adeadline/practice');
  await expect(page.getByRole('heading',{name:'Luyện “deadline”'})).toBeVisible();
  await page.goto('/writing/writing%3Ameeting-a-friend');
  await expect(page.getByRole('heading',{name:'Weekend Coffee'})).toBeVisible();
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill('My offline Writing draft.');
  await page.goto('/daily');
  await expect(page.getByRole('heading',{name:'Luyện tập hôm nay'})).toBeVisible();
  await page.locator('.daily-item .icon-btn').first().click();
  const cachedDailyItemPath = new URL(page.url()).pathname + new URL(page.url()).search;
  await expect(page.locator('.lesson-layout,.vocabulary-practice-layout,.writing-practice-page').first()).toBeVisible();
  await page.goto('/daily');

  // A: load a topic online, then continue the lesson after the network disappears.
  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await expect(page.getByRole('button',{name:/Bạn là Person A/})).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('button',{name:/Bạn là Person A/}).click();
  await expect(page.getByLabel('Câu trả lời bằng tiếng Anh')).toBeVisible();

  await page.goto('/vocabulary/vocab%3Adeadline/practice');
  await expect(page.getByRole('heading',{name:'Luyện “deadline”'})).toBeVisible();
  await page.getByRole('button',{name:/Bắt đầu luyện/}).click();
  await expect(page.getByLabel('YOUR ENGLISH')).toBeVisible();
  await page.goto('/writing/writing%3Ameeting-a-friend');
  await expect(page.getByRole('heading',{name:'Weekend Coffee'})).toBeVisible();
  await expect(page.getByLabel('YOUR ENGLISH PARAGRAPH')).toHaveValue('My offline Writing draft.');
  await page.goto(customVocabularyPath);
  await expect(page.getByRole('heading',{name:'offline-latency'})).toBeVisible();
  await page.getByRole('link',{name:/Luyện từ này/}).click();
  await expect(page.getByRole('heading',{name:'Luyện “offline-latency”'})).toBeVisible();
  await page.getByRole('button',{name:/Bắt đầu luyện/}).click();
  await expect(page.getByLabel('YOUR ENGLISH')).toBeVisible();

  await page.goto('/daily');
  await page.reload();
  await expect(page.getByRole('heading',{name:'Luyện tập hôm nay'})).toBeVisible();
  await page.getByRole('button',{name:/Tiếp tục buổi học/}).click();
  expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe(cachedDailyItemPath);
  await expect(page.locator('.lesson-layout,.vocabulary-practice-layout,.writing-practice-page').first()).toBeVisible();

  // B: the same previously opened lesson can be reopened offline.
  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await page.reload();
  await expect(page.getByRole('button',{name:/Bạn là Person A/})).toBeVisible();

  // C: a category chunk never requested online renders the typed fallback, not a blank page.
  await page.goto('/topics/giving-difficult-feedback');
  await expect(page.getByRole('heading',{name:'Chủ đề này chưa có trong bộ nhớ ngoại tuyến'})).toBeVisible();
  await expect(page.getByRole('link',{name:'Về thư viện'})).toBeVisible();
});
