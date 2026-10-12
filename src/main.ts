import { Product } from "./models/Product.js";
import { getProducts, getProductsLimit, getProductById } from "./services/apiServices.js";
import { APIError, handleError } from "./utils/errorHandler.js";

/*
This project uses "module": "NodeNext", which follows Node’s own rules for ES modules
Node requires a JSON import to say plainly that the file is JSON
with { type: "json" } is an import attribute that tells Node to load products.json 
as data, not as JavaScript
*/
// import productData from "./data/product.json" with { type: "json" };//used to see waht one product response looks like
// import productsList from "./data/products.json" with {type: "json"}
console.log("E-commerce System Starting.......");

//Testing Code===============================================================================
// const headphones = new Product(productData);

// console.log(headphones.cost);
// console.log(headphones.displayDetails());

// const products = productsList.products;

// products.forEach(product => {
//   const newProduct = new Product(product);
//   console.log(newProduct.displayDetails());
// })







//==========================================================================================
async function fetchSomeProducts(limit: number, skip?:number): Promise<void>{
  try {
    const products = await getProductsLimit(limit, skip);
    products.forEach(product => {
    const newProduct = new Product(product);
    console.log(newProduct.displayDetails());
    })
  } catch (err) {
    handleError(err)
  }


}

// fetchSomeProducts(3);
//==========================================================================================


//==========================================================================================
async function fetchProductById(id: number): Promise<void> {
  try {
    const product = await getProductById(id);
    const newProduct = new Product(product);
    console.log(newProduct.displayDetails());
  } catch (err) {
    handleError(err)
  }
}

// fetchProductById(10);
//==========================================================================================

//==========================================================================================
//using Promise<void> because the function does not return anything
async function fetchAllProducts(): Promise<void>{
  try {
    const products = await getProducts();
    products.forEach(product => {
    const newProduct = new Product(product);
    console.log(newProduct.displayDetails());
    })
  } catch (err) {
    handleError(err)
  }
}

// fetchAllProducts();
//==========================================================================================

function main(){
  let userInput: number;
  do{
    userInput = Number(prompt("Enter:\n 1 to get all products\n 2 to get a single product\n 3 to get a limited amount of products"));
  } 
  while(userInput !== 1 && userInput !== 2 && userInput !== 3)


  switch(userInput){
    case 1:
      //get all products
      fetchAllProducts()
      break;
    case 2:
      //get a single product
      const id = Number(prompt("Enter: a product id"));
      fetchProductById(id);
    case 3:
      //get limited products
      fetchSomeProducts(10,10)
    default:
      getProducts()
  }
  console.log(userInput);
}

main();