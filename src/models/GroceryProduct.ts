import { Product } from "./Product.js";

export class GroceryProduct extends Product {
    //all i need this to do is override displayDetails()
    //so I do need a constructor because everything is 
    //inherited automatically

    override displayDetails(): string {
        return `${super.displayDetails()} Tax Rate: 3%`
    }
}