/**
 * API Service Module
 * Handles all HTTP requests to the DummyJSON Products API
 */

import type { ProductData } from '../models/Product.js'
import { APIError, NetworkError } from '../utilities/errorHandler.js'


// API base URL - pointing to the DummyJSON fake API service
const BASE_URL = 'https://dummyjson.com'

/**
 * ProductsResponse Interface
 * Defines the structure of the API response when fetching multiple products
 * The API returns an object with products array
 */
interface ProductsResponse {
  products: ProductData[]  // Array of product objects
  total: number           // Total number of products available
  skip: number            // Number of products skipped
  limit: number           // Maximum number of products returned
}

/**
 * APIService Class
 * Encapsulates all API communication logic
 */
export class APIService {
    private baseUrl: string  // Private property - can only be accessed within this class

  /**
   * Constructor
   * Initializes the API service with a base URL
   * @param baseUrl - The base URL for API requests defaults to DummyJSON URL
   */
    constructor(baseUrl: string = BASE_URL) {
      this.baseUrl = baseUrl
    }

  /**
 * fetchAllProducts Method
 * Fetches multiple products from the API
 * @param limit - Maximum number of products to retrieve
 * @returns Promise<ProductData[]> - Array of product data objects
 *
 * Async/Await Explained:
 * - 'async' keyword makes this function return a Promise
 * - 'await' pauses execution until the Promise resolves
 * - This makes asynchronous code look synchronous and easier to read
 */
  async fetchAllProducts(limit: number = 10): Promise<ProductData[]> {
    try {
      // Step 1: Make HTTP GET request to API endpoint
      // await pauses here until fetch() completes
      // interpolation constructs URL: https://dummyjson.com/products?limit=10
      const response = await fetch(`${this.baseUrl}/products?limit=${limit}`)

      // Step 2: Check if the HTTP response was successful: status 200
      if (!response.ok) {
        // If not successful, throw a custom APIError with status code
        throw new APIError(
          `Failed to fetch products: ${response.statusText}`,
          response.status
        )
      }

      // Step 3: Parse the JSON response body
      // await pauses here until JSON parsing completes
      const data = await response.json() as ProductsResponse

      // Step 4: Return just the products array from the response
      return data.products

    } catch (error) {
      // Error handling: catches any errors that occur in the try block

      // If it's already an APIError, re-throw it without modification
      if (error instanceof APIError) {
        throw error
      }

      // TypeError usually indicates network connectivity issues
      if (error instanceof TypeError) {
        throw new NetworkError('Network connection failed. Please check your internet connection.')
      }

      // For any other unexpected errors, wrap in APIError
      throw new APIError('An unexpected error occurred while fetching products')
    }
  }
}