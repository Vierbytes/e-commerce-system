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

  // Fetches a single product by its ID from the API
  async fetchProductById(id: number): Promise<ProductData> {
    try {
      // Make GET request to the products endpoint with the specific product ID
      const response = await fetch(`${this.baseUrl}/products/${id}`)

      // Check if the response status indicates failure status code outside 200-299 range
      if (!response.ok) {
        // Handle the specific case where the product doesn't exist
        if (response.status === 404) {
          throw new APIError(`Product with ID ${id} not found`, 404)
        }
        // Handle any other HTTP error responses like 500, 403, etc.
        throw new APIError(
          `Failed to fetch product: ${response.statusText}`,
          response.status
        )
      }

      // Parse the JSON response body and cast it to ProductData type
      const data = await response.json() as ProductData
      return data
    } catch (error) {
      // If we already threw an APIError above, re-throw it without modification
      if (error instanceof APIError) {
        throw error
      }
      // TypeError is thrown by fetch when there's a network failure
      if (error instanceof TypeError) {
        throw new NetworkError('Network connection failed. Please check your internet connection.')
      }
      // Catch-all for any other unexpected errors
      throw new APIError('An unexpected error occurred while fetching the product')
    }
  }

  /**
  * fetchProductsByCategory function
  * Fetches products filtered by category
  * @param category - The category name to filter by like 'laptops', 'beauty' anf others we can pass through the category variable
  * @param limit - Maximum number of products to retrieve, which is set to 10
  * @returns Promise<ProductData[]> - Array of products in the specified category
  * - Path parameters for filtering - category
  * - Query parameters for limiting results - limit
  */
  async fetchProductsByCategory(category: string, limit: number = 10): Promise<ProductData[]> {
    try {
      // Make GET request with both path parameter `category` and query parameter `limit`
      // URL example: https://dummyjson.com/products/category/laptops?limit=10
      const response = await fetch(`${this.baseUrl}/products/category/${category}?limit=${limit}`)

      if (!response.ok) {
        // Handle case where category doesn't exist
        if (response.status === 404) {
          throw new APIError(`Category '${category}' not found`, 404)
        }

        throw new APIError(
          `Failed to fetch products by category: ${response.statusText}`,
          response.status
        )
      }

      // Parse response and extract products array
      const data = await response.json() as ProductsResponse
      return data.products

    } catch (error) {
      // Consistent error handling pattern
      if (error instanceof APIError) {
        throw error
      }
      if (error instanceof TypeError) {
        throw new NetworkError('Network connection failed. Please check your internet connection.')
      }
      throw new APIError('An unexpected error occurred while fetching products by category')
    }
  }

  /**
 * searchProducts Method
 * Searches for products by keyword query
 * @param query - The search term to look for
 * @param limit - Maximum number of results to return, default set to 10
 * @returns Promise<ProductData[]> - Array of matching products
 * - URL encoding for search queries
 * - Query parameters for search and `pagination` - which it the act of splitting large datasets into smaller chunks for a boost to performance
 */
  async searchProducts(query: string, limit: number = 10): Promise<ProductData[]> {
    try {
      // encodeURIComponent() helps make sure special characters in search query are properly encoded
      // Example: 'phone case' becomes 'phone%20case' in the URL
      // URL example: https://dummyjson.com/products/search?q=phone&limit=10
      const response = await fetch(`${this.baseUrl}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`)

      if (!response.ok) {
        throw new APIError(
          `Failed to search products: ${response.statusText}`,
          response.status
        )
      }

      // Parse and return search results
      const data = await response.json() as ProductsResponse
      return data.products

    } catch (error) {
      // error handling
      if (error instanceof APIError) {
        throw error
      }
      if (error instanceof TypeError) {
        throw new NetworkError('Network connection failed. Please check your internet connection.')
      }
      throw new APIError('An unexpected error occurred while searching products')
    }
  }
}