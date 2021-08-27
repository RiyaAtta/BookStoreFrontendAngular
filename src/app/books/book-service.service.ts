import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './book';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/book";
  url:string="http://localhost:9001/bookstoreapp/book/addbook";
  createBook(bookBody: any):Observable<any>{
    return this.httpClient.post(this.url, bookBody).pipe(catchError(this.handleError));
  }
  viewAllBook(): Observable<Book[]>{
    const bookUrl="http://localhost:9001/bookstoreapp/book/getallbooks"
    return this.httpClient.get<Book[]>(bookUrl).pipe(catchError(this.handleError));
  }
  deleteBook(id: number):Observable<String>{
    return this.httpClient.delete<String>(`${this.baseUrl}/deletebook/${id}`)
                      .pipe(catchError(this.handleError));
  }
  viewBookByCategory(categoryName: string):Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.baseUrl}/showbookbycategory/${categoryName}`).pipe(catchError(this.handleError));
  }
  viewBookByName(name:string):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/viewbookbyname/${name}`)
    .pipe(catchError(this.handleError));
  }

  updateBook(book:Book):Observable<Book>{
    return this.httpClient.put<Book>(`${this.baseUrl}/updatebook`, book)
    .pipe(catchError(this.handleError));
  }
  getBookById(id: number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl}/searchbookbyid/${id}`)
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
  }
  // Return an observable with a user-facing error message.
  return throwError('Something bad happened; please try again later.');
}
}
