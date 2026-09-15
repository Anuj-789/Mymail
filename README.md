# <span style="color:#f97316">My</span><span style="color:#fb923c">Mail</span> — Modern Email Infrastructure SaaS

<p align="center">
  <img src="./frontend/public/gungif3.gif" alt="MyMail Logo" width="180"/>
</p>

<h1 align="center">
  <span style="color:#fafaf9">My</span><span style="color:#f97316">Mail</span>
</h1>

<p align="center">
  <strong>Modern Email Infrastructure for Developers, Startups & Businesses</strong>
</p>

<p align="center">
  Build Projects • Generate API Keys • Create Templates • Send Emails • Track Logs • Analyze Usage
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-black?style=for-the-badge\&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

</p>

<p align="center">

![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge\&logo=redux\&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge\&logo=framer\&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge\&logo=axios\&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-9.x-22B573?style=for-the-badge)

</p>

---

# 🌐 Live Project

## 🖥️ <span style="color:#f97316">MyMail</span> — User Application

https://mymail-alpha.vercel.app/


---

# 🧊 3D SaaS Overview

```text
                         ╔═════════════════════════╗
                         ║       🟠 MyMail         ║
                         ║   Email Infrastructure  ║
                         ╚════════════╤════════════╝
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌────────────┐    ┌────────────┐    ┌────────────┐
             │ 👤 Users   │    │ 📁 Projects│    │ 🛡️ Admin   │
             └─────┬──────┘    └─────┬──────┘    └─────┬──────┘
                   │                 │                 │
                   ▼                 ▼                 ▼
             ┌────────────┐    ┌────────────┐    ┌────────────┐
             │ 🔐 Auth    │    │ 🔑 API Keys│    │ 📊 Analytics│
             └─────┬──────┘    └─────┬──────┘    └────────────┘
                   │                 │
                   └────────┬────────┘
                            ▼
                    ┌───────────────┐
                    │ 📝 Templates  │
                    └───────┬───────┘
                            ▼
                    ┌───────────────┐
                    │ ⚡ Email Engine│
                    └───────┬───────┘
                            ▼
                    ┌───────────────┐
                    │ 📬 SMTP Server │
                    └───────┬───────┘
                            ▼
                    ┌───────────────┐
                    │ 📈 Email Logs │
                    └───────────────┘
```

> **MyMail** follows a multi-tenant architecture where users manage projects, API keys, templates and email delivery independently.

---

# ✨ What is <span style="color:#f97316">MyMail</span>?

**MyMail** is a full-stack Email Infrastructure SaaS platform designed to provide developers and businesses with a simple and scalable way to send transactional emails through APIs.

The platform follows a concept similar to modern email infrastructure providers such as SendGrid or Mailgun, while implementing its own authentication, project management, API-key security, template management, email engine, logging and administration system.

### Core Flow

```text
👤 User
   ↓
📁 Create Project
   ↓
🔑 Generate API Key
   ↓
📝 Create / Select Template
   ↓
📨 Send Email through API
   ↓
⚡ Email Engine
   ↓
📡 SMTP
   ↓
📊 Email Log
   ↓
📈 Dashboard & Analytics
```

---

# 🎯 Project Vision

**MyMail** aims to provide a developer-friendly email infrastructure layer where applications can send reliable transactional emails without implementing their own complete email delivery system.

### Designed For

* 👨‍💻 Developers
* 🚀 Startups
* 🏢 Businesses
* 🛒 SaaS Applications
* 🔐 Authentication Systems
* 📦 E-commerce Applications
* 📊 Business Platforms
* 🌐 Web Applications

---

# ⭐ Core Features

## 🔐 Authentication

* User registration
* Login
* Logout
* JWT access tokens
* Refresh-token authentication
* HTTP-only refresh-token cookie
* Email verification
* Forgot password
* Password reset
* Password change
* Account verification
* Account blocking
* Role-based authorization

---

## 📁 Project Management

Users can create and manage independent projects.

Each project can contain:

* Project name
* Description
* Website URL
* Allowed domains
* Active / inactive status
* API keys
* Templates
* Email activity

### Project Structure

```text
User
 │
 ├── Project A
 │    ├── 🔑 API Keys
 │    ├── 📝 Templates
 │    └── 📧 Emails
 │
 ├── Project B
 │    ├── 🔑 API Keys
 │    ├── 📝 Templates
 │    └── 📧 Emails
 │
 └── Project C
      ├── 🔑 API Keys
      ├── 📝 Templates
      └── 📧 Emails
```

---

# 🔑 Secure API Key Management

MyMail provides environment-based API keys:

