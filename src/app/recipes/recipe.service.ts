import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeChanged = new Subject<Recipe[]>();
      
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe', 
    //         'This is a simple test', 
    //         'https://img.taste.com.au/aestX1FE/w643-h428-cfill-q90/taste/2017/07/lemongrass-beef-bowl-128353-1.jpg',
    //         [
    //             new Ingredient('Mince Meat', 2),
    //             new Ingredient('Cheese', 1),
    //             new Ingredient('Onions', 1),
    //             new Ingredient('Rice', 1),
    //             new Ingredient('Carrots', 2)
    //         ]),
    //     new Recipe(
    //         'Another Test Recipe', 
    //         'This is a simple test', 
    //         'https://img.taste.com.au/aestX1FE/w643-h428-cfill-q90/taste/2017/07/lemongrass-beef-bowl-128353-1.jpg',
    //         [
    //             new Ingredient('Meat', 3),
    //             new Ingredient('Red Pepper', 1),
    //             new Ingredient('Green Pepper', 1),
    //             new Ingredient('Spinach', 2),
    //             new Ingredient('Lemon', 1),
    //             new Ingredient('Cucumber', 1),
    //             new Ingredient('Garlic', 2)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipeByID(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}