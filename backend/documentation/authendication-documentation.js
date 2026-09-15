# Authentication Module (v1) - API Testing Checklist

## Base URL

```
http://localhost:5000/api/auth
```

---

# 1. Register User

### Endpoint

```
POST /register
```

### Full URL

```
http://localhost:5000/api/auth/register
```

### Request Body

```json
{
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "phone": "9876543210",
    "password": "Rahul@123"
}
```

### Expected Response

```json
{
    "success": true,
    "message": "Registration successful",
    "userId": "xxxxxxxxxxxx"
}
```

### Verify

* User MongoDB me create hona chahiye.
* Password hashed hona chahiye.
* `isVerified` = false
* Verification email receive honi chahiye.
* `VerificationToken` collection me token save hona chahiye.

---

# 2. Verify Email

Email me received verification link ka token copy kare.

### Endpoint

```
GET /verify-email/:token
```

### Example

```
http://localhost:5000/api/auth/verify-email/4c5b9f3d.........
```

### Expected Response

```json
{
    "success": true,
    "message": "Email verified successfully"
}
```

### Verify

* User ka `isVerified` = true
* Verification token delete ho jana chahiye.

---

# 3. Login

### Endpoint

```
POST /login
```

### Full URL

```
http://localhost:5000/api/auth/login
```

### Request Body

```json
{
    "email": "rahul@gmail.com",
    "password": "Rahul@123"
}
```

### Expected Response

```json
{
    "success": true,
    "message": "Login successful",
    "accessToken": "xxxxxxxxxxxx",
    "user": {
        "id": "xxxxxxxx",
        "name": "Rahul Sharma",
        "email": "rahul@gmail.com"
    }
}
```

### Verify

* Access Token mile.
* Refresh Token cookie me save ho.
* Database me refresh token save ho.

---

# 4. Protected Route Test

### Endpoint

```
GET /api/auth/me
```

### Headers

```
Authorization
Bearer YOUR_ACCESS_TOKEN
```

### Expected Response

```json
{
    "success": true,
    "user": {
        "_id": "...",
        "name": "Rahul Sharma",
        "email": "rahul@gmail.com",
        "phone": "9876543210",
        "isVerified": true
    }
}
```

### Verify

* Invalid token par 401 aaye.
* Valid token par user data mile.

---

# 5. Refresh Access Token

### Endpoint

```
POST /refresh-token
```

### Cookies

Browser/Postman me Refresh Token cookie present honi chahiye.

### Request Body

```
No Body Required
```

### Expected Response

```json
{
    "success": true,
    "accessToken": "NEW_ACCESS_TOKEN"
}
```

### Verify

* Naya access token generate ho.

---

# 6. Logout

### Endpoint

```
POST /logout
```

### Request Body

```
No Body Required
```

### Expected Response

```json
{
    "success": true,
    "message": "Logout successful"
}
```

### Verify

* Refresh Token cookie remove ho.
* Database se refresh token remove ho.

---

# 7. Forgot Password

### Endpoint

```
POST /forgot-password
```

### Request Body

```json
{
    "email": "rahul@gmail.com"
}
```

### Expected Response

```json
{
    "success": true,
    "message": "Password reset email sent"
}
```

### Verify

* Password reset email receive ho.
* PasswordResetToken collection me token create ho.

---

# 8. Reset Password

Email se token copy kare.

### Endpoint

```
POST /reset-password/:token
```

### Example

```
http://localhost:5000/api/auth/reset-password/72d94c........
```

### Request Body

```json
{
    "password": "NewPassword@123"
}
```

### Expected Response

```json
{
    "success": true,
    "message": "Password reset successful"
}
```

### Verify

* Password update ho.
* Password hashed ho.
* Refresh Token database se remove ho.
* PasswordResetToken delete ho.

---

# 9. Login With New Password

### Endpoint

```
POST /login
```

### Request Body

```json
{
    "email": "rahul@gmail.com",
    "password": "NewPassword@123"
}
```

### Expected Result

Login successful hona chahiye.

---

# Authentication Module Checklist

| Feature            | Status |
| ------------------ | ------ |
| User Registration  | ✅      |
| Email Verification | ✅      |
| Login              | ✅      |
| JWT Access Token   | ✅      |
| Refresh Token      | ✅      |
| Protected Route    | ✅      |
| Logout             | ✅      |
| Forgot Password    | ✅      |
| Reset Password     | ✅      |

---

# MongoDB Collections

## User

```
name
email
phone
password
isVerified
refreshToken
```

## VerificationToken

```
userId
token
expiresAt
```

## PasswordResetToken

```
userId
token
expiresAt
```

---

# Authentication Flow

```
Register
    ↓
Verification Email
    ↓
Verify Account
    ↓
Login
    ↓
Access Token + Refresh Token
    ↓
Protected APIs
    ↓
Refresh Access Token
    ↓
Logout

Forgot Password
    ↓
Reset Email
    ↓
Reset Password
    ↓
Login With New Password
```

---

# Module Status

**Authentication Module (v1): 100% Complete**
