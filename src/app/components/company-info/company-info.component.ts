import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  companyForm: FormGroup;
  isLoading = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCompany();
  }

  initializeForm(): void {
    this.companyForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      phone: ['', Validators.required],
      foundedYear: ['', [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      employeeCount: ['', [Validators.required, Validators.min(1)]],
      industry: ['', Validators.required],
      revenue: [''],
      description: ['']
    });
  }

  loadCompany(): void {
    this.isLoading = true;
    this.companyService.getCompany()
      .subscribe(company => {
        if (company) {
          this.companyForm.patchValue(company);
        }
        this.isLoading = false;
      });
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.loadCompany();
    }
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    this.isLoading = true;
    const company = this.companyForm.value;

    this.companyService.updateCompany(company)
      .subscribe(
        () => {
          this.isLoading = false;
          this.snackBar.open('Company information updated successfully', 'Close', { duration: 3000 });
          this.isEditMode = false;
        },
        () => {
          this.isLoading = false;
          this.snackBar.open('Failed to update company information', 'Close', { duration: 3000 });
        }
      );
  }

  get formControls() {
    return this.companyForm.controls;
  }
}