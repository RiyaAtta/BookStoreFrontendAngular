import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from './login';
import swal from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/customer/login";
  validateLogin(email:string,password:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
   return this.httpClient.get(`${this.baseUrl}/${email}/${password}`,{headers,responseType: 'text'});
  }
}
