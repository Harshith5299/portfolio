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
