
<!-- LAZYDOCS START -->
# Project Title job-app-backend

This project is a backend application designed for user authentication, leveraging Express.js and MongoDB to handle user registration, login, and secure access to protected routes. Key technologies include Mongoose for database schema modeling, bcryptjs for password hashing, and JSON Web Tokens (JWT) for authorization. Users can sign up with name, email, phone number, and password (automatically hashed via pre-save hooks) or log in with email and password, receiving a time-limited JWT upon successful authentication. Protected routes utilize middleware to verify tokens, granting access to authorized users. The API integrates CORS for cross-origin compatibility, environment variables for security, and follows modular architecture with dedicated controllers, models, and utilities for token generation, ensuring scalability and maintainability.

## Tech Stack
- **Runtime:** Node.js
- **Dependencies:** 
bcryptjs
cors
dotenv
express
jsonwebtoken
mongoose
- **Dev Tools:** 
bcryptjs
cors
dotenv
express
jsonwebtoken
mongoose


## Installation
Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd <project>
npm install   # or yarn / pnpm
```

## Usage
Run the development server:

```bash
npm run dev
```


## Project Structure
No src directory found.

<!-- LAZYDOCS END -->
