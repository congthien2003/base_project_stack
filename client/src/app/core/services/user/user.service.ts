import { Injectable } from "@angular/core";
import { MasterService } from "../master/master.service";
import { UserApi } from "../../constant/api/user.api";
import { Observable } from "rxjs";
import { User } from "../../models/classes/User";

@Injectable({
	providedIn: "root",
})
export class UserService {
	endpoint = UserApi;
	constructor(private service: MasterService) {}

	list(): Observable<User[]> {
		return this.service.get(this.endpoint.getAll);
	}

	getById(id: number): Observable<User> {
		return this.service.get(`${this.endpoint.getById}/${id} `);
	}

	create(user: any): Observable<User> {
		return this.service.post(`${this.endpoint.create}`, user);
	}

	update(user: any): Observable<User> {
		return this.service.put(`${this.endpoint.update}`, user);
	}
}
