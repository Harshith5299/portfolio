import { test, expect, scrollToSection } from './fixtures';

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToSection(page, 'contact');
  });

  test('requires all fields before sending', async ({ page }) => {
    let posted = false;
    await page.route('**/api/contact', route => {
      posted = true;
      return route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.getByRole('button', { name: 'Send Message' }).click();
    expect(posted).toBe(false);
    const valid = await page.locator('#name').evaluate(el => (el as HTMLInputElement).validity.valid);
    expect(valid).toBe(false);
  });

  test('posts the message and shows success', async ({ page }) => {
    let body: unknown;
    await page.route('**/api/contact', route => {
      body = route.request().postDataJSON();
      return route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.fill('#name', 'Test Recruiter');
    await page.fill('#email', 'recruiter@example.com');
    await page.fill('#message', 'Hello from the e2e suite');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Message sent!')).toBeVisible();
    expect(body).toMatchObject({ name: 'Test Recruiter', email: 'recruiter@example.com', message: 'Hello from the e2e suite', website: '' });
    expect(typeof (body as { elapsedMs: unknown }).elapsedMs).toBe('number');
    await expect(page.locator('#name')).toHaveValue('');
  });

  test('shows an error when the server fails', async ({ page }) => {
    await page.route('**/api/contact', route => route.fulfill({ status: 500, body: 'boom' }));
    await page.fill('#name', 'Test');
    await page.fill('#email', 't@example.com');
    await page.fill('#message', 'hi');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Something went wrong')).toBeVisible();
  });

  test('shows the rate-limit message', async ({ page }) => {
    await page.route('**/api/contact', route =>
      route.fulfill({ status: 429, json: { ok: false, error: 'Too many messages. Please try again later.' } }),
    );
    await page.fill('#name', 'Test');
    await page.fill('#email', 't@example.com');
    await page.fill('#message', 'hi');
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Too many messages. Please try again later.')).toBeVisible();
  });

  test('keeps the spam-trap field out of reach', async ({ page }) => {
    await expect(page.locator('#website')).toHaveAttribute('tabindex', '-1');
    await expect(page.locator('#website')).not.toBeInViewport();
  });
});
