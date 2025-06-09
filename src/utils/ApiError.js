/**
 * Custom API Error class to handle and standardize error responses.
 * Extends the native JavaScript Error object.
 */

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors=[],
        statck=""
    ){
        super(message);                // Call base Error class with message
        this.statusCode = statusCode;  // HTTP status code for response
        this.errors = errors;          // Detailed error array (optional)
        this.statck = statck;          // Stored stack trace string (typo here)
        this.data = null;              // Placeholder for any additional data
        this.success = false;          // Flag indicating failure

        if(statck) {
            this.statck = statck;
        }
        else {
            // Captures the stack trace for this error, excluding constructor frames
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
// Export the ApiError class for use in error handling middleware or routes
export { ApiError }