// Approach 1: Using a promise-based async handler/wrapper

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Execute the requestHandler, and if it returns a rejected promise, catch and pass the error to 'next'
        Promise
            .resolve(requestHandler(req, res, next))  // 🔧 Missing parameters in original code
            .catch((err) => next(err));
    };
};

export { asyncHandler };






/*
Approach 2: Using a custom async handler function

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        // Wait for the route handler to complete
        await fn(req, res, next);
    } catch (error) {
        // If an error occurs, respond with error message and status
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};
*/

/*
📘 Purpose of asyncHandler
Express doesn’t handle unhandled promise rejections in async functions automatically. These wrappers catch any errors thrown in async route handlers and pass them to Express's next() function for centralized error handling.

❓ Interview Questions and Answers
Q1: Why do we need an asyncHandler in Express?
A: Express doesn't catch errors in asynchronous route handlers. asyncHandler ensures unhandled promise rejections are caught and forwarded to error middleware using next(err).

Q2: What is the difference between the two approaches?
A:

Approach 1 uses native promise resolution and passes any rejections to next().

Approach 2 uses a traditional try/catch block and can also directly send an error response if needed.

Q3: Which approach is better?
A: Approach 1 is more concise and delegates error handling to a global middleware. Approach 2 offers more control (e.g., sending a response directly), but both are valid.

Q4: What happens if we don't use asyncHandler and an async function throws?
A: The error will not be caught and the server may hang or crash without proper response.


*/
