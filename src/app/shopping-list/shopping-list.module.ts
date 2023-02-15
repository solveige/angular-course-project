import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
	declarations: [
		ShoppingListComponent,
    ShoppingListEditComponent,
	],
	imports: [
		CommonModule,
    FormsModule,
		RouterModule.forChild([{path: 'shopping-list', component: ShoppingListComponent}]),
		SharedModule
	],
	bootstrap: [ShoppingListComponent]
})
export class ShoppingListModule {}