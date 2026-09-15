Email Logs Management Module ka purpose hai ki platform ke through bheje gaye har email ka complete record maintain kiya ja sake.

Jab bhi developer Email Sending API ke through email send karega, us email ka log database me create hoga.

Is module ke through user:

Sent emails dekh sakta hai.
Failed emails track kar sakta hai.
Pending emails monitor kar sakta hai.
Email history access kar sakta hai.
Project aur template wise emails filter kar sakta hai.
Real Life Example

Developer ne API call ki:

POST /api/email/send

Email:

Welcome Email

Receiver:

user@gmail.com

Email send hone ke baad:

Email Sent

        ↓

EmailLog Collection

        ↓

Record Save

Database me:

Status:

sent
Module Flow
Developer Request

        ↓

API Key Verify

        ↓

Template Fetch

        ↓

Email Generate

        ↓

SMTP Send

        ↓

Email Status Create

        ↓

EmailLog Database Save

        ↓

Dashboard History
Folder Structure
src/


controllers/

    email-log/

        emailLog.controller.js



models/

    email-engine/

        EmailLog.js



routes/

    email-log/

        emailLog.routes.js

Database Model

Collection:

EmailLog

Schema:

{
    userId,

    projectId,

    templateId,

    from,

    to,

    subject,

    status,

    provider,

    messageId,

    errorMessage,

    sentAt,

    metadata,

    createdAt,

    updatedAt
}
Field Explanation
userId

Type:

ObjectId

Purpose:

Batata hai email kis user ne send ki.

Example:

Rahul User

      |

      |

 Email Log
projectId

Purpose:

Batata hai email kis project se send hui.

Example:

E-commerce Project

        |

        |

 Welcome Email
templateId

Purpose:

Used template ka reference.

Example:

Welcome Email Template
from

Sender email.

Example:

anuj789projects@gmail.com
to

Receiver email.

Example:

customer@gmail.com
subject

Email subject.

Example:

Welcome Rahul
status

Email current status.

Allowed Values:

pending

sent

failed

Explanation:

pending

Email processing me hai.

sent

Successfully delivered to SMTP.

failed

Email send nahi hui.

provider

Email provider.

Example:

gmail

Future:

SendGrid

AWS SES

Mailgun
messageId

SMTP generated unique email id.

Example:

<abc123@gmail.com>
errorMessage

Agar email fail hoti hai to error store hota hai.

Example:

Invalid receiver email
sentAt

Email successfully send hone ka time.

metadata

Future extra information.

Example:

{
 "ip":"",
 "browser":""
}
API Routes

Base URL:

http://localhost:5000/api/email-logs
Route Summary Table
Method	Endpoint	Purpose	Authentication
GET	/api/email-logs	Get all email logs	Required
GET	/api/email-logs/:id	Get single email log	Required
API 1: Get All Email Logs
Endpoint
GET /api/email-logs
Purpose

Logged-in user ke saare email logs fetch karta hai.

Headers
Authorization: Bearer ACCESS_TOKEN
Query Parameters

Optional:

Parameter	Purpose
page	Pagination
limit	Records limit
status	Filter by status
projectId	Filter by project

Example:

GET /api/email-logs?page=1&limit=10&status=sent
Response
{
    "success":true,

    "total":1,

    "page":1,

    "limit":10,

    "logs":[

        {
            "_id":"",

            "projectId":{

                "projectName":"Email Testing Project"

            },

            "status":"sent",

            "to":"user@gmail.com",

            "subject":"Welcome Rahul"

        }

    ]
}
API 2: Get Single Email Log
Endpoint
GET /api/email-logs/:id
Purpose

Ek particular email ka complete detail.

Example:

GET /api/email-logs/6a5690e2c077749952f68490
Response
{
    "success":true,

    "log":{

        "to":"user@gmail.com",

        "subject":"Welcome Rahul",

        "status":"sent",

        "provider":"gmail"

    }
}
Controller Functions

File:

src/controllers/email-log/emailLog.controller.js

Functions:

getEmailLogs()

Purpose:

Multiple email logs fetch karna.

Features:

Pagination
Filtering
User based security
getEmailLogById()

Purpose:

Single email detail fetch karna.

Features:

Ownership check
Complete email information
Security Implementation

Implemented:

✅ JWT Authentication

✅ User Ownership Validation

✅ Only Own Email Logs Visible

✅ Project Based Filtering

✅ Template Reference Protection

Example:

User A:

GET /api/email-logs

Result:

Only User A emails
Postman Testing Checklist
Feature	Status
Get All Logs	✅
Pagination	✅
Status Filter	✅
Project Filter	✅
Get Single Log	✅
JWT Protection	✅
User Security	✅
Complete Flow
Email Send API

        ↓

Email Successfully Sent

        ↓

EmailLog Created

        ↓

User Dashboard

        ↓

Email History
Module Status
Email Logs Management Module (v1)


Status:

100% Complete

Completed:

✅ Email Log Creation

✅ Email History

✅ Sent Tracking

✅ Failed Tracking

✅ Pending Tracking

✅ Pagination

✅ Filtering

✅ Secure Access