export function calculateDiscountAmount(price: number, discountPercentage: number): number {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  return price * (discountPercentage / 100);
}

export function calculateFinalPrice(price: number, discountPercentage: number): number {
  const discountAmount = calculateDiscountAmount(price, discountPercentage);
  return price - discountAmount;
}
