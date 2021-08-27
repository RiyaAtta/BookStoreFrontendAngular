import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginService } from './login.service';
import swal from 'sweetalert2'; 
import { Customer } from '../customer/customer';
import { tap } from 'rxjs/operators';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:string;
  password:string;
  isLoggedIn: boolean = false;  
  isAdded = false;
  redirectUrl: any="/books/bookdisplay";
  //const params = new HttpParams()
  baseUrl:string="http://localhost:9001/bookstoreapp/customer";
 
  constructor(private localSt:LocalStorageService,private loginService: LoginService, private router: Router,private httpClient: HttpClient,private custService:CustomerService) { }
  userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      password: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
   
    });
  }
  onSubmit() {
    this.email = this.userForm.value.email;
    this.password = this.userForm.value.password;
    this.validate();
  }

  validate() {
    this.loginService.validateLogin(this.email,this.password)
      .subscribe(data => {
        console.log(data);
        if(data=="User Valid"){
          this.isLoggedIn = true;
          if (this.isLoggedIn) {
            this.localSt.store("usermail",this.email)
            this.custService.getCustomerByEmail(this.email)
            .subscribe(data => {
              console.log(data);
              this.localSt.store("customer",data)
            })
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
          swal.fire("Successfully Logged In")
        }
        this.isAdded = true;
      }, error => {console.log(error)
        swal.fire(error.error)})
  }
  resetUserForm() {
    this.isLoggedIn=false;
    this.userForm.reset();
  }
  logout(): void {
    this.isLoggedIn = false;
  }
}

