import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../books/book';
import { Category } from '../books/category';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/category";
  viewAllCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}/viewallcategories`).pipe(catchError(this.handleError));
  }
  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
