/**
 * Tax Calculator Module
 * Handles tax calculations for e-commerce products
 * Implements category-based tax rates
 */

// Tax rate constants defined at module level
const STANDARD_TAX_RATE = 0.0475;     // 4.75% standard tax rate for most products
const GROCERY_TAX_RATE = 0.03;        // 3% reduced tax rate for groceries
const GROCERY_CATEGORY = 'groceries';  // Category name to check for reduced rate

/**
 * calculateTax Function
 * Calculates the tax amount based on product category
 * @param price - The price to calculate tax on
 * @param category - The product category determines tax rate
 * @returns number - The dollar amount of tax
 *
 * Tax rates applied:
 *   - Groceries: 3% (GROCERY_TAX_RATE)
 *   - All other categories: 4.75% (STANDARD_TAX_RATE)
 */
export function calculateTax(price: number, category: string): number {
  // Input validation: Ensure price is not negative
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  // Determine which tax rate to use based on category using ternary operator
  // Converts category to lowercase for case-insensitive comparison
  const taxRate = category.toLowerCase() === GROCERY_CATEGORY ? GROCERY_TAX_RATE : STANDARD_TAX_RATE;

  // Calculate and return the tax amount
  return price * taxRate;
}

/**
 * calculatePriceWithTax Function
 * Calculates the total price including tax
 * @param price - The original price before tax
 * @param category - The product category determines tax rate
 * @returns number - The total price including tax
 */
export function calculatePriceWithTax(price: number, category: string): number {
  // First, calculate the tax amount using calculateTax function
  const taxAmount = calculateTax(price, category);

  // Add the tax to the original price for the total
  return price + taxAmount;
}

/**
 * getTaxRate Function
 * Returns the applicable tax rate for a given category
 * @param category - The product category
 * @returns number - The tax rate as a decimal
 */
export function getTaxRate(category: string): number {
  // Return the appropriate tax rate based on category
  // Same logic as calculateTax, but just returns the rate itself
  return category.toLowerCase() === GROCERY_CATEGORY ? GROCERY_TAX_RATE : STANDARD_TAX_RATE;
}

