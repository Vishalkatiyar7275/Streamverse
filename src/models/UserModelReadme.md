# 🧑‍💻 User Model (Mongoose + JWT + Bcrypt)

This document outlines the structure, logic, and authentication-related methods of the `User` model used in a backend application built using Node.js, MongoDB, Mongoose, JWT, and bcrypt.

---

## 📦 Features

- Unique `username`, `email`, and `fullName` with lowercase and trim options
- Password hashing using `bcryptjs`
- JWT-based access and refresh token generation
- User-related metadata like `avatar`, `coverimage`, and `watchHistory`
- Mongoose pre-save middleware for hashing password
- Instance methods for password validation and token creation
- Timestamps for user document tracking

---

## 🧱 Schema Fields

| Field         | Type       | Description                                  |
|--------------|------------|----------------------------------------------|
| username     | String     | Unique identifier for user login             |
| email        | String     | Unique email address                         |
| fullName     | String     | Full display name of the user                |
| avatar       | String     | Cloudinary image URL for profile picture     |
| coverimage   | String     | Cloudinary image URL for cover banner        |
| watchHistory | [ObjectId] | References to `Video` documents              |
| password     | String     | Hashed password stored securely              |
| refreshToken | String     | JWT token for maintaining session            |

---

## 🔐 Authentication Logic

### Password Hashing
- Passwords are hashed using `bcryptjs` with a salt round of 10 during save operation.

### Password Validation
- `isPasswordCorrect(password)` compares raw input with the hashed password.

### Token Generation
- `generateAccessToken()` creates a short-lived token using `ACCESS_TOKEN_SECRET`
- `generateRefreshToken()` creates a longer-lived token using `REFRESH_TOKEN_SECRET`

---

## ❓ Interview Questions and Answers

### 1. **What is the difference between access token and refresh token?**

**Answer:**  
Access tokens are short-lived tokens used to authenticate user actions (e.g., 15 minutes). Refresh tokens are long-lived tokens used to obtain new access tokens without logging in again (e.g., 7 days).

---

### 2. **Why is password hashing important and how does bcrypt work?**

**Answer:**  
Hashing passwords ensures that even if the database is compromised, raw passwords aren’t leaked. `bcrypt` applies a one-way hash function with salt, making it computationally expensive to reverse or brute-force.

---

### 3. **What does the Mongoose `pre("save")` middleware do?**

**Answer:**  
It intercepts the save operation. In this case, it checks if the password has been modified and hashes it before storing it in the database.

---

### 4. **What is the purpose of `timestamps: true` in the Mongoose schema?**

**Answer:**  
It automatically adds `createdAt` and `updatedAt` fields to the document, which are useful for tracking data lifecycle and auditing changes.

---

### 5. **What does `.method` mean in Mongoose?**

**Answer:**  
It’s used to define instance methods on schema objects. These methods are available to document instances (e.g., user objects) and are useful for operations like password comparison or token generation.

---

### 6. **What is the use of indexes in MongoDB schemas like `index: true`?**

**Answer:**  
Indexes speed up query performance. Adding `index: true` on frequently searched fields (like `username` or `fullName`) allows faster lookups and sorting.

---

### 7. **How do you ensure uniqueness of fields in Mongoose?**

**Answer:**  
By setting `unique: true` on a field (like `email` or `username`), MongoDB enforces that no two documents can have the same value for that field.

---

### 8. **How is JWT used for authentication?**

**Answer:**  
JWT encodes user data with a secret key. It’s verified on every request to ensure the user is authenticated. It avoids the need for server-side session storage.

---

### 9. **What could be a security risk if we don’t hash passwords?**

**Answer:**  
If stored in plain text, attackers gaining DB access can instantly use those credentials, potentially on other platforms (since users often reuse passwords).

---

### 10. **What are some improvements you might add to this model?**

**Answer:**
- Add email validation via regex or a custom validator
- Use statics for reusable utility functions (e.g., finding user by username/email)
- Implement token revocation or token blacklist for refresh tokens
- Add role-based access control (e.g., user/admin roles)

---

## 📚 Dependencies

- **mongoose** – ODM for MongoDB
- **bcryptjs** – Secure hashing
- **jsonwebtoken** – Token-based authentication

---

## 🧪 Sample Usage

```js
const user = await User.findOne({ email });
const isValid = await user.isPasswordCorrect(inputPassword);
const accessToken = user.generateAccessToken();
const refreshToken = user.generateRefreshToken();
