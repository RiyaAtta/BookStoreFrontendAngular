import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { CartService } from 'src/app/cart/cart.service';
import { Order } from 'src/app/cart/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.css'],
  providers: [DatePipe]
})
export class UpdateorderComponent implements OnInit {
  orders: Order[];  
  order: Order;
  deleteMsg:string = "";
  @ViewChild('closebutton') closebutton;
  constructor(private localSt:LocalStorageService,private orderService: CartService, private datePipe: DatePipe){}
  currentDate = new Date();

  ngOnInit(): void {
      console.log('All Orders ')
      this.orderService.viewallOrders().subscribe(data =>{  
          console.log(data);
          console.log(this.localSt.retrieve("usermail"))
          this.orders = data;  
      })  
  }

  onClickDelete(id: number){
    this.orderService.cancelOrder(id)
    .subscribe(responseData=> {
        // get user records after deletion
        this.orderService.viewallOrders().subscribe(data =>{  
          console.log(data);
          this.orders = data;  
      })  
    }, error=>{
        this.deleteMsg = error
    });
  }

  userUpdateForm = new FormGroup({
    id: new FormControl({value:'', disabled:true}),
    recipientName: new FormControl({value:'', disabled:true}),
    customerEmail: new FormControl({value:'', disabled:true}),
    status: new FormControl('', [Validators.required]),
    recipientPhone: new FormControl({value:'', disabled:true}),
    totalPrice: new FormControl({value:'', disabled:true}),
    shippingAddress: new FormControl({value:'', disabled:true}),
    dateCreated: new FormControl('')
  });

  onClickUpdate(orderId: number){
    // Get user data for the selected user
    this.orderService.getOrderById(orderId)
    .subscribe(responseData=> {
      this.order = responseData;
      console.log(this.order);
      console.log(this.order.id)
      this.prepareUpdateForm();
    });
  }

  // Use setValue() method to set the values
  // for selected user record
  
  prepareUpdateForm(){
    this.userUpdateForm.setValue({
    id: this.order.id,
    customerEmail: this.order.customerEmail,
    recipientName:this.order.recipientName,
    recipientPhone:this.order.recipientName,
    status: this.order.status,
    totalPrice: this.order.totalPrice,
    shippingAddress: this.order.shippingAddress,
    dateCreated: this.datePipe.transform(this.order.dateCreated, 'yyyy-MM-dd')
    });
  }

  onSubmit(){
      let order = new Order();
      // To get data from a disabled input element
      order.id = this.userUpdateForm.getRawValue().id;
      order.status =this.userUpdateForm.value.status;
      this.orderService.updateOrder(order.status,order.id).subscribe(responseDate=>{
        // to close the modal
        this.closebutton.nativeElement.click();
        // Get the updated list
        this.orderService.viewallOrders().subscribe(data =>{  
          //console.log(data);
          this.orders = data; 
          Swal.fire("Order Updated")
        })  
      }, 
      error=> console.log(error));
  }
}
