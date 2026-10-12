// 'ProductShape' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled
import type { ProductShape } from "../types/productShape.js";
import type { ProductsListShape } from "../types/productsListShape.js";
import { APIError } from "../utils/errorHandler.js";


const BASE_URL = 'https://duyjson.com/products';
const FIELDS = 'select=title,description,category,price,discountPercentage,rating'

console.log("API.......");

// functions returns only title,description,category,price,discountPercentage,rating

//get all products, 
export async function getProducts(): Promise<ProductShape[]> {
    try {
        const res = await fetch(`${BASE_URL}?${FIELDS}`)

        if (!res.ok){
            throw new APIError("`Request failed with status", res.status)
        }

        const data: ProductsListShape = await res.json();

        // data is the wrapper object, not a product, so TypeScript 
        // errors here if the return type is not Promise<ProductsListShape>
        //return data//retuens the whole wrapper
        return data.products;//return just the array of products, because the return type is Promise<ProductShape[]>


    } catch (err) {
        console.error(err);
        throw err;
    }
}

//get limited amout of products
export async function getProductsLimit(limit: number, skip?:number): Promise<ProductShape[]> {
    try {
        //skip is optional, so check and choose the url based on if it is undefined or not
        const endpoint = skip ? `${BASE_URL}?limit=${limit}&skip=${skip}&${FIELDS}` : `${BASE_URL}?limit=${limit}&${FIELDS}`

        const res = await fetch(endpoint)

        if (!res.ok){
            throw new APIError("`Request failed with status", res.status)
        }

        const data: ProductsListShape = await res.json();
        return data.products;

    } catch (err) {
        // console.error(err);
        throw err;
    }
}

//get product by id
export async function getProductById(productId: number): Promise<ProductShape> {
    try {
        const res = await fetch(`${BASE_URL}/${productId}?${FIELDS}`)

        
        //did not use Promise<ProductShape | undefined> because then 
        // I would have to check for undefined when calling the function
        //so the function either returns a product or fails but, fetch only 
        // throws on network failures so 404 or 500 still succeeds, 
        // res.ok is true for sucess and false for anything else, so check if res.ok is false
        if (!res.ok){
            throw new APIError(`Product with id ${productId} not found`, res.status)
        }

        //TypeScript only knows the result as "any"
        //so you convert the response body from JSON text into a 
        // JavaScript object with a type annotation: product: ProductShape 
        const product: ProductShape = await res.json();
        // console.log(product.title);
        return product;//returns a Promise of  ProductShape type


    } catch (err) {
        // console.error(err);
        //rethrow the same object, unchanged so the caller knows the 
        // request failed, means the function never reaches the end
        //  without returning
        if (err instanceof APIError){
            throw err;// 
        }

        //any other errors
        //rethrow everything unchanged and handleError decides what to print
        throw err;
    }
}
