# 🚀 MyMail — Email Infrastructure SaaS Platform

<p align="center">

<img src="./frontend/public/gungif3.gif" alt="MyMail Logo" width="180"/>

</p>

<h3 align="center">Powerful • Secure • Developer-Friendly Email Infrastructure</h3>

<p align="center">
  A production-oriented Email SaaS platform for managing projects, API keys, templates and transactional email delivery.
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email%20Engine-EA4335?style=for-the-badge)

</p>

---

## 🌐 Live Application

### ⭐ MyMail User Application

**Live Website:**
https://mymail-alpha.vercel.app/

### ⚡ Backend API

**Production API:**
https://mymail-backend.vercel.app/

> MyMail uses a React/Vite frontend connected to a Node.js/Express backend with MongoDB and SMTP-based email delivery.

---

# ✨ What is MyMail?

**MyMail** is a modern **Email Infrastructure SaaS Platform** designed to provide developers and businesses with a simple way to manage transactional email delivery.

Instead of implementing email infrastructure from scratch, users can:

```text
Create Account
      ↓
Create Project
      ↓
Generate API Key
      ↓
Create / Select Email Template
      ↓
Send Emails Through API
      ↓
Track Email Logs
      ↓
Monitor Usage & Analytics
```

The platform follows a multi-tenant architecture:

```text
USER
 │
 ├── Projects
 │     │
 │     ├── API Keys
 │     │
 │     └── Templates
 │
 └── Email Engine
        │
        └── Email Logs
```

---

# 🎯 Core Features

## 🔐 Authentication

* User registration
* Email verification
* Secure login
* JWT access tokens
* HTTP-only refresh-token cookies
* Refresh-token rotation
* Forgot password
* Password reset
* Secure password hashing using bcrypt
* Logout
* Session invalidation after password change/reset

---

## 📁 Project Management

Users can create and manage independent email projects.

### Project Features

* Create project
* View projects
* View project details
* Update project
* Deactivate project
* Project ownership validation
* Website URL
* Allowed domains
* Project status management

---

## 🔑 API Key Management

MyMail provides secure API key based email authentication.

Supported key types:

```text
Development
Production
```

Example:

```text
pk_test_********
pk_live_********
```

### Security

Raw API keys are **never stored directly**.

The platform stores a secure hash:

```text
Raw API Key
     ↓
SHA-256 Hash
     ↓
Database
```

The raw key is returned only during generation/regeneration.

---

# 📧 Email Engine

The email engine allows external applications to send emails using an API key.

### Example Request

```http
POST /api/email/send
x-api-key: YOUR_API_KEY
Content-Type: application/json
```

```json
{
  "to": "customer@example.com",
  "data": {
    "userName": "Rahul",
    "orderId": "ORD123",
    "amount": "999"
  }
}
```

The backend validates the API key, identifies the associated project and processes the configured template.

---

# 🧩 Dynamic Email Templates

Templates support dynamic variables such as:

```text
{{userName}}
{{orderId}}
{{amount}}
{{companyName}}
```

Example:

```html
<h1>Hello {{userName}}</h1>

<p>Your order {{orderId}} has been successfully processed.</p>

<p>Total Amount: ₹{{amount}}</p>
```

Variables can be populated from project settings and request data.

---

# 📝 Email Logs

Every email delivery attempt can be recorded with information such as:

* Recipient
* Sender
* Subject
* Project
* Template
* Delivery status
* Provider
* Message ID
* Error message
* Timestamp
* Metadata

Supported statuses:

```text
pending
sent
failed
```

---

# 📊 Dashboard & Analytics

The user dashboard provides information such as:

* Total projects
* Emails sent
* Success rate
* Recent activity
* Recent projects
* Email usage

The platform also includes analytics functionality for monitoring email activity.

---

# 👑 Admin Dashboard

MyMail includes a **separate Admin Frontend** for platform administration.

### Admin Features

```text
Admin Login
    ↓
Admin Dashboard
    ├── Users
    ├── User Details
    ├── Projects
    ├── Project Details
    ├── Emails
    ├── Email Details
    ├── Templates
    ├── API Keys
    ├── Analytics
    ├── Activities
    └── Admin Profile
```

