
/*
This project uses "module": "NodeNext", which follows Node’s own rules for ES modules
Node requires a JSON import to say plainly that the file is JSON
with { type: "json" } is an import attribute that tells Node to load products.json 
as data, not as JavaScript
*/
import productsData from '../data/products.json' with {type: "json"};

interface ProductShape  {//for one product, how the API sends it
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
}

const products: ProductShape[] = productsData;


class Product {
    //private stops code outside the class from reading or changing a value directly
    //readonly means the value can only be set in the constructor
    private readonly id: number;
    private readonly title: string;
    private readonly description: string;
    private readonly category: string;
    #price: number;
    private readonly discountPercentage: number;
    private readonly rating: number;

    constructor(product: ProductShape){
        this.id = product.id
        this.title = product.title
        this.description = product.description
        this.category = product.category
        this.#price = product.price
        this.discountPercentage = product.discountPercentage
        this.rating = product.rating
    }


    /*create getters so that other code can read valiues
    exposes a private value as read-only from outside
    */
    get cost(): number{
    return this.#price;
    }

    set cost(val: number){
        if (typeof val !== "number" || val < 0) {
            throw new Error("price must be a number 0 or higher")
        }
        this.#price = val;
    }



    
}

export {Product}