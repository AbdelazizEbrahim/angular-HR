import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateService } from '../../services/candidate.service';
import { DepartmentService } from '../../services/department.service';
import { Candidate } from '../../models/candidate.model';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss']
})
export class CandidateFormComponent implements OnInit {
  candidateForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  departments: Department[] = [];
  statusOptions = ['Applied', 'Interviewing', 'Offered', 'Hired', 'Rejected'];

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<CandidateFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Candidate
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadDepartments();

    if (this.data) {
      this.isEditMode = true;
      this.candidateForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.candidateForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      positionApplied: ['', Validators.required],
      departmentApplied: ['', Validators.required],
      status: ['Applied', Validators.required],
      applicationDate: ['', Validators.required],
      interviewDate: [''],
      notes: ['']
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  onSubmit(): void {
    if (this.candidateForm.invalid) {
      return;
    }

    this.isLoading = true;
    const candidate = this.candidateForm.value;

    if (this.isEditMode) {
      this.candidateService.updateCandidate(candidate)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Candidate updated successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to update candidate', 'Close', { duration: 3000 });
          }
        );
    } else {
      this.candidateService.createCandidate(candidate)
        .subscribe(
          () => {
            this.isLoading = false;
            this.snackBar.open('Candidate created successfully', 'Close', { duration: 3000 });
            this.dialogRef.close(true);
          },
          () => {
            this.isLoading = false;
            this.snackBar.open('Failed to create candidate', 'Close', { duration: 3000 });
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get formControls() {
    return this.candidateForm.controls;
  }
}