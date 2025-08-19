import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  departments: Department[];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
      name: ['', Validators.required],
      position: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      hireDate: ['', Validators.required]
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      
      if (this.isEditMode) {
        this.employeeService.updateEmployee(employee)
          .subscribe(() => this.dialogRef.close(true));
      } else {
this.employeeService.createEmployee(employee)
          .subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}