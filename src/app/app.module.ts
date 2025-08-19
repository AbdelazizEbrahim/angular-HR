import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { 
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, 
  MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, 
  MatDialogModule, MatSnackBarModule, MatDatepickerModule, 
  MatNativeDateModule, MatMenuModule, MatProgressSpinnerModule, 
  MatTooltipModule, MatBadgeModule, MatTabsModule, MatDividerModule, 
  MatChipsModule, MatCheckboxModule, MatProgressBarModule,
  MatExpansionModule, MatStepperModule, MatSlideToggleModule
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { SalaryListComponent } from './components/salary-list/salary-list.component';
import { SalaryFormComponent } from './components/salary-form/salary-form.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateFormComponent } from './components/candidate-form/candidate-form.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

// Services
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { SalaryService } from './services';
import { CandidateService } from './services/candidate.service';
import { CompanyService } from './services/company.service';
import { InMemoryDataService } from './services/in-memory-data.service';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Directives
import { HighlightDirective } from './shared/directives/highlight.directive';
import { AvatarDirective } from './shared/directives/avatar.directive';
import { DepartmentNamePipe } from './shared/pipes/department-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailComponent,
    SalaryListComponent,
    SalaryFormComponent,
    CandidateListComponent,
    CandidateFormComponent,
    CompanyInfoComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
    LoadingSpinnerComponent,
    HighlightDirective,
    DepartmentNamePipe,
    AvatarDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    // Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatStepperModule,
    MatSlideToggleModule
  ],
  providers: [
    EmployeeService,
    DepartmentService,
    SalaryService,
    CandidateService,
    CompanyService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    EmployeeFormComponent,
    DepartmentFormComponent,
    SalaryFormComponent,
    CandidateFormComponent
  ]
})
export class AppModule { }