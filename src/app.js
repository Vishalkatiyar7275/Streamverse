// Import necessary middlewares and modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Create an instance of the Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for specified origin
// - Allows browser to access APIs hosted on a different domain
// - `credentials: true` allows cookies to be included in requests
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests only from this origin
    credentials: true                // Enable sending cookies and auth headers
}));

// Parse incoming JSON requests
// - Limits payload size to 16kb to prevent large payload attacks
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded form data (e.g., from HTML forms)
// - Also limits size to 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the 'public' directory
// - Useful for serving images, CSS, JS files, etc.
app.use(express.static('public'));

// Parse cookies attached to the client request object
// - Makes `req.cookies` available
app.use(cookieParser());

// Export the configured app instance for use in server.js or other entry points
export { app };










/*
❓ Possible Interview Questions
Q1: Why is express.json() limited to 16kb?
A: To protect the server from DoS attacks that send large payloads to exhaust memory or crash the service.

Q2: What does credentials: true in CORS do?
A: It allows cookies and credentials (like authorization headers) to be sent in cross-origin requests.

Q3: What’s the purpose of express.static('public')?
A: To serve static resources such as images, JS files, or stylesheets directly from the server.

Q4: When would you need cookie-parser middleware?
A: When you’re handling cookies, e.g., for sessions or authentication, and need to access them via req.cookies.

Q5: What's the difference between express.urlencoded() and express.json()?
A:

express.json() parses JSON payloads.

express.urlencoded() parses form submissions (application/x-www-form-urlencoded).
*/