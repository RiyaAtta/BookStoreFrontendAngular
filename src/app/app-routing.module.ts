import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) }, { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }, { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
