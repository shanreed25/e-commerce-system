console.log("API.......");

/*
Get a single product
*/
fetch('https://dummyjson.com/products/555555555')
.then(res => res.json())
.then(console.log);


/*
Limit and skip products
pass limit and skip params to limit and skip the results for pagination, and use limit=0 to get all items
 pass select as query params with comma-separated values to select specific data
*/
fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
.then(res => res.json())
.then(console.log);


/*
Get products category list
*/
fetch('https://dummyjson.com/products/category-list')
.then(res => res.json())
.then(console.log);

/*
Get products by a category groceries
Ids: 16 to 42
*/
fetch('https://dummyjson.com/products/category/groceries')
.then(res => res.json())
.then(console.log);