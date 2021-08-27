import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-addbookwithimage',
  templateUrl: './addbookwithimage.component.html',
  styleUrls: ['./addbookwithimage.component.css'],
  providers: [DatePipe]
})
export class AddbookwithimageComponent implements OnInit {
  book: Book = new Book();
  isAdded = false;
  constructor(private bookService:BookServiceService,private datePipe: DatePipe,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  currentDate = new Date();
  userForm: FormGroup; 
  private selectedFile:any;
  imgURL: any;

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
  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

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
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;
    this.httpClient.post('http://localhost:9001/bookstoreapp/book/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
    this.bookService.createBook(this.book)
                    .subscribe(book=> {console.log(book);
                      this.isAdded = true;
                    }, error=>console.log(error))
                    console.log('Image uploaded successfully');
                  } else {
                    console.log('Image not uploaded successfully');
                  }
                }
                );
              }
  resetUserForm(){
    this.isAdded = false;
    this.userForm.reset();
  }
}
