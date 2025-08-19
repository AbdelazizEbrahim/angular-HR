import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee.model';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'name', 'department', 'position', 'status', 'hireDate', 'actions'];
  dataSource: MatTableDataSource<Employee>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
          switch (sortHeaderId) {
            case 'name': return `${data.firstName} ${data.lastName}`.toLowerCase();
            default: return data[sortHeaderId];
          }
        };
        this.isLoading = false;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEmployeeForm(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: employee ? { ...employee } : null,
      panelClass: 'employee-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Employee',
        message: 'Are you sure you want to delete this employee? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'active';
      case 'On Leave': return 'on-leave';
      case 'Terminated': return 'terminated';
      default: return '';
    }
  }
}