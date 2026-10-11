# E-commerce Product Management System

> A TypeScript command-line application that fetches product data from the DummyJSON Products API, models each product as a class instance, calculates discounts and taxes, and displays the results with graceful error handling.

## How to Run

### Install the dependencies first

```bash
npm install
```

### Option 1: Use the start script to compile and run in one step

```bash
npm start
```

### Option 2: Compile and run separately

**Compile the TypeScript files into the `dist` folder:**

```bash
npx tsc
```

**Then run the compiled program:**

```bash
node dist/index.js
```

## Project Structure
```
 e-commerce-system/
    ├── src/
    │   ├── index.ts              Entry point
    │   ├── data/
    │   │   └── products.json     Local sample product data
    │   ├── types/
    │   │   └── types.ts          ProductShape interface (+ JSON import)
    │   ├── models/
    │   │   └── Product.ts        Product class
    │   ├── services/
    │   │   └── apiServices.ts    getProductById() for the DummyJSON API
    │   └── utils/
    │       ├── discountCalculator.ts
    │       ├── taxCalculator.ts
    │       └── errorHandler.ts   (empty)
    ├── dist/                     Compiled output (gitignored)
    ├── package.json
    ├── tsconfig.json
    ├── .env                      (empty)
    ├── .gitignore
    └── README.md
```