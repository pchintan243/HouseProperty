import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

	registrationForm!: FormGroup;
	user!: User;
	isSubmit: boolean = false;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.registrationForm = new FormGroup<any>({
			userName: new FormControl('', Validators.required),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required),
			confirmPassword: new FormControl(null, Validators.required),
			mobile: new FormControl('', [Validators.required, Validators.maxLength(10)])
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
	get mobile() {
		return this.registrationForm.get('mobile') as FormControl;
	}

	onSubmit() {
		if (this.registrationForm.valid) {
			console.log(this.registrationForm);
			this.userService.addUser(this.userData());
			this.registrationForm.reset();
			this.isSubmit = false;
		}
	}

	userData(): User {
		return this.user = {
			userName: this.userName.value,
			email: this.email.value,
			password: this.password.value,
			mobile: this.mobile.value
		}
	}
}
