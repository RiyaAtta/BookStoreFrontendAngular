import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookwithimageComponent } from '../books/addbookwithimage/addbookwithimage.component';
import { AdminComponent } from './admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregistrationComponent } from './adminregistration/adminregistration.component';
import { UpdateorderComponent } from './updateorder/updateorder.component';

const routes: Routes = [{ path: 'home', component: AdminComponent },
{ path:'login',component: AdminloginComponent},
{path:'registration',component: AdminregistrationComponent},
{path:'addbook',component: AddbookwithimageComponent},
{path:'updateorder',component:UpdateorderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
