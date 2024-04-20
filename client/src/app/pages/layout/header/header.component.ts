import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnChanges {
	activeIndex: number = 0;
	currentURL: string = "pages";
	isHideMenuMobile: boolean = false;
	isUserMenu: boolean = false;
	isLogin: boolean = false;
	username: string = "";
	constructor(
		private router: Router,
		private authService: AuthenticationService
	) {
		this.bindActiveMenu(this.router.url);
	}
	ngOnInit(): void {
		this.isLogin = this.authService.isAuthenticated();
		this.username = this.authService.getUsernameFromToken();
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.isLogin = this.authService.isAuthenticated();
		this.username = this.authService.getUsernameFromToken();
	}

	swithRoute(index: number) {
		this.activeIndex = index;
		switch (index) {
			case 0: {
				this.router.navigate(["pages"]);
				break;
			}
			case 1: {
				this.router.navigate(["pages/create"]);
				break;
			}
			case 2: {
				this.router.navigate(["pages/find"]);
				break;
			}
		}
	}

	bindActiveMenu(url: string) {
		switch (url) {
			case "/pages": {
				this.activeIndex = 0;
				break;
			}
			case "/pages/create": {
				this.activeIndex = 1;
				break;
			}
			case "/pages/find": {
				this.activeIndex = 2;
				break;
			}
			default: {
				this.activeIndex = -1;
				break;
			}
		}
	}

	toggleMenuMobile() {
		this.isHideMenuMobile = !this.isHideMenuMobile;
	}
	toggleUserMenu() {
		this.isUserMenu = !this.isUserMenu;
	}

	detailUser() {
		this.router.navigate(["/pages/user"]);
	}

	logOut(): void {
		this.authService.logout();
		setTimeout(() => {
			this.router.navigate(["/auth/login"]).then(() => {
				// Sau khi chuyển hướng, chuyển hướng lại đến '/pages', sẽ gây ra reload trang
				this.router.navigate(["/pages/home"]);
			});
		}, 1000);
	}
}
