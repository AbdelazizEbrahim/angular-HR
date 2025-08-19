import { Department } from "./department.model";
import { Salary } from "./salary.model";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  departmentId: number;
  salaryId: number;
  hireDate: Date;
  status: 'Active' | 'On Leave' | 'Terminated';
  managerId?: number;
}

export interface EmployeeWithRelations extends Employee {
  department?: Department;
  salary?: Salary;
  manager?: Employee;
  subordinates?: Employee[];
}