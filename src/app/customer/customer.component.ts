import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Address } from './address';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [DatePipe]
})
export class CustomerComponent implements OnInit {
  customer: Customer = new Customer();
  message:string="Hi from parent"
  address: Address = new Address();
  isAdded = false;
  redirectUrl: any="/home";
  constructor(private customerService: CustomerService, private datePipe: DatePipe,private localSt:LocalStorageService,private router: Router) { }
  currentDate = new Date();
  userForm: FormGroup;
  isRegistered:boolean;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      password: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern("^[7-9][0-9]{9}$")]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required])
      // country: new FormControl('', [Validators.required]),
      // city:new FormControl('', [Validators.required]),
      //pincode:new FormControl('', [Validators.required]),
      // publishDate: new FormControl(this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'))
    });
  }
  onSubmit() {
    this.customer.fullName = this.userForm.value.fullName;
    this.customer.email = this.userForm.value.email;
    this.customer.password = this.userForm.value.password;
    this.address.address = this.userForm.value.address;
    this.customer.mobileNumber = this.userForm.value.mobileNumber;
    this.customer.registerOn=  new Date
    this.address.city = this.userForm.value.city;
    this.address.country= this.userForm.value.country;
    this.address.pincode=this.userForm.value.pincode;
    this.customer.address=this.address;
    //this.book.isbn = this.userForm.value.isbn;
    //this.book.lastupDate = this.userForm.value.startDate;
    this.save();
  }

  save() {
    this.customerService.createCustomer(this.customer)
      .subscribe(data => {
        console.log(data);
        if(data=="Account registered!"){
          this.isRegistered = true;
          if (this.isRegistered) {
            this.localSt.store("usermail",this.customer.email)
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }
          swal.fire(data+"Login now")
       //   window.alert("Account registered!");
        }
        this.isAdded = true;
      }, error => {console.log(error)
      //window.alert(error)
      swal.fire(error.error)
    })
  }
  resetUserForm() {
    this.isAdded = false;
    this.userForm.reset();
  }
}

