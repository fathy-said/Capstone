// Shared TypeScript interfaces for Project components

export interface Project {
  id: number;
  name: string;
  type: 'Medical' | 'Academic' | 'Team';
  requests: number;
  description: string;
  skills: string[];
}

export interface NewProject {
  name: string;
  type: string;
  description: string;
}

export type ProjectType = 'Medical' | 'Academic' | 'Team' | "";