```text
pk_test_...
pk_live_...
```

### Security Features

* SHA-256 API-key hashing
* Raw key shown only during generation/regeneration
* Key prefix tracking
* Active / inactive status
* Usage counter
* Last-used timestamp
* Project ownership validation
* API-key middleware

Emails can be sent using:

```http
x-api-key: YOUR_API_KEY
```

---

# 📧 Email Engine

The email engine is the heart of **MyMail**.

```text
API Request
     │
     ▼
🔑 API Key Validation
     │
     ▼
📁 Project Validation
     │
     ▼
📝 Template Validation
     │
     ▼
🔄 Variable Replacement
     │
     ▼
📄 Email Rendering
     │
     ▼
⚡ SMTP Transport
     │
     ▼
📨 Email Delivery
     │
     ▼
📊 Email Log
```

### Example Request

```json
{
  "templateId": "template_id",
  "to": "customer@example.com",
  "data": {
    "userName": "Anuj"
  }
}
```

---

# 📝 Dynamic Email Templates

MyMail supports reusable email templates with dynamic variables.

Example:

```text
Hello {{userName}},

Welcome to {{appName}}!

Thanks for joining us.
```

Variables can be replaced dynamically at runtime.

### Template Categories

* 🔐 Authentication
* 💼 Business
* 🧩 Custom

### Template Types

* System templates
* Custom templates

---

# 📊 Email Logs

Every email activity can be tracked through the email logging system.

### Logged Information

* Recipient
* Sender
* Subject
* Project
* Template
* API key
* Provider
* Status
* Message ID
* Error message
* Sent time
* Metadata

### Delivery Status

```text
🟡 Pending
   │
   ├──────────► 🟢 Sent
   │
   └──────────► 🔴 Failed
```

---

# 📈 Dashboard & Analytics

The user dashboard provides an overview of email activity and account usage.

### Dashboard Capabilities

* Total emails
* Sent emails
* Failed emails
* Project information
* Template information
* API-key usage
* Email activity
* Usage statistics

The platform also includes an analytics system for administrative monitoring.

---

# 👨‍💼 Admin Dashboard

MyMail includes a dedicated administration system.

```text
                    👨‍💼 ADMIN
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
    👥 Users       📁 Projects      📧 Emails
       │               │               │
       └───────────────┼───────────────┘
                       ▼
                  📊 Analytics
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
         🔑 API Keys         📝 Templates
             │                   │
             └─────────┬─────────┘
                       ▼
                 📋 Activities
```

### Admin Modules

* Admin Dashboard
* User Management
* User Details
* Project Management
* Project Details
* Email Management
* Email Details
* Template Management
* API Key Overview
* Analytics
* Activity Logs
* Admin Profile
* Admin Password Management

---

# 🛡️ Security Architecture

Security is a core part of **MyMail**.

### Implemented Security

* JWT authentication
* Refresh-token authentication
* HTTP-only cookies
* Password hashing with bcrypt
* API-key hashing with SHA-256
* Helmet security headers
* CORS configuration
* Rate limiting
* Role-based authorization
* Project ownership validation
* API-key validation
* Account blocking
* Secure password reset flow

---

# 🚦 Rate Limiting

Sensitive authentication endpoints are protected with rate limiting.

```text
Window:
15 Minutes

Maximum Attempts:
5
```

Applied to sensitive operations such as:

* Login
* Registration
* Forgot Password

---

# 🧩 Technology Stack

## 🎨 Frontend

| Technology             | Purpose                     |
| ---------------------- | --------------------------- |
| ⚛️ React 19            | UI development              |
| ⚛️ React DOM           | React rendering             |
| 🛣️ React Router DOM   | Application routing         |
| 🔄 Redux Toolkit       | Global state management     |
| 🔗 React Redux         | Redux integration           |
| 📡 Axios               | API communication           |
| 🎨 Tailwind CSS 4      | Utility-first UI styling    |
| ⚡ Tailwind Vite Plugin | Tailwind + Vite integration |
| 🎞️ Framer Motion      | Advanced animations         |
| 🧩 Lucide React        | Modern icons                |
| 📝 React Hook Form     | Form management             |
| ✅ Zod                  | Schema validation           |
| 🔌 Hookform Resolvers  | Form/schema integration     |
| 🧠 React Helmet Async  | SEO & document metadata     |
| 🔔 React Hot Toast     | Notifications               |
| 📊 Recharts            | Charts & analytics          |
| ⚡ Vite                 | Frontend build system       |
| 🔍 Oxlint              | Code linting                |

---

## ⚙️ Backend

