import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from '../cart/cart.service';
import { Book } from './book';
import { img } from './img';
import { ViewbookComponent } from './viewbook/viewbook.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  data:Book;
items:Book[]=[];
  //items=this.cartService.getItems();
  constructor(
    private cartService: CartService
  ) { }
  ngOnInit(): void {
   // console.log(this.items);
/*    this.data=this.cartService.getDat();
   console.log(this.cartService.getData());
   this.items=this.cartService.getData(); */
   console.log(this.data);
  }
}
  
/*   

  retrieveResonse: Object;


  ngOnInit(): void {
  }

    constructor(private httpClient: HttpClient,private domSanitizer: DomSanitizer) { }
  
  
    title = 'ImageUploaderFrontEnd';
  
    public selectedFile: any;
    public event1: any;
    imgURL: any;
    receivedImageData: any;
    receivedImage: any;
    base64Data: any;
    convertedImage: any;
    image:any;
    i:any;
  
    public  onFileChanged(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
  
      // Below part is used to display the selected image
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imgURL = reader.result;
    };
  
   }
  
  
   // This part is for uploading
   onUpload() {
  
  
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  
  
    this.httpClient.post('http://localhost:9001/bookstoreapp/check/uploadss', uploadData)
    .subscribe(
                 res => {console.log(res);
                       //  this.receivedImageData = res;
                         this.base64Data = this.receivedImageData.pic;
                       // this.img= this.domSanitizer.bypassSecurityTrustUrl(this.base64Data);
                         this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                        // this.domSanitizer.bypassSecurityTrustUrl(this.base64Data);
                 err => console.log('Error Occured duringng saving: ' + err)
              );
  
  
   }
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9001/bookstoreapp/check/get/1')
      .subscribe(
        res => {
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
         // this.base64Data = this.image.picByte;
          this.receivedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  } */