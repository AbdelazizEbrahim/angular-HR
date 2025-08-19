import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  departments: Department[] = [];
  statusOptions = ['Active', 'On Leave', 'Terminated'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<EmployeeDetailComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDepartments();

    if (this.data) {
      this.isEditMode = true;
      this.employeeForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      departmentId: ['', Validators.required],
      hireDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    this.isLoading = true;
    const employee = this.employeeForm.value;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employee)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to update employee', 'Close', { duration: 3000 });
          }
        );
    } else {
      this.employeeService.createEmployee(employee)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Employee created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to create employee', 'Close', { duration: 3000 });
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get formControls() {
    return this.employeeForm.controls;
  }
}