Admin Dashboard Module ka purpose hai ki Email SaaS Platform ka owner/admin pure platform ko monitor aur manage kar sake.

Ye module normal users ke dashboard se alag hai.

System me do dashboards hain:

Dashboard Module

        |
        |
        |---- User Dashboard
        |
        |
        |---- Admin Dashboard
Admin Dashboard Purpose

Admin Dashboard ke through admin:

Total users dekh sakta hai.
Kisi bhi user ka complete data dekh sakta hai.
User ko block/unblock kar sakta hai.
Total projects monitor kar sakta hai.
Email sending activity monitor kar sakta hai.
Templates manage kar sakta hai.
API keys monitor kar sakta hai.
Platform analytics dekh sakta hai.
Admin ki khud ki profile manage kar sakta hai.
Admin activity logs track kar sakta hai.
Authentication & Authorization

Admin Dashboard protected hai.

Do level security use hoti hai:

1. JWT Authentication

Har admin request me access token required hai.

Header:

Authorization: Bearer ACCESS_TOKEN

Flow:

Admin Login

      ↓

JWT Token Generate

      ↓

Dashboard API Request

      ↓

auth.middleware.js

      ↓

User Verify

      ↓

req.user
2. Admin Role Middleware

JWT verify hone ke baad role check hota hai.

User Model me:

role:{
    type:String,
    enum:["user","admin"],
    default:"user"
}

Admin ke liye:

role:"admin"

Flow:

JWT Verify

      ↓

Check Role

      ↓

role === admin

      ↓

Allow Access

Agar normal user admin API access kare:

Response:

{
    "success":false,
    "message":"Admin access only"
}

Status:

403 Forbidden
Admin User Creation

Admin user manually database me create hota hai.

Iske liye script banayi gayi hai.

Structure:

backend/

   scripts/

       createAdmin.js

Admin credentials .env se liye jate hain.

Example:

ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_NAME=
ADMIN_PHONE=

Script:

.env Data

      ↓

Password Hash

      ↓

User Create

      ↓

role:"admin"

      ↓

Admin Dashboard Access
Final Folder Structure
src/


src/

│
├── controllers/
│
│
│   └── dashboard/
│
│
│       ├── user-dashboard/
│       │
│       │
│       │   └── userDashboard.controller.js
│       │
│       │
│       │
│       └── admin-dashboard/
│           │
│           │
│           ├── adminOverview.controller.js
│           │
│           ├── adminProfile.controller.js
│           │
│           ├── userManagement.controller.js
│           │
│           ├── projectManagement.controller.js
│           │
│           ├── emailManagement.controller.js
│           │
│           ├── templateManagement.controller.js
│           │
│           ├── analytics.controller.js
│           │
│           ├── activity.controller.js
│           │
│           └── apiKeyManagement.controller.js
│
│
│
├── routes/
│
│
│   └── dashboard/
│
│
│       ├── user-dashboard/
│       │
│       │
│       │   └── userDashboard.routes.js
│       │
│       │
│       │
│       └── admin-dashboard/
│           │
│           │
│           ├── dashboard.routes.js
│           │
│           ├── adminOverview.routes.js
│           │
│           ├── adminProfile.routes.js
│           │
│           ├── userManagement.routes.js
│           │
│           ├── projectManagement.routes.js
│           │
│           ├── emailManagement.routes.js
│           │
│           ├── templateManagement.routes.js
│           │
│           ├── analytics.routes.js
│           │
│           ├── activity.routes.js
│           │
│           └── apiKeyManagement.routes.js



Route Integration System

Admin dashboard ke liye saare routes alag-alag files me maintain kiye gaye hain.

Main route file:

dashboard.routes.js

Ye sab routes ko combine karta hai.

Example:

router.use(
"/admin",
require("./adminOverview.routes")
);


router.use(
"/admin",
require("./adminProfile.routes")
);


router.use(
"/admin",
require("./userManagement.routes")
);


router.use(
"/admin",
require("./projectManagement.routes")
);


router.use(
"/admin",
require("./emailManagement.routes")
);


router.use(
"/admin",
require("./templateManagement.routes")
);


router.use(
"/analytics",
analyticsRoutes
);


router.use(
"/activity",
activityRoutes
);


router.use(
"/api-keys",
apiKeyManagementRoutes
);
Server Integration

Main index.js me sirf ek baar import kiya jata hai.

Example:

