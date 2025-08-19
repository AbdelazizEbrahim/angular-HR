import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Company } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'api/company';

  constructor(private http: HttpClient) { }

  getCompany(): Observable<Company> {
    return this.http.get<Company>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched company info')),
        catchError(this.handleError<Company>('getCompany'))
      );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(this.apiUrl, company)
      .pipe(
        tap(_ => console.log('updated company info')),
        catchError(this.handleError<Company>('updateCompany'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}