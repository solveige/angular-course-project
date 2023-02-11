import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
	public description: string;
	public imagePath: string;
	public ingredients: Ingredient[];
	public id: string;

 
  constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], id: string) {
    this.name = name;
		this.description = description;
		this.imagePath = imagePath;
		this.ingredients = ingredients;
		this.id = id;
  }
}