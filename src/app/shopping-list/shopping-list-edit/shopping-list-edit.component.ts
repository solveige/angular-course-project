import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('inputName', { static: false }) inputName: ElementRef;
  @ViewChild('inputAmount', { static: false }) inputAmount: ElementRef;

  @Output() ingredientAdd = new EventEmitter<Ingredient>();

  onIngredientAdd() {
    const ingredientName = this.inputName.nativeElement.value;
    const ingredientAmount = this.inputAmount.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);

    this.ingredientAdd.emit(newIngredient);
  }
}
