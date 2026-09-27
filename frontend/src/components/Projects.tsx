import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

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
            <ProjectCard
              key={project.title}
              project={project}
              className="reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
