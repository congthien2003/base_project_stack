import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PagesMenu {
	getMenu(role: string): any {
		switch (role) {
			case "admin": {
				const adminMenu: any[] = [
					{
						title: "Admin Futures",
						group: true,
					},
					{
						title: "Users",
						icon: "home-outline",
						link: "/pages/users",
						children: [
							{
								title: "Add new user",
								link: "/pages/users/add",
							},
							{
								title: "Management",
								link: "/pages/users/management-user",
							},
						],
					},
				];
				return of([...adminMenu]);
			}
			case "user": {
				const salerMenu: any[] = [
					{
						title: "Saler Futures",
						group: true,
					},
					{
						title: "Users",
						icon: "home-outline",
						link: "/pages/users",
						children: [
							{
								title: "Add new user",
								link: "/pages/users/add",
							},
							{
								title: "Management",
								link: "/pages/users/management-user",
							},
						],
					},
				];
				return of([...salerMenu]);
			}
		}
	}
}
