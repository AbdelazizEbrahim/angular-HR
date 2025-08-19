import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Salary, SalaryWithRelations } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private apiUrl = 'api/salaries';

  constructor(private http: HttpClient) { }

  getSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched salaries')),
        catchError(this.handleError<Salary[]>('getSalaries', []))
      );
  }

  getSalary(id: number): Observable<SalaryWithRelations> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Salary>(url)
      .pipe(
        map(salary => this.enrichSalaryWithRelations(salary)),
        tap(_ => console.log(`fetched salary id=${id}`)),
        catchError(this.handleError<SalaryWithRelations>(`getSalary id=${id}`))
      );
  }

  createSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(this.apiUrl, salary)
      .pipe(
        tap((newSalary: Salary) => console.log(`added salary w/ id=${newSalary.id}`)),
        catchError(this.handleError<Salary>('addSalary'))
      );
  }

  updateSalary(salary: Salary): Observable<any> {
    return this.http.put(`${this.apiUrl}/${salary.id}`, salary)
      .pipe(
        tap(_ => console.log(`updated salary id=${salary.id}`)),
        catchError(this.handleError<any>('updateSalary'))
      );
  }

  deleteSalary(id: number): Observable<Salary> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Salary>(url)
      .pipe(
        tap(_ => console.log(`deleted salary id=${id}`)),
        catchError(this.handleError<Salary>('deleteSalary'))
      );
  }

  private enrichSalaryWithRelations(salary: Salary): SalaryWithRelations {
    return {
      ...salary,
      employee: undefined  // Will be populated by the in-memory service
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