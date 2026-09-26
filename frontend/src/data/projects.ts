export type ProjectStatus = 'in-dev' | 'coming-soon' | 'live';
export type { BuiltBy } from './shared';
export { BUILT_BY_LABEL, BUILT_BY_TITLE, BUILT_BY_ICON } from './shared';

import type { BuiltBy } from './shared';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  gradient: string;
  icon: string;
  builtBy?: BuiltBy;
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Netflix Clone',
    description:
      'Full‑stack streaming platform with user authentication, dynamic content catalogues, video playback, and personalised recommendations powered by ML ranking models.',
    tags: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'AWS S3', 'Docker'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #e50914 0%, #141414 100%)',
    icon: '🎬',
    builtBy: 'agent-assisted',
  },
  {
    title: 'YouTube Clone',
    description:
      'Video‑sharing platform with upload/transcode pipeline, search, subscriptions, comment threads, and view‑count analytics — built with a microservices architecture.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Kafka', 'FFmpeg', 'Redis'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #ff0000 0%, #282828 100%)',
    icon: '▶️',
    builtBy: 'agent-assisted',
  },
  {
    title: 'ServiceNow / ADO Integration Hub',
    description:
      'Enterprise dashboard bridging ServiceNow ITSM and Azure DevOps: automated ticket routing, sprint sync, SLA tracking, and AI‑generated status summaries.',
    tags: ['React', 'Python', 'LangGraph', 'REST APIs', 'Azure DevOps', 'FastAPI'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #00a1e0 0%, #0d1f38 100%)',
    icon: '🔗',
    builtBy: 'agent-assisted',
  },
  {
    title: 'ML Application Platform',
    description:
      'Self‑service platform for deploying and evaluating machine learning models — drag‑and‑drop pipeline builder, live inference endpoints, and interactive experiment tracking.',
    tags: ['React', 'Python', 'PySpark', 'AWS Glue', 'FastAPI', 'scikit-learn'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #050c1a 100%)',
    icon: '🧠',
    builtBy: 'agent-assisted',
  },
  {
    title: 'Cybersecurity Analytics Dashboard',
    description:
      'Banking‑domain tool that surfaces contextual risk insights using agentic AI — reducing manual review time and improving governance through LLM‑assisted decisioning.',
    tags: ['React', 'LangGraph', 'FastAPI', 'ADK', 'AWS Lambda', 'PostgreSQL'],
    status: 'in-dev',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #050c1a 100%)',
    icon: '🛡️',
    builtBy: 'agent-assisted',
  },
  {
    title: 'This Portfolio',
    description:
      'Modern developer portfolio built with React 19 + TypeScript, deployed on Vercel with GitHub Actions CI/CD — open source and continuously improved.',
    tags: ['React', 'TypeScript', 'Vite', 'Vercel', 'GitHub Actions', 'Python'],
    status: 'live',
    gradient: 'linear-gradient(135deg, #10b981 0%, #0d1f38 100%)',
    icon: '💼',
    builtBy: 'agent-assisted',
    repoUrl: 'https://github.com/Harshith5299/portfolio',
  },
];
