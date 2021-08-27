import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/customer";
  url:string="http://localhost:9001/bookstoreapp/customer/createcustomer";
  createCustomer(custBody: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url, custBody,{headers,responseType: 'text'});
  }
  viewAllCustomers(): Observable<Customer[]>{
    const bookUrl="http://localhost:9001/bookstoreapp/customer/viewallcustomers"
    return this.httpClient.get<Customer[]>(bookUrl).pipe(catchError(this.handleError));
  }
  deleteCustomer(id: number):Observable<String>{
    return this.httpClient.delete<String>(`${this.baseUrl}/deletecustomer/${id}`)
                      .pipe(catchError(this.handleError));
  }

  updateCustomer(cust:Customer):Observable<Customer>{
    return this.httpClient.put<Customer>(`${this.baseUrl}/updatecustomer`, cust)
    .pipe(catchError(this.handleError));
  }
  getCustomerById(id: number):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseUrl}/viewcustomer/${id}`)
                      .pipe(catchError(this.handleError));
  }
  getCustomerByEmail(email: string):Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseUrl}/viewcustomerbyemail/${email}`)
                      .pipe(catchError(this.handleError));
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

