# Zolvex Enterprise Backend API (Express.js + MongoDB)

Production-ready, scalable, and secure RESTful API built with **Node.js, Express.js, MongoDB, and Mongoose**.

---

## 🛠️ Architecture & Tech Stack

- **Architecture**: Layered MVC + Repository Pattern (`Controller` → `Service` → `Repository` → `MongoDB Model`).
- **Database**: MongoDB with Mongoose ORM (Indexes, Soft Deletes, Validation).
- **Authentication**: JWT Access Token (Header) + Refresh Token (HTTP-Only Cookie).
- **Authorization**: Role-Based Access Control (`user`, `technician`, `admin`, `super_admin`).
- **Security**: Helmet, CORS, Rate Limiting, NoSQL Query Injection Sanitization, bcrypt password hashing.
- **Logging**: Winston Logger (`error.log`, `combined.log`).
- **Documentation**: Swagger OpenAPI interactive UI at `/api/v1/docs`.

---

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env` file in the `server/` root:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zolvex_deepclean
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

### 2. Install Dependencies & Seed Database
```bash
npm install
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`.

---

## 📡 Key API Endpoints

### 🩺 System & Health
- `GET /api/v1/health` - Database & memory health status.
- `GET /api/v1/docs` - Interactive Swagger OpenAPI documentation.

### 🔐 Authentication
- `POST /api/v1/auth/register` - Create user account.
- `POST /api/v1/auth/login` - Authenticate & receive JWT access token + refresh cookie.
- `POST /api/v1/auth/refresh-token` - Rotate refresh token & get new access token.
- `POST /api/v1/auth/logout` - Revoke refresh token.
- `GET /api/v1/auth/me` - Authenticated user profile.

### 🧹 Services Catalog & Price Calculation
- `GET /api/v1/services` - List active services & variations.
- `GET /api/v1/services/:id` - Get service details.
- `GET /api/v1/addons` - List add-on catalog.
- `POST /api/v1/price/calculate` - Server-side dynamic price calculation.

### 📅 Booking Management
- `POST /api/v1/bookings` - Create service booking (generates `ZLV-YYYY-XXXX`).
- `GET /api/v1/bookings/search/:query` - Search booking status by ref or phone.
- `GET /api/v1/admin/bookings` - List all bookings (Admin/Super Admin only).
- `PATCH /api/v1/admin/bookings/:id/status` - Update status (Admin/Super Admin only).

---

## 🐳 Docker Deployment

To run MongoDB & API in isolated Docker containers:

```bash
docker-compose up -d --build
```
