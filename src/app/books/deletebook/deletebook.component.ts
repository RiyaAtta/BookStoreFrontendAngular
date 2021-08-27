import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-deletebook',
  templateUrl: './deletebook.component.html',
  styleUrls: ['./deletebook.component.css']
})

export class DeletebookComponent implements OnInit {
  userDeleteForm: FormGroup;
  errorMsg =null;
  constructor(private bookService: BookServiceService){}
  ngOnInit(): void {
    
    this.userDeleteForm = new FormGroup({
      bookId: new FormControl('', Validators.required),
    });
  }
  onSubmit(){
    this.errorMsg = null;
    this.bookService.deleteBook(+this.userDeleteForm.value.bookId)
                    .subscribe(book=> alert("Book Deleted"), error=>{
                      this.errorMsg = error
                    });
  }

}