| Technology            | Purpose                       |
| --------------------- | ----------------------------- |
| 🟢 Node.js            | JavaScript runtime            |
| 🚂 Express 5          | Backend framework             |
| 🍃 MongoDB            | NoSQL database                |
| 🦫 Mongoose           | MongoDB ODM                   |
| 🔐 JSON Web Token     | Authentication                |
| 🔒 bcryptjs           | Password hashing              |
| 📧 Nodemailer         | Email delivery                |
| 🛡️ Helmet            | Security headers              |
| 🌐 CORS               | Cross-origin resource sharing |
| 🚦 Express Rate Limit | Request rate limiting         |
| 🍪 Cookie Parser      | Cookie handling               |
| 📝 Morgan             | HTTP request logging          |
| ⚙️ dotenv             | Environment configuration     |

---

# 🎨 Frontend UI Architecture

MyMail frontend follows a modern SaaS dashboard architecture.

```text
                    🖥️ React Application
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      🌐 Public          🔐 Auth          📊 Dashboard
          │                │                │
          ▼                ▼                ▼
      Landing          Login/Register     Projects
      Pricing          Verify Email       API Keys
      Features         Reset Password     Templates
      FAQ              Forgot Password    Email
                                           Logs
                                           Analytics
                                           Settings
```

---

# 🎞️ Modern Animation System

The frontend uses **Framer Motion** for interactive animations.

Animations can be used across:

* Landing page
* Hero sections
* Pricing cards
* Dashboard cards
* Modals
* Page transitions
* Buttons
* Navigation
* Cards
* Charts
* Interactive components

The UI follows a modern dark SaaS aesthetic with:

* 🟠 Orange gradients
* 🟡 Accent highlights
* 🧊 Glass-style cards
* 🌑 Dark surfaces
* ✨ Smooth transitions
* 🧱 3D-inspired layouts
* 📱 Responsive design

---

# 🎨 Tailwind CSS Design System

MyMail uses **Tailwind CSS v4** for modern responsive styling.

### Brand Colors

```text
MyMail Brand
│
├── Primary Orange  → #f97316
├── Light Orange    → #fb923c
├── Dark Orange     → #ea580c
├── Accent Yellow   → #facc15
├── Background      → #0c0a09
├── Card             → #1c1917
└── Text             → #fafaf9
```

### Visual Direction

```text
╭────────────────────────────────────────────╮
│                                            │
│       🟠 MyMail — Modern SaaS UI           │
│                                            │
│   ✦ Glass Cards       ✦ 3D Visual Feel     │
│   ✦ Orange Gradients  ✦ Soft Shadows       │
│   ✦ Smooth Motion     ✦ Responsive Design  │
│                                            │
╰────────────────────────────────────────────╯
```

---

# 🏗️ Project Architecture

```text
MyMail
│
├── 🎨 frontend
│   │
│   ├── app
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── routes
│   ├── services
│   ├── hooks
│   ├── context
│   ├── utils
│   ├── features
│   ├── modules
│   ├── App.jsx
│   └── main.jsx
│
├── ⚙️ backend
│   │
│   ├── config
│   ├── middlewares
│   ├── models
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── utils
│   └── index.js
│
└── 👨‍💼 adminfrontend
    │
    ├── app
    ├── assets
    ├── components
    ├── layouts
    ├── services
    ├── features
    ├── routes
    ├── modules
    ├── hooks
    ├── utils
    ├── App.jsx
    └── main.jsx
```

---

# 🧠 Multi-Tenant Architecture

MyMail follows a hierarchical multi-tenant model:

```text
                         👤 USER
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
        📁 PROJECT A                📁 PROJECT B
             │                           │
       ┌─────┴─────┐               ┌─────┴─────┐
       ▼           ▼               ▼           ▼
    🔑 API       📝 Templates    🔑 API       📝 Templates
     Keys                         Keys
       │                           │
       └───────────┐   ┌───────────┘
                   ▼   ▼
                  📧 EMAILS
```

---

# 🗄️ Database Models

MyMail uses MongoDB with Mongoose.

```text
User
│
├── VerificationToken
├── PasswordResetToken
│
├── Project
│   └── ApiKey
│
├── Template
│
├── EmailLog
│
├── EmailConfig
│
└── AdminActivityLog
```

### Core Models

* `User`
* `VerificationToken`
* `PasswordResetToken`
* `Project`
* `ApiKey`
* `Template`
* `EmailLog`
* `EmailConfig`
* `AdminActivityLog`

---

# 🔌 API Overview

## Authentication

```http
POST /api/auth/register
GET  /api/auth/verify-email/:token
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

## Profile

```http
GET /api/profile
PUT /api/profile
PUT /api/profile/change-password
```

## Projects

```http
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## API Keys

