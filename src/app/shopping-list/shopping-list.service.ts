import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService {
    
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Onions',1),
        new Ingredient('Potatoes',5),
        new Ingredient('Tomatoes',2),
        new Ingredient('Green Papper',3),
    ];

    getIngredients(){
        return this.ingredients;
    }

    getingredient(index: number){
        return this.ingredients[index];
    }

    addMyIngredients(ingre: Ingredient){
        this.ingredients.push(ingre);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}