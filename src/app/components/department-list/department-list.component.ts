import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { DepartmentDetailComponent } from '../department-detail/department-detail.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'budget', 'employeeCount', 'actions'];
  dataSource: MatTableDataSource<Department>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.dataSource = new MatTableDataSource(departments);
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

  openDepartmentForm(department?: Department): void {
    const dialogRef = this.dialog.open(DepartmentDetailComponent, {
      width: '600px',
      data: department ? { ...department } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDepartments();
      }
    });
  }

  deleteDepartment(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Department',
        message: 'Are you sure you want to delete this department? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmentService.deleteDepartment(id)
          .subscribe(() => {
            this.loadDepartments();
          });
      }
    });
  }
}