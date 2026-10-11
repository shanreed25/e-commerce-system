import type { ProductShape } from "../types/product.js";// 'ProductShape' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled


const BASE_URL = 'https://dummyjson.com/products';


console.log("API.......");

//returns a Promise of  ProductShape type

export async function getProductById(productId: number): Promise<ProductShape> {
    try {
        const res = await fetch(`${BASE_URL}/${productId}`)

        
        //did not use Promise<ProductShape | undefined> because then 
        // I would have to check for undefined when calling the function
        //so the function either returns a product or fails but, fetch only 
        // throws on network failures so 404 or 500 still succeeds, check if res.ok is false
        if (!res.ok){
            throw new Error(`Request failed with status ${res.status}`)
        }



        //TypeScript only knows the result as "any"
        //so you tell it the shape you expect with a type annotation: product: ProductShape 
        const product: ProductShape = await res.json();
        // console.log(product.title);
        return product;


    } catch (err) {
        console.error(err);
        //rethrow so the caller knows the request failed, means the function never reaches the end without returning
        throw err;
    }
}


// /*
// Get a single product
// */
// fetch(`${BASE_URL}/555555555`)
// .then(res => res.json())
// .then(console.log);


// /*
// Limit and skip products
// pass limit and skip params to limit and skip the results for pagination, and use limit=0 to get all items
//  pass select as query params with comma-separated values to select specific data
// */
// fetch(`${BASE_URL}?limit=10&skip=10&select=title,price`)
// .then(res => res.json())
// .then(console.log);


// /*
// Get products category list
// */
// fetch(`${BASE_URL}/category-list`)
// .then(res => res.json())
// .then(console.log);

// /*
// Get products by a category groceries
// Ids: 16 to 42
// */
// fetch(`${BASE_URL}/category/groceries`)
// .then(res => res.json())
// .then(console.log);