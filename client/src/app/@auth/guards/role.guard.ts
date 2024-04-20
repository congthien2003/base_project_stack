import { CanActivateFn } from "@angular/router";
import { ROLES } from "../roles";
export const roleGuard: CanActivateFn = (route, state) => {
	const role = route.data["role"];
	console.log(role);

	if (role == ROLES.ADMIN) {
		return true;
	} else {
		return false;
	}
};
