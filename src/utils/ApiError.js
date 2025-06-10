/**
 * Custom API Error class to handle and standardize error responses.
 * Extends the native JavaScript Error object.
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors=[],
        stack=""
    ){
        super(message);                // Call base Error class with message
        this.statusCode = statusCode;  // HTTP status code for response
        this.errors = errors;          // Detailed error array (optional)
        this.stack = stack;            // Stored stack trace string (typo here)
        this.data = null;              // Placeholder for any additional data
        this.success = false;          // Flag indicating failure

        if(stack) {
            this.stack = stack;
        }
        else {
            // Captures the stack trace for this error, excluding constructor frames
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
// Export the ApiError class for use in error handling middleware or routes
export { ApiError }