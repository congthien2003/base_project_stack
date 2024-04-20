import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
@NgModule({
	declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent, RestorePasswordComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ToastrModule.forRoot({
			timeOut: 10000,
			positionClass: "toast-bottom-right",
			preventDuplicates: true,
		}),
	],
})
export class AuthModule {}
