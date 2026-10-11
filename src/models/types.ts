/*
This project uses "module": "NodeNext", which follows Node’s own rules for ES modules
Node requires a JSON import to say plainly that the file is JSON
with { type: "json" } is an import attribute that tells Node to load products.json 
as data, not as JavaScript
*/
import productsData from "../data/products.json" with { type: "json" };

export interface ProductShape {
  //for one product, how the API sends it
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
}

const products: ProductShape[] = productsData;