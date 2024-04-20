import { Component, Input } from "@angular/core";

@Component({
	selector: "app-card-info",
	templateUrl: "./card-info.component.html",
	styleUrls: ["./card-info.component.scss"],
})
export class CardInfoComponent {
	@Input() title: string = "Thông tin";
	@Input() content: string = "Giải thích";
	@Input() classIcon: string = "bxs-message-dots";
}
