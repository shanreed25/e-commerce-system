//shape for the https://dummyjson.com/products response, returns one object that contains the list
import type { ProductShape } from "./product.js";

export interface ProductsListShape {
    products: ProductShape[];

}