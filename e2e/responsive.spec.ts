import { expect, test, type Page } from '@playwright/test';

const matrix = [
  { width:320,height:568 }, { width:360,height:800 }, { width:375,height:667 },
  { width:390,height:844 }, { width:412,height:915 }, { width:430,height:932 },
  { width:600,height:960 }, { width:768,height:1024 }, { width:820,height:1180 }, { width:1024,height:768 },
  { width:1280,height:800 }, { width:1366,height:768 }, { width:1440,height:900 }, { width:1920,height:1080 },
  { width:844,height:390 },
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    client:document.documentElement.clientWidth,
    scroll:document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll,`scrollWidth ${dimensions.scroll} > clientWidth ${dimensions.client}`).toBeLessThanOrEqual(dimensions.client + 1);
}

async function expectLatestMessageVisible(page: Page) {
  await expect.poll(async () => page.locator('.messages').evaluate((messages) => {
    const latest = messages.querySelector('.message-row.active, .typing');
    if (!latest) return false;
    const viewport = messages.getBoundingClientRect();
    const message = latest.getBoundingClientRect();
    const isAtBottom = messages.scrollHeight - messages.clientHeight - messages.scrollTop <= 2;
    return isAtBottom && message.bottom <= viewport.bottom + 1 && message.bottom > viewport.top;
  })).toBe(true);
}

