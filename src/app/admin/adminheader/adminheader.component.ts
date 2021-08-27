import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Category } from 'src/app/books/category';
import { HeaderService } from 'src/app/siteframework/header.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  categories: Category[];
  redirectUrl: any = "/home";
  public displayNav: boolean = false;
  constructor(private headerService: HeaderService, private localSt: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    console.log('All Books ')
    this.headerService.viewAllCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }
  logout() {
    this.localSt.clear("usermail")
    this.localSt.clear("admin")
    this.localSt.clear();
    swal.fire("Successfully logged Out!")
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
  }
  openNav() {
    (<HTMLInputElement>document.getElementById("mySidenav")).style.width = "250px";
    (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "250px";
  }

  closeNav() {
    (<HTMLInputElement>document.getElementById("mySidenav")).style.width = "0";
    (<HTMLInputElement>document.getElementById("main")).style.marginLeft = "0";
  }
}
