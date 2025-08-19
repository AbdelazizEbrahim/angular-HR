import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { CandidateService } from '../../services/candidate.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  isLoading = true;
  recentHires: any[] = [];
  upcomingInterviews: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.employeeService.getEmployees(),
      this.departmentService.getDepartments(),
      this.candidateService.getCandidates()
    ]).subscribe(([employees, departments, candidates]) => {
      this.stats = {
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        activeCandidates: candidates.filter(c => c.status !== 'Rejected' && c.status !== 'Hired').length
      };

      this.recentHires = employees
        .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
        .slice(0, 5);

      this.upcomingInterviews = candidates
        .filter(c => c.interviewDate && new Date(c.interviewDate) > new Date())
        .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime())
        .slice(0, 5);

      this.isLoading = false;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Interviewing': return 'interviewing';
      case 'Offered': return 'offered';
      case 'Hired': return 'hired';
      default: return 'applied';
    }
  }
}