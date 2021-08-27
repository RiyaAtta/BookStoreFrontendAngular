import { Address } from "./address";

export class Customer{
    customerId:number;
    email:string;
    fullName:string;
    password:string;
    address:Address;
    mobileNumber:string;
    registerOn:Date;
    constructor(){}
}