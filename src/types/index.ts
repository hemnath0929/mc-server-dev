export type MinecraftPlatform = 'Paper' | 'Purpur' | 'Spigot' | 'Folia' | 'Velocity' | 'BungeeCord';

export type DatabaseType = 'MySQL' | 'SQLite' | 'MariaDB' | 'Redis' | 'PostgreSQL' | 'MongoDB';

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  features: string[];
  techStack: string[];
  highlight: string;
  badgeType: 'emerald' | 'diamond' | 'portal' | 'gold' | 'redstone';
}

export interface CaseStudyArchitectureNode {
  layer: string;
  title: string;
  description: string;
  tech: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: 'Progression' | 'Economy' | 'Infrastructure' | 'Dungeon & AI';
  version: string;
  platforms: MinecraftPlatform[];
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  architecture: CaseStudyArchitectureNode[];
  sparkTickBenchmark: {
    avgTickMs: number;
    threadType: 'Async Pool' | 'Main Sync' | 'Folia Region' | 'Main Sync & Async Split';
    gcOverhead: string;
  };
  sampleConfig?: string;
  status: 'Production Deployed' | 'Enterprise Client Ready' | 'Core Architecture';
}

export interface TechCapability {
  name: string;
  category: 'Platform' | 'Language' | 'Database' | 'Integration' | 'Tooling';
  description: string;
  icon: string;
  badgeColor?: string;
}

export interface ProcessStep {
  stepNumber: string;
  icon: string;
  minecraftItem: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Development' | 'Compatibility' | 'Process' | 'Support';
}

export interface QuestFormData {
  id?: string;
  clientName: string;
  serverBrandName?: string;
  projectType: string[];
  customTypeOther?: string;
  minecraftVersion: string;
  serverSoftware: string;
  approxPlayerCount: string;
  serverType: string;
  projectTitle: string;
  projectDescription: string;
  requiredFeatures: string[];
  customFeatureNotes: string;
  timeline: 'Urgent (Under 1 week)' | 'Standard (1-3 weeks)' | 'Flexible / Large Milestone';
  budgetPreference: 'Custom Estimate' | 'Small Scope ($40-$100)' | 'Medium System ($100-$300)' | 'Full Architecture ($300+)';
  discordHandle: string;
  email: string;
  serverIp?: string;
  referenceLinks?: string;
  submittedAt?: string;
  status?: 'New' | 'In Review' | 'Accepted' | 'In Development' | 'Completed' | 'Archived';
  adminNotes?: string;
}

export interface TerminalCommandResponse {
  type: 'success' | 'info' | 'warning' | 'error' | 'spark';
  lines: string[];
}
