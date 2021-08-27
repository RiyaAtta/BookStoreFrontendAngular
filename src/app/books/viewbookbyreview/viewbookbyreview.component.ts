import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Customer } from 'src/app/customer/customer';
import { ReviewService } from 'src/app/review/review.service';
import { ReviewDto } from 'src/app/review/reviewdto';
import { BookServiceService } from '../book-service.service';
@Component({
  selector: 'app-viewbookbyreview',
  templateUrl: './viewbookbyreview.component.html',
  styleUrls: ['./viewbookbyreview.component.css']
})
export class ViewbookbyreviewComponent implements OnInit {
  temp: any;
  review:ReviewDto[];
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
      const routeParams = this.route.snapshot.paramMap;
      const bookIdFromRoute = Number(routeParams.get('bookId'));
      this.reviewService.viewReviewByBook(bookIdFromRoute).subscribe(data =>{  
        console.log(data);
        this.review=data;
      })


  }


}
