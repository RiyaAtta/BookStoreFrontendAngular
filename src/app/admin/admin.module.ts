import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminregistrationComponent } from './adminregistration/adminregistration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { UpdateorderComponent } from './updateorder/updateorder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AdminComponent,
    AdminloginComponent,
    AdminregistrationComponent,
    AdminheaderComponent,
    UpdateorderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    AdminheaderComponent // <--- Enable using the component in other modules
  ]
})
export class AdminModule { }
