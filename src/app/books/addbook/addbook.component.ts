import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
  providers: [DatePipe]
})
export class AddbookComponent implements OnInit {
  book: Book = new Book();
  isAdded = false;

  constructor(private bookService:BookServiceService,private datePipe: DatePipe) { }
  currentDate = new Date();
  userForm: FormGroup; 
  ngOnInit(): void {
    this.userForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),    
      author: new FormControl('', [Validators.required]),  
      price: new FormControl('', [Validators.required]),  
      isbn: new FormControl('', [Validators.required]),
      categoryName: new FormControl('', [Validators.required]),
      publishDate: new FormControl(this.datePipe.transform(this.currentDate, 'yyyy-MM-dd'))
    });
  }
  onSubmit(){
    this.book.title= this.userForm.value.title;
    this.book.author= this.userForm.value.author;
    this.book.price= this.userForm.value.price;
    this.book.description= this.userForm.value.description;
    this.book.category=this.userForm.value.categoryName;
    this.book.publishDate= this.userForm.value.publishDate,
    this.book.isbn = this.userForm.value.isbn;
    //this.book.lastupDate = this.userForm.value.startDate;
    this.save();
  }

  save(){
    this.bookService.createBook(this.book)
                    .subscribe(book=> {console.log(book);
                      this.isAdded = true;
                    }, error=>console.log(error))
  }
  resetUserForm(){
    this.isAdded = false;
    this.userForm.reset();
  }
}


