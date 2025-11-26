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

  } catch (error) {
    // If any error occurs during fetching or processing, handle it with our custom error handler
    handleError(error)
  }
}

// Execute the product management function when the script runs
productManagement()