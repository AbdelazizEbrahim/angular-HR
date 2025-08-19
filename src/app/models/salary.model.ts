import { Employee } from "./employee.model";

export interface Salary {
  id: number;
  employeeId: number;
  amount: number;
  paymentFrequency: 'Monthly' | 'Bi-Weekly' | 'Weekly';
  effectiveDate: Date;
  endDate?: Date;
  bonus?: number;
  taxDeductions?: number;
}

export interface SalaryWithRelations extends Salary {
  employee?: Employee;
}