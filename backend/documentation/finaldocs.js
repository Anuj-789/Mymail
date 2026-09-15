🚀 EMAIL SAAS PLATFORM – COMPLETE BACKEND DOCUMENTATION (v1.0)
1. Project Overview
Project Name: Email SaaS Platform
Type: MERN Stack (Backend Only - Node.js/Express) based Email Sending Service.
Purpose: Provide a white-label email infrastructure where users create projects, generate API keys, and send dynamic emails via templates. It acts like a custom SendGrid/Mailgun clone.

Core Philosophy:

Modular Architecture (No Service/Repository layers, logic is handled in Controllers for simplicity).

Security First (JWT, Refresh Tokens, API Key Hashing, Rate Limiting).

Multi-Tenancy (Users -> Projects -> API Keys -> Templates -> Emails).

2. Technology Stack
Runtime: Node.js (v18+)

Framework: Express.js

Database: MongoDB (Atlas/Local)

ODM: Mongoose

Authentication: JWT (jsonwebtoken) + httpOnly Cookies (for Refresh Token)

Password Hashing: bcryptjs

Email Transport: Nodemailer (Gmail SMTP / Generic SMTP)

Security Middleware: Helmet, CORS, express-rate-limit

Logging: Morgan

3. Environment Variables (.env)
The entire system relies on these variables. Never hardcode secrets.

env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/email-saas

# JWT Secrets
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# SMTP Configuration (Sender)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password_here
EMAIL_FROM_NAME=Email SaaS Platform
EMAIL_FROM_EMAIL=your-email@gmail.com

# Admin Seeder (Run via script)
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
ADMIN_PHONE=9999999999

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 mins
RATE_LIMIT_MAX=5
4. Complete Folder Structure
This is the exact hierarchy. Anyone reading this must follow this structure.

text
backend/
├── server.js                      # Entry Point
├── .env
├── package.json
├── scripts/
│   └── createAdmin.js             # CLI script to seed admin user
│
└── src/
    ├── config/
    │   ├── db.js                  # MongoDB Connection
    │   ├── jwt.js                 # JWT Sign/Verify functions
    │   └── mail.js                # Nodemailer Transporter
    │
    ├── middlewares/
    │   ├── auth.middleware.js     # JWT Verification (req.user)
    │   ├── admin.middleware.js    # Role-based check (isAdmin)
    │   ├── apiKey.middleware.js   # x-api-key header validation
    │   └── rateLimiter.js         # Login/Register rate limiting
    │
    ├── utils/
    │   ├── sendEmail.js           # Generic email sender utility
    │   ├── apiKeyGenerator.js     # Generates pk_live_/pk_test_ + hash
    │   └── validation.js          # Common regex/sanitizers
    │
    ├── models/                    # DATABASE SCHEMAS
    │   ├── User.js
    │   ├── VerificationToken.js
    │   ├── PasswordResetToken.js
    │   ├── Project.js
    │   ├── ApiKey.js
    │   ├── Template.js            # System + Custom Templates
    │   ├── EmailLog.js
    │   ├── EmailConfig.js         # Future SMTP overrides per project
    │   └── AdminActivityLog.js
    │
    ├── controllers/               # BUSINESS LOGIC
    │   ├── auth/
    │   │   └── auth.controller.js
    │   ├── profile/
    │   │   └── profile.controller.js
    │   ├── project/
    │   │   └── project.controller.js
    │   ├── apiKey/
    │   │   └── apiKey.controller.js
    │   ├── template/
    │   │   └── template.controller.js
    │   ├── email-engine/
    │   │   ├── emailSend.controller.js
    │   │   └── emailLog.controller.js
    │   ├── dashboard/
    │   │   ├── userDashboard.controller.js
    │   │   └── admin-dashboard/
    │   │       ├── adminOverview.controller.js
    │   │       ├── userManagement.controller.js
    │   │       ├── projectManagement.controller.js
    │   │       ├── emailManagement.controller.js
    │   │       ├── templateManagement.controller.js
    │   │       └── analytics.controller.js
    │   └── services/              # Helper services
    │       ├── smtp.service.js
    │       └── templateRenderer.service.js
    │
    └── routes/                    # API ROUTE DEFINITIONS
        ├── auth.routes.js
        ├── profile.routes.js
        ├── project.routes.js
        ├── apiKey.routes.js
        ├── template.routes.js
        ├── email.routes.js        # Email Sending endpoints
        ├── emailLog.routes.js
        ├── userDashboard.routes.js
        └── admin-dashboard/
            └── index.routes.js    # Combines all admin sub-routes
