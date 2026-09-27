import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECTS, BUILT_BY_LABEL, BUILT_BY_TITLE, BUILT_BY_ICON } from '../data/projects';
import type { Project, ProjectStatus } from '../data/projects';
import { GitHubIcon } from './Icons';
import { ProjectPreview } from './ProjectPreview';
import './Projects.css';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-dev': 'In Development',
  'coming-soon': 'Coming Soon',
};

function CardBadges({ project }: { project: Project }) {
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

export function Projects() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="projects" className="section projects" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Things I'm <span>Building</span>
          </h2>
          <p className="section-subtitle">
            Real projects with interactive previews — click Source to explore the code
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="project-card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {project.previewId ? (
                <div className="project-card__preview">
                  <ProjectPreview id={project.previewId} />
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
          ))}
        </div>
      </div>
    </section>
  );
}
