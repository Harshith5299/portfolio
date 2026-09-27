import { test as base, expect, type Page } from '@playwright/test';

export const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'learning', 'experience', 'contact'] as const;

type LogEntry = { type: string; text: string };

/**
 * Every test gets a `logs` array holding browser console output, uncaught page
 * errors and failed requests. They are printed to stdout and attached to the
 * HTML report, and any console error or page error fails the test.
 */
export const test = base.extend<{ logs: LogEntry[] }>({
  logs: [
    async ({ page }, use, testInfo) => {
      const logs: LogEntry[] = [];
      page.on('console', msg => logs.push({ type: `console.${msg.type()}`, text: msg.text() }));
      page.on('pageerror', err => logs.push({ type: 'pageerror', text: err.stack ?? err.message }));
      page.on('requestfailed', req =>
        logs.push({ type: 'requestfailed', text: `${req.method()} ${req.url()} — ${req.failure()?.errorText}` }),
      );
      page.on('response', res => {
        if (res.status() >= 400) logs.push({ type: 'http', text: `${res.status()} ${res.url()}` });
      });

      // Serverless functions and Vercel's analytics script don't exist under
      // `vite preview`; stub them so they don't show up as noise.
      if (!process.env.BASE_URL) {
        await page.route('**/api/log', route => route.fulfill({ status: 204 }));
        await page.route('**/_vercel/**', route => route.fulfill({ status: 200, body: '' }));
      }

      await use(logs);

      const text = logs.map(l => `[${l.type}] ${l.text}`).join('\n') || '(no browser logs)';
      console.log(`\n── Browser logs: ${testInfo.titlePath.slice(1).join(' › ')} ──\n${text}`);
      await testInfo.attach('browser-logs', { body: text, contentType: 'text/plain' });

      // "Failed to load resource" duplicates the [http] entry above; HTTP
      // failures are asserted by the tests that care about them.
      const errors = logs.filter(
        l => l.type === 'pageerror' || (l.type === 'console.error' && !l.text.startsWith('Failed to load resource')),
      );
      expect(errors, 'browser console errors / uncaught exceptions').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Scroll an element into view the way a visitor would, then let reveal animations finish. */
export async function scrollToSection(page: Page, id: string) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.evaluate(i => document.getElementById(i)!.scrollIntoView({ block: 'start' }), id);
  await page.waitForTimeout(800);
}
