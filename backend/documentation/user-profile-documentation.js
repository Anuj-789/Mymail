# User Profile Management Module (v1) - API Documentation

## Module Purpose

User Profile Management ka purpose hai ki authenticated user apni profile information ko manage kar sake.

Is module me user:

* Apni profile dekh sakta hai
* Name update kar sakta hai
* Phone update kar sakta hai
* Profile image update kar sakta hai
* Password change kar sakta hai

---

# Authentication Required

Ye saari APIs protected hain.

Har request ke saath Access Token bhejna mandatory hai.

## Header

```
Authorization: Bearer ACCESS_TOKEN
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1...
```

Agar token nahi bhejoge:

Response:

```json
{
    "success": false,
    "message": "Authentication required"
}
```

Status:

```
401 Unauthorized
```

==================================================

# API 1: Get User Profile

## Purpose

Logged-in user apni profile details dekh sakta hai.

## Method

```
GET
```

## Endpoint

```
/api/profile
```

## Full URL

```
http://localhost:5000/api/profile
```

## Headers

```
Authorization: Bearer ACCESS_TOKEN
```

## Body

No Body Required

## Success Response

```json
{
    "success": true,
    "user": {
        "_id": "user_id",
        "name": "Rahul Sharma",
        "email": "rahul@gmail.com",
        "phone": "9876543210",
        "profileImage": "",
        "isVerified": true,
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## Verification

Check:

* User data aa raha hai
* Password response me nahi aa raha
* Refresh token response me nahi aa raha

==================================================

# API 2: Update User Profile

## Purpose

Logged-in user apni profile information update kar sakta hai.

## Method

```
PUT
```

## Endpoint

```
/api/profile
```

## Full URL

```
http://localhost:5000/api/profile
```

## Headers

```
Authorization: Bearer ACCESS_TOKEN

Content-Type: application/json
```

## Request Body

```json
{
    "name": "Rahul Kumar",
    "phone": "9999999999",
    "profileImage": "rahul.png"
}
```

## Fields

| Field        | Required | Description         |
| ------------ | -------- | ------------------- |
| name         | No       | User name update    |
| phone        | No       | Phone number update |
| profileImage | No       | Profile image URL   |

## Success Response

```json
{
    "success": true,
    "message": "Profile updated successfully",
    "user": {
        "name": "Rahul Kumar",
        "email": "rahul@gmail.com",
        "phone": "9999999999",
        "profileImage": "rahul.png"
    }
}
```

## Verification

Check:

* Database me updated values save hui hain
* Email change nahi hota
* Password change nahi hota

==================================================

# API 3: Change Password

## Purpose

Logged-in user apna password change kar sakta hai.

## Method

```
PUT
```

## Endpoint

```
/api/profile/change-password
```

## Full URL

```
http://localhost:5000/api/profile/change-password
```

## Headers

```
Authorization: Bearer ACCESS_TOKEN

Content-Type: application/json
```

## Request Body

```json
{
    "oldPassword": "OldPassword@123",
    "newPassword": "NewPassword@123"
}
```

## Flow

```
User Old Password Enter Karta Hai

          ↓

Backend Old Password Verify Karta Hai

          ↓

New Password Hash Hota Hai

          ↓

Database Update

          ↓

Refresh Token Remove

          ↓

Password Changed
```

## Success Response

```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

## Wrong Old Password Response

```json
{
    "success": false,
    "message": "Old password is incorrect"
}
```

==================================================

# Folder Structure

```
src/

controllers/

    profile/

        profile.controller.js


routes/

    profile/

        profile.routes.js
```

==================================================

# Controller Functions

File:

```
src/controllers/profile/profile.controller.js
```

Functions:

```
getProfile()

Purpose:
User profile fetch karna



updateProfile()

Purpose:
User profile update karna



changePassword()

Purpose:
Password change karna
```

==================================================

# Routes

File:

```
src/routes/profile/profile.routes.js
```

Routes:

```
GET

/api/profile

Get Profile



PUT

/api/profile

Update Profile



PUT

/api/profile/change-password

Change Password
```

==================================================

# Database Changes

## User Model

Final User Fields:

```javascript
{
    name,
    email,
    phone,
    password,
    profileImage,
    isVerified,
    refreshToken
}
```

==================================================

# Security

Implemented:

✅ JWT Authentication

✅ Protected Routes

✅ Password Verification

✅ Password Hashing

✅ Refresh Token Remove After Password Change

==================================================

# Postman Testing Checklist

| Feature                   | Status |
| ------------------------- | ------ |
| Get Profile API           | ✅      |
| Update Name               | ✅      |
| Update Phone              | ✅      |
| Update Profile Image      | ✅      |
| Change Password           | ✅      |
| JWT Protected Routes      | ✅      |
| Unauthorized Access Block | ✅      |

==================================================

# Complete Flow

```
User Login

      ↓

Access Token Receive

      ↓

Send Token In Header

      ↓

Profile API Access

      ↓

View / Update Profile

      ↓

Change Password If Needed
```

==================================================

# Module Status

## User Profile Management Module

Status:

```
100% Complete
```
