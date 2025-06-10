// Importing required modules
import mongoose, { Schema } from "mongoose";     // Mongoose is used to model MongoDB documents in Node.js
import jwt from "jsonwebtoken";                  // JWT (JSON Web Token) is used for generating authentication tokens
import bcrypt from "bcrypt";                   // Bcrypt is used to hash and compare passwords securely

// Defining the schema for the User collection
const userSchema = new Schema({
    // Unique username (used for login/display)
    username: {
        type: String,
        required: true,
        unique: true,     // Ensures username is not repeated
        lowercase: true,  // Store as lowercase
        trim: true,       // Removes whitespace from both ends
        index: true       // For faster search queries
    },
    // User's email address
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    // Full name of the user
    fullName: {
        type: String,
        required: true,
        trim: true,
        index : true
    },
    // Profile picture stored as a URL (typically from Cloudinary)
    avatar: {
        type: String,
        required: true
    },
    // Cover image stored as a URL
    coverimage: {
        type: String,
        required: true
    },
    // Reference to videos watched by user, related to 'Video' model
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"     // References the Video model
        } 
    ],
    // Encrypted password
    password: {
        type: String,
        required: [true, "Password is required"],  // Custom error message if missing
    },
    // Token for session continuation (refresh)
    refreshToken: {
        type: String,
    },
},
{
    timestamps: true   // Automatically adds createdAt and updatedAt fields
})  

// Mongoose Middleware: Before saving a user document,
// if password is modified, hash it using bcrypt.
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);  // Hash with 10 salt rounds
    }
    next(); // Continue to save operation
});

// Instance Method: Compares input password with stored hash
userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);  // Returns true if matched
}

// Instance Method: Generates access token (short-lived)
userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,               // MongoDB ObjectId
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key from env
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // e.g., "15m"
        });
}

// Instance Method: Generates refresh token (longer-lived)
userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key from env
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY  // e.g., "7d"
        }); 
}

// Exporting the model so it can be used elsewhere in the application
export const User = mongoose.model("User", userSchema);

















