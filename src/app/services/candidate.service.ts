import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Candidate, CandidateWithRelations } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'api/candidates';

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched candidates')),
        catchError(this.handleError<Candidate[]>('getCandidates', []))
      );
  }

  getCandidate(id: number): Observable<CandidateWithRelations> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Candidate>(url)
      .pipe(
        map(candidate => this.enrichCandidateWithRelations(candidate)),
        tap(_ => console.log(`fetched candidate id=${id}`)),
        catchError(this.handleError<CandidateWithRelations>(`getCandidate id=${id}`))
      );
  }

  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate)
      .pipe(
        tap((newCandidate: Candidate) => console.log(`added candidate w/ id=${newCandidate.id}`)),
        catchError(this.handleError<Candidate>('addCandidate'))
      );
  }

  updateCandidate(candidate: Candidate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${candidate.id}`, candidate)
      .pipe(
        tap(_ => console.log(`updated candidate id=${candidate.id}`)),
        catchError(this.handleError<any>('updateCandidate'))
      );
  }

  deleteCandidate(id: number): Observable<Candidate> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Candidate>(url)
      .pipe(
        tap(_ => console.log(`deleted candidate id=${id}`)),
        catchError(this.handleError<Candidate>('deleteCandidate'))
      );
  }

  changeCandidateStatus(id: number, newStatus: string): Observable<Candidate> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Candidate>(url, { status: newStatus })
      .pipe(
        tap(_ => console.log(`updated candidate status id=${id}`)),
        catchError(this.handleError<Candidate>('changeCandidateStatus'))
      );
  }

  private enrichCandidateWithRelations(candidate: Candidate): CandidateWithRelations {
    return {
      ...candidate,
      department: undefined  // Will be populated by the in-memory service
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}