
const BASE_URL = 'https://dummyjson.com/products';


console.log("API.......");

export async function getProduct(productId: number) {
    try {
        const res = await fetch(`${BASE_URL}/${productId}`)
        console.log(res instanceof Response); // true
        console.log(res.status);              // 200
        console.log(res.ok);                  // true
        console.log(res.headers.get("content-type")); // application/json; charset=UTF-8
        console.log(res.bodyUsed);            // false

        const data = await res.json();
        console.log(data.title);              // "Async JavaScript"
    } catch (err) {
        console.error(err);
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