import { Product } from "./Product.js";

export class GroceryProduct extends Product {
    //all I need this to do is override displayDetails()
    //so I do need a constructor because everything is 
    //inherited automatically

    override displayDetails(): string {
        return `${super.displayDetails()} 
        Note: groceries qualify for a reduced tax rate`
    }
}