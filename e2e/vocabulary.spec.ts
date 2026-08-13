import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const widths = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('search, detail, practice retry and review form one vocabulary flow', async ({ page }) => {
  await page.goto('/vocabulary');
  await page.getByLabel('Tìm một từ hoặc cụm từ').fill('deadline');
  const deadlineHref = await page
    .locator('.vocabulary-search-results')
    .getByRole('link', { name: 'deadline', exact: true })
    .getAttribute('href');
  expect(deadlineHref).toBe('/vocabulary/vocab%3Adeadline');
  await page.goto(deadlineHref!);

  await expect(page.getByRole('heading', { name: 'deadline', exact: true })).toBeVisible();
  await expect(page.getByText('/ˈded.laɪn/')).toBeVisible();
  await expect(page.getByText('Collocations hữu ích')).toBeVisible();
  await page.getByRole('link', { name: /Luyện từ này/ }).click();

  await expect(page.getByRole('heading', { name: 'Luyện “deadline”' })).toBeVisible();
  await page.getByRole('button', { name: /Bắt đầu luyện/ }).click();
  await expect(page.getByText('Practice 1 / 5')).toBeVisible();
  await page.getByLabel('YOUR ENGLISH').fill('I do not know.');
  await page.getByRole('button', { name: 'Kiểm tra' }).click();
  await expect(page.getByRole('heading', { name: 'Chưa đúng lắm' })).toBeVisible();
  await page.getByRole('button', { name: /Thử lại/ }).click();
  await page.getByLabel('YOUR ENGLISH').fill('We need to meet the deadline by Friday.');
  await page.getByRole('button', { name: 'Kiểm tra' }).click();
  await expect(page.getByRole('heading', { name: 'Dùng từ mục tiêu chính xác!' })).toBeVisible();

  await page.goto('/mistakes');
  await expect(page.getByText('I do not know.')).toBeVisible();
  await expect(page.getByRole('link', { name: /Ôn từ này/ })).toBeVisible();
});

test('unknown search creates and persists an honest custom definition', async ({ page }) => {
  await page.goto('/vocabulary');
  await page.getByLabel('Tìm một từ hoặc cụm từ').fill('latency-offline-custom');
  await expect(page.getByText('Ứng dụng sẽ không tự đoán nghĩa.')).toBeVisible();
  await page.getByRole('link', { name: /Thêm từ thủ công/ }).click();
  await page.getByLabel('Vietnamese meaning').fill('độ trễ tùy chỉnh');
  await page.getByRole('button', { name: /Lưu từ/ }).click();
  await expect(page.getByRole('heading', { name: 'latency-offline-custom' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'độ trễ tùy chỉnh' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'latency-offline-custom' })).toBeVisible();
});

test('online lookup caches five editable exercises, generates five more and deletes cleanly', async ({ page }) => {
  await page.route('https://api.dictionaryapi.dev/**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        {
          word: 'look forward to',
          phonetic: '/lʊk ˈfɔːwəd tuː/',
          meanings: [
            {
              partOfSpeech: 'verb',
              definitions: [{ definition: 'to feel pleased and excited about something' }],
            },
          ],
        },
      ]),
    });
  });
  await page.route('https://api.tatoeba.org/**', async (route) => {
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ data: [] }) });
  });
  await page.route('https://api.mymemory.translated.net/**', async (route) => {
    const source = new URL(route.request().url()).searchParams.get('q') ?? '';
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        responseStatus: 200,
        responseData: { translatedText: `Bản dịch kiểm thử: ${source}` },
      }),
    });
  });

  await page.goto('/vocabulary/custom?term=look%20forward%20to');
  await page.getByRole('button', { name: /Tra cứu online và tạo 5 câu/ }).click();
  await expect(page.getByRole('heading', { name: 'look forward to' })).toBeVisible();
  await expect(page.getByText('5 active · 5 total')).toBeVisible();

  const firstExercise = page.locator('.practice-bank-item').first();
  await firstExercise.locator('summary').click();
  await firstExercise.getByRole('button', { name: /Edit/ }).click();
  await page.getByLabel('Vietnamese prompt').fill('Tôi rất mong chờ cuộc họp tuần tới.');
  await page.getByRole('button', { name: 'Lưu câu luyện' }).click();
  await expect(page.getByText('Tôi rất mong chờ cuộc họp tuần tới.')).toBeVisible();

  await page.getByRole('button', { name: '+5 câu' }).click();
  await expect(page.getByText('10 active · 10 total')).toBeVisible();
  await page.reload();
  await expect(page.getByText('10 active · 10 total')).toBeVisible();
  await expect(page.getByText('Tôi rất mong chờ cuộc họp tuần tới.')).toBeVisible();

  await page.getByRole('button', { name: 'Xóa từ' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Xóa từ và progress' }).click();
  await expect(page.getByRole('heading', { name: 'Vocabulary Practice' })).toBeVisible();
  await page.getByLabel('Tìm một từ hoặc cụm từ').fill('look forward to');
  await expect(page.getByText('Từ này chưa có trong từ điển offline.')).toBeVisible();
});

test('vocabulary layouts remain usable on a 320px mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  for (const path of [
    '/vocabulary',
    '/vocabulary/vocab%3Adeadline',
    '/vocabulary/vocab%3Adeadline/practice',
    '/vocabulary/custom',
  ]) {
    await page.goto(path);
    await expect(page.locator('#root')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
  await expect(page.getByRole('heading', { name: '+ Thêm từ mới' })).toBeVisible();
});
