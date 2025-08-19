import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  managers: Employee[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<DepartmentDetailComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Department
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadManagers();

    if (this.data) {
      this.isEditMode = true;
      this.departmentForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.departmentForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      location: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      headId: [''],
      description: ['']
    });
  }

  loadManagers(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.managers = employees;
      });
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    this.isLoading = true;
    const department = this.departmentForm.value;

    if (this.isEditMode) {
      this.departmentService.updateDepartment(department)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Department updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to update department', 'Close', { duration: 3000 });
          }
        );
    } else {
      this.departmentService.createDepartment(department)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Department created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to create department', 'Close', { duration: 3000 });
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get formControls() {
    return this.departmentForm.controls;
  }
}