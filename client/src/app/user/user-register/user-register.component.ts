import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForRegister } from 'src/app/model/user';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

	registrationForm!: FormGroup;
	user!: UserForRegister;
	isSubmit: boolean = false;

	constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

	ngOnInit(): void {
		this.registrationForm = new FormGroup<any>({
			userName: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required),
			confirmPassword: new FormControl(null, Validators.required),
			phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)])
		}, this.passwordMatchingValidator);
	}

	passwordMatchingValidator(fg: AbstractControl): ValidationErrors | null {
		return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notMatched: true };
	}

	get userName() {
		return this.registrationForm.get('userName') as FormControl;
	}
	get email() {
		return this.registrationForm.get('email') as FormControl;
	}
	get password() {
		return this.registrationForm.get('password') as FormControl;
	}
	get confirmPassword() {
		return this.registrationForm.get('confirmPassword') as FormControl;
	}
	get phoneNumber() {
		return this.registrationForm.get('phoneNumber') as FormControl;
	}

	onSubmit() {
		if (this.registrationForm.valid) {
			this.authService.registerUser(this.userData()).subscribe((res) => {
				this.registrationForm.reset();
				this.isSubmit = false;
				this.toastr.success("User Registered successfully");
				this.router.navigate(['/api/account/login']);
			});
		}
	}

	userData(): UserForRegister {
		return this.user = {
			userName: this.userName.value,
			email: this.email.value,
			password: this.password.value,
			phoneNumber: this.phoneNumber.value
		}
	}
}
