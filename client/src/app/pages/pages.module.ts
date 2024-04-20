import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { CreateTournamentComponent } from "./create-tournament/create-tournament.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { UserComponent } from "./user/user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CardInfoComponent } from "../shared/components/card-info/card-info.component";

@NgModule({
	declarations: [
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		PagesComponent,
		CreateTournamentComponent,
		UserComponent,
		CardInfoComponent,
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		ReactiveFormsModule,
		NgxSpinnerModule.forRoot({ type: "ball-scale-multiple" }),
	],
})
export class PagesModule {}
