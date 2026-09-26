import { useScrollReveal } from '../hooks/useScrollReveal';
import { LEARNING_ITEMS, BUILT_BY_LABEL, BUILT_BY_ICON } from '../data/learning';
import type { LearningStatus, LearningType } from '../data/learning';
import { GitHubIcon } from './Icons';
import './Learning.css';

const STATUS_LABELS: Record<LearningStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
};

const TYPE_ICONS: Record<LearningType, string> = {
  course: '📚',
  certification: '🏆',
  project: '🔨',
};

export function Learning() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="learning" className="section learning" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Learning</span>
          <h2 className="section-title">
            Always <span>Growing</span>
          </h2>
          <p className="section-subtitle">
            Courses, certifications, and personal projects — some hand-coded, some agent-assisted.
          </p>
        </div>

        <div className="learning__grid">
          {LEARNING_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="learning-card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="learning-card__header">
                <span className="learning-card__type-icon" aria-hidden>{TYPE_ICONS[item.type]}</span>
                <div className="learning-card__meta">
                  <span className="learning-card__platform">{item.platform}</span>
                  <div className="learning-card__badges">
                    <span className={`learning-card__status learning-card__status--${item.status}`}>
                      {item.status === 'in-progress' && <span className="learning-card__dot" aria-hidden />}
                      {STATUS_LABELS[item.status]}
                    </span>
                    {item.builtBy && (
                      <span className={`built-by-badge built-by-badge--${item.builtBy}`}>
                        {BUILT_BY_ICON[item.builtBy]} {BUILT_BY_LABEL[item.builtBy]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="learning-card__title">{item.title}</h3>
              <p className="learning-card__desc">{item.description}</p>

              <div className="card-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="card-tag">{tag}</span>
                ))}
              </div>

              {(item.repoUrl || item.certUrl) && (
                <div className="card-actions">
                  {item.repoUrl && (
                    <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn--sm">
                      <GitHubIcon />
                      Code
                    </a>
                  )}
                  {item.certUrl && (
                    <a href={item.certUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn--sm">
                      <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Certificate
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
