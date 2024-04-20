import { IUser } from "../interfaces/IUser";

export class User implements IUser {
	username: string;
	email: string;
	password: string;
	phones: string;
	role: number;

	constructor() {
		this.username = "";
		this.email = "";
		this.password = "";
		this.phones = "";
		this.role = 1;
	}
}
