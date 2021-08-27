import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BookServiceService } from '../books/book-service.service';
import { Customer } from '../customer/customer';
import { Review } from './review';
import { ReviewService } from './review.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  temp: any;
  //review:ReviewDto=new ReviewDto();
  review:Review[];
  c:Customer;
  ratings:number;
  retrievedImage: string;
  receivedImageData: any;
  receivedImage: any;
  base64Data: any;
  convertedImage: any;
  image:any;

  constructor(private localSt:LocalStorageService,private bookService:BookServiceService,private reviewService:ReviewService,private route: ActivatedRoute) { }
  rating=3;

  ctrl = new FormControl(null, Validators.required);
  title= new FormControl(null, [Validators.required, Validators.minLength(5)]);
  headLine= new FormControl('', [Validators.required, Validators.minLength(3)]);   
  comment= new FormControl('', [Validators.required]);
  ngOnInit(): void {
      this.reviewService.viewAllReviews().subscribe(data =>{  
        console.log(data);
        this.review=data;
      })


  }


}
