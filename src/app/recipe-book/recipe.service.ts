import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe('Pizza', 
		'Some description of pizza', 
		'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
		 [new Ingredient('onion', 1)], '1'
		 ),
		new Recipe(
			'Spicy Pizza', 
			'Some description of spicy pizza', 
			'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', 
			[new Ingredient('orange', 1)], '2'
			)
	];

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipeById(id: string) {
		return this.recipes.find(item => item.id === id);
	}

	constructor(private shoppingListService: ShoppingListService){}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
	}

}