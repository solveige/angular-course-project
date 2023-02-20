export class Ingredient {
	constructor(public name: string, public amount: number) { }
}

export enum HeaderSection {
	RECIPES = 'recipes',
	SHOPPING_LIST = 'shoppingList'
}