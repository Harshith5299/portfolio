import { test, expect, SECTION_IDS, scrollToSection } from './fixtures';

test.describe('sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const id of SECTION_IDS) {
    test(`#${id} is visible after scrolling to it`, async ({ page }) => {
      await scrollToSection(page, id);
      const section = page.locator(`#${id}`);
      await expect(section).toBeVisible();

      // Catches content that is in the DOM but invisible (e.g. stuck at opacity 0).
      const hidden = await section.evaluate(el =>
        [...el.querySelectorAll<HTMLElement>('.reveal')]
          .filter(r => Number(getComputedStyle(r).opacity) < 0.99)
          .map(r => r.className),
      );
      expect(hidden, `elements in #${id} still hidden after scroll`).toEqual([]);

      // Every section has a heading with visible text.
      await expect(section.locator('h1, h2').first()).toBeVisible();
    });
  }

  test('sections render in the documented order', async ({ page }) => {
    const ids = await page.locator('section[id]').evaluateAll(els => els.map(e => e.id));
    expect(ids).toEqual([...SECTION_IDS]);
  });
});
