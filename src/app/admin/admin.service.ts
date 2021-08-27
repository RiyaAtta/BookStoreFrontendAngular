import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }
  baseUrl:string="http://localhost:9001/bookstoreapp/admin";
  url:string="http://localhost:9001/bookstoreapp/admin/createadmin";
  createAdmin(adminBody: any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url, adminBody,{headers,responseType: 'text'});
  }
  validateLogin(email:string,password:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
/*     const params = new HttpParams()
    .set('email', email)
    .set('password',password); */
    //console.log(params)
   //return this.httpClient.get<any>(`${this.baseUrl}/{email}/{password}?${params}`);
   return this.httpClient.get(`${this.baseUrl}/adminlogin/${email}/${password}`,{headers,responseType: 'text'});
                     // .pipe(catchError(this.handleError));
  }
}