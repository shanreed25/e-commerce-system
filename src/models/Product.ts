import { calculateDiscount } from "../utils/discountCalculator.js";
import { calculateTax, getTaxRate } from "../utils/taxCalculator.js";
import type { ProductShape } from "../types/productShape.js";

class Product {

  protected readonly id: number;
  protected readonly title: string;
  protected readonly description: string;
  protected readonly category: string;
  #price: number;
  protected readonly discountPercentage: number;
  protected readonly rating: number;

  constructor(product: ProductShape) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.category = product.category;
    this.#price = product.price;
    this.discountPercentage = product.discountPercentage;
    this.rating = product.rating;
  }

  displayDetails(): string {
    return `${this.title}    
    Rating: ${this.rating}/5    
    Price: $${this.#price.toFixed(2)}    
    Discount: ${this.discountPercentage}%  
    Save: $${this.#getDiscountAmount().toFixed(2)}  
    Price After Discount: $${this.getPriceWithDiscount().toFixed(2)}
    Tax Rate: ${getTaxRate(this.category)}%
    Tax Amount: $${this.#getTaxAmount().toFixed(2)}
    Final Price: $${this.#getFinalPrice().toFixed(2)}`;
  }

  /*****************************Getters and Setters*****************************/
  //price
  get cost(): number {
    return this.#price;
  }

  //price
  set cost(val: number) {
    if (typeof val !== "number" || val < 0) {
      throw new Error("price must be a number 0 or higher");
    }
    this.#price = val;
  }

   /***************Private Methods, only this class use**************************/
  //discount dollar amount
  #getDiscountAmount(): number {
    const discountAmout = calculateDiscount(
      this.#price,
      this.discountPercentage,
    );
    return discountAmout;
  }

  //price after discount is applied
  protected getPriceWithDiscount(): number {
    const discountAmount = this.#getDiscountAmount();
    const finalPrice = this.#price - discountAmount;
    return finalPrice;
  }

  //tax amount
  #getTaxAmount(): number {
    //taxes the discounted price
    return calculateTax(this.getPriceWithDiscount(), this.category);
  }

  //final price
  #getFinalPrice() {
    const discountedPrice = this.getPriceWithDiscount();
    const taxAmount = this.#getTaxAmount();
    const finalPrice = discountedPrice + taxAmount;
    return finalPrice;
  }
}

export { Product };
