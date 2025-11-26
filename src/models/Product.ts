/**
 * ProductData Interface
 * Defines the structure of product data received from the API
 */
export interface ProductData {
  id: number;                    // Unique identifier for the product
  title: string;                 // Product name/title
  description: string;           // Detailed product description
  price: number;                 // Base price before any discounts
  discountPercentage: number;    // Discount percentage
  rating: number;                // Product rating
  stock: number;                 // Available quantity in stock
  brand: string;                 // Brand/manufacturer name
  category: string;              // Product category
  thumbnail: string;             // URL to product thumbnail image
  images: string[];              // Array of product image URLs
}

/**
 * Product Class
 * Represents a single product in the e-commerce system
 * encapsulates product data and behaviors
 */
export class Product {
  // Product properties - matching the API response structure
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  /**
   * Constructor - Initializes a new Product instance
   * @param data - ProductData object containing all product information
   * Takes raw API data and assigns it to class properties
   */
  constructor(data: ProductData) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.discountPercentage = data.discountPercentage;
    this.rating = data.rating;
    this.stock = data.stock;
    this.brand = data.brand;
    this.category = data.category;
    this.thumbnail = data.thumbnail;
    this.images = data.images;
  }

  /**
   * displayDetails Method
   * Prints a formatted display of all product information to the console
   * Uses template literals and string methods for clean formatting
   * @returns void - only outputs to console
   */
  displayDetails(): void {
    // Create visual separator with 60 equals signs
    console.log('\n' + '='.repeat(60));
    console.log(`Product: ${this.title}`);
    console.log('='.repeat(60));

    // Display all product details with proper formatting
    console.log(`ID: ${this.id}`);
    console.log(`Brand: ${this.brand}`);
    console.log(`Category: ${this.category}`);
    console.log(`Description: ${this.description}`);

    // Format prices to 2 decimal places using toFixed() method
    console.log(`Price: $${this.price.toFixed(2)}`);
    console.log(`Discount: ${this.discountPercentage}%`);

    // Call getPriceWithDiscount() method to calculate and display discounted price
    console.log(`Price After Discount: $${this.getPriceWithDiscount().toFixed(2)}`);
    console.log(`Rating: ${this.rating}/5`);
    console.log(`Stock: ${this.stock} units`);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * getPriceWithDiscount function
   * Calculates the final price after applying the discount percentage
   * @returns number - The discounted price
   */
  getPriceWithDiscount(): number {
    // Calculate the dollar amount of the discount
    const discountAmount = this.price * (this.discountPercentage / 100);

    // Subtracts discount from original price to get final price
    return this.price - discountAmount;
  }
}

