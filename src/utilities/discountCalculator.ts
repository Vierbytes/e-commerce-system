/**
 * Discount Calculator Module
 * Provides utility functions for calculating product discounts
 * Returns dollar amounts saved
 */

/**
 * calculateDiscountAmount Function
 * Calculates the dollar amount saved from a discount
 * @param price - The original price of the product
 * @param discountPercentage - The discount percentage (0-100)
 * @returns number - The dollar amount of the discount
 */
export function calculateDiscountAmount(price: number, discountPercentage: number): number {
  // Input validation: Ensure price is not negative
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }

  // Input validation: Ensure discount percentage is valid (0-100)
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  // Calculate the dollar amount of savings
  return price * (discountPercentage / 100);
}

/**
 * calculateFinalPrice Function
 * Calculates the final price after applying a discount
 * @param price - The original price of the product
 * @param discountPercentage - The discount percentage (0-100)
 * @returns number - The final price after discount
 */
export function calculateFinalPrice(price: number, discountPercentage: number): number {
  // First, calculate how much money is saved using the discount amount function
  const discountAmount = calculateDiscountAmount(price, discountPercentage);

  // Subtract the discount from the original price to get the final price
  return price - discountAmount;
}
