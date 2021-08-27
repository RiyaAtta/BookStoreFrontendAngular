import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CustomerComponent } from './customer.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { ViewallcustomerComponent } from './viewallcustomer/viewallcustomer.component';

const routes: Routes = [{ path: '', component: CustomerComponent },
{ path: 'updatecustomer', component: UpdatecustomerComponent },
{ path: 'viewallcustomer', component: ViewallcustomerComponent },
{path:'account',component:AccountComponent},
{path:'orderdetails',component:OrderdetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
