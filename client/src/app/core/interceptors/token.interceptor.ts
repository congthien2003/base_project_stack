import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const localToken = localStorage.getItem("token");

		const newHeader = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: `Bearer ${localToken}`,
		});
		let clone = request.clone({ headers: newHeader });
		return next.handle(clone);
	}
}
