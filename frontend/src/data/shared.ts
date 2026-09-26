export type BuiltBy = 'solo' | 'agent-assisted' | 'collaborative';

export interface CardItem {
  title: string;
  description: string;
  tags: string[];
  builtBy?: BuiltBy;
  repoUrl?: string;
}

export const BUILT_BY_LABEL: Record<BuiltBy, string> = {
  solo: 'Built by me',
  'agent-assisted': 'Agent-assisted',
  collaborative: 'Collaborative',
};

export const BUILT_BY_TITLE: Record<BuiltBy, string> = {
  solo: 'Hand-coded — no AI generation',
  'agent-assisted': 'Developed with AI coding agents',
  collaborative: 'Mix of hand-coded and AI-assisted',
};

export const BUILT_BY_ICON: Record<BuiltBy, string> = {
  solo: '✍️',
  'agent-assisted': '🤖',
  collaborative: '🤝',
};
