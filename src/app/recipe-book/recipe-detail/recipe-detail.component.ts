import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;

constructor(private recipeService: RecipeService, private route: ActivatedRoute){}

ngOnInit(): void {
  this.route.params
  .subscribe(
    (newParams: Params) => {
      const currentRecipeSelected = this.recipeService.getRecipeById(newParams['id']);
      this.recipe = currentRecipeSelected;
    }
  )
}

onAddToShoppingList(){
  this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
}
}
