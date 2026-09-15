# Email Template Management Module (v1) - Final Documentation

# Module Purpose

Email Template Management Module ka purpose hai ki users apne projects ke liye email templates create, manage aur customize kar sake.

Is module ke through:

* Ready-made system templates available honge.
* Users apne custom templates create kar sakenge.
* Users template ke text/design ko edit kar sakenge.
* Users apne variables create kar sakenge.
* Dynamic data ke saath emails generate ki ja sakengi.

==================================================

# Template Types

Platform me do type ke templates honge:

## 1. System Templates

## 2. Custom Templates

==================================================

# 1. System Templates

System Templates platform ke default ready-made templates honge.

Ye templates common email use cases ke liye honge.

## Categories:

# Authentication Templates

Examples:

* Welcome Email
* Email Verification
* Forgot Password
* Reset Password Success
* OTP Email
* Login Alert
* Account Created

# Business Templates

Examples:

* Contact Form
* Appointment Confirmation
* Feedback Request
* Invoice Email
* Order Confirmation
* Payment Success
* Shipping Update

==================================================

# System Template Behavior

System templates:

* Platform ke default templates honge.
* User inhe directly use kar sakta hai.
* User inka content customize kar sakta hai.

Lekin original system template modify nahi hoga.

Flow:

System Template

↓

Customize Template

↓

New Custom Template Create

Example:

Original:

Welcome Email

Type:

system

User customize karega:

Welcome Email Custom

Type:

custom

==================================================

# 2. Custom Templates

Custom Templates user ke apne banaye hue templates honge.

User:

* Naya template create kar sakta hai.
* Subject edit kar sakta hai.
* Email body design/edit kar sakta hai.
* Variables add kar sakta hai.

Example:

Template Name:

Order Confirmation

Subject:

Your order {{orderId}} confirmed

Body:

Hello {{customerName}},

Your order {{orderId}} has been confirmed.

Amount:

{{amount}}

==================================================

# Template Editor

Jab user template open karega to editor milega.

Fields:

## Template Name

Example:

Welcome Email Custom

---

## Subject

Example:

Welcome to {{appName}}

---

## Email Body

User email content edit karega.

Example:

Hello {{userName}},

Welcome to {{appName}}.

Regards,

{{companyName}}

Body support:

* Normal Text
* HTML Email Content

Future me:

Rich Text Editor support add kiya ja sakta hai.

==================================================

# Dynamic Variable System

User apne variables create kar sakta hai.

Example:

User variable banata hai:

Variable Name:

customerName

Variable Name:

orderId

Variable Name:

amount

Template me use:

Hello {{customerName}}

Your order:

{{orderId}}

==================================================

# Variable Types

Variables do source se aa sakte hain:

## 1. Project Variables

Ye project level ki information hogi.

Example:

* Company Name
* Website Name
* Logo
* Support Email

Ye project settings se aayegi.

Example:

companyName

appName

---

## 2. API Dynamic Variables

Ye har email request ke saath aayengi.

Example:

* userName
* orderId
* amount
* resetLink

Developer API request me data bhejega.

Example:

```json
{
 "data":{
    "userName":"Rahul",
    "orderId":"ORD123"
 }
}
```

==================================================

# Variable Insert System

Frontend me user ko variable insert karne ka option milega.

Example:

Insert Variable Button:

Options:

* userName
* orderId
* amount
* companyName

Select karne par:

{{userName}}

automatically editor me add ho jayega.

==================================================

# Template Flow

Complete Flow:

User Project Create Karega

↓

Templates Section Open Karega

↓

System Template Select Karega

OR

Create New Template Karega

↓

Template Edit Karega

↓

Variables Add Karega

↓

Save Template

↓

Email Sending API Template Use Karegi

↓

Variables Replace Honge

↓

Final Email Send Hogi

==================================================

# Template Sending Example

Template:

Hello {{userName}},

Welcome to {{appName}}

API Data:

```json
{
"userName":"Rahul"
}
```

Project Data:

```json
{
"appName":"Rahul Store"
}
```

Final Email:

Hello Rahul,

Welcome to Rahul Store

==================================================

# Frontend Template Section

Dashboard:

Templates

|

|---- System Templates

|       |

|       Authentication

|       Business

|

|---- My Templates

```
    |

    Create New Template

    User Created Templates
```

==================================================

# Database Concept

Single Template Collection hogi.

System Template:

```javascript
{
 type:"system",
 userId:null,
 projectId:null
}
```

Custom Template:

```javascript
{
 type:"custom",
 userId,
 projectId
}
```

==================================================

# Final Features Included

✅ System Templates

✅ Custom Templates

✅ Template Categories

✅ Template Editor

✅ Subject Editing

✅ Body Editing

✅ HTML + Text Support

✅ User Defined Variables

✅ Project Variables

✅ API Dynamic Variables

✅ Customize System Template

✅ Variable Insert System

==================================================

# Module Status

Email Template Management Module:

Ready For Development