```http
POST /api/projects/:projectId/api-key
GET  /api/projects/:projectId/api-key
PUT  /api/projects/:projectId/api-key/regenerate
PUT  /api/projects/:projectId/api-key/status
```

## Templates

```http
GET    /api/templates
GET    /api/templates/system
GET    /api/templates/:id
POST   /api/templates
PUT    /api/templates/:id
DELETE /api/templates/:id
```

## Email

```http
POST /api/email/send
```

## Email Logs

```http
GET /api/email-logs
GET /api/email-logs/:id
```

## Dashboard

```http
GET /api/dashboard
```

---

# 👨‍💼 Admin API

```http
GET  /api/admin-dashboard/admin/overview

GET  /api/admin-dashboard/admin/profile
PUT  /api/admin-dashboard/admin/profile
PUT  /api/admin-dashboard/admin/profile/change-password

GET  /api/admin-dashboard/admin/users
GET  /api/admin-dashboard/admin/users/:id
PUT  /api/admin-dashboard/admin/users/:id/status

GET  /api/admin-dashboard/admin/projects
GET  /api/admin-dashboard/admin/projects/:id
PUT  /api/admin-dashboard/admin/projects/:id/status

GET  /api/admin-dashboard/admin/emails
GET  /api/admin-dashboard/admin/emails/:id
GET  /api/admin-dashboard/admin/email-stats

GET    /api/admin-dashboard/admin/templates
POST   /api/admin-dashboard/admin/templates
PUT    /api/admin-dashboard/admin/templates/:id
DELETE /api/admin-dashboard/admin/templates/:id

GET /api/admin-dashboard/analytics
GET /api/admin-dashboard/activity
GET /api/admin-dashboard/activity/:id

GET /api/admin-dashboard/api-keys/overview
GET /api/admin-dashboard/api-keys
```

---

# ⚙️ Local Development

## 1️⃣ Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd mail
```

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 4️⃣ Admin Frontend Setup

```bash
cd adminfrontend
npm install
npm run dev
```

Admin:

```text
http://localhost:5174
```

---

# 🔐 Environment Variables

### Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email
SMTP_PASS=your_app_password

EMAIL_FROM_NAME=MyMail
EMAIL_FROM_EMAIL=your_email

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=5
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Production

```env
VITE_API_URL=https://mymail-backend.vercel.app/api
```

> ⚠️ Never commit `.env` files or real secrets to GitHub.

---

# 🚀 Production Deployment

```text
                    🌐 INTERNET
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
        🖥️ Frontend   ⚙️ Backend   👨‍💼 Admin
          Vercel       Vercel       Vercel
             │           │           │
             └───────────┼───────────┘
                         ▼
                     🍃 MongoDB
                         │
                         ▼
                     📧 SMTP
```

### Current Deployment

```text
Frontend:
https://mymail-alpha.vercel.app/

Backend:
https://mymail-backend.vercel.app/
```

---

# 📦 NPM Technology Highlights

## Frontend

```text
React
React DOM
React Router DOM
Redux Toolkit
React Redux
Axios
Tailwind CSS
Framer Motion
Lucide React
React Hook Form
Zod
React Helmet Async
React Hot Toast
Recharts
Vite
Oxlint
```

## Backend

```text
Express
MongoDB / Mongoose
JWT
bcryptjs
Nodemailer
Helmet
CORS
Express Rate Limit
Cookie Parser
Morgan
dotenv
```

---

# 💰 SaaS Pricing Concept

| Plan            |        Price | Designed For         |
| --------------- | -----------: | -------------------- |
| 🆓 Free         |     ₹0/month | Beginners & testing  |
| 🚀 Starter      |   ₹500/month | Small projects       |
| 💼 Professional | ₹1,400/month | Growing applications |

The pricing interface follows the same modern dark **MyMail orange** visual identity with responsive animated cards.

---

# 🧱 Business Rules

### API Keys

```text
One Development Key
        +
One Production Key
        =
Two Keys / Project
```

### Raw API Key

```text
Generate
   ↓
Show Raw Key
   ↓
Hash & Store
   ↓
Never Show Raw Key Again
```

### Project Status

```text
Active
  │
  └── API requests allowed

Inactive
  │
  └── API requests blocked
```

### Password Reset

```text
Password Changed
       ↓
Refresh Token Invalidated
       ↓
Old Session Cannot Continue
```

---

# 🛣️ Future Roadmap

```text
✅ Authentication
        ↓
✅ Projects
        ↓
✅ API Keys
        ↓
✅ Templates
        ↓
