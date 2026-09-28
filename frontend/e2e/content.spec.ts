import { test, expect, scrollToSection } from './fixtures';

test('project cards render, with interactive previews loaded', async ({ page }) => {
  await page.goto('/');
  await scrollToSection(page, 'projects');
  const cards = page.locator('#projects .project-card');
  expect(await cards.count()).toBeGreaterThan(0);
  const previews = page.locator('#projects .project-card__preview');
  for (let i = 0; i < (await previews.count()); i++) {
    await previews.nth(i).scrollIntoViewIfNeeded();
    // Lazy chunk must actually load, not stay on the fallback.
    await expect(previews.nth(i).locator('*').first()).toBeVisible();
  }
});

test('every image loads', async ({ page }) => {
  await page.goto('/');
  for (const id of ['hero', 'about', 'projects', 'experience', 'contact']) await scrollToSection(page, id);
  const broken = await page.locator('img').evaluateAll(imgs =>
    (imgs as HTMLImageElement[]).filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
  );
  expect(broken).toEqual([]);
});

test('external links open safely in a new tab', async ({ page }) => {
  await page.goto('/');
  const unsafe = await page.locator('a[target="_blank"]').evaluateAll(as =>
    (as as HTMLAnchorElement[]).filter(a => !/noopener/.test(a.rel)).map(a => a.href),
  );
  expect(unsafe).toEqual([]);
});

test('page does not scroll horizontally', async ({ page }) => {
  await page.goto('/');
  for (const id of ['hero', 'projects', 'experience', 'contact']) {
    await scrollToSection(page, id);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `horizontal overflow near #${id}`).toBeLessThanOrEqual(1);
  }
});

test('SEO metadata and JSON-LD are present and valid', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Harshith Chittajallu/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image/);
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(ld ?? '');
  expect(data['@type']).toBe('Person');
  expect(data.sameAs.length).toBeGreaterThan(0);
});

test('same-origin files linked from the page exist', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href^="/"]').evaluateAll(as =>
    [...new Set((as as HTMLAnchorElement[]).map(a => a.getAttribute('href')!))].filter(h => /\.\w+$/.test(h)),
  );
  hrefs.push('/og-image.png', '/favicon.svg');
  const missing: string[] = [];
  for (const href of hrefs) {
    const res = await request.get(href);
    // The SPA fallback serves index.html for unknown paths, so a file that
    // comes back as HTML is missing.
    if (!res.ok() || (res.headers()['content-type'] ?? '').includes('text/html')) missing.push(href);
  }
  expect(missing, 'linked files that do not exist').toEqual([]);
});

test('hero features the top three project cards, with the live RAG demo first and above the fold', async ({ page }, testInfo) => {
  await page.goto('/');
  const cards = page.locator('#hero .project-card');
  await expect(cards).toHaveCount(3);
  const titles = await cards.locator('.project-card__title').allTextContents();
  const projectTitles = await page.locator('#projects .project-card__title').allTextContents();
  expect(titles).toEqual(projectTitles.slice(0, 3));
  expect(titles[0]).toMatch(/Ask My Portfolio/);

  const first = cards.first();
  await expect(first.locator('.project-card__preview > *').first()).toBeVisible();
  await expect(first.locator('.project-card__preview-link')).toHaveAttribute('href', '/ask');
  await expect(first.getByRole('link', { name: 'Live Demo', exact: true })).toHaveAttribute('href', '/ask');

  // On desktop the RAG preview must be clickable without scrolling.
  if (testInfo.project.name === 'desktop') {
    const box = await first.locator('.project-card__preview').boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.y + box!.height, 'RAG preview bottom edge').toBeLessThanOrEqual(viewport.height);
  }
});

test('hero name stays understated: semibold at most and no larger than 2.8rem', async ({ page }) => {
  await page.goto('/');
  const name = page.getByRole('heading', { level: 1 });
  await expect(name).toBeVisible();
  const { weight, size } = await name.evaluate(el => {
    const cs = getComputedStyle(el);
    return { weight: Number(cs.fontWeight), size: Number.parseFloat(cs.fontSize) };
  });
  expect(weight).toBeLessThanOrEqual(600);
  expect(size).toBeLessThanOrEqual(2.8 * 16);
});
