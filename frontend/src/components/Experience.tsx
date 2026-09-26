import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  domain: string;
  bullets: string[];
  stack: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Financial Services Firm',
    period: '2022 — Present',
    domain: 'Cybersecurity & Banking',
    bullets: [
      'Built AI‑driven decisioning tools using LangGraph and ADK, reducing manual security review workload by 60%.',
      'Designed and delivered LLM‑assisted summarisation pipelines for cybersecurity alerts in a high‑governance banking environment.',
      'Architected FastAPI microservices with async processing, PostgreSQL, and AWS Lambda for real‑time risk workflows.',
      'Led cross‑functional collaboration between product, security, and data stakeholders to ship audit‑ready features.',
      'Established CI/CD pipelines with GitHub Actions and monitored production services via CloudWatch dashboards.',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'ADK', 'AWS', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Software Engineer',
    company: 'Enterprise Technology Solutions',
    period: '2019 — 2022',
    domain: 'Enterprise Systems & Data Engineering',
    bullets: [
      'Developed and maintained Java / Spring Boot microservices handling high‑throughput transaction processing.',
      'Led a phased migration of legacy data workflows to Python‑based ETL pipelines using PySpark and AWS Glue.',
      'Built Kafka‑driven event streaming systems for real‑time data ingestion and downstream analytics.',
      'Delivered SQL optimisations that reduced query latency by 40% across critical reporting workloads.',
      'Contributed to DevOps practices, establishing Docker containerisation and Jenkins CI pipelines for the team.',
    ],
    stack: ['Java', 'Spring Boot', 'Python', 'PySpark', 'Kafka', 'AWS Glue', 'Jenkins'],
  },
  {
    title: 'Junior Software Developer',
    company: 'Software Consultancy',
    period: '2017 — 2019',
    domain: 'Full Stack Development',
    bullets: [
      'Built REST APIs with Java and Spring Boot, contributing to client‑facing enterprise portals.',
      'Developed frontend features in React and TypeScript, improving usability for internal dashboards.',
      'Collaborated in an Agile team, participating in sprint planning, code reviews, and retrospectives.',
      'Gained foundational experience with cloud deployment, Docker, and SQL/NoSQL databases.',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'MongoDB', 'PostgreSQL'],
  },
];

export function Experience() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="experience" className="section experience" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            My <span>Career Journey</span>
          </h2>
        </div>

        <div className="experience__timeline">
          {EXPERIENCE.map((item, i) => (
            <div
              key={item.title + item.company}
              className="experience__item reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="experience__marker">
                <div className="experience__dot" />
                {i < EXPERIENCE.length - 1 && <div className="experience__line" />}
              </div>

              <div className="experience__card">
                <div className="experience__card-header">
                  <div>
                    <h3 className="experience__title">{item.title}</h3>
                    <p className="experience__company">{item.company}</p>
                    <span className="experience__domain">{item.domain}</span>
                  </div>
                  <span className="experience__period">{item.period}</span>
                </div>

                <ul className="experience__bullets">
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi}>
                      <span className="experience__bullet-dot" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="experience__stack">
                  {item.stack.map(tech => (
                    <span key={tech} className="experience__tech">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
