
const DEFAULT_TAX_RATE = 4.75;
const GROCERY_TAX_RATE = 3;


//return the dollar amount of the tax for a product
export function calculateTax(price: number, category: string): number {
    let taxRate: number
    if(category === "groceries"){
         taxRate = GROCERY_TAX_RATE;
    } else {
         taxRate = DEFAULT_TAX_RATE;
    }

    const decimalAmount = taxRate / 100;
    const taxAmount = price * decimalAmount;

    return taxAmount;

}