const adminDashboardRoutes =
require(
"./src/routes/dashboard/admin-dashboard/dashboard.routes"
);


app.use(
"/api/admin-dashboard",
adminDashboardRoutes
);

Isse multiple imports ki zaroorat nahi padti.

Admin Dashboard Modules
1. Admin Overview

File:

adminOverview.controller.js

Purpose:

Platform ka overall summary.

Data:

Total Users
Total Projects
Total Emails
Sent Emails
Failed Emails
Active Users

API:

GET

/api/admin-dashboard/admin/overview

Authentication:

JWT + Admin Middleware
2. Admin Profile Management

File:

adminProfile.controller.js

Purpose:

Admin apni profile manage karega.

Features:

Admin profile view
Name update
Phone update
Password change

Security:

Password hashing
Old password verification
Refresh token removal
3. User Management

File:

userManagement.controller.js

Purpose:

Admin users ko manage karega.

Features:

Get All Users

Admin:

Sabhi users dekh sakta hai.

API:

GET

/api/admin-dashboard/admin/users
Get Single User

Admin email/user id se complete information dekh sakta hai.

Data:

User Profile
Projects
Templates
Emails
API Keys
Block User

API:

PUT

/api/admin-dashboard/admin/users/:id/status

Example:

{
"status":"blocked"
}

Blocked user:

Login nahi kar payega.
API access nahi kar payega.
4. Project Management

File:

projectManagement.controller.js

Purpose:

Admin platform ke projects monitor karega.

Features:

Total projects
User wise projects
Project details

API:

GET

/api/admin-dashboard/admin/projects
5. Email Management

File:

emailManagement.controller.js

Purpose:

Platform ke emails monitor karna.

Features:

Total emails
Sent emails
Failed emails
Pending emails

Data source:

EmailLog Collection
6. Template Management

File:

templateManagement.controller.js

Purpose:

Admin templates manage karega.

Features:

All templates view
New template add
Update template
Delete template

Types:

system templates

custom templates
7. Analytics Module

File:

analytics.controller.js

Purpose:

Platform statistics.

Analytics:

Users
Total Users
Verified Users
Blocked Users
Projects
Total Projects
Active Projects
Inactive Projects
Emails
Total Emails
Sent Emails
Failed Emails
Pending Emails
Success Rate

API:

GET

/api/admin-dashboard/analytics
8. Activity Management

File:

activity.controller.js

Purpose:

Admin activities track karna.

Examples:

User created
User blocked
Template added
API key generated

Collection:

AdminActivityLog
9. API Key Management

File:

apiKeyManagement.controller.js

Purpose:

Platform ki API keys monitor karna.

Features:

Overview

Data:

Total API Keys
Active Keys
Inactive Keys
Total Usage

API:

GET

/api/admin-dashboard/api-keys/overview
All API Keys

Admin dekh sakta hai:

Owner user
Project
Key type
Status
Usage

Security:

Actual key kabhi return nahi hoti.

Database Models Used

Admin Dashboard multiple modules ke existing models use karta hai.

User
name
email
phone
role
status
isVerified
Project
userId
projectName
status
EmailLog
userId
projectId
templateId
status
sentAt
Template
userId
projectId
type
name
subject
body
ApiKey
userId
projectId
keyPrefix
status
usageCount
Complete Admin Flow
Create Admin

      ↓

Admin Login

      ↓

Receive Access Token

      ↓

Access Admin Dashboard

      ↓

JWT Verify

      ↓

Role Check

      ↓

Admin Panel Open

      ↓

Manage Platform
Security Features Implemented

✅ JWT Authentication

✅ Admin Role Verification

✅ Protected Admin Routes

✅ User Management Security

✅ Password Hashing

✅ Ownership Validation

✅ API Key Protection

✅ Sensitive Data Protection

Current Module Status
Admin Dashboard Module v1

Status:

Development Completed

Completed:

✅ Admin Authentication

✅ Admin Profile

✅ User Management

✅ Project Monitoring

✅ Email Monitoring

✅ Template Management

✅ Analytics

✅ Activity System

✅ API Key Management

Future Enhancements
Subscription Management

Plans:

Free
Pro
Enterprise
Billing System

Features:

Payments
Invoices
Revenue Tracking
Advanced Security

Features:

Login History
IP Tracking
Suspicious Activity Detection
Advanced Analytics

Features:

Charts
Graphs
Usage Reports
Admin Dashboard Module Ready For
Production SaaS Management