5. Database Models (Mongoose Schemas)
This is the single source of truth for the database.

5.1. User Model (models/User.js)
Stores platform users and admins.

javascript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, select: false }, // Hashed
  profileImage: { type: String, default: "" },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false }, // Email verified?
  isBlocked: { type: Boolean, default: false }, // Admin blocked?
  refreshToken: { type: String, select: false }, // Stored for rotation
  createdAt: Date,
  updatedAt: Date
}
5.2. VerificationToken (models/VerificationToken.js)
Temporary tokens for email verification.

javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: () => Date.now() + 3600000 } // 1 Hour
}
5.3. PasswordResetToken (models/PasswordResetToken.js)
Temporary tokens for forgot password.

javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: () => Date.now() + 600000 } // 10 Mins
}
5.4. Project (models/Project.js)
Projects belong to users. API keys are generated per project.

javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectName: { type: String, required: true },
  description: { type: String, default: '' },
  websiteUrl: { type: String, default: '' },
  allowedDomains: { type: [String], default: [] }, // For CORS/security
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  // Unique constraint: { userId, projectName } unique
}
5.5. ApiKey (models/ApiKey.js)
Security Note: keyHash is stored, never the raw key.

javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, enum: ['development', 'production'], required: true }, // Unique per project per type
  keyPrefix: { type: String, required: true }, // e.g., "pk_live_a1b2"
  keyHash: { type: String, required: true, unique: true }, // SHA256 hashed
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  usageCount: { type: Number, default: 0 },
  lastUsedAt: Date
}
5.6. Template (models/Template.js)
Handles both System (pre-seeded) and Custom (user-created) templates.

javascript
{
  type: { type: String, enum: ['system', 'custom'], default: 'custom' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null if system
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null }, // Optional
  name: { type: String, required: true }, // e.g., "Welcome Email"
  subject: { type: String, required: true }, // "Welcome to {{appName}}"
  body: { type: String, required: true }, // HTML or Text with {{variables}}
  category: { type: String, enum: ['authentication', 'business', 'custom'], default: 'custom' },
  isActive: { type: Boolean, default: true }
}
5.7. EmailLog (models/EmailLog.js)
Records every email sent.

javascript
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  provider: { type: String, default: 'smtp' },
  messageId: String, // SMTP response ID
  errorMessage: String, // If failed
  sentAt: Date,
  metadata: { type: Object, default: {} } // IP, User-Agent etc.
}
5.8. AdminActivityLog (models/AdminActivityLog.js)
Tracks admin actions.

javascript
{
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "BLOCKED_USER", "UPDATED_TEMPLATE"
  targetId: { type: mongoose.Schema.Types.ObjectId }, // User ID or Project ID affected
  details: { type: Object, default: {} },
  ip: String,
  createdAt: Date
}
6. Complete API Routes Documentation
Base URL: http://localhost:5000/api

6.1. Authentication Routes (/auth)
No Auth Required except logout/refresh.

Method	Endpoint	Description	Request Body / Headers	Success Response
POST	/auth/register	User Signup	{name, email, phone, password}	{success, message, userId}
GET	/auth/verify-email/:token	Verify email token	URL Params	{success, message}
POST	/auth/login	Login	{email, password}	{success, accessToken, user} (sets refreshToken cookie)
POST	/auth/logout	Logout	Cookie: refreshToken	{success, message}
POST	/auth/refresh-token	Get new access token	Cookie: refreshToken	{success, accessToken}
POST	/auth/forgot-password	Send reset email	{email}	{success, message}
POST	/auth/reset-password/:token	Reset password	{password}	{success, message}
6.2. Profile Routes (/profile)
Auth Required (Bearer Token).

Method	Endpoint	Description	Success Response
GET	/profile	Get own profile	{success, user: {_id, name, email, phone, profileImage}}
PUT	/profile	Update profile (name, phone, image)	{success, message, user}
PUT	/profile/change-password	Change password	Body: {oldPassword, newPassword} -> {success, message}
6.3. Project Routes (/projects)
Auth Required (Bearer Token).

