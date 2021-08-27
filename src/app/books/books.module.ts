import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { AddbookComponent } from './addbook/addbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { ViewallbooksComponent } from './viewallbooks/viewallbooks.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DeletebookComponent } from './deletebook/deletebook.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { AddbookwithimageComponent } from './addbookwithimage/addbookwithimage.component';
import { ViewbookbycategoryComponent } from './viewbookbycategory/viewbookbycategory.component';
import { CartService } from '../cart/cart.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewbookbyreviewComponent } from './viewbookbyreview/viewbookbyreview.component';
import { AdminheaderComponent } from '../admin/adminheader/adminheader.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    BooksComponent,
    AddbookComponent,
    UpdatebookComponent,
    ViewallbooksComponent,
    DeletebookComponent,
    ViewbookComponent,
    AddbookwithimageComponent,
    ViewbookbycategoryComponent,
    ViewbookbyreviewComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminModule
  ],
  exports: [
    UpdatebookComponent,
    ViewbookComponent,
    ViewallbooksComponent// <--- Enable using the component in other modules
  ],
  providers:[CartService]
})
export class BooksModule { }