### Admin Capabilities

* View platform overview
* Manage users
* Block / unblock users
* Manage projects
* Activate / deactivate projects
* Manage system templates
* Monitor email activity
* View API key usage
* View analytics
* Track admin activities
* Manage admin profile

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │      USER FRONTEND      │
                    │      React + Vite       │
                    │        Vercel           │
                    └────────────┬────────────┘
                                 │
                                 │ HTTPS / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │       BACKEND API       │
                    │    Node.js + Express     │
                    │         Vercel           │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
       │   MongoDB   │    │    SMTP     │    │    JWT      │
       │  Database   │    │ Nodemailer  │    │    Auth     │
       └─────────────┘    └─────────────┘    └─────────────┘
                                 ▲
                                 │
                    ┌────────────┴────────────┐
                    │     ADMIN FRONTEND      │
                    │      React + Vite       │
                    │    Separate Application │
                    └─────────────────────────┘
```

---

# 🔄 Email Sending Flow

```text
External Application
        │
        │ x-api-key
        ▼
┌──────────────────┐
│ API Key Middleware│
└────────┬─────────┘
         │
         ▼
 Validate Key
         │
         ▼
 Identify Project
         │
         ▼
 Resolve Template
         │
         ▼
 Replace Variables
         │
         ▼
 SMTP / Nodemailer
         │
      ┌──┴──┐
      ▼     ▼
    SENT   FAILED
      │     │
      └──┬──┘
         ▼
     Email Log
```

---

# 🔐 Security Architecture

Security is one of the core principles of MyMail.

### Authentication

```text
JWT Access Token
        +
HTTP-only Refresh Token
```

### Password Security

```text
Plain Password
      ↓
bcrypt
      ↓
Hashed Password
      ↓
MongoDB
```

### API Key Security

```text
Raw API Key
      ↓
SHA-256
      ↓
Hashed Key
      ↓
MongoDB
```

### Additional Security

* Helmet
* CORS
* Express Rate Limiting
* JWT verification
* Role-based authorization
* Project ownership validation
* API key status validation
* Refresh token invalidation
* Soft deletion/status management
* Environment variable based secrets

---

# 🛡️ Rate Limiting

Authentication endpoints are protected using rate limiting.

Current configuration:

```text
Window: 15 minutes
Maximum Attempts: 5
```

Applied to important endpoints such as:

```text
Login
Register
Forgot Password
```

---

# 🧰 Technology Stack

## Backend

| Technology         | Purpose               |
| ------------------ | --------------------- |
| Node.js            | Runtime               |
| Express.js         | REST API              |
| MongoDB            | Database              |
| Mongoose           | ODM                   |
| JWT                | Authentication        |
| bcryptjs           | Password hashing      |
| Nodemailer         | Email delivery        |
| Helmet             | Security              |
| CORS               | Cross-origin requests |
| express-rate-limit | Rate limiting         |
| Morgan             | HTTP logging          |

## Frontend

| Technology     | Purpose           |
| -------------- | ----------------- |
| React          | UI                |
| Vite           | Frontend tooling  |
| React Router   | Routing           |
| Redux Toolkit  | State management  |
| Axios          | API communication |
| CSS / Tailwind | UI styling        |

## Deployment

```text
Frontend → Vercel
Backend  → Vercel
Database → MongoDB
Email    → SMTP / Nodemailer
```

---

# 📂 Project Structure

```text
mail/
│
├── backend/
│   │
│   ├── scripts/
│   │   └── createAdmin.js
│   │
│   └── src/
│       ├── config/
│       ├── middlewares/
│       ├── utils/
│       ├── models/
│       ├── controllers/
│       ├── routes/
│       └── services/
│
│
├── frontend/
│   │
│   ├── public/
│   │   └── gungif3.gif
│   │
│   └── src/
│       ├── app/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── routes/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── features/
│       ├── modules/
│       ├── App.jsx
│       └── main.jsx
│
│
├── adminfrontend/
│   │
│   ├── public/
│   │
│   └── src/
│       ├── app/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── services/
│       ├── features/
│       ├── routes/
│       ├── modules/
│       ├── hooks/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
│
├── .gitignore
└── README.md
```

---

# 🔌 API Overview

Production backend:

```text
https://mymail-backend.vercel.app
```

API base:

```text
https://mymail-backend.vercel.app/api
```

### Authentication

```text
POST /auth/register
GET  /auth/verify-email/:token
POST /auth/login
POST /auth/logout
POST /auth/refresh-token
POST /auth/forgot-password
POST /auth/reset-password/:token
```

### Profile

```text
GET /profile
PUT /profile
PUT /profile/change-password
```

### Projects

```text
POST   /projects
GET    /projects
GET    /projects/:id
PUT    /projects/:id
DELETE /projects/:id
```

### API Keys

```text
POST /projects/:projectId/api-key
GET  /projects/:projectId/api-key
PUT  /projects/:projectId/api-key/regenerate
PUT  /projects/:projectId/api-key/status
```

### Templates

```text
GET    /templates
GET    /templates/system
GET    /templates/:id
POST   /templates
PUT    /templates/:id
DELETE /templates/:id
```

### Email

```text
POST /email/send
```

### Email Logs

```text
GET /email-logs
GET /email-logs/:id
```

### Dashboard

```text
GET /dashboard
```

---

# 👑 Admin API

Admin APIs are protected using:

```text
JWT Authentication
        +
