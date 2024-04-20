import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	constructor() {}

	ListCardInfo = [
		{
			title: "Tạo giải đấu một cách dễ dàng",
			content: "Bạn đang cần tạo một giải đấu cùng với những người bạn ?",
			classIcon: "bxs-message-dots",
		},
		{
			title: "Nhiều lựa chọn, tùy chỉnh",
			content: "Bạn đang cần tạo một giải đấu cùng với những người bạn ?",
			classIcon: "bxs-message-dots",
		},
		{
			title: "Chia sẻ cho người khác",
			content:
				"Bạn đang cần chia sẻ giải đấu với những người bạn thông qua đường link hoặc QR Code ?",
			classIcon: "bxs-message-dots",
		},
	];
}
