import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Book } from '../books/book';
import { BookDto } from '../books/bookdto';
import { Customer } from '../customer/customer';
import { CartService } from './cart.service';
import { Order } from './order';
import swal from 'sweetalert2'; 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  temp:string;
  bookdtos:BookDto[];
  customername:string;
  total:number=0;
  q:any
  p:any
  t:string
  redirectUrl:any="/payment"
 // orders:Order;
 recipentName:string;
 address:string;
 phoneNumber:string;
 @ViewChild('closebutton') closebutton;
  constructor(private local:LocalStorageService,private cartService:CartService,private router: Router
  ) { }
  ngOnInit(): void {
   // console.log(this.items);
  //console.log(this.local.retrieve("book"))
  this.customername=this.local.retrieve("customer").fullName
  this.bookdtos=this.local.retrieve("cart")
  console.log(this.bookdtos)
  for(var each of this.bookdtos){
    this.q=each.quantity
    this.p=each.book.price
    this.total+=this.q*this.p
  }
 // this.local.store("total",this.total)
  }
  removeItem(obj: Book){
    this.bookdtos = this.bookdtos.filter(item => item.book !== obj);
    this.local.store("cart",this.bookdtos)
    location.reload();
 }
  changequantity(quan:number,book:Book){
    
    for(var each of this.bookdtos){
      if(book===each.book){
        each.quantity=quan;
      }
    }
  }

  userUpdateForm = new FormGroup({
    RecipentName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    Address: new FormControl('', Validators.required),
  });

  onClickUpdate(){
    // Get user data for the selected user
      this.prepareUpdateForm();
    }
      
  prepareUpdateForm(){
      //this.orders.RecipentName=this.userUpdateForm.RecipentName,
      
  }
  onSubmit(){
    this.recipentName=this.userUpdateForm.value.RecipentName
    this.address=this.userUpdateForm.value.Address;
    this.phoneNumber=this.userUpdateForm.value.PhoneNumber;
    console.log(this.recipentName)
    this.t=this.local.retrieve("usermail")
    //this.cartService.placeOrder(this.bookdtos,this.phoneNumber,this.address,this.recipentName)
    this.cartService.placeOrder(this.bookdtos,this.phoneNumber,this.address,this.recipentName,this.t)
    .subscribe(data=>{
      console.log(data)
    }, error => console.log(error))
    this.local.clear("cart")
    swal.fire("Details Entered!")
    this.local.store("total",this.total)
   // this.router.navigate([this.redirectUrl]);
   // this.redirectUrl = null;

}
  }

  // Use setValue() method to set the values
  // for selected user record
  

