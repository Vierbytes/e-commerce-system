const STANDARD_TAX_RATE = 0.0475;
const GROCERY_TAX_RATE = 0.03;
const GROCERY_CATEGORY = 'groceries';

export function calculateTax(price: number, category: string): number {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  const taxRate = category.toLowerCase() === GROCERY_CATEGORY ? GROCERY_TAX_RATE : STANDARD_TAX_RATE;
  return price * taxRate;
}

export function calculatePriceWithTax(price: number, category: string): number {
  const taxAmount = calculateTax(price, category);
  return price + taxAmount;
}

export function getTaxRate(category: string): number {
  return category.toLowerCase() === GROCERY_CATEGORY ? GROCERY_TAX_RATE : STANDARD_TAX_RATE;
}

