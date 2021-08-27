import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Book } from 'src/app/books/book';
import { Category } from 'src/app/books/category';
import { HeaderService } from '../header.service';
import swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/books/book-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
categories:Category[];
search:string="Search by Book Name";
  redirectUrl:any= "/home";
  constructor(private headerService:HeaderService,private localSt:LocalStorageService,private router: Router,private bookService:BookServiceService) { }

  ngOnInit(): void {
    console.log('All Books ')
    this.headerService.viewAllCategories().subscribe(data =>{  
        console.log(data);
        this.categories = data; 
    //    this.temp=data.bookId; 
    }) 
}
logout(){
  this.localSt.clear("usermail")
  this.localSt.clear("customer")
    this.localSt.clear(); 
    swal.fire("Successfully logged Out!")
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
   // window.alert("Logged Out!")
} 
viewBook(searchE:string){
  this.bookService.viewBookByName(searchE).subscribe(data=>{
    console.log(data)
  })
}
  }
  

