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
    title: 'Agentic AI Production Support Engineer',
    company: 'GE Vernova',
    period: 'Jul 2026 — Present',
    domain: 'Agentic AI · Internal Productivity Platform',
    bullets: [
      'Provide production support for GE Vernova’s internal agentic AI platform, a productivity platform that hosts multiple AI services and APIs.',
      'Support AI services and APIs running on AWS Bedrock AgentCore.',
    ],
    stack: ['AWS Bedrock AgentCore', 'Agentic AI', 'AWS', 'Python'],
  },
  {
    title: 'Full Stack Python AI Developer',
    company: 'Wells Fargo',
    period: 'Jan 2025 — Jun 2026',
    domain: 'Cybersecurity · Identity & Access Governance',
    bullets: [
      'Built IAM Remediation, an internal platform that helps managers review and revoke large volumes of user entitlements, reducing blanket approvals and improving audit readiness.',
      'Implemented LangGraph multi-step agents that generate natural-language entitlement summaries and recommend revocation actions.',
      'Developed FastAPI microservices for entitlement retrieval, summarization and revocation, with React UI built on Google’s Agent Development Kit (ADK) for bulk actions.',
      'Built Python scenario models and data pipelines for stress testing and what-if analysis on a Treasury and Risk analytics platform (liquidity and interest rate risk).',
      'Stored entitlement metadata, decisions and activity logs in MongoDB and PostgreSQL; used Pandas for grouping and stale-access detection.',
      'Containerized services with Docker, deployed to HashiCorp Nomad, and ran CI/CD with GitHub Actions and Jenkins backed by Pytest and React Testing Library.',
    ],
    stack: ['Python', 'FastAPI', 'LangGraph', 'Google ADK', 'React', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'Nomad'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Amazon',
    period: 'May 2022 — Dec 2024',
    domain: 'Amazon Photos · AI & Fraud Detection',
    bullets: [
      'Developed FastAPI microservices on AWS Lambda and API Gateway for media ingestion and user metadata.',
      'Replaced Java backend logic with async Python services (AsyncIO, Uvicorn), improving cold-start latency.',
      'Integrated Amazon Rekognition and Hugging Face Transformers for image classification, multi-label tagging and semantic photo search.',
      'Rebuilt transaction validation as a Python fraud-detection pipeline using Pandas, scikit-learn and rule-based scoring on Kafka streams.',
      'Built LangChain/LangGraph document-classification workflows with multi-step reasoning, and helped run E2E testing of LLM features for prompt safety and accuracy.',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'Hugging Face', 'AWS Lambda', 'Rekognition', 'Kafka', 'Kubernetes'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Principal Healthcare',
    period: 'Jan 2022 — Apr 2022',
    domain: 'Healthcare · Client Integrations',
    bullets: [
      'Replaced legacy Java/Spring components with FastAPI microservices and migrated JPA entity models to SQLAlchemy.',
      'Built REST APIs and reusable React components for AI-enabled integration features on GCP.',
      'Containerized and redeployed dormant modules to GKE with Docker and GitHub Actions, practicing TDD with Pytest.',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'GCP', 'GKE', 'Docker'],
  },
  {
    title: 'Python Full Stack Developer',
    company: 'Tango Analytics',
    period: 'Feb 2021 — Dec 2021',
    domain: 'Enterprise Platforms',
    bullets: [
      'Developed Flask/FastAPI microservices and REST APIs for enterprise platform integrations.',
      'Built React dashboards and reusable UI modules, and Pandas/NumPy data-processing modules for reporting.',
      'Containerized services with Docker and deployed them to Kubernetes/OpenShift.',
    ],
    stack: ['Python', 'Flask', 'FastAPI', 'React', 'PostgreSQL', 'MongoDB', 'Kubernetes'],
  },
  {
    title: 'Python Backend Developer',
    company: 'AT&T',
    period: 'May 2020 — Jan 2021',
    domain: 'Portfolio Management Platform',
    bullets: [
      'Built Python backend services and Flask/FastAPI REST APIs for a portfolio management platform handling large-scale data processing.',
      'Designed a modular microservice architecture with dependency injection and middleware layers, developed test-first with Pytest.',
    ],
    stack: ['Python', 'Flask', 'FastAPI', 'SQLAlchemy', 'MongoDB', 'JavaScript'],
  },
  {
    title: 'Jr. Software Developer',
    company: 'L&T Infotech',
    period: 'May 2018 — Dec 2019',
    domain: 'Enterprise Web Applications',
    bullets: [
      'Built Flask/Django services, including document and log uploads to AWS S3.',
      'Set up Jenkins build and deployment pipelines with Terraform for infrastructure provisioning.',
    ],
    stack: ['Python', 'Flask', 'Django', 'AWS S3', 'Jenkins', 'Terraform'],
  },
  {
    title: 'Assistant Developer',
    company: 'Value Labs',
    period: 'Mar 2017 — Apr 2018',
    domain: 'Web Applications',
    bullets: [
      'Tuned backend performance, tracking down memory leaks and optimizing application components.',
      'Wrote SQL queries and procedures against MySQL, and built web interfaces with HTML, CSS and JavaScript.',
    ],
    stack: ['Java', 'JSP', 'MySQL', 'JavaScript', 'Tomcat'],
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
              style={{ transitionDelay: `${Math.min(i, 3) * 0.1}s` }}
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
