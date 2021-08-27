import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteframeworkModule } from './siteframework/siteframework.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ViewbookComponent } from './books/viewbook/viewbook.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './cart/payment/payment.component';
import { BooksModule } from './books/books.module';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    CartComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxWebstorageModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    SiteframeworkModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomepageComponent },
      {path:'login',component: LoginComponent},
      {path:'viewbook/:bookId',component: ViewbookComponent},
      { path: 'cart', component: CartComponent },
      {path:'payment',component:PaymentComponent}
  ])
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
