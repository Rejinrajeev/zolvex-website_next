# Zolvex DeepClean - Full-Stack Enterprise Platform

Zolvex DeepClean is a mobile-first, enterprise-grade deep cleaning web application and content management system built with **Next.js 16 (React 19)**, **TailwindCSS**, and a **production-ready Express.js + MongoDB** backend architecture.

---

## 🏗️ Project Architecture

The project follows a clean decoupled structure with separate client and server applications orchestrated from the root:

```
zolvex-deepclean/
├── client/                     # Next.js 16 Frontend Application (Port 3000)
│   ├── src/
│   │   ├── app/                # App Router Pages (Home, Services, Track, Admin)
│   │   │   └── admin/          # Admin Dashboard & Security Modules
│   │   │       ├── cms/        # Complete Website CMS Content Editor
│   │   │       ├── bookings/   # Booking Control Center & CSV Export
│   │   │       ├── offers/     # Promotional Coupons & Discount Rules Engine
│   │   │       ├── theme/      # Live Color & Layout Customizer
│   │   │       ├── users/      # User Accounts & RBAC Role Manager
│   │   │       ├── messages/   # Customer Inbox & Testimonial Approval
│   │   │       ├── security/   # TOTP MFA Setup & Active Device Sessions
│   │   │       └── audit-logs/ # Searchable & Exportable Security Audit Logs
│   │   ├── components/         # Reusable UI & Layout Components
│   │   ├── context/            # CMS & Live Theme Token Provider
│   │   └── lib/                # API REST Client Helper
│   ├── public/                 # Static Assets & Images
│   ├── next.config.ts          # API Proxy Rewrites
│   └── package.json
│
├── server/                     # Enterprise Express.js + MongoDB Backend (Port 5000/5002)
│   ├── src/
│   │   ├── config/             # Config Loader & Winston Logger
│   │   ├── database/           # Mongoose Connection & Graceful Shutdown
│   │   ├── models/             # Mongoose Schemas (User, Service, Addon, Booking, Offer, Theme, Content, AuditLog, RefreshToken)
│   │   ├── repositories/       # Data Access Layer & Fallback Store
│   │   ├── services/           # Business Logic (Price Engine, Auth, Bookings, Admin CMS)
│   │   ├── controllers/        # Express Request/Response Handlers
│   │   ├── middleware/         # Auth, RBAC, Zod Validation, Error Handler, Rate Limiting, Helmet
│   │   ├── routes/v1/          # Versioned REST Router (/api/v1)
│   │   ├── validators/         # Zod Request Validation Schemas
│   │   ├── utils/              # RFC 6238 TOTP Engine, ApiResponse, AppErrors, JWT & bcrypt helpers
│   │   ├── seeders/            # Database Seeder (seed.js)
│   │   ├── docs/               # Interactive Swagger OpenAPI Generator
│   │   ├── app.js              # Express app setup
│   │   └── server.js           # HTTP listener & process signal handlers
│   ├── .env
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
└── package.json                # Root Orchestrator (concurrently starts client & server)
```

---

## 🛡️ Enterprise Security Features

- **TOTP Multi-Factor Authentication (MFA)**: Native RFC 6238 TOTP HMAC-SHA1 engine supporting Google Authenticator & Microsoft Authenticator with 8 single-use emergency recovery backup codes.
- **Brute-Force Lockout Policy**: Automatically locks account for 15 minutes after 5 consecutive failed login attempts.
- **Multi-Device & Session Management**: Tracks device IP, browser, OS, and last active timestamp in MongoDB with one-click remote session revocation.
- **Security Headers & Sanitization**: Powered by `helmet` headers, CORS protection, `express-mongo-sanitize` (NoSQL injection defense), and rate limiting.
- **Searchable & Exportable Audit Logs**: Immutable log tracking logins, MFA verification, CMS text updates, and coupon creation with CSV export.

---

## 📡 Key REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | System health, uptime & database status |
| `GET` | `/api/v1/docs` | Interactive Swagger / OpenAPI Documentation |
| `GET` | `/api/v1/services` | Active services catalog & variations |
| `POST` | `/api/v1/price/calculate` | Server-side dynamic price calculation engine |
| `POST` | `/api/v1/bookings` | Create new service booking (`ZLV-2026-XXXX`) |
| `GET` | `/api/v1/bookings/search/:query` | Search booking by phone or reference number |
| `POST` | `/api/v1/auth/login` | Admin login step 1 (Email/Password) |
| `POST` | `/api/v1/auth/verify-mfa` | Admin login step 2 (TOTP 6-digit verification) |
| `GET` | `/api/v1/admin/analytics` | Overview KPI stat cards & revenue charts |
| `PUT` | `/api/v1/admin/content` | Update website copy dynamically across all pages |
| `GET/POST` | `/api/v1/admin/offers` | Create and list promotional coupon codes |
| `PUT` | `/api/v1/admin/theme` | Update website live color palette & layout tokens |

---

## 🏃 Getting Started & Running Locally

### 1. Install Dependencies
```bash
# Install root orchestrator dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 2. Start Development Environment
```bash
# Start Next.js Frontend (Port 3000) & Express Backend (Port 5000/5002) concurrently
npm run dev
```

### 3. Seed MongoDB Initial Data
```bash
npm run seed
```

---

## 🐳 Docker Production Deployment

```bash
cd server
docker-compose up -d --build
```
