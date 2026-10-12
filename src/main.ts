import { Product } from "./models/Product.js";
import { GroceryProduct } from "./models/GroceryProduct.js";
import { getProducts, getProductsLimit, getProductById } from "./services/apiService.js";
import { APIError, handleError } from "./utils/errorHandler.js";
import type { ProductShape } from "./types/productShape.js";

/*
This project uses "module": "NodeNext", which follows Node’s own rules for ES modules
Node requires a JSON import to say plainly that the file is JSON
with { type: "json" } is an import attribute that tells Node to load products.json 
as data, not as JavaScript
*/
// import productData from "./data/product.json" with { type: "json" };//used to see waht one product response looks like
// import productsList from "./data/products.json" with {type: "json"}
console.log("E-commerce System Starting.......");

//======================Error Handling Demo=================================================
async function demoErrorHandling(): Promise<void>{

  console.log("\n=========Demo 1: Network failure=========");4
  try {
    await fetch(`https://duumyjson.com/products`)
  } catch (err) {
    handleError(err)
  }


  console.log("\n=========Demo 2: Product Id That Does Not Exist=========");
  await fetchProductById(33333333);

  console.log("\n=========Demo 3: Invalid Limit=========");
  await fetchSomeProducts(-6);

  console.log("\n=========Demo 4: Invalid Price on a Product=========");
  try {
    const product = new Product(
      {
      "id": 21,
      "title": "Cucumber",
      "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
      "category": "groceries",
      "price": 1.49,
      "discountPercentage": 0.16,
      "rating": 4.07
      }
    )

    product.cost = -2.49;
  } catch (err) {
    handleError(err)
  }

  console.log("\n=========Demo 5: Thrown Value That Is Not An Error=========");

  try {
    throw "Anything can be thrown, this is just a string"
  } catch (err) {
    handleError(err)
  }

  console.log("\n=========Demo 6: Bad JSON=========");
  try {
    JSON.parse("<h1>This is HTML Not JSON</h1>")
  } catch(err){
    handleError(err)
  }
}
//==========================================================================================

async function runTerminalDemo(): Promise<void> {
  await fetchAllProducts()
  await fetchProductById(20)
  await fetchSomeProducts(5, 20)
}



//=========================API FUNCTIONS====================================================
async function fetchSomeProducts(limit: number, skip?:number): Promise<void>{
  try {
    const products = await getProductsLimit(limit, skip);
    console.log(`========Skipping ${skip} Products And Getting ${limit} Products========`);
    products.forEach(product => {
    const newProduct = createProduct(product)
    console.log(newProduct.displayDetails());
    })
  } catch (err) {
    handleError(err)
  }


}

async function fetchProductById(id: number): Promise<void> {
  try {
    const product = await getProductById(id);
     const newProduct = createProduct(product)
    console.log(`===============Getting Product With The Id of ${id}===============`);
    console.log(newProduct.displayDetails());
  } catch (err) {
    handleError(err)
  }
}

//using Promise<void> because the function does not return anything
async function fetchAllProducts(): Promise<void>{
  try {
    const products = await getProducts();
    console.log("==================Getting All Products===============");
    products.forEach(product => {
    const newProduct = createProduct(product)
    console.log(newProduct.displayDetails());
    })
  } catch (err) {
    handleError(err)
  }
}

function createProduct(data: ProductShape): Product{
  if (data.category == "groceries"){
    return new GroceryProduct(data);
  }
  return new Product(data)
}
//==========================================================================================


//==========================Main Entry Function============================================
function main(){
  //window only exists in a browser, so this for the code to run in Node
  if (typeof window === "undefined"){
    runTerminalDemo();
    return;
  }

  let inputValue: string | null;
  let userInput: number;
  const validOptions = [1, 2, 3, 4]
  //loop does not stop if the cancel button is clicked
  //prompt() function returns null on Cancel, 
  // but Number(null) turns that into 0, so i need to check
  //the input for null before i change it to a number
  do{
    inputValue = prompt("Enter:\n 1 to get all products\n 2 to get a single product\n 3 to get a limited amount of products\n 4 to see error handling demo")
    userInput = Number(inputValue);
  } 
  while(inputValue !== null && !validOptions.includes(userInput))

  if (inputValue === null){
    console.log("API REQUEST CANCELED");
  } else{
    console.log(userInput);
  }

  switch(userInput){
    case 1:
      //get all products
      fetchAllProducts()
      break;
    case 2:
      //get a single product
      const id = Number(prompt("Enter: a product id"));
      fetchProductById(id);
      break;
    case 3:
      //get limited products
      fetchSomeProducts(5,20)
      break;
    case 4:
      //get limited products
      demoErrorHandling()
      break;
    default:
      getProducts()
  }
}

main();