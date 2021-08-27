import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule
  ]
})
export class ReviewModule { }
