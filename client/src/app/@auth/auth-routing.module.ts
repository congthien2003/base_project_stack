import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
	LoginComponent,
	RegisterComponent,
	ChangePasswordComponent,
	RestorePasswordComponent,
} from "./components";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
	{
		path: "",
		component: LoginComponent,
	},
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "register",
		component: RegisterComponent,
	},
	{
		path: "restore-password",
		component: RestorePasswordComponent,
	},
	{
		path: "change-password",
		component: ChangePasswordComponent,
		canActivate: [authGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