Method	Endpoint	Description
POST	/projects	Create project {projectName, description, websiteUrl}
GET	/projects	Get all projects of logged-in user
GET	/projects/:id	Get single project (ownership verified)
PUT	/projects/:id	Update project fields
DELETE	/projects/:id	Delete project
6.4. API Key Routes (/projects/:projectId/api-key)
Auth Required (Bearer Token).

Method	Endpoint	Description
POST	/projects/:projectId/api-key	Generate key. Body: {type: 'development' or 'production'}. Returns raw apiKey (only once).
GET	/projects/:projectId/api-key	Get list of keys (prefixes only, no raw keys).
PUT	/projects/:projectId/api-key/regenerate	Regenerate key. Body: {type}. Invalidates old.
PUT	/projects/:projectId/api-key/status	Activate/Deactivate. Body: {type, status: 'active/inactive'}.
6.5. Template Routes (/templates)
Auth Required (Bearer Token).

Method	Endpoint	Description
GET	/templates	Get all templates (system + user's custom)
GET	/templates/system	Get only system templates
GET	/templates/:id	Get single template
POST	/templates	Create custom template. Body: {projectId, name, subject, body, category}
PUT	/templates/:id	Update custom template (ownership check)
DELETE	/templates/:id	Delete custom template
6.6. Email Sending Engine (/email)
Auth Required? No, this uses API Key authentication. (Header: x-api-key).

Method	Endpoint	Headers	Description
POST	/email/send	x-api-key: pk_...	Sends email. Body: {projectId, templateId, to, data: {userName, orderId...}}. Replaces {{variables}}. Saves log.
Workflow for /email/send:

Middleware apiKey.middleware validates the hash.

Fetch template by templateId.

Fetch project settings (for sender name/email).

Replace {{projectVar}} from Project settings.

Replace {{data.var}} from request body.

Send via smtp.service.js.

If success -> status = 'sent'. Else -> status = 'failed'. Save log.

6.7. Email Logs (/email-logs)
Auth Required (Bearer Token).

Method	Endpoint	Description
GET	/email-logs	Get all logs for logged-in user. Supports Query: ?page=1&limit=10&status=sent&projectId=...
GET	/email-logs/:id	Get single log (ownership verified).
6.8. User Dashboard (/dashboard)
Auth Required (Bearer Token).

Method	Endpoint	Description
GET	/dashboard	Get user-specific stats (Total Projects, Total Emails Sent, Success Rate, Recent Activities).
6.9. Admin Dashboard (/admin-dashboard)
Auth Required: Bearer Token + Admin Middleware (role: admin).

Overview & Profile
Method	Endpoint	Description
GET	/admin-dashboard/admin/overview	Fetch total users, projects, templates, emails, recent activity.
GET	/admin-dashboard/admin/profile	Fetch admin profile.
PUT	/admin-dashboard/admin/profile	Update admin profile.
User Management
Method	Endpoint	Description
GET	/admin-dashboard/admin/users	List all users (pagination).
GET	/admin-dashboard/admin/users/:id	Get full details of a specific user (including their projects, keys, logs).
PUT	/admin-dashboard/admin/users/:id/status	Block/Unblock user. Body: {status: "blocked" or "active"}.
Project Management (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/admin/projects	List all projects across all users.
GET	/admin-dashboard/admin/projects/:id	Get specific project details.
PUT	/admin-dashboard/admin/projects/:id/status	Activate/Deactivate project. Body: {status: "active/inactive"}.
Email Management (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/admin/emails	List all email logs (global).
GET	/admin-dashboard/admin/emails/:id	Get specific email log.
GET	/admin-dashboard/admin/email-stats	Global statistics (total sent, failed, success rate).
Template Management (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/admin/templates	List all system templates.
POST	/admin-dashboard/admin/templates	Create a new system template. Body: {name, subject, body, category}.
PUT	/admin-dashboard/admin/templates/:id	Update system template.
DELETE	/admin-dashboard/admin/templates/:id	Delete system template.
Analytics (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/analytics	Returns aggregated counts (Users, Verified, Blocked, Projects, Emails, etc.).
Activity Logs (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/activity	List all admin actions (Who blocked whom, who created templates).
GET	/admin-dashboard/activity/:id	Get specific activity detail.
API Key Management (Admin)
Method	Endpoint	Description
GET	/admin-dashboard/api-keys/overview	API key usage summary.
GET	/admin-dashboard/api-keys	List all keys across all projects (hashed/prefix only).
7. Core Middleware Logic (How Validation Works)
7.1. auth.middleware.js
Extracts token from Authorization: Bearer <token>.

Verifies using JWT_ACCESS_SECRET.

Attaches req.user (excluding password and refreshToken) to the request object.

If invalid/missing -> returns 401 Unauthorized.

7.2. admin.middleware.js
Calls auth.middleware first.

Checks if req.user.role === 'admin'.

If not admin -> returns 403 Forbidden.

7.3. apiKey.middleware.js
Extracts key from header x-api-key.

It splits the key (e.g., pk_live_a1b2c3...). Takes the prefix + part of it to find potential candidates in DB (to optimize query).

Compares the incoming key's hash with the stored keyHash using bcrypt.compare or custom SHA256 compare.

Attaches req.project and req.user from the associated project.

Rejects if inactive or not found.

7.4. Rate Limiters
Login: Max 5 attempts per 15 minutes.

Register: Max 5 attempts per 15 minutes.

Forgot Password: Max 5 attempts per 15 minutes.

(Uses express-rate-limit).

8. Admin Seeder Script (scripts/createAdmin.js)
To create the first admin user:

javascript
// Run: node scripts/createAdmin.js
// Reads ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME from .env
// Hashes password and inserts user with role: "admin" if not exists.
9. Business Rules & Constraints (Crucial for AI)
When generating code or debugging, these are the golden rules:

Unique Constraint: A user cannot have two projects with the same projectName.

API Key Limit: A user/project can have ONLY ONE development and ONLY ONE production key at a time.

API Key Return: Raw API key is returned ONLY at the time of generation/regeneration. It is NEVER sent again.

Password Change: Whenever a password is changed/updated, the refreshToken field in the User model must be set to null to invalidate all sessions.

Refresh Token Rotation: Refresh token is stored in the DB. When refresh-token endpoint is called, verify the DB token matches the cookie token.

Email Sending Variables: Template variables are replaced in 2 passes: First from Project settings (e.g., {{companyName}}), then from request data object (e.g., {{userName}}).

Soft Deletion/Status: Projects and API keys are never permanently deleted to maintain log integrity; they are just marked status: 'inactive'.

Admin Access: Admins bypass ownership restrictions (they can see/delete any user's projects/templates), but they cannot send emails as a user.

10. Module Completion Status Summary
Module Name	Status	Notes
Authentication	✅ 100%	Register, Login, JWT, Refresh, Forgot/Reset Password.
User Profile	✅ 100%	CRUD for name, phone, image. Password change logic done.
Project Management	✅ 100%	CRUD with ownership validation.
API Key Management	✅ 100%	Gen/Regen, Hash storage, Activate/Deactivate.
Template System	✅ 100%	System & Custom templates with variable support.
Email Engine (Send)	✅ 100%	API Key auth, variable replacement, SMTP send.
Email Logs	✅ 100%	Logging with status tracking (Sent/Failed).
User Dashboard	✅ 100%	Stats and recent activity.
Admin Dashboard	✅ 99%	Overview, User/Project/Template/Email/Key management complete.
Admin Profile	✅ 100%	Update admin details and password.
11. How to Run the Project (For AI Assistant Instructions)
Clone repo and run npm install.

Create .env with the variables listed above.

Ensure MongoDB is running locally or use Atlas URI.

Run node scripts/createAdmin.js to create the super admin.

Start the server: npm run dev (uses nodemon) or node server.js.

Server will be live on http://localhost:5000.

Final Instruction for AI Assistants
"This document contains the complete blueprint of the Email SaaS Backend. If the user asks for modifications, bug fixes, or new features in the future, strictly adhere to the folder structure, model schemas, and middleware flows described above. Do not introduce new architectural patterns unless explicitly requested. Always prioritize the Security rules (especially API Key hashing and Refresh Token removal on password reset)."

