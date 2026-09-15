# Project Management Module (v1) Documentation

## Module Overview

The Project Management Module is responsible for allowing authenticated users to create and manage their projects inside the Email SaaS Platform.

Each project represents a website/application that will later use our Email Sending API.

Example:

A user can create:

* Portfolio Website
* E-commerce Application
* Blog Platform
* SaaS Application

Each project will have its own configuration and later will be connected with:

* API Keys
* Email Templates
* Email Sending Engine
* Email Logs

---

# Module Purpose

The main purpose of this module is:

* Allow users to create projects.
* Store project information.
* Manage multiple projects under one account.
* Provide project ownership security.
* Prepare the base for API Key and Email Engine modules.

---

# Authentication Requirement

All Project APIs are protected.

User must send JWT Access Token with every request.

Header:

```
Authorization: Bearer ACCESS_TOKEN
```

Flow:

```
Request

↓

JWT Middleware

↓

Token Verification

↓

Find User

↓

req.user

↓

Project Controller Access
```

---

# Folder Structure

```
src/

controllers/

    project/

        project.controller.js


models/

    project/

        Project.js


routes/

    project/

        project.routes.js
```

---

# Database Model

## Project Schema

File:

```
src/models/project/Project.js
```

Schema:

```javascript
{
    userId,
    projectName,
    description,
    websiteUrl,
    allowedDomains,
    status,
    createdAt,
    updatedAt
}
```

## Field Explanation

### userId

Type:

```
ObjectId
```

Purpose:

Stores the owner of the project.

Example:

```
userId: 65abc123xyz
```

A user can have multiple projects.

---

### projectName

Type:

```
String
```

Purpose:

Project identification name.

Example:

```
Portfolio Website
```

Rules:

* Required field.
* Same user cannot create duplicate project names.

Example:

Allowed:

```
Rahul

Portfolio
E-commerce
Blog
```

Not Allowed:

```
Portfolio
Portfolio
```

---

### description

Type:

```
String
```

Purpose:

Stores project description.

Example:

```
Personal portfolio website
```

---

### websiteUrl

Type:

```
String
```

Purpose:

Stores project website URL.

Example:

```
https://example.com
```

Currently optional because users may create projects before deployment.

---

### allowedDomains

Type:

```
Array
```

Purpose:

Stores allowed domains for future API security.

Example:

```json
[
    "example.com",
    "www.example.com"
]
```

This will be used later for:

* Domain verification
* API security
* Request validation

---

### status

Type:

```
String
```

Values:

```
active
inactive
```

Default:

```
active
```

Purpose:

Control project availability.

---

# API Routes

Base URL:

```
http://localhost:5000/api/projects
```

---

# 1. Create Project

## Endpoint

```
POST /api/projects
```

## Purpose

Creates a new project for the logged-in user.

## Request Header

```
Authorization: Bearer ACCESS_TOKEN
```

## Request Body

```json
{
    "projectName": "Portfolio Website",
    "description": "My personal website",
    "websiteUrl": "",
    "allowedDomains": []
}
```

## Backend Flow

```
User Request

↓

JWT Authentication

↓

Get User ID

↓

Check Project Name

↓

Check Duplicate Project

↓

Create Project

↓

Save Database
```

## Success Response

```json
{
    "success": true,
    "message": "Project created successfully",
    "project": {}
}
```

---

# 2. Get All Projects

## Endpoint

```
GET /api/projects
```

## Purpose

Returns all projects created by the logged-in user.

## Flow

```
Request

↓

JWT Verify

↓

Find Projects Using userId

↓

Return Projects
```

## Database Query

```javascript
Project.find({
    userId:req.user._id
})
```

## Response

```json
{
    "success":true,
    "count":2,
    "projects":[]
}
```

---

# 3. Get Single Project

## Endpoint

```
GET /api/projects/:id
```

## Purpose

Fetch details of one project.

Example:

```
GET /api/projects/65abc123
```

## Security

User can only access his own project.

Database Query:

```javascript
Project.findOne({

_id:req.params.id,

userId:req.user._id

})
```

## Response

```json
{
    "success":true,
    "project":{}
}
```

---

# 4. Update Project

## Endpoint

```
PUT /api/projects/:id
```

## Purpose

Updates existing project information.

## Editable Fields

```
projectName

description

websiteUrl

allowedDomains

status
```

## Request Body

```json
{
    "projectName":"E-commerce App",
    "description":"Online store",
    "status":"active"
}
```

## Flow

```
Request

↓

Authentication

↓

Find Project

↓

Verify Ownership

↓

Update Fields

↓

Save Database
```

## Response

```json
{
    "success":true,
    "message":"Project updated successfully"
}
```

---

# 5. Delete Project

## Endpoint

```
DELETE /api/projects/:id
```

## Purpose

Deletes a project.

## Flow

```
Request

↓

Authentication

↓

Find Project

↓

Check Owner

↓

Delete Project
```

## Response

```json
{
    "success":true,
    "message":"Project deleted successfully"
}
```

---

# Security Implementation

## 1. JWT Protection

All project routes require authentication.

Implemented:

* Token verification
* User identification
* Protected routes

---

## 2. Ownership Validation

A user cannot access another user's project.

Example:

User A:

```
Project ID: 123
```

User B:

```
GET /api/projects/123
```

Result:

```
Project Not Found
```

---

## 3. Duplicate Project Prevention

Before creating a project:

Backend checks:

```javascript
{
userId,
projectName
}
```

If project exists:

Response:

```json
{
    "success":false,
    "message":"Project name already exists"
}
```

---

# Complete Module Flow

```
User Login

↓

Receive Access Token

↓

Create Project

↓

Project Stored With User ID

↓

User Can View Projects

↓

User Can Update Project

↓

User Can Delete Project

↓

Project Ready For API Key Integration
```

---

# Future Enhancements

These features can be added later:

## Project Members

Multiple users working on one project.

## Project Activity Logs

Track:

* Created project
* Updated settings
* API key changes

## Project Settings

Add:

* Sender Email
* Sender Name
* Timezone

## Environment Support

Example:

```
Development

Production
```

## Usage Tracking

Example:

```
Emails Sent:
5000/10000
```

---

# Module Status

```
Project Management Module v1

Status: COMPLETED
```

Completed Features:

✅ Create Project

✅ Get All Projects

✅ Get Single Project

✅ Update Project

✅ Delete Project

✅ JWT Protected Routes

✅ User Ownership Security

✅ Duplicate Project Name Protection

```
```
