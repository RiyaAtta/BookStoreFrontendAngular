import { BookDto } from "../books/bookdto";
import { OrderBook } from "./orderBook";

export class Order{
    id:number;
    customerEmail:string;
    dateCreated:Date;
    orderBooks:OrderBook[];
    recipientName:string;
    recipientPhone:string;
    shippingAddress:string;
    status:string;
    totalPrice:number;
    numberOfBooks:number;
    constructor(){}
}