Admin Role Verification
```

### Overview

```text
GET /admin-dashboard/admin/overview
```

### Users

```text
GET /admin-dashboard/admin/users
GET /admin-dashboard/admin/users/:id
PUT /admin-dashboard/admin/users/:id/status
```

### Projects

```text
GET /admin-dashboard/admin/projects
GET /admin-dashboard/admin/projects/:id
PUT /admin-dashboard/admin/projects/:id/status
```

### Emails

```text
GET /admin-dashboard/admin/emails
GET /admin-dashboard/admin/emails/:id
GET /admin-dashboard/admin/email-stats
```

### Templates

```text
GET    /admin-dashboard/admin/templates
POST   /admin-dashboard/admin/templates
PUT    /admin-dashboard/admin/templates/:id
DELETE /admin-dashboard/admin/templates/:id
```

### API Keys

```text
GET /admin-dashboard/api-keys/overview
GET /admin-dashboard/api-keys
```

### Analytics

```text
GET /admin-dashboard/analytics
```

### Activities

```text
GET /admin-dashboard/activity
GET /admin-dashboard/activity/:id
```

### Admin Profile

```text
GET /admin-dashboard/admin/profile
PUT /admin-dashboard/admin/profile
PUT /admin-dashboard/admin/profile/change-password
```

---

# ⚙️ Local Development

## 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd mail
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

EMAIL_FROM_NAME=MyMail
EMAIL_FROM_EMAIL=your_email@gmail.com

ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
ADMIN_PHONE=9999999999

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=5
```

> **Never commit `.env` files to GitHub.**

---

## 3. Create Admin

From the backend directory:

```bash
node scripts/createAdmin.js
```

---

## 4. Start Backend

Development:

```bash
npm run dev
```

Production-style:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

API:

```text
http://localhost:5000/api
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 👑 Admin Frontend Setup

```bash
cd adminfrontend
npm install
```

Create:

```text
adminfrontend/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Admin application:

```text
http://localhost:5174
```

---

# 🌍 Production Environment

Production frontend API configuration:

```env
VITE_API_URL=https://mymail-backend.vercel.app/api
```

The same production API can be used by both the user and admin applications.

---

# 🧠 Admin Authentication Flow

Admin authentication does **not** use a separate login API.

```text
Admin
  │
  ▼
/admin/login
  │
  ▼
POST /api/auth/login
  │
  ▼
JWT Access Token
  │
  ▼
Check User Role
  │
  ├── role = user
  │       ↓
  │   Access Denied
  │
  └── role = admin
          ↓
    Admin Dashboard
```

Backend protection:

```text
authMiddleware
      ↓
adminMiddleware
      ↓
Admin Controller
```

---

# 📋 Development Roadmap

MyMail is developed in structured phases.

### Phase 1 — Landing + Authentication

