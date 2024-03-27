import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  onLogin(loginForm: NgForm) {
    if (this.authService.authUser(loginForm.value)) {
      localStorage.setItem('isLogin', 'true');
      this.router.navigate(['/']);
      return this.toastr.success('User logged in successfully');
    }
    return this.toastr.error('Credentials are not valid');
  }
}
