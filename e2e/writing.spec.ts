import { expect, test, type Page } from '@playwright/test';

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('Daily Writing accepts a different valid expression, retries and persists progress', async ({ page }) => {
  await page.goto('/writing');
  await expect(page.getByRole('heading', { name: 'Writing Practice' })).toBeVisible();
  await page.getByText('Daily Writing', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Weekend Coffee' })).toBeVisible();

  const textarea = page.getByLabel('YOUR ENGLISH PARAGRAPH');
  await textarea.fill(
    'Are you available this weekend? Yes. Do you want to get some coffee? Sounds good. Where should we meet? We can meet at the coffee shop near the park.',
  );
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await expect(page.getByRole('heading', { name: 'Bạn truyền đạt rất rõ!' })).toBeVisible();
  await expect(page.getByText('Meaning coverage: 100%')).toBeVisible();
  await expect(page.locator('.better-writing')).toHaveCount(0);
  await page.getByRole('button', { name: 'Xem cách sửa' }).click();
  await expect(page.getByText('MỘT CÁCH DIỄN ĐẠT TỰ NHIÊN')).toBeVisible();

  await page.getByRole('button', { name: 'Viết lại' }).click();
  await textarea.fill(
    'Got any plans this weekend? Yes. Would you like to get some coffee? Sure. Where shall we meet? See you at the café by the park.',
  );
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await expect(page.getByText('Xem lần viết trước (2)')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Xem lần viết trước (2)')).toBeVisible();
});

test('IT Writing evaluates meaning coverage and exposes three progressive hints', async ({ page }) => {
  await page.goto('/writing');
  await page.getByText('IT Writing', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'A Clear Update' })).toBeVisible();
  for (let level = 1; level <= 3; level += 1) {
    await page.getByRole('button', { name: /Gợi ý/ }).click();
    await expect(page.getByText(new RegExp(`Hint ${level}`))).toBeVisible();
  }
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill(
    'What did you finish yesterday? I finished the login screen and submitted it for review. Do you have any blockers? No. Everything is on track at the moment.',
  );
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await expect(page.getByText('Meaning coverage: 100%')).toBeVisible();
  await page.getByRole('button', { name: 'Xem cách sửa' }).click();
  await page.getByText('MỘT CÁCH DIỄN ĐẠT TỰ NHIÊN').click();
  await expect(page.getByText('Cách diễn đạt tự nhiên khác')).toBeVisible();
});

test('draft autosave restores text after leaving the topic', async ({ page }) => {
  await page.goto('/writing/writing%3Ameeting-a-friend');
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill('This paragraph is still unfinished.');
  await page.goto('/writing');
  await expect(page.getByText(/Bản nháp đang chờ bạn hoàn thành/)).toBeVisible();
  await page.getByRole('link', { name: 'Tiếp tục luyện viết' }).click();
  await expect(page.getByLabel('YOUR ENGLISH PARAGRAPH')).toHaveValue(
    'This paragraph is still unfinished.',
  );
});

test('Writing remains usable without horizontal overflow at 375px and 1440px', async ({ page }) => {
  for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/writing');
    await expectNoHorizontalOverflow(page);
    await page.goto('/writing/writing%3Ameeting-a-friend');
    const textarea = page.getByLabel('YOUR ENGLISH PARAGRAPH');
    await expect(textarea).toBeVisible();
    expect(await textarea.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(16);
    await expectNoHorizontalOverflow(page);
  }
});

test('long Writing feedback, details, examples and attempts wrap at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/writing/writing%3Ameeting-a-friend');
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill(
    'Are you available this weekend? Yes. Do you want to get some coffee? Sounds good. Where should we meet? We can meet at the coffee shop near the park.',
  );
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await page.getByRole('button', { name: 'Xem cách sửa' }).click();
  await expect(page.getByText('MỘT CÁCH DIỄN ĐẠT TỰ NHIÊN')).toBeVisible();
  await page.getByText(/Xem chi tiết/).click();
  await expect(page.locator('.idea-coverage')).toBeVisible();
  await page.getByText('MỘT CÁCH DIỄN ĐẠT TỰ NHIÊN').click();
  await expect(page.locator('.better-writing p')).toHaveCount(3);
  await expectNoHorizontalOverflow(page);
});

