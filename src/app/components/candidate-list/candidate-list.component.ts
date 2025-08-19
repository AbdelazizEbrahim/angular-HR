import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CandidateService } from '../../services/candidate.service';
import { DepartmentService } from '../../services/department.service';
import { Candidate } from '../../models/candidate.model';
import { CandidateFormComponent } from '../candidate-form/candidate-form.component';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'position', 'department', 'status', 'applicationDate', 'actions'];
  dataSource: MatTableDataSource<Candidate>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private candidateService: CandidateService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.isLoading = true;
    this.candidateService.getCandidates()
      .subscribe(candidates => {
        this.dataSource = new MatTableDataSource(candidates);
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

  openCandidateForm(candidate?: Candidate): void {
    const dialogRef = this.dialog.open(CandidateFormComponent, {
      width: '800px',
      data: candidate ? { ...candidate } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCandidates();
      }
    });
  }

  deleteCandidate(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete Candidate',
        message: 'Are you sure you want to delete this candidate?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidateService.deleteCandidate(id)
          .subscribe(() => {
            this.loadCandidates();
          });
      }
    });
  }

  changeStatus(candidate: Candidate, newStatus: string): void {
    this.candidateService.changeCandidateStatus(candidate.id, newStatus)
      .subscribe(() => {
        this.loadCandidates();
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Applied': return 'applied';
      case 'Interviewing': return 'interviewing';
      case 'Offered': return 'offered';
      case 'Hired': return 'hired';
      case 'Rejected': return 'rejected';
      default: return '';
    }
  }
}