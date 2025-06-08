📦 API Utilities – Error Handling, Responses & Async Wrapper
This module provides three core utilities commonly used in Express.js backends:

✅ ApiError – Custom structured error object

✅ ApiResponse – Unified success response format

✅ asyncHandler – Wrapper to handle async route errors cleanly

1. 🛑 ApiError – Custom Error Class
Used to throw consistent and meaningful errors across your application.

// Error Handler Class
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.statck = statck;
        this.data = null;
        this.success = false;

        if (statck) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };

📘 Explanation:
statusCode: HTTP status code (e.g., 400, 404, 500).

message: Human-readable error message.

errors: Optional array of detailed errors (e.g., validation errors).

stack: Custom stack trace (optional).

Automatically captures stack trace if not provided.


2. ✅ ApiResponse – Success Response Wrapper
Creates a consistent success response format for your APIs.


// Standard API Response Class
class ApiResponse {
    constructor(statusCode, message, data = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };

📘 Explanation:
Used for formatting standard API success responses.

Automatically sets success = true if status is below 400.

Keeps your controller responses clean and predictable.

3. 🔁 asyncHandler – Async Route Wrapper
Helps you avoid repetitive try-catch blocks by handling errors from async functions automatically.

✅ Approach 1: Promise-based wrapper (Recommended)

// Approach 1: Using a Promise-based async handler
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler()).catch((err) => next(err));
    };
};

export { asyncHandler };
❗ Note: This implementation has a bug — requestHandler() needs to be passed req, res, next. You might want to use the approach below instead.


🛠️ Approach 2: Try-Catch Wrapper (More Common)
const asyncHandler = (fn) => async (req, res, next) => {
     try {
         await fn(req, res, next);
     } catch (error) {
         res.status(error.code || 500).json({
             success: false,
             message: error.message || "Internal Server Error"
         });
     }
};

📁 File Structure Suggestion
utils/
├── ApiError.js       # Custom error class
├── ApiResponse.js    # Standard response formatter
└── asyncHandler.js   # Wrapper for async routes
