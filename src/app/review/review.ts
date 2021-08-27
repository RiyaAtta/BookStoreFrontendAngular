import { Book } from "../books/book";
import { Customer } from "../customer/customer";

export class Review{
    reviewId:number;
    book:Book;
    title:string;
    customer:Customer;
    headLine:string;
    comment:string;
    rating:number;
    reviewOn:Date;
}