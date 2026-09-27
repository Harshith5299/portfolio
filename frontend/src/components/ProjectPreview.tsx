import { lazy, Suspense } from 'react';
import './ProjectPreview.css';

const PREVIEW_MAP: Record<string, React.LazyExoticComponent<() => React.ReactElement>> = {
  'event-syncer': lazy(() => import('./previews/EventSyncerPreview')),
  'spring-bank': lazy(() => import('./previews/SpringBankPreview')),
};

interface ProjectPreviewProps {
  id: string;
}

export function ProjectPreview({ id }: ProjectPreviewProps) {
  const Preview = PREVIEW_MAP[id];
  if (!Preview) return null;
  return (
    <Suspense fallback={<div className="project-preview__skeleton" aria-hidden />}>
      <Preview />
    </Suspense>
  );
}
