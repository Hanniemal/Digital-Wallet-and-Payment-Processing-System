# 📘 Digital Wallet & Payment Processing API

## 🚀 Project Overview

The **Digital Wallet & Payment Processing API** is a RESTful backend system built with Node.js and Express.

This system enables users to:

* Register and authenticate securely
* Create and manage digital wallets
* Perform deposits, withdrawals, and transfers
* Track transaction history
* Enforce role-based access control (Admin, Staff, User)

The project demonstrates secure API development, database integration, financial transaction logic, and clean architecture following industry best practices.

---

# 🏗 Problem Statement

Many fintech startups and SMEs require a secure backend system to:

* Manage user accounts
* Handle wallet balances
* Process financial transactions safely
* Enforce role-based access
* Maintain transaction integrity

This API solves that problem by implementing a scalable digital wallet infrastructure using PostgreSQL and JWT authentication.

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB 
* Sequelize ORM

### Authentication & Security

* JWT (jsonwebtoken)
* bcrypt (password hashing)
* Helmet (security headers)
* express-rate-limit (API rate limiting)

### Logging

* Morgan

### Documentation

* Swagger (swagger-ui-express)
* Postman Collection

---

# 📂 Project Structure

```
digital-wallet-api/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│
├── app.js
├── server.js
├── .env.example
├── .gitignore
├── README.md
```

### Folder Responsibilities

* **controllers/** → Handles request & response logic
* **routes/** → Defines API endpoints
* **services/** → Business logic layer
* **models/** → Database schemas and relationships
* **middlewares/** → Auth, RBAC, validation, error handling
* **utils/** → Helper functions
* **config/** → Database and environment configuration

---

# 🌿 Branching Strategy

We follow a structured Git workflow:

### Main Branches

* `main` → Production-ready code
* `develop` → Integration branch

### Feature Branches

Each team works on a dedicated feature branch:

```
feature/auth-system
feature/user-management
feature/wallet-system
feature/transaction-engine
feature/system-infrastructure
```

### Workflow

1. Branch from `develop`
2. Implement feature
3. Open Pull Request to `develop`
4. Team Lead reviews & merges
5. Final integration: `develop` → `main`

---

# 🔐 Authentication & Roles

The system implements:

* JWT-based authentication
* Password hashing with bcrypt
* Role-based access control:

  * Admin
  * Staff
  * User

Sensitive routes are protected using middleware.

---

# 💳 Core Features

### User Management

* Register
* Login
* Role updates (Admin only)
* User listing (Admin only)

### Wallet Management

* Automatic wallet creation
* View wallet balance
* Currency support (NGN default)

### Transaction System

* Deposit
* Withdraw
* Transfer
* Transaction history
* Atomic database transactions for financial integrity

---

# 🗄 Database Schema Overview

### Users

* id (UUID)
* email
* password
* role
* created_at

### Wallets

* id (UUID)
* user_id (FK)
* balance
* currency
* created_at

### Transactions

* id (UUID)
* wallet_id (FK)
* type
* amount
* status
* reference
* created_at

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <repo-link>
cd digital-wallet-api
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file using the example below:

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/wallet_db
JWT_SECRET=your_super_secret_key
```

---

## 4️⃣ Setup MongoDB 

1. Install MongoDB 
2. Create database:

```sql
CREATE DATABASE wallet_db;
```

---

## 5️⃣ Run the Application

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# 📄 API Documentation

Swagger documentation will be available at:

```
http://localhost:5000/api-docs
```

Postman collection will also be included in the repository.

---

# 🛡 Security Measures

* Password hashing
* JWT authentication
* Role-based route protection
* Rate limiting
* Helmet security headers
* Centralized error handling
* Request logging

---

# 👨‍💻 Team Collaboration Rules

* Do not push directly to `main`
* Always create feature branches
* All PRs must be reviewed before merge
* Write clear commit messages
* Ensure code passes linting and runs without errors

---

# 📦 Deliverables

* GitHub repository
* Clean folder structure
* API documentation
* Postman collection
* Sample `.env.example`
* README file

---

# 🏁 Status

🚧 Under Active Development