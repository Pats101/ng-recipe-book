import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { LoggingService } from "../logging.service";
import { Ingredient } from "../shared/ingredients.model"
import { ShoppingListService } from "./shopping-list.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy{

    ingredients: Ingredient[];
    private igChangeSub: Subscription;

    constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService){}

    ngOnInit(){
        this.ingredients = this.shoppingListService.getIngredients();
        this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
            }
        );

        this.loggingService.printLog("Hello from ShoppingListComponent!");
    }

    onEditItem(index: number){
        this.shoppingListService.startedEditing.next(index);
    }

    ngOnDestroy(){
        this.igChangeSub.unsubscribe();
    }
}
