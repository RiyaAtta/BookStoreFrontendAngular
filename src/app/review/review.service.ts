import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Customer } from '../customer/customer';
import { Review } from './review';
import { ReviewDto } from './reviewdto';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/review";
  url:string="http://localhost:9001/bookstoreapp/review/addreview";
  addReview(reviewBody: any):Observable<any>{
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url,reviewBody);
  }
  viewAllReviews(): Observable<Review[]>{
    const rUrl="http://localhost:9001/bookstoreapp/review/listallreviews"
    return this.httpClient.get<Review[]>(rUrl).pipe(catchError(this.handleError));
  }
  viewReviewByBook(id: number):Observable<ReviewDto[]>{
        const params = new HttpParams()
    .set('bookId', id)
    const rUrl="http://localhost:9001/bookstoreapp/review/listallreviewsbybook"
    return this.httpClient.get<any>(`${rUrl}/?${params}`);
  }
  updateCustomer(cust:Customer):Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.baseUrl}/updatecustomer`, cust)
    .pipe(catchError(this.handleError));
  }
  getReviewByCustomer(id: number):Observable<ReviewDto>{
    const rUrl="http://localhost:9001/bookstoreapp/review/listallreviewsbycustomer"
    const params = new HttpParams()
    .set('custId', id)
    return this.httpClient.get<any>(`${rUrl}/?${params}`).pipe(catchError(this.handleError));
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