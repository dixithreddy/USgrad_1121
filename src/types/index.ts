export interface University {
  id: string;
  name: string;
  location: string;
  commissionRate: number;
  contactPersons: ContactPerson[];
  programs: Program[];
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface Program {
  id: string;
  name: string;
  deadline: string;
  requirements: string[];
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  region: string;
  commissionRate: number;
  performance: {
    conversionRate: number;
    activeStudents: number;
  };
}

export interface Student {
  id: string;
  name: string;
  email: string;
  country: string;
  status: 'Lead' | 'Applied' | 'Accepted' | 'Enrolled' | 'Rejected';
  targetUniversity: string;
  targetProgram: string;
  applicationProgress: number;
}

export type PipelineStage = 'inquiry' | 'documentation' | 'application' | 'interview' | 'decision' | 'visa' | 'enrolled';

export interface PipelineItem {
  id: string;
  studentName: string;
  country: string;
  targetUniversity: string;
  program: string;
  deadline: string;
  lastActivity: string;
  priority: 'high' | 'medium' | 'low';
}