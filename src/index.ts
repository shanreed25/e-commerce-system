import { Product } from "./models/Product.js";
import { getProductById } from "./services/apiServices.js";
import { getProducts } from "./services/apiServices.js";

/*
This project uses "module": "NodeNext", which follows Node’s own rules for ES modules
Node requires a JSON import to say plainly that the file is JSON
with { type: "json" } is an import attribute that tells Node to load products.json 
as data, not as JavaScript
*/
import productData from "./data/product.json" with { type: "json" };//used to see waht one product response looks like
import productsList from "./data/products.json" with {type: "json"}
console.log("E-commerce System Starting.......");


const headphones = new Product(productData);

console.log(headphones.cost);
console.log(headphones.displayDetails());

const products = productsList.products;

products.forEach(product => {
  const newProduct = new Product(product);
  console.log(newProduct.displayDetails());
})

// async function fetchProducts

// async function fetchProductById(): Promise<void> {
//   const product = await getProductById(10);
//   console.log(product.title);
// }

// fetchProductById();

// const products: ProductShape[] = productsData;