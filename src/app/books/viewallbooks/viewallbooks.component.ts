import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-viewallbooks',
  templateUrl: './viewallbooks.component.html',
  styleUrls: ['./viewallbooks.component.css'],
  providers: [DatePipe]
})
export class ViewallbooksComponent implements OnInit {
  books: Book[];  
  book: Book;
  deleteMsg:string = "";
  @ViewChild('closebutton') closebutton;
  constructor(private localSt:LocalStorageService,private bookService: BookServiceService, private datePipe: DatePipe){}
  currentDate = new Date();

  ngOnInit(): void {
      console.log('All Books ')
      this.bookService.viewAllBook().subscribe(data =>{  
          console.log(data);
          console.log(this.localSt.retrieve("usermail"))
          this.books = data;  
      })  
  }

  onClickDelete(bookId: number){
    this.bookService.deleteBook(bookId)
    .subscribe(responseData=> {
        this.deleteMsg = 'Successfully deleted';
        // get user records after deletion
        this.bookService.viewAllBook().subscribe(data =>{  
          console.log(data);
          this.books = data;  
      })  
    }, error=>{
        this.deleteMsg = error
    });
  }

  userUpdateForm = new FormGroup({
    bookId: new FormControl({value:'', disabled:true}),
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),    
    author: new FormControl('', [Validators.required]),  
    price: new FormControl('', [Validators.required]),  
    categoryName: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    publishDate: new FormControl('')
  });

  onClickUpdate(bookId: number){
    // Get user data for the selected user
    this.bookService.getBookById(bookId)
    .subscribe(responseData=> {
      this.book = responseData;
      console.log(this.book);
      this.prepareUpdateForm();
    });
  }

  // Use setValue() method to set the values
  // for selected user record
  
  prepareUpdateForm(){
    this.userUpdateForm.setValue({
      bookId:this.book.bookId,
      title:this.book.title,
      author:this.book.author,
      price:this.book.price,
      description: this.book.description,
      categoryName:this.book.category.categoryName,
      publishDate:this.datePipe.transform(this.book.publishDate, 'yyyy-MM-dd'),
      isbn :this.book.isbn
    });
  }

  onSubmit(){
      let book = new Book();
      // To get data from a disabled input element
      book.bookId = this.userUpdateForm.getRawValue().bookId;
      book.title= this.userUpdateForm.value.title;
      book.author= this.userUpdateForm.value.author;
      book.price= this.userUpdateForm.value.price;
      book.description=this.userUpdateForm.value.description;
      book.publishDate=this.userUpdateForm.value.publishDate;
      book.category=this.userUpdateForm.value.categoryName;
      book.isbn =this.userUpdateForm.value.isbn;
      //console.log("USER for update"+ user.userId);
      this.bookService.updateBook(book).subscribe(responseDate=>{
        // to close the modal
        this.closebutton.nativeElement.click();
        // Get the updated list
        this.bookService.viewAllBook().subscribe(data =>{  
          //console.log(data);
          this.books = data;  
        })  
      }, 
      error=> console.log(error));
  }
}
