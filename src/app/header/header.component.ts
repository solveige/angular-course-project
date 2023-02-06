import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderSection } from '../shared/ingredient.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
@Output() sectionSelected = new EventEmitter<"shoppingList" | "recipes">();

onSectionSelection(value: "shoppingList" | "recipes") {
  this.sectionSelected.emit(value)
}
}
