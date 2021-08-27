import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { ViewallcustomerComponent } from './viewallcustomer/viewallcustomer.component';
import { AccountComponent } from './account/account.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    CustomerComponent,
    UpdatecustomerComponent,
    ViewallcustomerComponent,
    AccountComponent,
    OrderdetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule
  ]
})
export class CustomerModule { }
