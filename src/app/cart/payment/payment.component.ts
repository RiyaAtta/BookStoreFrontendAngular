import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  constructor(private local:LocalStorageService) { }
  handler:any = null;
  total:number=this.local.retrieve("total")
  ngOnInit() {
    this.loadStripe();
  }
 
  pay(amount) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JSG1xSH4kWSmf66pVFnIUspjFa2rd6fdIvCvGF5VMqiJErzTPZyBDagYNxeqMEhK3lT0HSwlM5Jnr4VG1djvJU90048tXT4tA',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Payment',
      //description: '2 widgets',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       this.local.clear("cart")
       this.local.clear("total")
      window.document.body.appendChild(s);
    }
  }
}
