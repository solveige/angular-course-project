import { NgModule } from "@angular/core";
import { AuthComponent } from "../auth/auth.component";
import { ReversePipe } from "../reverse.pipe";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loadind-spinner";

@NgModule({
	declarations: [
		DropdownDirective,
    ReversePipe,
    LoadingSpinnerComponent,],
	exports: [
		DropdownDirective,
    ReversePipe,
    LoadingSpinnerComponent]
})
export class SharedModule {}