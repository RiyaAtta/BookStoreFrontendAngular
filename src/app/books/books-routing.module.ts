import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ReviewComponent } from '../review/review.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AddbookwithimageComponent } from './addbookwithimage/addbookwithimage.component';
import { BooksComponent } from './books.component';
import { DeletebookComponent } from './deletebook/deletebook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { ViewallbooksComponent } from './viewallbooks/viewallbooks.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { ViewbookbycategoryComponent } from './viewbookbycategory/viewbookbycategory.component';
import { ViewbookbyreviewComponent } from './viewbookbyreview/viewbookbyreview.component';

const routes: Routes = [{ path: '', component: BooksComponent },
                         { path:'addbook',component: AddbookComponent},
                        {path:'updatebook',component: UpdatebookComponent},
                      {path:'viewallbooks',component: ViewallbooksComponent},
                    {path:'deletebook',component:DeletebookComponent},
                    {path:'bookdisplay',component:UpdatebookComponent},
                  {path:'viewbook/:bookId',component: ViewbookComponent},
                  {path:'viewbookbyreview/:bookId',component: ViewbookbyreviewComponent},
                  {path:'viewbookbycategory/:categoryName',component: ViewbookbycategoryComponent},
                  {path:'addbookwithimage',component: AddbookwithimageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
