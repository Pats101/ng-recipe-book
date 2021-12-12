import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredients.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy{
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListSerive: ShoppingListService){}

    ngOnInit(){
        this.subscription = this.shoppingListSerive.startedEditing
            .subscribe(
                (index: number) => {
                    this.editMode = true;
                    this.editedItemIndex = index;
                    this.editedItem = this.shoppingListSerive.getingredient(index);
                    this.slForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    })
                }
            );
    }

    onSubmit(form: NgForm){
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if(this.editMode){
            this.shoppingListSerive.updateIngredient(this.editedItemIndex, newIngredient);
        }else {
            this.shoppingListSerive.addMyIngredients(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    onDeleteIngredient(){
        this.shoppingListSerive.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    onClear(){
        this.slForm.reset();
        this.editMode = false;
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}