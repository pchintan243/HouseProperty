import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogin: boolean = false;
  userName?: string = '';
  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  loggedIn() {
    let data = localStorage.getItem('Token');
    this.userName = localStorage.getItem('UserName') as string;

    if (localStorage.getItem('Token')) {  
      return true;
    }
    return false;
  }

  register() {
    return localStorage.getItem('Token');
  }

  onLogout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserName');
    this.toastr.success('User log out successfully');
    // Timeout for toaster will be not displayed if we directly logout. It logout immediately that's why toaster will not display
    setTimeout(() => {
      this.router.navigate(['/api/account/login']);
    }, 1000);
    return false;
  }
}