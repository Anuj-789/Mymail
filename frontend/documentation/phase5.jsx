Profile Management Module Documentation
Module Name

User Profile Management Module

1. Feature Overview

Profile module का purpose user को अपनी personal information और account security manage करने की सुविधा देना है।

User इस module में:

✅ अपना profile देख सकता है
✅ Name update कर सकता है
✅ Phone number update कर सकता है
✅ Profile image update कर सकता है
✅ Email देख सकता है
✅ Password change कर सकता है
✅ Forgot password flow पर जा सकता है

यह module authenticated users के लिए है।

2. Architecture Flow

Complete flow:

User Action

↓

Profile UI Components

↓

Redux Thunk

↓

Profile API Service

↓

Backend API

↓

Controller

↓

MongoDB User Model

↓

Response

↓

Redux Store Update

↓

UI Refresh
3. Frontend Architecture

Current structure:

src/

├── modules/

│
│   └── profile/

│
│       ├── pages/
│       │
│       │    └── Profile.jsx
│       │
│       ├── components/
│       │
│       │    ├── ProfileAvatar.jsx
│       │    ├── ProfileForm.jsx
│       │    └── PasswordForm.jsx
│       │
│       └── profile.routes.jsx
│


├── features/

│
│   └── profile/

│
│       ├── profileAPI.js
│       ├── profileThunk.js
│       ├── profileSlice.js
│       └── profileSelectors.js


├── services/

│
│   └── profile.api.js


└── app/

    └── store.js
4. Profile Page
File:
modules/profile/pages/Profile.jsx
Responsibility:

Main profile dashboard handle करता है।

इसमें:

User information header
Profile avatar
Personal information section
Security section

manage होता है।

Page Layout

Desktop View:

------------------------------------------------

Profile Header

[ Avatar ]     Name
               Email
               Status
               MyMail User


------------------------------------------------


Personal Information        Security


Profile Form                Password Form


------------------------------------------------

Mobile View:

Profile Header


Personal Information


Security


Responsive layout बनाया गया है।

5. Profile Avatar Component
File:
modules/profile/components/ProfileAvatar.jsx
Purpose:

User की profile identity show करना।

Features:

Profile Image

अगर user के पास image है:

profileImage

तो image show होगी।

अगर image नहीं है:

तो user name का first letter दिखेगा।

Example:

Rahul

↓

R
Status Badges:

Show करता है:

Active Account

MyMail User
Desktop Extra Feature

Public folder में मौजूद:

profilelogo.gif

Desktop PC view में right side show होता है।

Mobile और tablet में hide रहता है।

Logic:

lg:block

hidden
6. Profile Form Component
File:
modules/profile/components/ProfileForm.jsx
Purpose:

User personal information update करना।

Fields:

Name

Editable:

name
Email

Readonly:

email

क्योंकि email authentication identity है।

Phone

Editable:

phone
Profile Image

Editable:

profileImage URL
Submit Flow
User Update Button Click

↓

handleSubmit()

↓

dispatch(updateProfile(data))

↓

profileThunk

↓

profileAPI

↓

PUT /profile

↓

Backend Controller

↓

Database Update

↓

Redux Update

↓

Toast Success

7. Password Management Component
File:
modules/profile/components/PasswordForm.jsx
Purpose:

User password management।

Features:

Change Password

Fields:

Current Password

New Password

Confirm Password

Validation:

Current password required

New password:

Minimum:

6 characters

Confirm password:

Match check:

newPassword === confirmPassword
Change Password Flow
User Submit

↓

changePassword()

↓

Redux Thunk

↓

API Call

↓

PUT /profile/change-password

↓

Backend Validation

↓

Password Hash

↓

MongoDB Update

↓

Success Toast

8. Forgot Password Integration

Password section में link दिया गया है:

Forgot your current password?


Reset password using email →

Click करने पर:

/forgot-password

route open होता है।

यह existing authentication forgot password flow reuse करता है।

9. Redux Architecture

Location:

features/profile
profileSlice.js

State:

{
 user:null,

 loading:false,

 passwordLoading:false,

 message:null,

 error:null
}

Responsibilities:

User profile store करना
Loading manage करना
Error handling
Update response handle करना
10. Redux Thunks
getProfile()

Purpose:

Current logged-in user profile fetch करना।

API:

GET /profile

Flow:

Profile Page Load

↓

dispatch(getProfile())

↓

Backend

↓

User Data

↓

Redux Store
updateProfile()

Purpose:

Profile information update करना।

API:

PUT /profile

Data:

{
 name,
 phone,
 profileImage
}
changePassword()

Purpose:

Password update करना।

API:

PUT /profile/change-password

Body:

{
 oldPassword,
 newPassword
}
11. API Layer
Service File
services/profile.api.js

Functions:

getProfileAPI()

Request:

GET /profile
updateProfileAPI()

Request:

PUT /profile
changePasswordAPI()

Request:

PUT /profile/change-password
12. Backend Integration

Backend:

Node.js + Express + MongoDB

Controller

Location:

controllers/profile/profile.controller.js

Available Controllers:

getProfile()

Purpose:

User profile fetch करना।

Query:

User.findById(
req.user._id
)

Password और refresh token remove करता है।

updateProfile()

Purpose:

User details update करना।

Allowed fields:

name

phone

profileImage

Response:

{
success:true,
message:"Profile updated successfully"
}
changePassword()

Purpose:

Password change करना।

Process:

Old Password Verify

↓

New Password Hash

↓

Save Password

↓

Remove Refresh Token

↓

Response
13. Backend Routes

File:

routes/profile/profile.routes.js
Get Profile
GET

/profile

Middleware:

authMiddleware
Update Profile
PUT

/profile

Middleware:

authMiddleware
Change Password
PUT

/profile/change-password

Middleware:

authMiddleware
14. UI Design System

Theme:

Orange SaaS Theme

Colors:

Background:

#0c0a09

Cards:

#1c1917

Primary:

#f97316

Border:

#292524

Components:

Rounded:

rounded-2xl

Cards:

Dark glass style

Buttons:

Orange gradient

15. Responsive Behaviour
Desktop
Profile Header + GIF

Two column layout

Profile Information

Security
Tablet
Single column

GIF hidden
Mobile
Stack layout

Avatar centered

Forms full width
16. Current Completed Features

✅ Profile page created

✅ Profile avatar system

✅ Default initials avatar

✅ Desktop profile GIF

✅ Responsive design

✅ Update profile

✅ Email readonly

✅ Phone update

✅ Profile image update

✅ Change password

✅ Forgot password redirect

✅ Redux integration

✅ API service integration

✅ Backend integration

✅ Toast notifications