* Landing page
* Login
* Register
* Email verification
* Forgot password
* Reset password
* Authentication state

### Phase 2 — User Dashboard

* Dashboard overview
* Profile
* Change password
* Statistics
* Recent activities

### Phase 3 — Projects + API Keys

* Project CRUD
* API key generation
* API key regeneration
* Key activation/deactivation
* Secure key handling

### Phase 4 — Templates + Email Engine

* System templates
* Custom templates
* Template editor
* Variables
* Email sending
* Email preview

### Phase 5 — Email Logs + Analytics

* Email history
* Email details
* Filters
* Pagination
* Statistics
* Charts
* Reports

### Phase 6 — Admin Dashboard

* Admin overview
* User management
* Project management
* Email management
* Template management
* API key monitoring
* Analytics
* Activity logs
* Admin profile

---

# 📌 Important Business Rules

### Project

A user cannot create two projects with the same project name.

### API Keys

Each project can have:

```text
1 Development Key
1 Production Key
```

### Raw API Key

The raw key is displayed only during:

```text
Generation
Regeneration
```

It is never returned again.

### Password Change

Changing/resetting a password invalidates existing refresh-token sessions.

### Email Templates

Dynamic variables are resolved from:

```text
Project Data
     +
Request Data
```

### Project/API Key Deletion

Projects and API keys use status-based management to preserve email log integrity.

```text
active
inactive
```

### Admin Access

Admins can manage platform resources but cannot send emails as another user.

---

# 🔒 Environment Security

The repository intentionally ignores environment files.

```gitignore
**/.env
**/.env.*
!.env.example
```

Never commit:

```text
.env
.env.local
.env.production
```

Use `.env.example` for documenting variable names without real credentials.

---

# 🚀 Deployment

## User Frontend

Recommended deployment:

```text
Vercel
   ↓
Root Directory
frontend
```

Build:

```bash
npm run build
```

Output:

```text
dist
```

Environment variable:

```env
VITE_API_URL=https://mymail-backend.vercel.app/api
```

---

## Backend

Production backend:

```text
https://mymail-backend.vercel.app/
```

API:

```text
https://mymail-backend.vercel.app/api
```

---

## Admin Frontend

The admin application is maintained as a separate frontend application:

```text
adminfrontend/
```

This allows the administrative interface to remain isolated from the public user application.

---

# 📈 Future Scope

Possible future improvements include:

* Multiple SMTP providers
* Per-project SMTP configuration
* Email provider integrations
* Email queues
* Retry mechanism
* Webhooks
* Delivery tracking
* Bounce handling
* Open/click tracking
* Advanced analytics
* Custom domains
* Billing integration
* Subscription management
* Usage-based pricing
* Team members and roles
* API documentation portal
* Developer SDKs
* Email scheduling

---

# 🏆 Project Vision

MyMail aims to provide a developer-friendly email infrastructure layer similar in concept to modern transactional email platforms.

The long-term vision is:

```text
                     MYMAIL
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
     Projects        Templates       API Keys
        │               │               │
        └───────────────┼───────────────┘
                        │
                        ▼
                  EMAIL ENGINE
                        │
                        ▼
                     SMTP
                        │
                        ▼
                 EMAIL DELIVERY
                        │
                        ▼
                  LOGS + ANALYTICS
```

---

# ⭐ Why MyMail?

```text
✓ Developer Friendly
✓ API First
✓ Secure Authentication
✓ Hashed API Keys
✓ Dynamic Templates
✓ SMTP Email Engine
✓ Email Logs
✓ Analytics
✓ Multi-Tenant Architecture
✓ Separate Admin Panel
✓ Scalable Project Structure
```

---

# 👨‍💻 Project

**MyMail — Email Infrastructure SaaS Platform**

Built with:

```text
React
Node.js
Express
MongoDB
Mongoose
JWT
Redux Toolkit
Nodemailer
Vite
```

---

<p align="center">

### 🚀 MyMail — Build. Send. Track.

**Modern Email Infrastructure for Modern Applications.**

</p>

<p align="center">
  ⭐ Star the repository if you find the project useful.
</p>
