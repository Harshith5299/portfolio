import { Component, type ErrorInfo, type ReactNode } from 'react';
import { log } from '../lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

// Wrap any section or future sub-project so a crash there is logged and
// contained instead of blanking the whole page.
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    log.error('render error', { error: error.message, stack: error.stack, componentStack: info.componentStack });
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Something went wrong loading this section. Please refresh the page.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
