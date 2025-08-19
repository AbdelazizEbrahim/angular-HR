import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee, EmployeeWithRelations } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  getEmployee(id: number): Observable<EmployeeWithRelations> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        map(employee => this.enrichEmployeeWithRelations(employee)),
        tap(_ => console.log(`fetched employee id=${id}`)),
        catchError(this.handleError<EmployeeWithRelations>(`getEmployee id=${id}`))
      );
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        tap((newEmployee: Employee) => console.log(`added employee w/ id=${newEmployee.id}`)),
        catchError(this.handleError<Employee>('addEmployee'))
      );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employee.id}`, employee)
      .pipe(
        tap(_ => console.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
      );
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Employee>(url)
      .pipe(
        tap(_ => console.log(`deleted employee id=${id}`)),
        catchError(this.handleError<Employee>('deleteEmployee'))
      );
  }

  private enrichEmployeeWithRelations(employee: Employee): EmployeeWithRelations {
    // In a real app, this would fetch related data from other services
    // For in-memory, relations are handled by the in-memory service
    return {
      ...employee,
      department: undefined, // Will be populated by the in-memory service
      salary: undefined,     // Will be populated by the in-memory service
      manager: undefined,    // Will be populated by the in-memory service
      subordinates: []       // Will be populated by the in-memory service
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