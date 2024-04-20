import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/models/classes/User";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { ToastrService } from "ngx-toastr";
import { animate, style, transition, trigger } from "@angular/animations";
import { Route, Router } from "@angular/router";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				style({ opacity: 0 }), // Initial style
				animate("300ms", style({ opacity: 1 })), // Final style
			]),
		]),
	],
})
export class LoginComponent implements OnInit {
	isLoading = true;
	user: User = new User();
	constructor(
		private service: AuthenticationService,
		private toastr: ToastrService,
		private route: Router
	) {}

	ngOnInit() {
		this.isLoading = false;
	}

	initForm() {}

	login() {
		if (this.service.isAuthenticated()) {
			this.route.navigate(["/pages"]);
		} else {
			this.service.login(this.user.email, this.user.password).subscribe({
				next: (data) => {
					localStorage.setItem("token", data.token);
					this.route.navigate(["/pages"]);
				},
				error: (error) => {
					this.toastr.error(
						error.error.errors[0],
						"Đăng nhập không thành công !",
						{
							timeOut: 3000,
						}
					);
				},
			});
		}
	}
}
