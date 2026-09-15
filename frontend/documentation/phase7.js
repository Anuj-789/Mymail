📘 EMAIL LOGS MODULE — FINAL DOCUMENTATION

Project: Email SaaS
Module: Email Logs
Status: ✅ COMPLETE
Purpose: Sent email activity ko store, retrieve, filter, paginate aur detailed view mein display karna.

1. Module Overview

Email Logs module application mein send ki gayi emails ki history maintain karta hai.

Module ke through user:

Apni email sending history dekh sakta hai
Recipient dekh sakta hai
Project dekh sakta hai
Template dekh sakta hai
Email status dekh sakta hai
Created/Sent date dekh sakta hai
Project ke basis par filter kar sakta hai
Status ke basis par filter kar sakta hai
Pagination use kar sakta hai
Kisi individual email log ki complete details dekh sakta hai
Email log details se Send Test Mail page par ja sakta hai
Important Security Rule

Email logs user-specific hain.

Backend har query mein authenticated user ke req.user._id ko use karta hai.

Isliye ek user doosre user ke email logs access nahi kar sakta.

2. Overall Architecture
                         EMAIL LOGS MODULE
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
           FRONTEND                            BACKEND
              │                                   │
       EmailLogs.jsx                       emailLog.routes.js
              │                                   │
       EmailLogDetails.jsx                 authMiddleware
              │                                   │
         LogsTable.jsx                    Controller
              │                                   │
       StatusBadge.jsx                     EmailLog Model
              │                                   │
              └──────────── API ────────────────┘
                         │
                    MongoDB
3. Frontend File Structure

Current Email Logs frontend implementation:

src/
│
├── modules/
│   └── emailLogs/
│       │
│       ├── components/
│       │   ├── LogsTable.jsx
│       │   └── StatusBadge.jsx
│       │
│       ├── pages/
│       │   ├── EmailLogs.jsx
│       │   └── EmailLogDetails.jsx
│       │
│       └── emailLogs.routes.js
│
└── features/
    └── emailLogs/
        │
        ├── emailLogsAPI.js
        ├── emailLogsThunk.js
        ├── emailLogsSlice.js
        └── emailLogsSelectors.js
4. Backend File Structure
src/
│
├── models/
│   └── email-engine/
│       └── EmailLog.js
│
├── controllers/
│   └── email-log/
│       └── emailLog.controller.js
│
├── routes/
│   └── email-log/
│       └── emailLog.routes.js
│
└── middlewares/
    └── auth/
        └── auth.middleware.js

Main server file mein:

/api/email-logs

route mount kiya gaya hai.

5. Database Model
EmailLog.js

MongoDB collection ke liye EmailLog model use hota hai.

Schema:

{
  userId,
  projectId,
  templateId,
  apiKeyId,


  to,
  from,
  subject,


  messageId,


  status,


  errorMessage,


  sentAt,


  createdAt,
  updatedAt
}
6. Database Fields
Field	Type	Required	Purpose
userId	ObjectId	Yes	Log kis user ka hai
projectId	ObjectId	Yes	Kis project se email send hui
templateId	ObjectId	No	Kaunsa email template use hua
apiKeyId	ObjectId	No	Kis API key se email send hui
to	String	Yes	Recipient email
from	String	No	Sender email
subject	String	Yes	Email subject
messageId	String	No	Email provider ka message ID
status	String	Yes	Email sending status
errorMessage	String	No	Failure hone par error
sentAt	Date	No	Successfully send hone ka time
createdAt	Date	Auto	Log creation time
updatedAt	Date	Auto	Last update time
7. Status Values

Current backend schema officially support karta hai:

pending
sent
failed
pending

Email processing/sending ke initial state ko represent karta hai.

sent

Email successfully provider ko send ho gayi.

failed

Email send nahi ho payi.

errorMessage mein failure reason store kiya ja sakta hai.

8. Database Indexes

EmailLog model mein following indexes defined hain:

