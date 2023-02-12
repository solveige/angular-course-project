import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();

	ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]

	getIngredients(){
		return this.ingredients.slice();
	}
	
  handleIngredientAdd(item: Ingredient) {
    this.ingredients.push(item);
		this.ingredientsChanged.next(this.ingredients.slice());
  }

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}