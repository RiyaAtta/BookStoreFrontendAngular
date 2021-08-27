import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../books/book';
import { BookDto } from '../books/bookdto';
import { BookDtoj } from '../books/bookdtoj';
import { ViewbookComponent } from '../books/viewbook/viewbook.component';
import { Order } from './order';
import swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})

export class CartService {
  b:BookDtoj;
  temp:BookDto[]
  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/orders";
  //url:string="http://localhost:9001/bookstoreapp/orders/addorder/?${params}";
  placeOrder(bookdtos: BookDto[],phoneNumber:string,address:string,name:string,email:string):Observable<any>{
    const params = new HttpParams()
    .set('address', address)
    .set('email', email)
    .set('name', name)
    .set('phone', phoneNumber)
    //this.temp=bookdtos
    console.log(bookdtos)
    console.log(params)
    
    // this.b=new BookDtoj()
    // this.b.b=bookdtos
   //  console.log(this.b)
    const url:string="http://localhost:9001/bookstoreapp/orders/addorder";
    //return this.httpClient.get<any>(`${rUrl}/?${params}`).pipe(catchError(this.handleError));
    return this.httpClient.post(`${url}?${params}`,bookdtos).pipe(catchError(this.handleError));
  }
  getOrderByEmail(email: string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/vieworderforcustomerbyemail/${email}`)
                      .pipe(catchError(this.handleError));
  }
  getOrderById(id:number):Observable<Order>{
    return this.httpClient.get<Order>(`${this.baseUrl}/vieworderforcustomer/${id}`)
                      .pipe(catchError(this.handleError));
  }
  cancelOrder(id:number):Observable<String>{
    return this.httpClient.get<String>(`${this.baseUrl}/cancelorder/${id}`)
    .pipe(catchError(this.handleError));
  }
  viewallOrders():Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/vieworderforadmin`)
    .pipe(catchError(this.handleError));
  }
  updateOrder(status:string,id:number):Observable<any>{
    const uurl:string="http://localhost:9001/bookstoreapp/orders/updateOrder"
    return this.httpClient.get<any>(`${uurl}/${status}/${id}`)
    .pipe(catchError(this.handleError));
  }
  getBookImage(id: number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl}/get/${id}`)
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
      if(`${httpError.status}`=="200"){
        location.reload()
      }
  }
  // Return an observable with a user-facing error message.
  return throwError('Something bad happened; please try again later.');
}
}

