import { Product } from './models/Product.js'
import { APIService } from './services/apiService.js'
import { calculateDiscountAmount, calculateFinalPrice } from './utilities/discountCalculator.js'
import { calculateTax, calculatePriceWithTax, getTaxRate } from './utilities/taxCalculator.js'
import { handleError } from './utilities/errorHandler.js'



// Main function that orchestrates the product management workflow
async function productManagement() {
  // Print a decorative header to separate this section in the console
  console.log('\n' + '='.repeat(80))
  console.log('E-COMMERCE PRODUCT MANAGEMENT SYSTEM')
  console.log('='.repeat(80))

  // Create a new instance of the API service to handle HTTP requests
  const apiService = new APIService()

  try {
    // Shows that data fetching is starting
    console.log('\nFetching products from API...\n')

    // Fetch the first 5 products from the API that returns raw product data
    const productsData = await apiService.fetchAllProducts(5)

    // Transform raw API data into Product class instances for easier manipulation
    const products = productsData.map(data => new Product(data))

    // Log success message showing how many products were retrieved
    console.log(`Successfully fetched ${products.length} products\n`)

    // Loop through each product in the array to display details and calculate pricing
    for (const product of products) {
      // Display the basic product information like name, description, price, etc.
      product.displayDetails()

      // Calculate how much money is saved with the discount
      const discountAmount = calculateDiscountAmount(product.price, product.discountPercentage)

      // Calculate the price after applying the discount
      const finalPrice = calculateFinalPrice(product.price, product.discountPercentage)

      // Display the discount savings formatted to 2 decimal places
      console.log(`Discount Savings: $${discountAmount.toFixed(2)}`)

      // Display the discounted price formatted to 2 decimal places
      console.log(`Final Price (after discount): $${finalPrice.toFixed(2)}`)

      // Get the tax rate specific to this product's category
      const taxRate = getTaxRate(product.category)

      // Calculate the dollar amount of tax based on the discounted price
      const taxAmount = calculateTax(finalPrice, product.category)

      // Calculate the final total price including both discount and tax
      const priceWithTax = calculatePriceWithTax(finalPrice, product.category)

      // Display tax information section header
      console.log(`\nTax Information:`)

      // Show which category this product belongs to
      console.log(`   Category: ${product.category}`)

      // Convert tax rate from decimal 0.08 to percentage 8.00% and display
      console.log(`   Tax Rate: ${(taxRate * 100).toFixed(2)}%`)

      // Display the calculated tax amount in dollars
      console.log(`   Tax Amount: $${taxAmount.toFixed(2)}`)

      // Display the grand total: original price - discount + tax
      console.log(`   Total Price (with tax): $${priceWithTax.toFixed(2)}`)

      // Print a separator line between products for better readability
      console.log('\n' + '-'.repeat(80) + '\n')
    }

  } catch (error) {
    // If any error occurs during fetching or processing, uses custom error handler
    handleError(error)
  }
}

// Execute the product management function when the script runs
productManagement()