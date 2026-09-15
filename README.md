# 🚀 MyMail — Modern Email Infrastructure SaaS

<p align="center">
  <img src="./frontend/public/gungif3.gif" alt="MyMail Logo" width="180"/>
</p>

<h1 align="center">MyMail</h1>

<p align="center">
  <strong>Modern Email Infrastructure for Developers, Startups & Businesses</strong>
</p>

<p align="center">
  Build projects • Generate API Keys • Create Templates • Send Emails • Track Logs • Analyze Usage
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

## 🌐 Live Project

### 🖥️ User Application

**MyMail — Live SaaS Application**

https://mymail-alpha.vercel.app/

### ⚙️ Backend API

**MyMail — Production Backend**

https://mymail-backend.vercel.app/

---

# 🧊 3D SaaS Overview

```text
                         ┌─────────────────────────┐
                         │       🌐 MyMail         │
                         │   Email Infrastructure  │
                         └────────────┬────────────┘
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
                    │ 📧 Templates  │
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

> MyMail follows a multi-tenant architecture where users manage projects, API keys, templates and email delivery independently.

---

# ✨ What is MyMail?

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

MyMail aims to provide a developer-friendly email infrastructure layer where applications can send reliable transactional emails without implementing their own complete email delivery system.

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
 │    ├── API Keys
 │    ├── Templates
 │    └── Emails
 │
 ├── Project B
 │    ├── API Keys
 │    ├── Templates
 │    └── Emails
 │
 └── Project C
      ├── API Keys
      ├── Templates
      └── Emails
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

The email engine is the heart of MyMail.

```text
API Request
     │
     ▼
API Key Validation
     │
     ▼
Project Validation
     │
     ▼
Template Validation
     │
     ▼
Variable Replacement
     │
     ▼
Email Rendering
     │
     ▼
SMTP Transport
     │
     ▼
Email Delivery
     │
     ▼
Email Log
```

### Supported Flow

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

### Status

```text
🟡 Pending
   ↓
🟢 Sent

or

🟡 Pending
   ↓
🔴 Failed
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

### Admin Capabilities

```text
                 👨‍💼 ADMIN
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
    👥 Users     📁 Projects   📧 Emails
       │            │            │
       └────────────┼────────────┘
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

Security is a core part of MyMail.

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

Configured limits:

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

| Technology           | Purpose                     |
| -------------------- | --------------------------- |
| React 19             | UI development              |
| React DOM            | React rendering             |
| React Router DOM     | Routing                     |
| Redux Toolkit        | State management            |
| React Redux          | Redux integration           |
| Axios                | API communication           |
| Tailwind CSS 4       | UI styling                  |
| Tailwind Vite Plugin | Tailwind + Vite integration |
| Framer Motion        | Animations                  |
| Lucide React         | Icons                       |
| React Hook Form      | Form handling               |
| Zod                  | Schema validation           |
| @hookform/resolvers  | Form + schema integration   |
| React Helmet Async   | SEO / document metadata     |
| React Hot Toast      | Notifications               |
| Recharts             | Charts & analytics          |
| Vite                 | Frontend build tool         |
| Oxlint               | Linting                     |

---

## ⚙️ Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Node.js            | Runtime                   |
| Express 5          | Backend framework         |
| MongoDB            | Database                  |
| Mongoose           | MongoDB ODM               |
| JWT                | Authentication            |
| bcryptjs           | Password hashing          |
| Nodemailer         | Email delivery            |
| Helmet             | Security headers          |
| CORS               | Cross-origin access       |
| express-rate-limit | Rate limiting             |
| Cookie Parser      | Cookie handling           |
| Morgan             | HTTP request logging      |
| dotenv             | Environment configuration |

---

# 🎨 Frontend UI Architecture

MyMail frontend follows a modern SaaS dashboard approach.

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

The UI follows a modern dark SaaS aesthetic with animated gradients, glass-style cards and smooth interactions.

---

# 🎨 Tailwind CSS Design System

MyMail uses **Tailwind CSS v4** for modern responsive styling.

The design system is based around:

```text
Primary     → Orange
Accent      → Yellow
Background  → Dark
Cards       → Dark Stone
Text        → Light
Success     → Green
Warning     → Yellow
Danger      → Red
Info        → Blue
```

### Visual Direction

```text
╭────────────────────────────────────────────╮
│                                            │
│        🟠 Modern Dark SaaS Interface       │
│                                            │
│   ✦ Glass Cards     ✦ Soft Shadows         │
│   ✦ Gradients       ✦ 3D Visual Feel       │
│   ✦ Smooth Motion   ✦ Responsive Layout    │
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

This structure keeps projects and their email resources logically separated.

---

# 🗄️ Database Models

MyMail uses MongoDB with Mongoose.

### Core Models

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

### Models

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
PO
```