for (const viewport of matrix) {
  test(`critical layouts have no page overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/daily', '/topics', '/vocabulary', '/vocabulary/vocab%3Adeadline', '/vocabulary/vocab%3Adeadline/practice', '/writing', '/writing/path/writing-unit-01', '/writing/writing%3Ameeting-a-friend', '/lesson/meeting-a-friend/meeting-a-friend-c1', '/lesson/giving-difficult-feedback/giving-difficult-feedback-c1']) {
      await page.goto(path);
      await expect(page.locator('#root')).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  });
}

test('mobile navigation, grids, role selector, input and feedback use mobile layouts', async ({ page }) => {
  await page.setViewportSize({ width:375,height:812 });
  await page.goto('/');
  await expect(page.locator('.sidebar')).toBeHidden();
  await expect(page.locator('.bottom-nav')).toBeVisible();
  const navBox = await page.locator('.bottom-nav a').first().boundingBox();
  expect(navBox?.height).toBeGreaterThanOrEqual(44);

  await page.goto('/topics');
  await expect(page.locator('.topic-card').first()).toBeVisible();
  expect(await page.locator('.topic-grid').evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(1);
  await expectNoHorizontalOverflow(page);

  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await expect(page.getByText('0 / 2 vai đã hoàn thành')).toBeVisible();
  expect(await page.locator('.role-options').evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(1);
  const roleA = page.getByRole('button',{ name:/Bạn là Person A/ });
  const roleBox = await roleA.boundingBox();
  expect(roleBox?.width).toBeGreaterThan(300);
  await roleA.click();
  const input = page.getByLabel('Câu trả lời bằng tiếng Anh');
  await expect(input).toBeVisible();
  expect(await input.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(16);
  await input.fill('Are you free this weekend?');
  await page.getByRole('button',{ name:/Kiểm tra/ }).click();
  await expect(page.getByText('Chính xác!')).toBeVisible();
  await expect(page.getByRole('button',{ name:/Tiếp tục/ })).toBeVisible();
  await expect(page.locator('.bottom-nav')).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test('conversation automatically keeps the newest turn visible', async ({ page }) => {
  await page.setViewportSize({ width:320,height:568 });
  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await page.getByRole('button',{ name:/Bạn là Person B/ }).click();
  await expect(page.getByLabel('Câu trả lời bằng tiếng Anh')).toBeVisible();
  await expectLatestMessageVisible(page);

  await page.getByLabel('Câu trả lời bằng tiếng Anh').fill('Yes. Do you want to get some coffee?');
  await page.getByRole('button',{ name:/Kiểm tra/ }).click();
  await expect(page.getByText('Chính xác!')).toBeVisible();
  await expectLatestMessageVisible(page);
  await page.getByRole('button',{ name:/Tiếp tục/ }).click();
  await expect(page.getByText('Được đấy. Bạn muốn đi lúc mấy giờ?')).toBeVisible();
  await expect(page.getByLabel('Câu trả lời bằng tiếng Anh')).toBeVisible();
  await expectLatestMessageVisible(page);
});

test('long B2 feedback and accepted alternatives wrap on a 320px lesson', async ({ page }) => {
  await page.setViewportSize({ width:320,height:568 });
  await page.goto('/lesson/giving-difficult-feedback/giving-difficult-feedback-c1');
  await page.getByRole('button',{ name:/Bạn là Person A/ }).click();
  await page.getByLabel('Câu trả lời bằng tiếng Anh').fill('Could we talk through private feedback intended to improve teamwork?');
  await page.getByRole('button',{ name:/Kiểm tra/ }).click();
  await expect(page.getByText('Chính xác!')).toBeVisible();
  await expect(page.getByText('Can we go over private feedback intended to improve teamwork together?')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('tablet and desktop switch navigation and topic columns at layout breakpoints', async ({ page }) => {
  await page.setViewportSize({ width:768,height:1024 });
  await page.goto('/topics');
  await expect(page.locator('.bottom-nav')).toBeVisible();
  expect(await page.locator('.topic-grid').evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(2);

  await page.setViewportSize({ width:1024,height:768 });
  await page.goto('/');
  await expect(page.locator('.sidebar')).toBeVisible();
  await expect(page.locator('.bottom-nav')).toBeHidden();

  await page.setViewportSize({ width:1440,height:900 });
  await page.goto('/topics');
  expect(await page.locator('.topic-grid').evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(3);
  await expectNoHorizontalOverflow(page);
});

test('all critical application pages remain within a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width:320,height:568 });
  for (const path of ['/', '/daily', '/topics', '/topics/meeting-a-friend', '/vocabulary', '/writing', '/writing/path/writing-unit-01', '/writing/writing%3Ameeting-a-friend', '/mistakes', '/settings', '/lesson/meeting-a-friend/meeting-a-friend-c1']) {
    await page.goto(path);
    await expect(page.locator('#root')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test('one role persists after refresh and the second role alone completes the conversation', async ({ page }) => {
  await page.setViewportSize({ width:390,height:844 });
  await page.goto('/lesson/meeting-a-friend/meeting-a-friend-c1');
  await page.getByRole('button',{ name:/Bạn là Person A/ }).click();
  for (const answer of ['Are you free this weekend?','Sure. What time do you want to go?','Sounds good. Where should we meet?']) {
    await page.getByLabel('Câu trả lời bằng tiếng Anh').fill(answer);
    await page.getByRole('button',{ name:/Kiểm tra/ }).click();
    await expect(page.getByText('Chính xác!')).toBeVisible();
    await page.getByRole('button',{ name:/Tiếp tục/ }).click();
  }
  await expect(page.getByText('Role A completed')).toBeVisible();
  await expect(page.getByText('1 / 2 vai')).toBeVisible();
  await expect(page.getByRole('button',{ name:/Luyện Person B/ })).toBeVisible();
  await page.reload();
  await expect(page.getByText('1 / 2 vai đã hoàn thành')).toBeVisible();
  await expect(page.getByText('✓ Đã hoàn thành').first()).toBeVisible();
  await page.getByRole('button',{ name:/Bạn là Person B/ }).click();
  for (const answer of ['Yes. Do you want to get some coffee?','How about around three in the afternoon?',"Let's meet at the coffee shop near the park."]) {
    await page.getByLabel('Câu trả lời bằng tiếng Anh').fill(answer);
    await page.getByRole('button',{ name:/Kiểm tra/ }).click();
    await expect(page.getByText('Chính xác!')).toBeVisible();
    await page.getByRole('button',{ name:/Tiếp tục/ }).click();
  }
  await expect(page.getByText('Conversation complete')).toBeVisible();
  await expect(page.getByText('2 / 2 vai')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
