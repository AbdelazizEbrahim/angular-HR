import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalaryService } from '../../services/salary.service';
import { EmployeeService } from '../../services/employee.service';
import { Salary } from '../../models/salary.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-salary-form',
  templateUrl: './salary-form.component.html',
  styleUrls: ['./salary-form.component.scss']
})
export class SalaryFormComponent implements OnInit {
  salaryForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  employees: Employee[] = [];
  frequencyOptions = ['Monthly', 'Bi-Weekly', 'Weekly'];

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<SalaryFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Salary
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadEmployees();

    if (this.data) {
      this.isEditMode = true;
      this.salaryForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.salaryForm = this.fb.group({
      id: [null],
      employeeId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      paymentFrequency: ['Monthly', Validators.required],
      effectiveDate: ['', Validators.required],
      endDate: [''],
      bonus: ['', Validators.min(0)],
      taxDeductions: ['', Validators.min(0)]
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  onSubmit(): void {
    if (this.salaryForm.invalid) {
      return;
    }

    this.isLoading = true;
    const salary = this.salaryForm.value;

    if (this.isEditMode) {
      this.salaryService.updateSalary(salary)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Salary record updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to update salary record', 'Close', { duration: 3000 });
          }
        );
    } else {
      this.salaryService.createSalary(salary)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Salary record created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to create salary record', 'Close', { duration: 3000 });
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get formControls() {
    return this.salaryForm.controls;
  }
}