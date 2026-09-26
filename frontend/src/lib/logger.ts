type Level = 'info' | 'warn' | 'error';
type Extra = Record<string, unknown>;

const isDev = import.meta.env.DEV;
const BEACON_URL = '/api/log';

// Browser console output never reaches Vercel, so warnings and errors are
// beaconed to /api/log, which prints them into Vercel runtime logs.
function ship(entry: Extra) {
  if (isDev) return;
  try {
    const body = JSON.stringify(entry);
    if (!navigator.sendBeacon?.(BEACON_URL, body)) {
      void fetch(BEACON_URL, { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    /* logging must never break the page */
  }
}

function emit(level: Level, msg: string, extra?: Extra) {
  const entry = {
    level,
    msg,
    ts: new Date().toISOString(),
    path: window.location.pathname + window.location.hash,
    ...extra,
  };
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.info;
  fn(`[${level}] ${msg}`, extra ?? '');
  if (level !== 'info') ship(entry);
}

export const log = {
  info: (msg: string, extra?: Extra) => emit('info', msg, extra),
  warn: (msg: string, extra?: Extra) => emit('warn', msg, extra),
  error: (msg: string, extra?: Extra) => emit('error', msg, extra),
};
