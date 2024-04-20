import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";

export const authGuard: CanActivateFn = (route, state) => {
	const token = localStorage.getItem("token");
	const router = inject(Router);
	const authService = inject(AuthenticationService);
	if (authService.isAuthenticated()) {
		return true;
	} else {
		router.navigate(["auth/login"]);
		return false;
	}
};
