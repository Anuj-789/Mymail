# API Key Management Module (v1) - Documentation

## Module Purpose

API Key Management module ka purpose hai ki har project ke liye secure API keys generate aur manage ki ja sake.

Ye API keys developers ko di jayengi jisse wo apni website/application se Email SaaS platform ki APIs access kar payenge.

Example:

Developer ki website:

```
E-commerce Website
```

Project create hone ke baad:

```
Development API Key

pk_test_xxxxxxxxx


Production API Key

pk_live_xxxxxxxxx
```

Developer in keys ko use karke email sending APIs call karega.

---

# Key Types

Har project ke liye maximum 2 API Keys hongi.

## 1. Development Key

Purpose:

Local development aur testing ke liye.

Format:

```
pk_test_xxxxxxxxx
```

Example:

```
pk_test_f33ce4b23cd5ed6f20f71c8
```

---

## 2. Production Key

Purpose:

Live application ke liye.

Format:

```
pk_live_xxxxxxxxx
```

Example:

```
pk_live_101bd93f1508e69d1cf1a
```

---

# API Key Security

## Important Rule

Actual API Key database me store nahi hoti.

Example:

Generated Key:

```
pk_live_101bd93f1508e69
```

Database me:

```
keyHash:
9bb2dd333b68bef3f98cc52372797002
```

Reason:

Agar database leak bhi ho jaye to original API key recover nahi ki ja sakti.

---

# Database Model

Collection:

```
ApiKey
```

Structure:

```javascript
{
    userId,
    projectId,

    name,

    keyPrefix,

    keyHash,

    status,

    usageCount,

    lastUsedAt,

    createdAt,
    updatedAt
}
```

---

# Field Explanation

## userId

Batata hai API key kis user ki hai.

Example:

```
Rahul User
    |
    |
 API Key
```

---

## projectId

Batata hai API key kis project ke liye hai.

Example:

```
E-commerce Project

        |
        |
 Production API Key
```

---

## name

API key type:

Allowed values:

```
development
production
```

---

## keyPrefix

API key ka starting part store hota hai.

Example:

Actual:

```
pk_live_d1d0xxxxxxxx
```

Database:

```
pk_live_d1d0
```

Purpose:

Dashboard me identify karne ke liye.

---

## keyHash

Hashed API key.

Actual key kabhi database me save nahi hoti.

---

## status

API key status:

Active:

```
active
```

Use allowed hai.

Inactive:

```
inactive
```

API request reject hogi.

---

## usageCount

Kitni baar API key use hui.

Example:

```
Emails API Called:

5000 times
```

---

## lastUsedAt

Last API usage ka time.

---

# API Key Flow

## Generate Key Flow

```
User Creates Project

        ↓

Generate API Key Request

        ↓

Check Project Ownership

        ↓

Check Duplicate Key

        ↓

Generate Random Key

        ↓

Add Prefix

        ↓

Hash Key

        ↓

Save Hash

        ↓

Return Full Key Once
```

---

# Available APIs

## 1. Generate API Key

Purpose:

Project ke liye development ya production key create karna.

Endpoint:

```
POST

/api/projects/:projectId/api-key
```

Headers:

```
Authorization: Bearer ACCESS_TOKEN
```

Body:

Development:

```json
{
    "type":"development"
}
```

Production:

```json
{
    "type":"production"
}
```

Response:

```json
{
    "success":true,
    "message":"API key generated successfully",
    "apiKey":"pk_live_xxxxxxxxx"
}
```

Important:

Ye full key sirf ek baar show hoti hai.

User ko copy karke safe rakhni hogi.

---

# 2. Get API Keys

Purpose:

Project ki existing API keys dekhna.

Endpoint:

```
GET

/api/projects/:projectId/api-key
```

Headers:

```
Authorization: Bearer ACCESS_TOKEN
```

Response:

```json
{
    "success":true,
    "apiKeys":[
        {
            "name":"production",
            "keyPrefix":"pk_live_d1d0",
            "status":"active",
            "usageCount":10
        }
    ]
}
```

Security:

Full API key kabhi return nahi hoti.

---

# 3. Regenerate API Key

Purpose:

Agar user key bhool jaye ya security reason se new key chahiye.

Endpoint:

```
PUT

/api/projects/:projectId/api-key/regenerate
```

Body:

```json
{
    "type":"production"
}
```

Flow:

```
Old Key

   ↓

Overwrite

   ↓

New Key Generate

   ↓

Old Key Invalid

   ↓

New Key Active
```

Response:

```json
{
    "success":true,
    "message":"API key regenerated successfully",
    "apiKey":"pk_live_newxxxxxxxx"
}
```

---

# 4. Activate / Deactivate API Key

Purpose:

Key ko temporarily disable karna.

Endpoint:

```
PUT

/api/projects/:projectId/api-key/status
```

Deactivate:

```json
{
    "type":"production",
    "status":"inactive"
}
```

Activate:

```json
{
    "type":"production",
    "status":"active"
}
```

Inactive key se request:

```json
{
    "success":false,
    "message":"API key is inactive"
}
```

---

# API Key Validation System

Jab developer email API call karega:

Request:

```
Developer Application

        ↓

x-api-key Header

        ↓

API Key Middleware

        ↓

Hash Generate

        ↓

Database Match

        ↓

Status Check

        ↓

Allow Request
```

---

# Developer Usage

Developer apni application me:

Request:

```
POST /api/send-email
```

Header:

```
x-api-key:
pk_live_xxxxxxxxx
```

Backend:

```
API Key Verify

        ↓

Project Verify

        ↓

Email Send
```

---

# Error Responses

## Missing API Key

```json
{
    "success":false,
    "message":"API key required"
}
```

---

## Invalid API Key

```json
{
    "success":false,
    "message":"Invalid API key"
}
```

---

## Inactive API Key

```json
{
    "success":false,
    "message":"API key is inactive"
}
```

---

# Security Features Implemented

✅ API Key Hashing

✅ Prefix System

✅ Development Key

✅ Production Key

✅ Duplicate Prevention

✅ Project Ownership Check

✅ Status Control

✅ Usage Tracking

✅ Last Usage Tracking

---

# Module Status

```
API Key Management Module (v1)

100% Complete
```

Ready For:

```
Email Template System

and

Email Sending Engine
```
