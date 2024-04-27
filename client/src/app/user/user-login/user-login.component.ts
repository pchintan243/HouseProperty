import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLogin } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  onLogin(loginForm: NgForm) {
    this.authService.authUser(loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('UserName', res.userName);
        this.toastr.success("User Logged in successfully");
        this.router.navigate(['/']);
      }
    );
  }
}
