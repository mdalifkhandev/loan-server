# User Authentication & Profile Management Backend

This project is a Node.js backend API built with TypeScript, Express, and MongoDB (via Mongoose). It provides user authentication, registration, profile management, and password reset functionalities. The codebase is modular and follows best practices for error handling, validation, and security.

## Features

- **User Registration & Login**
  - Register new users with email, password, phone, and role.
  - Secure password hashing with bcrypt.
  - JWT-based authentication for secure access.
  - Role-based access control (user, lender, admin).

- **Profile Management**
  - Create and update user profiles.
  - Retrieve single or all user profiles.
  - Soft delete users (mark as deleted, not removed from DB).

- **Password Management**
  - Forgot password flow with OTP sent via email.
  - OTP verification and password reset.
  - Password update with current password verification.

- **Validation & Error Handling**
  - Input validation using Zod.
  - Centralized error handling with custom error classes.
  - HTTP status codes for all responses.

- **Other Features**
  - Email sending via Nodemailer for OTP.
  - Timestamps for user and profile documents.

## Project Structure

```
src/
  app/
    module/
      auth/
        auth.model.ts         # Mongoose user schema/model
        auth.interface.ts     # User TypeScript types
        auth.service.ts       # User authentication logic
        auth.validation.ts    # Zod validation schemas
      profile/
        profile.model.ts      # Mongoose profile schema/model
        profile.interface.ts  # Profile TypeScript types
        user.service.ts       # Profile and user management logic
        profile.utils.ts      # Utility functions for profile
  error/
    appError.ts              # Custom error class
  server.ts                  # Entry point, DB connection, server start
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- [Optional] Nodemailer-compatible email account for OTP

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```
   PORT=5001
   DB=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret
   NODEMILER_USER=your_email@gmail.com
   NODEMILER_PASS=your_email_password
   ```

4. **Run the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `POST /api/auth/logout` — Logout user
- `POST /api/auth/forgot-password` — Send OTP to email
- `POST /api/auth/verify-otp` — Verify OTP
- `POST /api/auth/reset-password` — Reset password

### Profile

- `GET /api/profile` — Get all user profiles
- `GET /api/profile/:id` — Get single user profile
- `PUT /api/profile` — Update or create profile

### User

- `GET /api/user/:email` — Get single user by email
- `DELETE /api/user/:email` — Soft delete user

## Validation

All input data is validated using Zod schemas. Invalid requests will return a 400 error with details.

## Error Handling

All errors are handled centrally and return appropriate HTTP status codes and messages.

## License

MIT

---

**Note:**  
- Update the MongoDB URI and email credentials in your `.env` file.
- For production, use environment variables and secure secrets management.
