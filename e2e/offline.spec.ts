import { expect, test } from '@playwright/test';

test('PWA scenarios A, B and C keep cached lessons usable and uncached lessons graceful', async ({page,context}) => {
  await page.goto('/');
  await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) throw new Error('Service worker is unavailable');
    await navigator.serviceWorker.ready;
  });

  // A: load a topic online, then continue the lesson after the network disappears.
  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await expect(page.getByRole('button',{name:/Bạn là Person A/})).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('button',{name:/Bạn là Person A/}).click();
  await expect(page.getByLabel('Câu trả lời bằng tiếng Anh')).toBeVisible();

  // B: the same previously opened lesson can be reopened offline.
  await page.reload();
  await expect(page.getByRole('button',{name:/Bạn là Person A/})).toBeVisible();

  // C: a category chunk never requested online renders the typed fallback, not a blank page.
  await page.goto('/topics/giving-difficult-feedback');
  await expect(page.getByRole('heading',{name:'Chủ đề này chưa có trong bộ nhớ ngoại tuyến'})).toBeVisible();
  await expect(page.getByRole('link',{name:'Về thư viện'})).toBeVisible();
});
