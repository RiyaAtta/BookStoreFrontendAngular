import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-viewallcustomer',
  templateUrl: './viewallcustomer.component.html',
  styleUrls: ['./viewallcustomer.component.css']
})
export class ViewallcustomerComponent implements OnInit {

  constructor(private custService:CustomerService) { }
  customers:Customer[];
  @Input() messageChild:string;
  ngOnInit(): void {
      console.log('All Books ')
      this.custService.viewAllCustomers().subscribe(data =>{  
          console.log(data);
          this.customers = data; 
          console.log(this.messageChild)
        })  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.messageChild && changes.messageChild.currentValue){
      let messageChild = changes.messageChild.currentValue;
      //use currentHero
  }
}
}
