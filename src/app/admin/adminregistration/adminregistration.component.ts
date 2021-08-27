import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-adminregistration',
  templateUrl: './adminregistration.component.html',
  styleUrls: ['./adminregistration.component.css']
})
export class AdminregistrationComponent implements OnInit {
  admin:Admin=new Admin();
  isAdded = false;
  redirectUrl: any="/admin/login";
  constructor(private adminService:AdminService,private router: Router,private localSt:LocalStorageService) { }
  userForm: FormGroup;
  isRegistered:boolean;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      password: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    });
  }
  onSubmit() {
    this.admin.email = this.userForm.value.email;
    this.admin.password = this.userForm.value.password;
    //this.book.isbn = this.userForm.value.isbn;
    //this.book.lastupDate = this.userForm.value.startDate;
    this.save();
  }

  save() {
    this.adminService.createAdmin(this.admin)
      .subscribe(data => {
        console.log(data);
        if(data=="admin "+this.admin.email+" is created"){
          this.isRegistered = true;
          if (this.isRegistered) {
            this.localSt.store("usermail",this.admin.email)
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
          swal.fire(data+"Admin Logged In")
        }
        this.isAdded = true;
      }, error => {console.log(error)
      swal.fire(error.error)
    })
  }
  resetUserForm() {
    this.isAdded = false;
    this.userForm.reset();
  }
}
