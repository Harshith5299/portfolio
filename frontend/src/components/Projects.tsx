import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

type ProjectStatus = 'in-dev' | 'coming-soon' | 'live';

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  gradient: string;
  icon: string;
  liveUrl?: string;
  repoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Netflix Clone',
    description:
      'Full‑stack streaming platform with user authentication, dynamic content catalogues, video playback, and personalised recommendations powered by ML ranking models.',
    tags: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'AWS S3', 'Docker'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #e50914 0%, #141414 100%)',
    icon: '🎬',
  },
  {
    title: 'YouTube Clone',
    description:
      'Video‑sharing platform with upload/transcode pipeline, search, subscriptions, comment threads, and view‑count analytics — built with a microservices architecture.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Kafka', 'FFmpeg', 'Redis'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #ff0000 0%, #282828 100%)',
    icon: '▶️',
  },
  {
    title: 'ServiceNow / ADO Integration Hub',
    description:
      'Enterprise dashboard bridging ServiceNow ITSM and Azure DevOps: automated ticket routing, sprint sync, SLA tracking, and AI‑generated status summaries.',
    tags: ['React', 'Python', 'LangGraph', 'REST APIs', 'Azure DevOps', 'FastAPI'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #00a1e0 0%, #0d1f38 100%)',
    icon: '🔗',
  },
  {
    title: 'ML Application Platform',
    description:
      'Self‑service platform for deploying and evaluating machine learning models — drag‑and‑drop pipeline builder, live inference endpoints, and interactive experiment tracking.',
    tags: ['React', 'Python', 'PySpark', 'AWS Glue', 'FastAPI', 'scikit-learn'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #050c1a 100%)',
    icon: '🧠',
  },
  {
    title: 'Cybersecurity Analytics Dashboard',
    description:
      'Banking‑domain tool that surfaces contextual risk insights using agentic AI — reducing manual review time and improving governance through LLM‑assisted decisioning.',
    tags: ['React', 'LangGraph', 'FastAPI', 'ADK', 'AWS Lambda', 'PostgreSQL'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #050c1a 100%)',
    icon: '🛡️',
  },
  {
    title: 'This Portfolio',
    description:
      'Modern developer portfolio built with React 19 + TypeScript, deployed on Vercel with GitHub Actions CI/CD — open source and continuously improved.',
    tags: ['React', 'TypeScript', 'Vite', 'Vercel', 'GitHub Actions', 'Python'],
    status: 'live',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d1f38 100%)',
    icon: '💼',
    repoUrl: 'https://github.com/Harshith5299/portfolio',
  },
];

const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-dev': 'In Development',
  'coming-soon': 'Coming Soon',
};

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
          <p className="projects__subtitle">
            Each project will be hosted here as a live, interactive demo
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="project-card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="project-card__banner" style={{ background: project.gradient }}>
                <span className="project-card__icon">{project.icon}</span>
                <span className={`project-card__badge project-card__badge--${project.status}`}>
                  {project.status === 'live' && (
                    <span className="project-card__badge-dot" aria-hidden />
                  )}
                  {STATUS_LABELS[project.status]}
                </span>
              </div>

              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card__actions">
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
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
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
