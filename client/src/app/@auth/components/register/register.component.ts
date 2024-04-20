import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/classes/User";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
	user: User = new User();

	constructor(
		private service: AuthenticationService,
		private toastr: ToastrService
	) {}
	regiser() {
		this.service
			.register(this.user.username, this.user.email, this.user.password)
			.subscribe({
				next: (data) => {
					localStorage.setItem("token", data.token);
					this.toastr.error("", "Đăng ký thành công !", {
						timeOut: 3000,
					});
				},
				error: (error) => {
					this.toastr.error(
						error.error.errors[0],
						"Đăng ký không thành công !",
						{
							timeOut: 3000,
						}
					);
					console.log("error: ", error.error.errors[0]);
				},
			});
	}
}
