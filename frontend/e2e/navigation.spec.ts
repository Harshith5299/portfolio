import { test, expect } from './fixtures';

const NAV = ['About', 'Skills', 'Projects', 'Learning', 'Experience', 'Contact'];

test('each nav link scrolls its section into view', async ({ page, isMobile }) => {
  await page.goto('/');
  for (const label of NAV) {
    if (isMobile) await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.locator('.navbar__links').getByRole('link', { name: label, exact: true }).click();
    const id = label.toLowerCase();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('mobile menu opens and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'hamburger only exists on small screens');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.locator('.navbar__overlay').click({ position: { x: 10, y: 400 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
