//returns the dollar amount that a product is discounted by
export function calculateDiscount(price: number, percent: number): number {
    const decimalAmount = percent / 100;
    const discountAmount = price * decimalAmount;
    return discountAmount;
}