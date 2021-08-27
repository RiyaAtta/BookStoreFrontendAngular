import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AdminService } from '../admin.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  email: string;
  password: string;
  isLoggedIn: boolean = false;
  isAdded = false;
  redirectUrl: any = "/admin/home";

  constructor(private localSt: LocalStorageService, private loginService: AdminService, private router: Router) { }
  userForm: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),

    });
  }
  onSubmit() {
    this.email = this.userForm.value.email;
    this.password = this.userForm.value.password;
    this.validate();
  }

  validate() {
    this.loginService.validateLogin(this.email, this.password)
      .subscribe(data => {
        console.log(data);
        if (data == "User Valid") {
          this.isLoggedIn = true;
          if (this.isLoggedIn) {
            this.localSt.store("usermail", this.email)
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
          swal.fire("Successfully Logged In")
        }
        this.isAdded = true;
      }, error => {
        console.log(error)
        swal.fire(error.error)
      })
  }
  resetUserForm() {
    this.isLoggedIn = false;
    this.userForm.reset();
  }
  logout(): void {
    this.isLoggedIn = false;
  }
}
