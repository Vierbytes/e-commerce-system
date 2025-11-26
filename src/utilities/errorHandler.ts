// Custom error class for API-related errors
export class APIError extends Error {
  // Optional property to store HTTP status codes like 404, 500, etc.
  statusCode?: number | undefined

  constructor(message: string, statusCode?: number | undefined) {
    // Call the parent Error class constructor with the error message
    super(message)

    // Set a custom name for this error type
    this.name = 'APIError'

    // Only assign statusCode if a value was provided
    if (statusCode !== undefined) {
      this.statusCode = statusCode
    }

    // Fix the prototype issue where instanceof doesn't work correctly in TypeScript PS: look a little deeper into this later
    Object.setPrototypeOf(this, APIError.prototype)
  }
}

// Custom error class for network-related failures like no internetor timeouts
export class NetworkError extends Error {
  constructor(message: string) {
    // Call the parent Error class constructor with the error message
    super(message)

    // Set a custom name for this error type
    this.name = 'NetworkError'

    // Fix the same prototype issue mentioned above
    Object.setPrototypeOf(this, NetworkError.prototype)
  }
}

// error handler that logs different error types with appropriate formatting
export function handleError(error: unknown): void {
  // Check if it's an APIError and log with status code if available
  if (error instanceof APIError) {
    console.error(`\n[API Error ${error.statusCode ? `- Status ${error.statusCode}` : ''}]: ${error.message}`)
  }
  // Check if it's a NetworkError and log accordingly
  else if (error instanceof NetworkError) {
    console.error(`\n[Network Error]: ${error.message}`)
  }
  // Check if it's a generic Error object
  else if (error instanceof Error) {
    console.error(`\n[Error]: ${error.message}`)
  }
  // Handle anything else that was thrown like strings, objects, etc.
  else {
    console.error(`\n[Unknown Error]: ${String(error)}`)
  }
}