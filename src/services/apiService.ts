/**
 * API Service Module
 * Handles all HTTP requests to the DummyJSON Products API
 */

import type { ProductData } from '../models/Product.js';

// API base URL - pointing to the DummyJSON fake API service
const BASE_URL = 'https://dummyjson.com';

/**
 * ProductsResponse Interface
 * Defines the structure of the API response when fetching multiple products
 * The API returns an object with products array
 */
interface ProductsResponse {
  products: ProductData[];  // Array of product objects
  total: number;           // Total number of products available
  skip: number;            // Number of products skipped
  limit: number;           // Maximum number of products returned
}

/**
 * APIService Class
 * Encapsulates all API communication logic
 */
export class APIService {
  private baseUrl: string;  // Private property - can only be accessed within this class

  /**
   * Constructor
   * Initializes the API service with a base URL
   * @param baseUrl - The base URL for API requests defaults to DummyJSON URL
   */
  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }
}