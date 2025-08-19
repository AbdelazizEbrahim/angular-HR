import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'department', 'salary', 'hireDate', 'status', 'actions'];
  dataSource: MatTableDataSource<Employee>;
  departments: Department[] = [];
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown';
  }

  getDepartmentColor(departmentId: number): string {
    const colors = ['#FFD700', '#87CEEB', '#98FB98', '#FFA07A', '#9370DB'];
    return colors[departmentId % colors.length];
  }

  calculateTenure(hireDate: Date): string {
    const today = new Date();
    const hire = new Date(hireDate);
    const years = today.getFullYear() - hire.getFullYear();
    const months = today.getMonth() - hire.getMonth();
    
    if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} mo${months > 1 ? 's' : ''}`;
    }
    return '';
  }

  openEmployeeForm(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      data: employee ? { ...employee } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id)
          .subscribe(() => {
            this.loadEmployees();
          });
      }
    });
  }
}