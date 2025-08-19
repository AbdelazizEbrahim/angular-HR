import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee, Department, Salary, Candidate, Company } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // Sample data for all entities
    const departments: Department[] = [
      { id: 1, name: 'Human Resources', location: 'Floor 1', budget: 500000, headId: 1 },
      { id: 2, name: 'Information Technology', location: 'Floor 2', budget: 1200000, headId: 2 },
      { id: 3, name: 'Finance', location: 'Floor 3', budget: 800000, headId: 3 }
    ];

    const employees: Employee[] = [
      { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@company.com', phone: '555-0101', position: 'HR Manager', departmentId: 1, salaryId: 1, hireDate: new Date('2018-06-15'), status: 'Active' },
      { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@company.com', phone: '555-0102', position: 'IT Director', departmentId: 2, salaryId: 2, hireDate: new Date('2017-03-10'), status: 'Active', managerId: 1 },
      { id: 3, firstName: 'Michael', lastName: 'Williams', email: 'michael.w@company.com', phone: '555-0103', position: 'Finance Head', departmentId: 3, salaryId: 3, hireDate: new Date('2019-11-22'), status: 'Active', managerId: 1 }
    ];

    const salaries: Salary[] = [
      { id: 1, employeeId: 1, amount: 85000, paymentFrequency: 'Monthly', effectiveDate: new Date('2023-01-01') },
      { id: 2, employeeId: 2, amount: 110000, paymentFrequency: 'Monthly', effectiveDate: new Date('2023-01-01'), bonus: 10000 },
      { id: 3, employeeId: 3, amount: 95000, paymentFrequency: 'Monthly', effectiveDate: new Date('2023-01-01'), taxDeductions: 12000 }
    ];

    const candidates: Candidate[] = [
      { id: 1, firstName: 'Emily', lastName: 'Davis', email: 'emily.d@example.com', phone: '555-0201', positionApplied: 'HR Specialist', departmentApplied: 1, applicationDate: new Date('2023-05-10'), status: 'Interviewing', interviewDate: new Date('2023-05-20') },
      { id: 2, firstName: 'David', lastName: 'Brown', email: 'david.b@example.com', phone: '555-0202', positionApplied: 'Software Developer', departmentApplied: 2, applicationDate: new Date('2023-05-12'), status: 'Applied' }
    ];

    const company: Company[] = [
      { id: 1, name: 'Tech Solutions Inc.', address: '123 Business Rd, City, Country', website: 'www.techsolutions.com', phone: '555-1000', foundedYear: 2010, employeeCount: 150, industry: 'Information Technology' }
    ];

    return { employees, departments, salaries, candidates, company };
  }

  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }
}