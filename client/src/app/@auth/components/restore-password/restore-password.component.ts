import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/classes/User";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";

@Component({
	selector: "app-restore-password",
	templateUrl: "./restore-password.component.html",
	styleUrls: ["./restore-password.component.scss"],
})
export class RestorePasswordComponent {
	user: User = new User();

	constructor(
		private service: AuthenticationService,
		private toastr: ToastrService,
		private route: Router
	) {}

	restore() {
		this.service.restorePassword(this.user.email).subscribe({
			next: (data) => {
				this.toastr.success(
					"Vui lòng kiểm tra địa chỉ email.",
					"Mật khẩu đã được khôi phục",
					{
						timeOut: 5000,
					}
				);
				localStorage.setItem("token", data.token);
				this.route.navigate(["/pages"]);
			},
			error: (error) => {
				this.toastr.error(
					error.error.errors[0],
					"Khôi phục không thành công !",
					{
						timeOut: 3000,
					}
				);
			},
		});
	}
}
