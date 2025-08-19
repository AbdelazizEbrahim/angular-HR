import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { SalaryListComponent } from './components/salary-list/salary-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeDetailComponent },
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/new', component: DepartmentDetailComponent },
  { path: 'departments/:id', component: DepartmentDetailComponent },
  { path: 'salaries', component: SalaryListComponent },
  { path: 'candidates', component: CandidateListComponent },
  { path: 'company', component: CompanyInfoComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }