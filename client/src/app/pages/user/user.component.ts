import { Component } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { json } from "express";
import { Toast, ToastrService } from "ngx-toastr";
import { EMAIL_PATTERN, NUMBERS_PATTERN } from "src/app/@auth/constants";
import { User } from "src/app/core/models/classes/User";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.scss"],
})
export class UserComponent {
	userForm = new FormGroup({
		id: new FormControl(""),
		role: new FormControl(""),
		userName: new FormControl(""),
		email: new FormControl(""),
		Phones: new FormControl(""),
	});
	id: number = -1;

	get userName() {
		return this.userForm?.get("userName");
	}
	get email() {
		return this.userForm?.get("email");
	}
	get phone() {
		return this.userForm?.get("phone");
	}

	constructor(
		private auth: AuthenticationService,
		private userService: UserService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private router: Router
	) {
		var token = this.auth.getInfoToken();
		var data = Object.values(token);
		this.id = data[0];
		this.initUserForm();
		this.loadUser();
	}

	initUserForm() {
		this.userForm = this.fb.group({
			id: this.fb.control(""),
			role: this.fb.control(""),
			userName: this.fb.control("", [
				Validators.minLength(3),
				Validators.maxLength(20),
			]),
			Phones: this.fb.control("", [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
				Validators.pattern(NUMBERS_PATTERN),
			]),
			email: this.fb.control("", [
				Validators.required,
				Validators.pattern(EMAIL_PATTERN),
			]),
		});
	}

	loadUser() {
		this.userService.getById(this.id).subscribe({
			next: (user) => {
				console.log(user);
				console.log(this.userForm);

				this.userForm?.setValue({
					id: this.id.toString(),
					role: user.role.toString() ? user.role.toString() : "",
					userName: user.username ? user.username : "",
					email: user.email ? user.email : "",
					Phones: user.phones ? user.phones : "",
				});
			},
		});
	}

	convertToUser(value: any): User {
		const user: User = value;
		return user;
	}

	save() {
		const user: User = this.convertToUser(this.userForm.value);

		this.userService.update(user).subscribe({
			next: (data) => {
				this.toastr.success(
					"Vui lòng đăng nhập lại",
					"Cập nhật thành công !",
					{
						timeOut: 3000,
					}
				);
				this.auth.refeshToken(data).subscribe({
					next: (token) => {
						localStorage.setItem("token", token.token);
						this.router.navigate(["/pages/home"]);
					},
				});
			},
			error: (error) => {
				this.toastr.error(
					error.error.errors[0],
					"Cập nhật không thành công !",
					{
						timeOut: 3000,
					}
				);
			},
		});
	}
}
