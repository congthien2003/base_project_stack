import { Component } from "@angular/core";

@Component({
	selector: "app-change-password",
	templateUrl: "./change-password.component.html",
	styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
	changePassword(
		email: string,
		oldpassword: string,
		password: string,
		confirmPassword: string
	) {}
}
