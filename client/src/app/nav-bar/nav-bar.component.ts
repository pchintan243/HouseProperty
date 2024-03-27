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
  loggedInUser: string = '';
  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  loggedIn() {
    let data = localStorage.getItem('Users');

    if (data) {
      return localStorage.getItem('isLogin');
    }
    return false;
  }

  register() {
    return localStorage.getItem('isLogin') === 'true';
  }

  onLogout() {
    localStorage.removeItem('isLogin');
    this.toastr.success('User log out successfully');
    // Timeout for toaster will be not displayed if we directly logout. It logout immediately that's why toaster will not display
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}