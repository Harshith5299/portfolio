import { BUILT_BY_LABEL, BUILT_BY_TITLE, BUILT_BY_ICON } from '../data/projects';
import type { Project, ProjectStatus } from '../data/projects';
import { GitHubIcon } from './Icons';
import { ProjectPreview } from './ProjectPreview';
import './Projects.css';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-dev': 'In Development',
  'coming-soon': 'Coming Soon',
};

function CardBadges({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="project-card__banner-badges">
      <span className={`project-card__badge project-card__badge--${project.status}`}>
        {project.status === 'live' && (
          <span className="project-card__badge-dot" aria-hidden />
        )}
        {STATUS_LABELS[project.status]}
      </span>
      {project.builtBy && (
        <span
          className={`built-by-badge built-by-badge--${project.builtBy}`}
          title={BUILT_BY_TITLE[project.builtBy]}
        >
          {BUILT_BY_ICON[project.builtBy]} {BUILT_BY_LABEL[project.builtBy]}
        </span>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  /** Smaller preview and clamped text, for the hero's featured row. */
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectCard({ project, compact, className, style }: Readonly<ProjectCardProps>) {
  const classes = ['project-card', compact && 'project-card--compact', className].filter(Boolean).join(' ');
  return (
    <article
      className={classes}
      style={style}
    >
      {project.previewId ? (
        <div className="project-card__preview">
          <ProjectPreview id={project.previewId} />
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__preview-link"
              aria-label={`Open the ${project.title} live demo`}
            />
          )}
          <CardBadges project={project} />
        </div>
      ) : (
        <div className="project-card__banner" style={{ background: project.gradient }}>
          <span className="project-card__icon">{project.icon}</span>
          <CardBadges project={project} />
        </div>
      )}

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="card-tags">
          {project.tags.map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>

        <div className="card-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn--sm">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Live Demo
            </a>
          ) : project.previewId ? (
            <span className="project-card__wip">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v6.69l2.97-2.97a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.53a.75.75 0 011.06-1.06l2.97 2.97V3.75A.75.75 0 0110 3zm-6.25 13.5a.75.75 0 000 1.5h12.5a.75.75 0 000-1.5H3.75z" clipRule="evenodd" />
              </svg>
              Interactive preview above
            </span>
          ) : (
            <span className="project-card__wip">
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              Coming to this site
            </span>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn--sm">
              <GitHubIcon />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
