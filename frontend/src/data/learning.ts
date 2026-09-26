export type LearningStatus = 'completed' | 'in-progress' | 'planned';
export type LearningType = 'course' | 'certification' | 'project';
export type { BuiltBy } from './shared';
export { BUILT_BY_LABEL, BUILT_BY_ICON } from './shared';

import type { BuiltBy } from './shared';

export interface LearningItem {
  title: string;
  platform: string;
  type: LearningType;
  status: LearningStatus;
  description: string;
  tags: string[];
  builtBy?: BuiltBy;
  repoUrl?: string;
  certUrl?: string;
}

// Add your courses, certifications, and personal learning projects here.
// builtBy: 'solo' = hand-coded for learning; 'agent-assisted' = AI-helped; omit if not a project.
export const LEARNING_ITEMS: LearningItem[] = [
  {
    title: 'Databricks Data Engineering',
    platform: 'Databricks Academy',
    type: 'course',
    status: 'planned',
    description: 'Hands-on data engineering with Delta Lake, Apache Spark, and the Databricks Lakehouse Platform.',
    tags: ['PySpark', 'Delta Lake', 'Databricks', 'Data Engineering'],
  },
  {
    title: 'Generative AI & LLM Engineering',
    platform: 'Coursera / DeepLearning.AI',
    type: 'course',
    status: 'planned',
    description: 'Prompt engineering, fine-tuning, RAG pipelines, and building production-grade LLM applications.',
    tags: ['LLMs', 'RAG', 'Prompt Engineering', 'LangChain', 'Python'],
  },
  {
    title: 'AWS Solutions Architect',
    platform: 'AWS Training',
    type: 'certification',
    status: 'planned',
    description: 'Designing resilient, high-availability architectures across AWS compute, networking, storage, and security services.',
    tags: ['AWS', 'Cloud Architecture', 'IAM', 'VPC', 'S3', 'EC2'],
  },
  {
    title: 'Machine Learning Specialisation',
    platform: 'Coursera / Stanford Online',
    type: 'course',
    status: 'planned',
    description: 'Supervised and unsupervised learning, neural networks, and practical ML with scikit-learn and TensorFlow.',
    tags: ['Python', 'scikit-learn', 'TensorFlow', 'ML', 'Neural Networks'],
  },
];