✅ Email Engine
        ↓
✅ Email Logs
        ↓
✅ User Dashboard
        ↓
✅ Admin Dashboard
        ↓
🔄 Advanced Analytics
        ↓
🔄 Multiple SMTP Providers
        ↓
🔄 Project-level SMTP
        ↓
🔄 Webhooks
        ↓
🔄 Delivery Tracking
        ↓
🔄 Custom Domains
        ↓
🔄 Advanced Email Analytics
```

---

# 🔮 Future Scope

Potential future improvements include:

* 📡 Multiple SMTP providers
* ☁️ Cloud email providers
* 🔔 Webhooks
* 📬 Delivery tracking
* 📈 Advanced analytics
* 🌐 Custom sending domains
* 🔐 Domain verification
* 📊 Real-time monitoring
* 🧾 Detailed billing system
* 💳 Subscription management
* 🏢 Organization/team accounts
* 👥 Team member permissions
* 📱 Mobile-friendly developer experience
* 🔌 Developer SDKs
* 📚 Public API documentation

---

# 💡 Why <span style="color:#f97316">MyMail</span>?

Traditional applications often need to build and maintain their own email delivery logic.

MyMail abstracts that infrastructure behind a developer-friendly API.

```text
WITHOUT MyMail

Application
    ↓
SMTP Configuration
    ↓
Email Logic
    ↓
Template Logic
    ↓
Error Handling
    ↓
Logging
    ↓
Monitoring
```

### WITH MyMail

```text
Application
    │
    │ API Request
    ▼
╔════════════════════╗
║     🟠 MyMail      ║
║                    ║
║ 🔑 API Security    ║
║ 📝 Templates       ║
║ ⚡ Email Engine    ║
║ 📊 Logs            ║
║ 📈 Analytics       ║
╚════════╤═══════════╝
         │
         ▼
       📧 Email
```

---

# 🏆 Project Highlights

```text
╔══════════════════════════════════════════╗
║              🟠 MyMail                   ║
╠══════════════════════════════════════════╣
║                                          ║
║  🔐 Secure Authentication                ║
║  🔑 Secure API Keys                      ║
║  📁 Multi-Project Architecture           ║
║  📝 Dynamic Templates                    ║
║  📧 SMTP Email Engine                    ║
║  📊 Email Logs                           ║
║  📈 Analytics                            ║
║  👨‍💼 Admin Dashboard                     ║
║  🎨 Tailwind CSS UI                      ║
║  🎞️ Framer Motion Animations             ║
║  🧊 3D-Inspired SaaS Design              ║
║  📱 Responsive Interface                 ║
║                                          ║
╚══════════════════════════════════════════╝
```

---

# 🤝 Contributing

Contributions, suggestions and improvements are welcome.

```text
Fork
  ↓
Create Branch
  ↓
Make Changes
  ↓
Test
  ↓
Commit
  ↓
Push
  ↓
Pull Request
```

---

# 📜 License

This project currently uses the license configuration defined in the repository.

---

# 🙏 Thank You!

Thank you for taking the time to check out this project. Your interest, feedback, and contributions are always appreciated.

If you have any suggestions, find a bug, or want to contribute, feel free to open an issue or submit a pull request.

**Let's make this project better together!**

Stay connected and happy coding! 🚀

---

# 📞 Contact & Community

You can easily connect with **Ucleve Traders** and provide feedback:

* **Call / Phone:** 📞 +91 7480982980
* **Email:** 📧 [anuj437795@gmail.com](mailto:anuj437795@gmail.com)
* **Instagram:** 👉 Follow
* **LinkedIn:** 👉 Connect
* **WhatsApp Chat:** 💬 Chat / Join Group
* **WhatsApp Community Group:** 👉 Join Group

---

# 🔗 Connect with Me

<p align="center">

<a href="https://www.linkedin.com/in/gupta-a-549184327">
<img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
</a>

<a href="https://github.com/Anuj-789">
<img src="https://img.shields.io/badge/GitHub-Anuj--789-gray?style=for-the-badge&logo=github" alt="GitHub"/>
</a>

<a href="mailto:anuj437795@gmail.com">
<img src="https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail" alt="Email"/>
</a>

</p>

---

<h2 align="center">
  🌟 Thanks for checking out <span style="color:#f97316">MyMail</span>!
</h2>

<p align="center">
  Hope you enjoyed exploring the project 😊
</p>

<p align="center">
  <strong>Built with ❤️, JavaScript, React, Node.js, MongoDB & a lot of 🚀</strong>
</p>

<p align="center">
  🟠 <strong>MyMail — Build. Integrate. Send.</strong>
</p>
