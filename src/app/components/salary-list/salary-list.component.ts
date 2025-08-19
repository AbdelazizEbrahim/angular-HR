import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from '../../services/employee.service';
import { Salary } from '../../models/salary.model';
import { SalaryFormComponent } from '../salary-form/salary-form.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})
export class SalaryListComponent implements OnInit {
  displayedColumns: string[] = ['employee', 'amount', 'frequency', 'effectiveDate', 'status', 'actions'];
  dataSource: MatTableDataSource<Salary>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries(): void {
    this.isLoading = true;
    this.salaryService.getSalaries()
      .subscribe(salaries => {
        this.dataSource = new MatTableDataSource(salaries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  openSalaryForm(salary?: Salary): void {
    const dialogRef = this.dialog.open(SalaryFormComponent, {
      width: '600px',
      data: salary ? { ...salary } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSalaries();
      }
    });
  }

  deleteSalary(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Salary Record',
        message: 'Are you sure you want to delete this salary record?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salaryService.deleteSalary(id)
          .subscribe(() => {
            this.loadSalaries();
          });
      }
    });
  }

  getStatus(endDate: Date): string {
    if (!endDate) return 'Active';
    return new Date(endDate) < new Date() ? 'Expired' : 'Active';
  }
}