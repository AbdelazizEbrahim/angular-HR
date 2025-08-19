import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Department, DepartmentWithRelations } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'api/departments';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched departments')),
        catchError(this.handleError<Department[]>('getDepartments', []))
      );
  }

  getDepartment(id: number): Observable<DepartmentWithRelations> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Department>(url)
      .pipe(
        map(department => this.enrichDepartmentWithRelations(department)),
        tap(_ => console.log(`fetched department id=${id}`)),
        catchError(this.handleError<DepartmentWithRelations>(`getDepartment id=${id}`))
      );
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department)
      .pipe(
        tap((newDept: Department) => console.log(`added department w/ id=${newDept.id}`)),
        catchError(this.handleError<Department>('addDepartment'))
      );
  }

  updateDepartment(department: Department): Observable<any> {
    return this.http.put(`${this.apiUrl}/${department.id}`, department)
      .pipe(
        tap(_ => console.log(`updated department id=${department.id}`)),
        catchError(this.handleError<any>('updateDepartment'))
      );
  }

  deleteDepartment(id: number): Observable<Department> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Department>(url)
      .pipe(
        tap(_ => console.log(`deleted department id=${id}`)),
        catchError(this.handleError<Department>('deleteDepartment'))
      );
  }

  private enrichDepartmentWithRelations(department: Department): DepartmentWithRelations {
    return {
      ...department,
      head: undefined,    // Will be populated by the in-memory service
      employees: []       // Will be populated by the in-memory service
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