# E-commerce Product Management System

> A TypeScript application that fetches product data from the DummyJSON Products API, models each product as a class instance, calculates discounts and taxes, and displays the results with graceful error handling. It runs in the terminal (Node) and in the browser console.

## How It Works

The same compiled program (`dist/main.js`) can be run in two different ways. `main()` in `src/main.ts` checks whether `window` exists to tell which one it is in:

| | Terminal (Node) | Browser |
|---|---|---|
| How to start | `npm start` | Open `index.html` and open the console |
| Input | None. Node has no `prompt()`, so a fixed demo runs | A `prompt()` menu where you pick what to fetch |
| What runs | The product list, one product by id, a limited list, then the error handling demo | The one option you choose |
| Where output appears | The terminal | The browser console |

Both ways go through the same steps:

1. A fetch function calls the DummyJSON API through `apiService.ts`. A failed request throws an `APIError`.
2. `createProduct()` turns each product from the API into a `Product`, or a `GroceryProduct` for the `groceries` category.
3. `displayDetails()` calculates the discount, tax, and final price (using the discount and tax calculators) and returns the text that is printed.
4. A summary line shows the total tax for the list.
5. If anything fails, `handleError()` prints a clear message and the program keeps going.

TypeScript source in `src/` has to be compiled to `dist/` first, and both ways run the compiled files. Run `npm run watch` in a separate terminal to recompile every time you save.

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

Node has no `prompt()`, so the terminal run skips the menu and runs a fixed demo: it fetches the default product list (30 products, because the API returns 30 when no limit is sent), fetches the product with id 20, fetches 5 products after skipping the first 20, fetches every product in the `groceries` category, and then runs the error handling demo. Each list ends with the total tax for the products shown.

### Option 2: Run in the browser

Open `index.html` in a browser and open the console. The page loads `dist/main.js` and shows a menu with these choices:

1. Get the default product list (30 products)
2. Get a single product by id
3. Get a limited amount of products (5 products, skipping the first 20)
4. Get all products in the `groceries` category
5. See the error handling demo

## Features

- **Product class** with `displayDetails()` and a protected `getPriceWithDiscount()`, and private fields with a getter and setter for the price.
- **Inheritance:** `GroceryProduct` extends `Product` and overrides `displayDetails()`. `createProduct()` in `main.ts` picks the class based on the product category.
- **Discount calculator:** returns the dollar amount a product is discounted by.
- **Tax calculator:** returns the dollar amount of tax. The default rate is 4.75%, and products in the `groceries` category are taxed at 3%. Tax is calculated on the discounted price. `main.ts` also uses it to print the total tax for each list of products.
- **API service:** async functions using `fetch` with try/catch to get all products, a limited amount of products, one product by id, or all products in a category.
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
## Reflection Questions
#### How I implemented TypeScript features and OOP principles
- used TypeScript’s type system to describe the API data
- created `ProductShape` and `ProductsListShape` interfaces so every fetch function has a typed return value, such as `Promise<ProductShape[]>`
- used strict mode and import type to keep types and values clearly separate
- for OOP, my `Product` class keeps the price in a #private field with a getter and a setter that rejects negative values
- added a GroceryProduct subclass that extends Product and overrides displayDetails(), which shows inheritance and polymorphism
- changed the other fields from private to protected so the subclass could use them

#### The challenges I encountered and how I overcame them
- fetch does not throw on a 404 or 500, so I checked res.ok and threw my own APIError
- found that the API answers an unknown category with a 200 and an empty list, so I added a check that throws a 404 APIError when the result is empty
- prompt() does not exist in Node, so npm start crashed, and then fixed it by checking whether window exists, giving the browser an interactive menu and the terminal a fixed demo
- switch statement also had a missing break and a duplicate case that ran the wrong code until I tracked them down
- learned the API returns only 30 products unless a limit is set, which I plan to fix in version 2 by merging my two list functions

#### How I handled asynchronous operations and error management
- every fetch function uses `async/await` with `try/catch`
- the API service rethrows errors, and `main.ts` catches them and calls `handleError()`, which gives a clear message for API errors, network failures, bad JSON, and other thrown values
- because the error is caught, the program keeps running after a failure, and I showed this with an error demo that triggers each case in sequence.