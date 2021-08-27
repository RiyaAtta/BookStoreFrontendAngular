import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-viewbookbycategory',
  templateUrl: './viewbookbycategory.component.html',
  styleUrls: ['./viewbookbycategory.component.css']
})
export class ViewbookbycategoryComponent implements OnInit {

  books:Book[];
  constructor(private bookService:BookServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bookCategoryFromRoute = String(routeParams.get('categoryName'));
    console.log('All Books ')
    this.bookService.viewBookByCategory(bookCategoryFromRoute).subscribe(data =>{  
        this.books = data; 
    });  
  }
}