{ userId: 1, createdAt: -1 }

Purpose:

User ke latest email logs efficiently fetch karna.

{ projectId: 1 }

Purpose:

Project-based filtering ko optimize karna.

{ status: 1 }

Purpose:

Status-based filtering ko optimize karna.

{ messageId: 1 }

Purpose:

Provider message ID se log lookup ko optimize karna.

9. Backend Route Mounting

Main server file:

app.use("/api/email-logs", emailLogRoutes);

Therefore actual API base path:

/api/email-logs
10. Backend Routes

emailLog.routes.js

Get All Logs
GET /api/email-logs

Middleware:

authMiddleware
      ↓
getEmailLogs
Get Single Log
GET /api/email-logs/:id

Middleware:

authMiddleware
      ↓
getEmailLogById
11. Authentication

Dono Email Logs endpoints protected hain:

router.get("/", authMiddleware, getEmailLogs);
router.get("/:id", authMiddleware, getEmailLogById);

Iska meaning:

Request
   ↓
authMiddleware
   ↓
Authenticated User
   ↓
Controller

Controller authenticated user ko:

req.user._id

se identify karta hai.

12. Get All Email Logs API
Endpoint
GET /api/email-logs

Optional query parameters:

page
limit
status
projectId

Example:

GET /api/email-logs?page=1&limit=10

With status:

GET /api/email-logs?page=1&limit=10&status=sent

With project:

GET /api/email-logs?page=1&limit=10&projectId=PROJECT_ID

Both:

GET /api/email-logs?page=1&limit=10&status=sent&projectId=PROJECT_ID
13. Pagination Logic

Backend:

const currentPage = Math.max(Number(page) || 1, 1);


const currentLimit = Math.min(
  Math.max(Number(limit) || 10, 1),
  100
);


const skip = (currentPage - 1) * currentLimit;

Important:

Minimum page = 1
Default limit = 10
Minimum limit = 1
Maximum limit = 100

Therefore frontend unlimited records request nahi kar sakta.

14. Backend Query

Base query:

const query = {
  userId: req.user._id,
};

This is the most important security condition.

Status filter
if (status) {
  query.status = String(status).toLowerCase().trim();
}
Project filter
if (projectId) {
  query.projectId = projectId;
}

Therefore final query logically:

user's logs
    +
optional status
    +
optional project
15. Population

Logs fetch karte waqt:

.populate("projectId", "projectName")
.populate("templateId", "templateName")

Isliye frontend ko sirf IDs ke bajay related project/template information mil sakti hai.

Example:

projectId: {
  _id: "...",
  projectName: "My Project"
}

and:

templateId: {
  _id: "...",
  templateName: "Welcome Email"
}
16. Sorting

Logs:

.sort({
  createdAt: -1,
})

Meaning:

Latest email logs first.

17. API Response — All Logs

Successful response:

{
  "success": true,
  "total": 25,
  "page": 1,
  "limit": 10,
  "logs": []
}

Important response fields:

Field	Meaning
success	Request success
total	Matching total logs
page	Current page
limit	Records per page
logs	Email log records
18. Get Single Email Log
Endpoint
GET /api/email-logs/:id

Backend query:

EmailLog.findOne({
  _id: req.params.id,
  userId: req.user._id,
})

Important:

_id ke saath userId bhi check hota hai.

Therefore:

User A
   ↓
User A ka log → allowed


User A
   ↓
User B ka log ID → not found

This prevents cross-user email log access.

19. Single Log Response

Success:

