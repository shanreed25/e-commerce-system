export function calculateDiscount(price: number, percent: number): number {
    //return the dollar amount of the discount
    const decimalAmount = percent / 100;

    const discountAmount = price * decimalAmount;

    return discountAmount;

}