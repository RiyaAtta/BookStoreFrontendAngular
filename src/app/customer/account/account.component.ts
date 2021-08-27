import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CartService } from 'src/app/cart/cart.service';
import { Order } from 'src/app/cart/order';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account:Customer;
  constructor(private custService:CustomerService,private local:LocalStorageService) { }

  ngOnInit(): void {
    this.custService.getCustomerByEmail(this.local.retrieve("usermail")).subscribe(data=>{
      console.log(data)
      this.account=data;
    })
  }

}
