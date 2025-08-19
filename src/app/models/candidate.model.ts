import { Department } from "./department.model";

export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  positionApplied: string;
  departmentApplied: number;
  resumeUrl?: string;
  applicationDate: Date;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected';
  interviewDate?: Date;
  notes?: string;
}

export interface CandidateWithRelations extends Candidate {
  department?: Department;
}