import { Component, OnInit } from '@angular/core';
import { Category } from '../books/category';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  categories:Category[];
  constructor(private headerService:HomepageService) { }

  ngOnInit(): void {
    console.log('All Books ')
    this.headerService.viewAllCategories().subscribe(data =>{  
        console.log(data);
        this.categories = data; 
    //    this.temp=data.bookId; 
    })  
}

}
