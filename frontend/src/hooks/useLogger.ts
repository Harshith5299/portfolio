import { useEffect } from 'react';
import { log } from '../lib/logger';

// Mount once at the app root: logs navigation (hash sections today, History
// API routes if a router is added later) and any uncaught error or rejection.
export function useLogger() {
  useEffect(() => {
    const onNavigate = () => log.info('navigate', { to: location.pathname + location.hash });
    const onError = (e: ErrorEvent) =>
      log.error('uncaught error', { error: e.message, source: e.filename, line: e.lineno, stack: e.error?.stack });
    const onRejection = (e: PromiseRejectionEvent) =>
      log.error('unhandled rejection', { error: String(e.reason), stack: e.reason?.stack });

    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) {
      origPush.apply(this, args);
      onNavigate();
    };
    history.replaceState = function (...args) {
      origReplace.apply(this, args);
      onNavigate();
    };

    window.addEventListener('popstate', onNavigate);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener('popstate', onNavigate);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);
}
