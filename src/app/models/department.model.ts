import { Employee } from "./employee.model";

export interface Department {
  id: number;
  name: string;
  location: string;
  budget: number;
  headId?: number;
  description?: string;
}

export interface DepartmentWithRelations extends Department {
  head?: Employee;
  employees?: Employee[];
}