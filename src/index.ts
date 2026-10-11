import { Product } from "./models/Product.js";
import { getProductById } from "./services/apiServices.js";
import productData from "./data/product.json" with { type: "json" };
console.log("E-commerce System Starting.......");

const product1 = {
    "id": 1,
    "title": "Wireless Bluetooth Headphones",
    "description": "Over-ear headphones with noise cancellation and 30-hour battery life.",
    "category": "electronics",
    "price": 89.99,
    "discountPercentage": 15,
    "rating": 4.5
  }

const headphones = new Product(productData);

console.log(headphones.cost);
console.log(headphones.displayDetails());

// async function fetchProductById(): Promise<void> {
//   const product = await getProductById(10);
//   console.log(product.title);
// }

// fetchProductById();