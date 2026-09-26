import profilePic from '../assets/profile.jpg';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const HIGHLIGHTS = [
  { icon: '🐍', label: 'Python-first backend', desc: 'FastAPI, SQLAlchemy, async processing, real-world ETL' },
  { icon: '🤖', label: 'Agentic AI', desc: 'LangGraph + ADK integration, LLM orchestration, observability' },
  { icon: '🏦', label: 'Banking Domain', desc: 'Risk-aware workflows, audit readiness, governance at scale' },
  { icon: '☁️', label: 'Cloud & DevOps', desc: 'AWS, Docker, Kubernetes, CI/CD pipelines' },
];

export function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="section about" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Building systems that <span>scale and adapt</span>
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__photo-col reveal">
            <div className="about__photo-wrapper">
              <img src={profilePic} alt="Harshith Chittajallu" className="about__photo" />
              <div className="about__photo-decoration" aria-hidden />
            </div>
            <div className="about__badges">
              <div className="about__badge">
                <span className="about__badge-num">5+</span>
                <span className="about__badge-txt">Years in<br />Software Eng.</span>
              </div>
              <div className="about__badge about__badge--accent">
                <span className="about__badge-num">10+</span>
                <span className="about__badge-txt">Projects<br />Delivered</span>
              </div>
            </div>
          </div>

          <div className="about__content reveal" style={{ transitionDelay: '0.1s' }}>
            <h3 className="about__name">Harshith Chittajallu</h3>
            <p className="about__title">Full Stack Software Engineer</p>

            <div className="about__bio">
              <p>
                I'm a Full‑Stack Software Engineer who pivoted into Python, Data Engineering,
                and AI‑driven applications mid‑career. I build scalable backend services,
                modern web UIs, and data pipelines that help teams make faster, safer
                decisions — especially in banking and enterprise environments.
              </p>
              <p>
                Over the past several years, I've worked on large‑scale enterprise systems
                where reliability, auditability, and speed matter. Most recently, I've been
                building cybersecurity‑focused applications in the banking domain, reducing
                manual review work through contextual insights and AI‑assisted decisioning.
              </p>
              <p>
                I'm comfortable operating in fast‑paced teams, collaborating across
                product, security, and data stakeholders, and delivering production‑grade
                solutions with strong testing and CI/CD practices.
              </p>
            </div>

            <div className="about__highlights">
              {HIGHLIGHTS.map(h => (
                <div key={h.label} className="about__highlight">
                  <span className="about__highlight-icon">{h.icon}</span>
                  <div>
                    <strong>{h.label}</strong>
                    <p>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about__ctas">
              <a href="#contact" className="btn btn-primary">Let's Talk</a>
              <a href="#skills" className="btn btn-ghost">View Skills</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
