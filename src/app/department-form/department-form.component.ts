import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeForm();

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
      budget: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const department = this.departmentForm.value;
      
      if (this.isEditMode) {
        this.departmentService.updateDepartment(department)
          .subscribe(() => this.dialogRef.close(true));
      } else {
        this.departmentService.createDepartment(department)
  .subscribe(result => {
    console.log('Department added', result);
  });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}