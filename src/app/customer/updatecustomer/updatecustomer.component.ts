import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../address';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {
  customers: Customer[];  
  cust: Customer;
  deleteMsg:string = "";
  @ViewChild('closebutton') closebutton;
  constructor(private custService: CustomerService){}

  ngOnInit(): void {
      console.log('All Customers ')
      this.custService.viewAllCustomers().subscribe(data =>{  
          console.log(data);
          this.customers = data;  
      })  
  }

  onClickDelete(customerId: number){
    this.custService.deleteCustomer(customerId)
    .subscribe(responseData=> {
        this.deleteMsg = 'Successfully deleted';
        // get user records after deletion
        this.custService.viewAllCustomers().subscribe(data =>{  
          console.log(data);
          this.customers = data;  
      })  
    }, error=>{
        this.deleteMsg = error
    });
  }

  userUpdateForm = new FormGroup({
    customerId: new FormControl({value:'', disabled:true}),
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    password: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern("^[7-9][0-9]{9}$")]),
    address: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required])
  });

  onClickUpdate(customerId: number){
    // Get user data for the selected user
    this.custService.getCustomerById(customerId)
    .subscribe(responseData=> {
      this.cust = responseData;
      console.log(this.cust);
      this.prepareUpdateForm();
    });
  }

  // Use setValue() method to set the values
  // for selected user record
  
  prepareUpdateForm(){
    this.userUpdateForm.setValue({
      customerId:this.cust.customerId,
      fullName:this.cust.fullName,
      email:this.cust.email, 
      password:this.cust.password, 
      address:this.cust.address.address,
      mobileNumber:this.cust.mobileNumber,
      city:this.cust.address.city,
      country:this.cust.address.country,
      pincode:this.cust.address.pincode
    });
  }

  onSubmit(){
      let customer = new Customer();
      let address=new Address();
      // To get data from a disabled input element
      customer.customerId= this.userUpdateForm.getRawValue().customerId;
      customer.fullName = this.userUpdateForm.value.fullName;
      customer.email = this.userUpdateForm.value.email;
      customer.password = this.userUpdateForm.value.password;
      //customer.address.address = this.userUpdateForm.value.address;
      customer.mobileNumber = this.userUpdateForm.value.mobileNumber;
      address.address=this.userUpdateForm.value.address;
      address.city = this.userUpdateForm.value.city;
      address.country= this.userUpdateForm.value.country;
      address.pincode=this.userUpdateForm.value.pincode;
      customer.address=address;
      this.custService.updateCustomer(customer).subscribe(responseDate=>{
        // to close the modal
        this.closebutton.nativeElement.click();
        // Get the updated list
        this.custService.viewAllCustomers().subscribe(data =>{  
          //console.log(data);
          this.customers = data;  
        })  
      }, 
      error=> console.log(error));
  }
}