{
  "success": true,
  "log": {
    "_id": "...",
    "userId": "...",
    "projectId": {},
    "templateId": {},
    "to": "...",
    "from": "...",
    "subject": "...",
    "messageId": "...",
    "status": "sent",
    "errorMessage": null,
    "sentAt": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
20. Error Responses
Log not found
404
{
  "success": false,
  "message": "Email log not found"
}
Server error
500
{
  "success": false,
  "message": "Failed to fetch email log"
}

Actual error message bhi backend available hone par return ho sakta hai.

21. Frontend API Layer

File:

features/emailLogs/emailLogsAPI.js

Two API functions hain.

getEmailLogsAPI()
api.get("/email-logs", {
  params,
});

Supports:

page
limit
status
projectId
getEmailLogByIdAPI(id)
api.get(`/email-logs/${id}`);

Single log details fetch karta hai.

22. Redux Thunks

File:

emailLogsThunk.js

Two async thunks:

fetchEmailLogs
fetchEmailLogById

Flow:

React Component
      ↓
dispatch(fetchEmailLogs())
      ↓
emailLogsAPI
      ↓
Backend API
      ↓
Response
      ↓
Redux Slice
      ↓
Selectors
      ↓
UI
23. Redux State

Initial state:

{
  logs: [],


  currentLog: null,


  total: 0,


  page: 1,


  limit: 10,


  loading: false,


  detailsLoading: false,


  error: null,


  detailsError: null
}
24. Redux State Responsibilities
logs

Current page ke email logs.

currentLog

Selected email log ka detailed data.

total

Total matching email logs.

page

Current pagination page.

limit

Records per page.

loading

Logs listing request loading state.

detailsLoading

Single log request loading state.

error

List API error.

detailsError

Details API error.

25. Redux Selectors

Available selectors:

selectEmailLogs
selectCurrentEmailLog
selectEmailLogsTotal
selectEmailLogsPage
selectEmailLogsLimit
selectEmailLogsLoading
selectEmailLogDetailsLoading
selectEmailLogsError
selectEmailLogDetailsError

Components direct Redux state access nahi karte; selectors use karte hain.

26. Email Logs Listing Page

File:

modules/emailLogs/pages/EmailLogs.jsx

Page responsibilities:

Fetch logs
Fetch projects
Status filter
Project filter
Clear filters
Refresh
Pagination
Empty state
Error state
Loading state
Navigate to details
27. Initial Page Load

Page mount hone par:

EmailLogs
   ↓
fetchProjects()
   ↓
fetchEmailLogs()

Projects sirf tab fetch hote hain jab Redux mein projects already available nahi hain.

28. Project Filter

User project select karta hai:

Project dropdown
       ↓
setProjectId()
       ↓
status clear
       ↓
fetchEmailLogs()

Important existing behavior:

Project change hone par old status filter automatically clear hota hai.

29. Status Filter

Status options currently frontend par:

All Status
Sent
Pending
Failed

Selected status backend ko query parameter ke through bheja jata hai.

Example:

?status=sent
30. Clear Filters

Clear button:

status = ""
projectId = ""

then:

fetchEmailLogs({
  page: 1,
  status: "",
  projectId: ""
})
31. Refresh

Refresh button current state ke saath logs reload karta hai:

currentPage
status
projectId

Loading ke time refresh button disabled hota hai.

32. Pagination

Frontend calculates:

const totalPages = Math.ceil(total / limit) || 1;

Supported actions:

Previous
Next
Page number

Previous disabled:

currentPage <= 1

Next disabled:

currentPage >= totalPages
33. Logs Table

File:

components/LogsTable.jsx

Desktop columns:

Recipient
Project
Template
Status
Date
Action

Action:

View

View click:

/dashboard/email-logs/:id
34. Mobile Responsive UI

Desktop:

Table

Mobile:

Cards

This means same log data responsive layout mein display hota hai.

Mobile card includes:

Recipient
Project
Status
Template
Date
View Details
35. Status Badge

File:

components/StatusBadge.jsx

Current UI config supports:

sent
delivered
pending
processing
failed
bounced
unknown
Important Implementation Note

Backend schema currently only supports:

pending
sent
failed

Isliye delivered, processing, bounced frontend mein visually supported hain, lekin current EmailLog backend schema un values ko save nahi kar sakta.

Future mein provider/webhook based delivery tracking add karte waqt status enum expand kiya ja sakta hai.

36. Email Log Details Page

File:

modules/emailLogs/pages/EmailLogDetails.jsx

Route:

/dashboard/email-logs/:id

Page mount hone par:

dispatch(fetchEmailLogById(id));
37. Details Page Information

Currently display hota hai:

Subject
Recipient
From / Sender
Status
Project
Template
Created At
Sent At

Agar error available hai:

Error Message

bhi display hota hai.

38. Loading State

Details page request ke waqt skeleton UI show hota hai.

Loading
   ↓
Skeleton
   ↓
Success → Details
   ↓
Error → Error UI
39. Error Handling

Details request fail hone par:

Unable to load email log

display hota hai.

User:

Try Again

button se request retry kar sakta hai.

40. Not Found State

Agar:

loading = false
error = false
log = null

to:

Email log not found

display hota hai.

41. Clear Current Log

Details page unmount hone par:

dispatch(clearCurrentLog());

run hota hai.

Purpose:

Purane email log ka data next details page mein accidentally display na ho.

42. Send Test Mail Navigation

Details page mein:

Send Test Mail

CTA available hai.

Click:

/dashboard/send-email

par navigate karta hai.

Current implementation mein existing log automatically send-email form mein prefill nahi hota; sirf Send Email page open hota hai.

43. Date Formatting

Frontend:

toLocaleString("en-IN", ...)

use karta hai.

Listing mein:

DD Mon YYYY, HH:MM

style.

Details page mein:

DD Month YYYY, HH:MM

style.

Invalid/missing date:

—
44. Frontend Data Fallbacks

LogsTable project name:

projectId.projectName
projectId.name
—

Template:

templateId.name
templateId.templateName
—

Recipient:

to
recipient
recipientEmail
email
—

Details page recipient:

to
—

Backend currently to provide karta hai, so this works correctly.

45. Route Architecture

Frontend:

/dashboard
   │
   ├── email-logs
   │      └── EmailLogs
   │
   └── email-logs/:id
          └── EmailLogDetails

Backend:

/api
   │
   └── email-logs
          │
          ├── GET /
          │
          └── GET /:id
46. Complete Request Flow — Listing
User opens:


/dashboard/email-logs


        ↓


EmailLogs.jsx


        ↓


dispatch(fetchEmailLogs())


        ↓


emailLogsThunk.js


        ↓


getEmailLogsAPI()


        ↓


GET /api/email-logs


        ↓


authMiddleware


        ↓


getEmailLogs()


        ↓


req.user._id


        ↓


MongoDB EmailLog.find()


        ↓


populate Project + Template


        ↓


sort createdAt DESC


        ↓


pagination


        ↓


JSON response


        ↓


Redux fulfilled


        ↓


emailLogsSlice


        ↓


selectors


        ↓


EmailLogs.jsx


        ↓


LogsTable.jsx
47. Complete Request Flow — Details
User clicks View


        ↓


/dashboard/email-logs/:id


        ↓


EmailLogDetails.jsx


        ↓


useParams()


        ↓


dispatch(fetchEmailLogById(id))


        ↓


getEmailLogByIdAPI()


        ↓


GET /api/email-logs/:id


        ↓


authMiddleware


        ↓


getEmailLogById()


        ↓


_id + userId validation


        ↓


populate Project + Template


        ↓


MongoDB


        ↓


Redux currentLog


        ↓


EmailLogDetails UI
48. Main Server Integration

Main app.js/server.js mein Email Logs:

const emailLogRoutes = require(
  "./src/routes/email-log/emailLog.routes"
);

and:

app.use(
  "/api/email-logs",
  emailLogRoutes
);

Existing server middleware stack:

dotenv
↓
Express
↓
MongoDB
↓
CORS
↓
Helmet
↓
Morgan
↓
express.json
↓
cookieParser
↓
Routes
49. Current Security Model

Email Logs security:

Authentication
      ↓
req.user
      ↓
userId filtering
      ↓
MongoDB query

All logs:

{
  userId: req.user._id
}

Single log:

{
  _id: req.params.id,
  userId: req.user._id
}

Therefore user isolation is enforced at database query level.

50. Current Module Limitations / Future Scope

Ye bugs nahi hain, balki future enhancement points hain.

1. Delivery tracking

Current backend:

pending
sent
failed

Future:

delivered
bounced
opened
clicked

provider/webhook integration ke baad add kiye ja sakte hain.

2. Message ID details

messageId database mein stored hai, lekin current UI mein prominently display nahi hota.

Future mein provider debugging ke liye display kiya ja sakta hai.

3. API Key information

apiKeyId stored hai, lekin current details UI mein API key information display nahi hoti.

4. Search

Current filters:

Project
Status

Future:

Recipient
Subject
Message ID
Date range

search/filter add ho sakte hain.

5. Advanced pagination

Current page buttons:

1 2 3 4 5

sirf first five pages render karte hain.

Large datasets ke liye future mein:

1 ... 5 6 7 ... 20

type pagination improve ki ja sakti hai.

51. AI Handoff Instructions

IMPORTANT:

Agar ye documentation kisi AI ko di ja rahi hai, to AI ko following rules follow karne hain:

Rule 1

Email Logs module ko rewrite mat karo jab tak explicitly required na ho.

Rule 2

Existing architecture follow karo:

Component
→ Redux Thunk
→ API
→ Backend Route
→ Controller
→ Model
Rule 3

Authentication bypass mat karo.

Har Email Log query user-specific honi chahiye.

Rule 4

Existing naming conventions preserve karo.

Rule 5

Backend status values aur frontend status values ko confuse mat karo.

Current backend authoritative enum:

pending
sent
failed
Rule 6

Existing API paths change mat karo:

GET /api/email-logs
GET /api/email-logs/:id

unless explicitly instructed.

Rule 7

Project/template population preserve karo:

.populate("projectId", "projectName")
.populate("templateId", "templateName")
Rule 8

Pagination preserve karo.

Rule 9

Mobile responsive UI preserve karo.

Rule 10

Agar next feature Email Logs ke existing data ko modify karta hai, pehle current schema + controller + email sending flow check karo.

52. Final File Responsibility Map
File	Responsibility
EmailLog.js	Database schema
emailLog.controller.js	Backend business logic
emailLog.routes.js	API routing + authentication
server.js/app.js	/api/email-logs route mounting
emailLogsAPI.js	Frontend HTTP calls
emailLogsThunk.js	Async Redux operations
emailLogsSlice.js	Redux state
emailLogsSelectors.js	Redux state access
EmailLogs.jsx	Main logs page
EmailLogDetails.jsx	Individual log page
LogsTable.jsx	Responsive log display
StatusBadge.jsx	Status presentation
emailLogs.routes.js	Frontend routing
53. FINAL STATUS
✅ EMAIL LOGS PHASE — COMPLETE

Implemented:

[✓] EmailLog MongoDB model
[✓] User-specific logs
[✓] Authentication
[✓] Get all logs API
[✓] Get single log API
[✓] Project population
[✓] Template population
[✓] Status filtering
[✓] Project filtering
[✓] Pagination
[✓] Sorting
[✓] Redux slice
[✓] Redux thunks
[✓] Redux selectors
[✓] Logs listing page
[✓] Responsive table
[✓] Mobile cards
[✓] Status badges
[✓] Details page
[✓] Loading states
[✓] Error states
[✓] Empty states
[✓] Retry
[✓] Refresh
[✓] Clear filters
[✓] Send Test Mail navigation
[✓] Database indexes
[✓] Frontend routes
[✓] Backend routes
[✓] Server integration
Current module status:

🟢 COMPLETE — READY FOR NEXT PHASE