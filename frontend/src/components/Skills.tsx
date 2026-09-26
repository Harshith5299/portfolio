import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const SKILL_GROUPS = [
  {
    category: 'Backend & APIs',
    icon: '⚙️',
    color: '#6366f1',
    items: ['Python', 'FastAPI', 'REST APIs', 'SQLAlchemy', 'Microservices', 'Async Processing', 'Pydantic'],
  },
  {
    category: 'AI & Agentic Systems',
    icon: '🤖',
    color: '#8b5cf6',
    items: ['LangGraph', 'ADK Integration', 'LLM Orchestration', 'Tool Patterns', 'Evaluation', 'Observability', 'RAG Pipelines'],
  },
  {
    category: 'Data Engineering',
    icon: '📊',
    color: '#06b6d4',
    items: ['PySpark', 'AWS Glue', 'ETL Orchestration', 'S3 Lifecycle', 'SQL Optimization', 'Data Pipelines'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: '#f59e0b',
    items: ['AWS (Lambda, S3, IAM)', 'Docker', 'Kubernetes', 'OpenShift', 'GitHub Actions', 'Jenkins', 'CloudWatch'],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    color: '#10b981',
    items: ['React', 'TypeScript', 'Vite', 'State Management', 'CSS/SCSS', 'Component Design', 'UX Patterns'],
  },
  {
    category: 'Also Experienced',
    icon: '🔧',
    color: '#94a3b8',
    items: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
];

export function Skills() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="skills" className="section skills" ref={ref as React.RefObject<HTMLElement>}>
      <div className="skills__bg" aria-hidden />
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            My <span>Technical Toolkit</span>
          </h2>
          <p className="skills__subtitle">
            Across the full stack — from agentic AI to cloud infrastructure
          </p>
        </div>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.category}
              className="skills__card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="skills__card-header">
                <span className="skills__card-icon" style={{ '--card-color': group.color } as React.CSSProperties}>
                  {group.icon}
                </span>
                <h3 className="skills__card-title" style={{ color: group.color }}>
                  {group.category}
                </h3>
              </div>
              <div className="skills__tags">
                {group.items.map(item => (
                  <span key={item} className="skills__tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
