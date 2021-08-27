import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { CartService } from 'src/app/cart/cart.service';
import { Order } from 'src/app/cart/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  orders:Order[];
  constructor(private cart:CartService,private local:LocalStorageService) { }

  ngOnInit(): void {
    this.cart.getOrderByEmail(this.local.retrieve("usermail")).subscribe(data=>{
      console.log(data)
      this.orders=data;
    })
  }
  delete(id:number){
    this.cart.cancelOrder(id).subscribe(
      data=>{
        Swal.fire("Order Deleted")
        console.log(data)
      }
    )

  }

}
