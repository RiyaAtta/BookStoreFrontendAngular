import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css'],
  providers: [DatePipe]
})
export class UpdatebookComponent implements OnInit {

  books: Book[];  
  book: Book;
  temp:Book;
  successMsg: Book;
  constructor(private localSt:LocalStorageService,public cartService:CartService,private bookService: BookServiceService, private datePipe: DatePipe){}
  currentDate = new Date();
  data:Book;
  ngOnInit(): void {
      console.log('All Books ')
      this.bookService.viewAllBook().subscribe(data =>{  
          console.log(data);
          this.books = data; 
          console.log(this.localSt.retrieve("usermail"))
          this.localSt.store("book",data)
        })  
  }

}
