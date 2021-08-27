import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';
import swal from 'sweetalert2'; 

import { SafeResourceUrl ,DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/cart/cart.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Review } from 'src/app/review/review';
import { Customer } from 'src/app/customer/customer';
import { FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { ReviewService } from 'src/app/review/review.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BookDto } from '../bookdto';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {
  book:Book;
  img:SafeResourceUrl;
  s:any;
 reader = new FileReader();
  retrievedImage: string;
  receivedImageData: any;
  receivedImage: any;
  base64Data: any;
  convertedImage: any;
  image:any;
  quantity:any;
  redirectUrl :any="/cart"
  //bookdto:Book[]=[];
  books:Book[]=[];
  temp:BookDto[]=[];
  bookdto:BookDto=new BookDto();
  bookdtos:BookDto[]=[];

 review:Review=new Review();


  constructor(private localSt:LocalStorageService,public cartService: CartService,private bookService:BookServiceService, private route: ActivatedRoute,private reviewService:ReviewService,private router: Router) { }
  ctrl = new FormControl(null, Validators.required);
 // title= new FormControl(null, [Validators.required, Validators.minLength(5)]);
  headLine= new FormControl('', [Validators.required, Validators.minLength(3)]);   
  comment= new FormControl('', [Validators.required]);
  ngOnInit(): void {
    console.log('Book Details')
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('bookId'));
    this.bookService.getBookImage(bookIdFromRoute)
    .subscribe(
      res => {
        this.receivedImageData = res;
        this.base64Data = this.receivedImageData.bytes;
       // this.base64Data = this.image.picByte;
        this.receivedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
    this.bookService.getBookById(bookIdFromRoute).subscribe(data =>{  
      this.book=data;
    })

}

public addToCart(book:Book) {
   this.quantity= (<HTMLInputElement>document.getElementById("quantity")).value;
   console.log(this.quantity)
   this.bookdto.quantity=Number(this.quantity);
   this.bookdto.book=this.book
   this.temp=this.localSt.retrieve("cart")
   if(this.temp!=null){
     this.bookdtos.push(this.bookdto)
     for(var bookdto of this.temp){
       if(JSON.stringify(bookdto.book)===JSON.stringify(this.book)){
         //skip
         console.log("Book already present,Cart Value updated!")
       }
       else{
       this.bookdtos.push(bookdto)
       }
     }
   }
   else{
    this.bookdtos.push(this.bookdto)
   }
  this.localSt.store("cart",this.bookdtos)
    swal.fire('Your product has been added to the cart!');
        this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
    
}

 addReview(){
   this.review.customer=this.localSt.retrieve("customer")
  this.review.comment=this.comment.value;
  //this.review.title=this.title.value;
  this.review.headLine=this.headLine.value;
  this.review.rating=this.ctrl.value;
  this.review.reviewOn=new Date
  this.review.book=this.book
   this.reviewService.addReview(this.review)
   .subscribe(data => {
     console.log(data);
     swal.fire("Review Added")
   }, error => {console.log(error)
    swal.fire(error.error)})
    //concat().subscribe();
   // forkJoin([one,two])
}

toggle() {
  if (this.ctrl.disabled) {
    this.ctrl.enable();
  } else {
    this.ctrl.disable();
  }
}
}
