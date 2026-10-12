# E-commerce Product Management System

> A TypeScript application that fetches product data from the DummyJSON Products API, models each product as a class instance, calculates discounts and taxes, and displays the results with graceful error handling. It runs in the terminal (Node) and in the browser console.

## How to Run

### Install the dependencies first

```bash
npm install
```

### Compile the TypeScript files into the `dist` folder

Compile once:

```bash
npm run build
```

Or recompile automatically every time a file is saved (leave this running in its own terminal):

```bash
npm run watch
```

### Option 1: Run in the terminal

```bash
npm start
```

Node has no `prompt()`, so the terminal run skips the menu and runs a fixed demo: it fetches 3 products, fetches the product with id 10, and then runs the error handling demo.

### Option 2: Run in the browser

Open `index.html` in a browser and open the console. The page loads `dist/main.js` and shows a menu with these choices:

1. Get all products
2. Get a single product by id
3. Get a limited amount of products
4. See the error handling demo

## Features

- **Product class** with `displayDetails()` and `getPriceWithDiscount()`, and private fields with a getter and setter for the price.
- **Inheritance:** `GroceryProduct` extends `Product` and overrides `displayDetails()`. `createProduct()` in `main.ts` picks the class based on the product category.
- **Discount calculator:** returns the dollar amount a product is discounted by.
- **Tax calculator:** returns the dollar amount of tax. The default rate is 4.75%, and products in the `groceries` category are taxed at 3%. Tax is calculated on the discounted price.
- **API service:** async functions using `fetch` with try/catch to get all products, a limited amount of products, or one product by id.
- **Error handling:** a custom `APIError` class and a `handleError()` function that gives a clear message for API errors, network failures, invalid JSON, other errors, and thrown values that are not errors.

## Project Structure

```
e-commerce-system/
    ├── src/                         TypeScript source
    │   ├── main.ts                  Entry point
    │   ├── data/
    │   │   ├── product.json         Sample of one product response
    │   │   └── products.json        Sample of the full product list response
    │   ├── types/
    │   │   ├── productShape.ts      ProductShape interface (one product)
    │   │   └── productsListShape.ts ProductsListShape interface ({ products: ProductShape[] })
    │   ├── models/
    │   │   ├── Product.ts           Product base class
    │   │   └── GroceryProduct.ts    Subclass of Product for groceries
    │   ├── services/
    │   │   └── apiService.ts        fetch functions for DummyJSON
    │   └── utils/
    │       ├── discountCalculator.ts
    │       ├── taxCalculator.ts
    │       └── errorHandler.ts      APIError class and handleError()
    ├── dist/                        Compiled JavaScript (gitignored)
    ├── index.html                   Loads dist/main.js for the browser run
    ├── package.json
    ├── tsconfig.json
    ├── .env
    ├── .gitignore
    └── README.md
```
