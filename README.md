# Digital Wallet and Payment Processing API

REST API for user authentication, wallet management, and transaction processing using Node.js, Express, and MongoDB.

## Features

- User registration and login
- JWT authentication and protected routes
- Role-based access control (`admin`, `staff`, `user`)
- User management endpoints (admin-protected actions)
- Automatic wallet creation on registration
- Wallet details and balance retrieval
- Deposit, withdraw, and wallet-to-wallet transfer
- Transaction history with pagination
- Atomic transaction operations using MongoDB sessions
- Security and infrastructure middleware:
  - Helmet
  - Rate limiting
  - Request logging (Morgan with custom logger stream)
  - Centralized error handling
  - Global request body validation
- Swagger docs at `/api-docs`
- Postman collection included

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)

## Project Structure

```text
.
|-- server.js
|-- src/
|   |-- app.js
|   |-- swagger.js
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   |-- user.controller.js
|   |   |-- wallet.controller.js
|   |   `-- transaction.controller.js
|   |-- routes/
|   |   |-- auth.routes.js
|   |   |-- user.routes.js
|   |   |-- wallet.routes.js
|   |   `-- transaction.routes.js
|   |-- services/
|   |   |-- auth.service.js
|   |   |-- user.service.js
|   |   |-- wallet.service.js
|   |   `-- transaction.service.js
|   |-- models/
|   |   |-- index.js
|   |   |-- user.model.js
|   |   |-- wallet.model.js
|   |   `-- transaction.model.js
|   |-- middlewares/
|   |   |-- auth.middleware.js
|   |   |-- role.middleware.js
|   |   |-- error.middleware.js
|   |   `-- validate.middleware.js
|   `-- utils/
|       |-- logger.js
|       `-- generateToken.js
`-- postman/
    `-- auth.postman_collection.json
```

## Setup and Run

### 1. Clone

```bash
git clone <your-repo-url>
cd Digital-Wallet-and-Payment-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` and set values:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digital_wallet
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=1d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
API_BASE_URL=http://localhost:5000
```

### 4. Start the API

Development:

```bash
npm run dev
```

Production-like:

```bash
npm start
```

## API Access

- Base URL: `http://localhost:5000`
- Health check: `GET /health`
- Swagger UI: `GET /api-docs`

## Main Route Groups

- Auth: `/api/auth`
- Users: `/api/users`
- Wallets: `/api/wallets`
- Transactions: `/api/transactions`

## Postman

Import:

- `postman/auth.postman_collection.json`

Set collection variable:

- `baseUrl = http://localhost:5000`

Then run register/login and store JWT token for protected endpoints.

## Branching Workflow

- `main`: production-ready branch
- `develop`: integration branch
- feature branches:
  - `feature/auth-system`
  - `feature/user-management`
  - `feature/wallet-system`
  - `feature/transaction-engine`
  - `feature/system-infrastructure`

Recommended flow:

1. Branch from `develop`
2. Implement feature
3. Open PR to `develop`
4. After validation, promote `develop` to `main`