test('first submit reveals progressive feedback without exposing the answer', async ({ page }) => {
  await page.goto('/writing/writing%3Ameeting-a-friend');
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill('I very like coffee.');
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await expect(page.getByText('Trật tự từ', { exact: true })).toBeVisible();
  await expect(page.locator('.better-writing')).toHaveCount(0);
  await expect(page.getByText('Bạn đang có lỗi trật tự từ.')).toBeVisible();
  await page.getByRole('button', { name: /Xem gợi ý tiếp/ }).click();
  await expect(page.getByText('Kiểm tra phần “very like”.')).toBeVisible();
  await page.getByRole('button', { name: /Xem gợi ý tiếp/ }).click();
  await expect(page.getByText(/Không đặt “very”/)).toBeVisible();
  await page.getByRole('button', { name: 'Xem cách sửa' }).click();
  await expect(page.getByText('I really like coffee.')).toBeVisible();
  await page.getByRole('button', { name: 'Viết lại' }).click();
  await expect(page.getByRole('button', { name: 'Kiểm tra đoạn viết' })).toBeVisible();
});

test('Writing Path opens the next unit at its threshold and persists after refresh', async ({ page }) => {
  const precompleted = [
    'writing:shopping-at-a-pet-store', 'writing:feeding-a-pet', 'writing:calling-a-delivery-driver',
    'writing:making-a-bank-transfer', 'writing:packing-a-school-bag', 'writing:using-a-bike-share',
    'writing:using-a-photo-booth', 'writing:recovering-after-a-missed-class',
    'writing:checking-in-with-building-security', 'writing:joining-an-online-class',
    'writing:making-a-fruit-smoothie',
  ];
  await page.goto('/');
  await page.evaluate(({ topicIds }) => {
    const attempt = (topicId: string) => ({
      id: `${topicId}:seed`, answer: 'A clear answer.', status: 'communicates-well',
      communicationScore: 92, meaningCoverage: 1, missingIdeaIds: [], contradictedIdeaIds: [],
      missingIdeaKinds: [], criticalErrorIds: [], languageIssueTypes: [], createdAt: '2026-08-18T08:00:00.000Z',
    });
    const writingProgress = Object.fromEntries(topicIds.map((topicId) => {
      const bestAttempt = attempt(topicId);
      return [topicId, {
        topicId, attempts: [bestAttempt], bestAttempt, successfulCount: 1, consecutiveCorrect: 1,
        lastPracticedAt: '2026-08-18T08:00:00.000Z', nextReviewAt: '2099-08-25T08:00:00.000Z',
        mastery: 'learning', favorite: false, weaknessCounts: {}, lastSuccessfulAt: '2026-08-18T08:00:00.000Z',
      }];
    }));
    localStorage.setItem('lingotalk-progress', JSON.stringify({
      state: { version: 12, writingProgress, writingDrafts: {}, writingPathPreference: 'all', writingCurrentUnitId: 'writing-unit-01' },
      version: 12,
    }));
  }, { topicIds: precompleted });

  await page.goto('/writing');
  await expect(page.getByRole('heading', { name: /Simple Situations/ })).toBeVisible();
  await expect(page.getByText('11/17 bài truyền đạt tốt')).toBeVisible();
  await page.getByRole('link', { name: /Mở unit/ }).click();
  await expect(page.getByRole('heading', { name: 'Simple Situations' })).toBeVisible();
  await page.getByRole('link', { name: /What Is for Breakfast/ }).click();
  await page.getByLabel('YOUR ENGLISH PARAGRAPH').fill(
    'What are we having for breakfast? There are eggs and bread in the kitchen. Would you like some milk? No, I will have tea.',
  );
  await page.getByRole('button', { name: 'Kiểm tra đoạn viết' }).click();
  await expect(page.getByRole('heading', { name: 'Bạn truyền đạt rất rõ!' })).toBeVisible();
  await page.getByRole('link', { name: 'Về Writing Unit' }).click();
  await expect(page.getByText('12/17').first()).toBeVisible();
  await expect(page.getByText('Đã đủ điều kiện chuyển sang unit tiếp theo.')).toBeVisible();
  await page.getByRole('link', { name: 'Về Writing Path' }).click();
  await expect(page.getByRole('heading', { name: /People, Place & Time/ })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: /People, Place & Time/ })).toBeVisible();
});

test('IT Writing Path remains freely browsable and contains only IT topics', async ({ page }) => {
  await page.goto('/writing');
  await page.getByRole('button', { name: 'IT Writing Path' }).click();
  await expect(page.getByRole('button', { name: 'IT Writing Path' })).toHaveClass(/active/);
  await page.getByRole('link', { name: /Mở unit/ }).click();
  await expect(page.locator('.writing-unit-topic')).toHaveCount(2);
  await expect(page.locator('.writing-unit-topic').filter({ hasText: 'IT' })).toHaveCount(2);
  await expect(page.getByText('Biểu tượng khóa chỉ là thứ tự được đề xuất.')).not.toBeVisible();
});
