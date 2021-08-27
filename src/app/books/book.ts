import { SafeResourceUrl } from "@angular/platform-browser";
import { Category } from "./category";

export class Book {
  [x: string]: any;
    bookId:number;
    title: string;
    author: string;
    name:string;
    picByte: string;
    retrievedImage: string;
   category:Category;
    description: string;
    isbn: String;
    price: number;
    publishDate: Date;
    lastupDate: Date;
    constructor(){}
}
