/**
 * Custom API Error class to handle and standardize error responses.
 * Extends the native JavaScript Error object.
 */
class ApiResponse {
    constructor(statusCode, message, data = "Success") {
        this.statusCode = statusCode;  // HTTP status code to send in response
        this.message = message;        // Human-readable message for client
        this.data = data;              // Optional data payload (default: "Success")
        this.success = statusCode < 400; // Automatically determine success flag
    }
}

export { ApiResponse };