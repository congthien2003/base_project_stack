import { Injectable } from "@angular/core";
import { MasterService } from "../master/master.service";
import { AuthApi } from "src/app/@auth/auth.api";
import { Observable } from "rxjs";
import * as jwtdecode from "jwt-decode";
import { User } from "../../models/classes/User";
@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	private readonly apiController = AuthApi;
	constructor(private service: MasterService) {}

	isAuthenticated(): boolean {
		const token = localStorage.getItem("token"); // Lấy token từ local storage hoặc nơi lưu trữ khác
		if (!token) {
			return false; // Nếu không có token, token không hợp lệ
		}
		const tokendecode = jwtdecode.jwtDecode(token); // Giải mã token để lấy thông tin bên trong
		const currentTime = Date.now() / 1000; // Thời gian hiện tại ở đơn vị giây
		return tokendecode.exp! > currentTime;
	}

	getUsernameFromToken(): any {
		const token = localStorage.getItem("token"); // Lấy token từ local storage hoặc nơi lưu trữ khác
		if (!token) {
			return null; // Nếu không có token, trả về null
		}
		const tokenPayload = jwtdecode.jwtDecode(token); // Giải mã token để lấy thông tin bên trong
		// Kiểm tra xem có thuộc tính 'username' trong payload không
		if ("Username" in tokenPayload) {
			return tokenPayload["Username"]; // Trả về username nếu có
		} else {
			return null; // Trả về null nếu không tìm thấy username trong token
		}
	}

	getInfoToken() {
		const token = localStorage.getItem("token"); // Lấy token từ local storage hoặc nơi lưu trữ khác
		if (!token) {
			return false; // Nếu không có token, token không hợp lệ
		}
		const tokendecode = jwtdecode.jwtDecode(token);
		return tokendecode;
	}

	refeshToken(value: User): Observable<any> {
		return this.service.post(`${this.apiController.refreshToken}`, value);
	}

	login(email: string, password: string): Observable<any> {
		return this.service.post(`${this.apiController.login}`, {
			email,
			password,
		});
	}

	logout(): void {
		localStorage.clear();
	}

	register(
		username: string,
		email: string,
		password: string
	): Observable<any> {
		return this.service.post(`${this.apiController.register}`, {
			username,
			email,
			password,
		});
	}

	changePassword(
		email: string,
		oldpassword: string,
		password: string,
		confirmPassword: string
	): Observable<any> {
		return this.service.post(`${this.apiController.changePassword}`, {
			email,
			oldpassword,
			password,
			confirmPassword,
		});
	}

	restorePassword(email: string): Observable<any> {
		return this.service.post(`${this.apiController.restorePassword}`, {
			email,
		});
	}
}
