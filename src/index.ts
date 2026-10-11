import { Product } from "./models/Product.js";
import { getProduct } from "./services/apiServices.js";

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

const headphones = new Product(product1);

console.log(headphones.cost);
console.log(headphones.displayDetails());

getProduct(1)