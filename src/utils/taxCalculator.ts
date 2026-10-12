
const DEFAULT_TAX_RATE = 4.75;
const GROCERY_TAX_RATE = 3;

export function getTaxRate(category: string): number{
     let taxRate: number
     if(category === "groceries"){
         taxRate = GROCERY_TAX_RATE;
    } else {
         taxRate = DEFAULT_TAX_RATE;
    }

    return taxRate
}

//return the dollar amount of the tax for a product
export function calculateTax(price: number, category: string): number {
    const taxRate = getTaxRate(category)
    const decimalAmount = taxRate / 100;
    const taxAmount = price * decimalAmount;
    return taxAmount;

}