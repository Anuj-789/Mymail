Send Mail & Email API Phase — Complete Technical Documentation
1. Phase Purpose

This phase implements the complete email-sending system for the dashboard.

The system has two related API flows:

User/Application API
Used by the user's own application/project to send emails.
Authenticated using the project's API key.
This is the actual production integration API.
Dashboard Send API
Used only from the authenticated dashboard.
Allows the user to test whether their project email configuration is working.
The dashboard does not receive or expose the production API secret.
Backend identifies the authenticated user/project and securely handles the email configuration.

The dashboard test flow ultimately verifies:

Project
   ↓
Template
   ↓
Production API configuration
   ↓
Recipient
   ↓
Template variables
   ↓
Dashboard Test Email
   ↓
Successful delivery
   ↓
"Your API is ready to use"
2. Overall System Architecture
                         FRONTEND
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                     React Dashboard                        │
│                                                            │
│  SendEmail.jsx                                            │
│       │                                                    │
│       ├── EmailForm.jsx                                   │
│       │      ├── Project Selector                         │
│       │      ├── Template Information                     │
│       │      ├── Recipient Details                        │
│       │      └── VariableInput.jsx                        │
│       │                                                    │
│       ├── Project Redux                                   │
│       ├── Template Redux                                  │
│       └── API Key Redux                                   │
│                                                            │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           │ authenticated dashboard request
                           ▼
                         BACKEND
┌────────────────────────────────────────────────────────────┐
│                                                            │
│ Authentication                                             │
│       ↓                                                    │
│ Authorization / Project Ownership                         │
│       ↓                                                    │
│ Project                                                    │
│       ↓                                                    │
│ Template                                                   │
│       ↓                                                    │
│ Production API Configuration                              │
│       ↓                                                    │
│ Email Service                                              │
│       ↓                                                    │
│ Email Provider                                             │
│                                                            │
└────────────────────────────────────────────────────────────┘
                           │
                           ▼
                      EMAIL PROVIDER
3. Two API Systems

This distinction is extremely important.

A. Dashboard API

The dashboard uses:

POST /api/email/dashboard-send

Frontend call:

api.post("/email/dashboard-send", payload)

This API is for:

Dashboard
   ↓
Test email
   ↓
Verify configuration

It is not the API that the user's external application will use.

4. B. User/Project Production API

The user also has a production API that their own application can call.

Conceptually:

User's Application
       ↓
Project API Key
       ↓
Backend Email API
       ↓
Template / Email Service
       ↓
Email Provider

The production API key belongs to the project.

The user can use that API in:

React applications
Node.js applications
Backend services
SaaS applications
Mobile backends
Other server-side applications

The dashboard should only display the necessary integration information.

Critical security rule

The actual secret production API key must never be exposed unnecessarily in the dashboard email-sending flow.

The dashboard test request does not manually send:

x-api-key

or:

secret

or:

keyHash
5. High-Level User Journey

The complete user journey is:

User logs into dashboard
        ↓
Opens Send Mail
        ↓
Initial onboarding screen
        ↓
Clicks "Getting Started"
        ↓
Email Configuration opens
        ↓
Select Project
        ↓
Templates load
        ↓
Production API status checked
        ↓
Template selected
        ↓
Enter recipient
        ↓
Fill variables
        ↓
Click Send Test Email
        ↓
Validation
        ↓
Confirmation modal
        ↓
Confirm & Send
        ↓
Sending GIF
        ↓
Backend dashboard-send API
        ↓
Email provider
        ↓
Success / Error
        ↓
Success:
"Your API is ready to use"
6. Initial Send Mail UI

When no project is selected, the page should remain clean.

The initial page contains:

Send Mail

Send a test email using your project and template.

--------------------------------------------

              gungif3.gif

       Follow these steps to send an email

Select your project below and complete the
email configuration step by step.

--------------------------------------------

Step 1
Choose Project

Step 2
Choose Template

Step 3
Enter Recipient

Step 4
Fill Variables

Step 5
Send Test Email

--------------------------------------------

          [ Getting Started ]
Important

The project selector is not shown in this initial onboarding area.

It appears when the user clicks:

Getting Started

Then the actual EmailForm opens.

7. Five-Step User Flow
Step 1 — Choose Project

User selects one of their projects.

Select a project
[ My Website ▼ ]

Frontend obtains projects through Redux.

dispatch(fetchProjects());

Selector:

const projects = useSelector(selectProjects) || [];

Project ID is normally:

project._id || project.id

Project name:

project.projectName || project.name
8. Step 2 — Choose Template

After project selection:

selectedProject
       ↓
fetchProjectTemplates(selectedProject)

Frontend:

dispatch(fetchProjectTemplates(selectedProject));

Templates are stored/read through Redux:

const templates = useSelector(selectTemplates) || [];

Current behavior:

first available template
        ↓
automatically selected

If there is no template:

No template found

Create a template for this project before
sending an email.

[ Create Template ]
9. Step 3 — Enter Recipient

Once a template exists:

Recipient Details

Recipient Email
[ you@example.com ]

Recipient Name
[ John Doe ]

Recipient email is required.

Validation:

/^[^\s@]+@[^\s@]+\.[^\s@]+$/

If invalid:

Please enter a valid recipient email
10. Step 4 — Fill Template Variables

The selected template can contain variables.

Example:

Hello {{name}}

Your verification code is {{code}}

The frontend normalizes variable definitions from:

variable
variable.name
variable.key
variable.variable

The final variable map looks like:

{
  name: "John",
  code: "123456"
}

VariableInput.jsx handles rendering and updating these values.

Before sending:

Every required template variable
must have a non-empty value.

Otherwise:

Please fill all template variables
11. Step 5 — Send Test Email

Send button:

[ Send Test Email ]

Before sending, frontend validates:

1. Project selected
2. Template available
3. Production API exists
4. Production API active
5. Recipient email exists
6. Recipient email valid
7. Template variables complete

Only after all checks pass:

Confirmation Modal

appears.

12. Confirmation Modal

Example:

Send test email?

This email will be sent to:

user@example.com

--------------------------------

API Status       Active
Project          My Website
Template         Welcome Email

--------------------------------

[ Cancel ]       [ Confirm & Send ]

The modal prevents accidental email sends.

13. Sending State

After:

Confirm & Send

frontend sets:

setSending(true);

A full-screen overlay appears.

--------------------------------

           gungif3.gif

        Sending email...

Please wait while we securely process
and send your email.

       Processing your request
              ⟳

--------------------------------

The GIF is:

/public/gungif3.gif

During this state:

User cannot accidentally submit again.
Send controls are disabled.
Backend request is running.
14. Dashboard Email Request

Frontend sends:

POST /api/email/dashboard-send

Payload:

{
  projectId: selectedProject,
  templateId: template?._id || template?.id,
  to: recipientEmail,
  data: variableValues
}

Example:

{
  "projectId": "project123",
  "templateId": "template456",
  "to": "user@example.com",
  "data": {
    "name": "John",
    "code": "123456"
  }
}
15. What Dashboard Does NOT Send

The frontend must not send:

API secret
API key secret
keyHash
provider password
SMTP password
email provider credentials

Also:

❌ localStorage API secret
❌ sessionStorage API secret
❌ x-api-key from dashboard test form

The backend handles secure access.

16. Dashboard Backend Flow

Backend endpoint:

POST /api/email/dashboard-send

Expected backend flow:

Request
  ↓
Authentication middleware
  ↓
Identify logged-in user
  ↓
Validate projectId
  ↓
Verify user owns project
  ↓
Find project's production API configuration
  ↓
Check API exists
  ↓
Check API is active
  ↓
Find template
  ↓
Verify template belongs to project
  ↓
Validate template variables
  ↓
Build email
  ↓
Send through email provider
  ↓
Return result
17. Project Ownership Security

This is important.

A user must not be able to send email using another user's project simply by changing:

{
  "projectId": "someone-elses-project"
}

Backend must verify:

authenticatedUser
        ↓
owns projectId

If ownership fails:

403 Unauthorized / Forbidden

depending on the backend's existing convention.

18. Production API Configuration

For the selected project, backend checks its production API configuration.

Possible states:

NOT CREATED
INACTIVE
READY

Frontend derives:

not-created
inactive
ready
Not Created
Production API not created

User is directed to API Keys.

Inactive
Production API is inactive

User must activate it.

Ready
Production API is active

User can send a test email.

19. API Key Redux Flow

When project changes:

dispatch(fetchApiKeys(selectedProject));

Redux:

API Key thunk
      ↓
API Key API request
      ↓
Redux store
      ↓
selectApiKeys
      ↓
SendEmail.jsx

Frontend:

const apiKeys = useSelector(selectApiKeys) || [];

The current project's keys are filtered based on project ID.

20. Production Key Detection

Production key can be identified through metadata:

name
keyName
environment
type

normalized to lowercase.

Expected:

production

Then status:

active

means:

Production API = READY
21. Important Difference: API Key vs API Secret

This distinction must remain clear.

API Key metadata

Dashboard may need metadata such as:

name
environment
status
createdAt
projectId
API Secret

Actual secret value:

sk_xxxxxxxxxxxxx

must not be unnecessarily returned to or stored in the dashboard Send Mail flow.

22. User Production API Flow

The production API is separate from the dashboard test endpoint.

Conceptual flow:

User's Application
        │
        │ API request
        │
        ▼
Production Email API
        │
        ├── authenticate API key
        ├── identify project
        ├── verify key
        ├── verify key status
        ├── verify project
        ├── validate request
        ├── load template
        ├── process variables
        └── send email
                │
                ▼
          Email Provider

This API is what the user's application will eventually integrate with.

23. Dashboard API vs User API
Feature	Dashboard API	User Production API
Purpose	Test email	Real application integration
Caller	Dashboard	User's application
Authentication	Dashboard user session	Project API key
API secret sent from dashboard	No	Yes, where required by API contract
Project ownership	Backend checks	API key identifies project
Template validation	Yes	Yes
Email sending	Yes	Yes
Used for integration	No	Yes
User sees secret in Send Mail page	No	Should be handled securely

The exact production API route should follow the existing backend implementation; it should not be invented or changed just for this UI phase.

24. Successful Dashboard Response

Backend may return:

{
  "message": "Email sent successfully",
  "emailId": "abc123"
}

or:

{
  "message": "Email sent successfully",
  "messageId": "abc123"
}

Frontend supports both:

responseData.emailId ||
responseData.messageId

Success UI:

✓ Test email sent successfully

Email sent successfully

Email ID: abc123

--------------------------------

✓ Your API is ready to use

Your production API has been successfully
tested and is ready to integrate into
your projects.

[ View API Keys ]
25. Why "API Is Ready" Is Shown

This message is not saying that a new API was generated.

It means:

Project API configuration exists
        +
Production API is active
        +
Dashboard test email succeeded
        =
API is ready to integrate

So this is a verification result, not an API creation operation.

26. Error Handling

Frontend receives backend errors.

Priority:

err?.response?.data?.message

then:

err?.message

then:

Email could not be sent

Example:

Email could not be sent

Daily email limit exceeded.

This is useful because provider/backend errors should reach the user instead of always showing a generic error.

27. Email Limit Error

Example:

Daily email limit exceeded.

This means:

Frontend request worked
        ↓
Backend received request
        ↓
Email service/provider rejected request
        ↓
Backend returned error
        ↓
Frontend displayed error

Therefore, a provider/rate-limit error is different from a frontend routing error such as:

404
28. Important Route Consistency

Current dashboard route documented for frontend:

POST /api/email/dashboard-send

Frontend:

api.post("/email/dashboard-send", payload)

This assumes api already has:

/api

as its base URL.

Therefore:

api.post("/email/dashboard-send")

becomes:

/api/email/dashboard-send
29. 404 Debugging Rule

If browser/server logs show:

POST /api/email/dashboard-send 404

then check:

Frontend URL
        ↓
api baseURL
        ↓
Backend router mounting
        ↓
Backend route definition
        ↓
HTTP method

Do not immediately change the frontend route.

First verify what backend actually exposes.

30. Frontend Structure

Expected structure:

src/
│
├── components/
│   ├── EmailForm.jsx
│   └── VariableInput.jsx
│
├── pages/
│   └── SendEmail.jsx
│
├── features/
│   ├── project/
│   │   ├── projectThunk
│   │   └── projectSelectors
│   │
│   ├── template/
│   │   ├── templateThunk
│   │   └── templateSelectors
│   │
│   └── apiKey/
│       ├── apiKeyThunk
│       └── apiKeySelectors
│
└── services/
    └── api
31. SendEmail.jsx Responsibilities

SendEmail.jsx is the main orchestration component.

It handles:

Project state
Template state
Recipient state
Variable state
API status
Validation
Confirmation
Sending
Success
Error
Navigation

It should not become responsible for low-level email-provider logic.

32. EmailForm.jsx Responsibilities

EmailForm.jsx handles presentation/input:

Project selector
Template information
Recipient email
Recipient name
Template variables

It receives state through props.

It should not directly call backend APIs.

33. VariableInput.jsx Responsibilities

VariableInput.jsx handles:

Variable rendering
Variable input values
onChange
disabled state

It should remain reusable.

34. Redux Responsibilities
Project Redux
fetchProjects
selectProjects

Responsible for project data.

Template Redux
fetchProjectTemplates
selectTemplates

Responsible for project-specific templates.

API Key Redux
fetchApiKeys
selectApiKeys

Responsible for API configuration metadata/status.

35. State Machine

The Send Mail page can be understood as these states:

INITIAL
  │
  │ Getting Started
  ▼
CONFIGURATION
  │
  ├── no project
  │
  ├── project selected
  │
  ├── template loading
  │
  ├── template available
  │
  ├── API not created
  │
  ├── API inactive
  │
  └── API ready
          │
          ▼
       VALIDATION
          │
          ▼
     CONFIRMATION
          │
          ▼
       SENDING
        /    \
       /      \
  SUCCESS    ERROR
36. Project Change State Reset

When project changes, old project-specific data must be cleared:

setTemplate(null);
setVariableValues({});

setSuccess(false);
setError(null);

setMessage("");
setMessageId("");

setShowConfirmation(false);

setRecipientEmail("");
setRecipientName("");

This prevents:

Project A data
      ↓
Project B
      ↓
accidental reuse
37. UI States
Initial
Onboarding + Getting Started
Configuration
Email Form
API not created
Production API not created
API inactive
Production API is inactive
API ready
Production API is active
Confirmation
Send test email?
Sending
GIF + Sending email...
Success
Test email sent successfully
Your API is ready to use
Error
Email could not be sent
<actual error>
38. Removed UI Requirements

The following UI must remain removed from the Send Mail page:

❌ Live Email Preview
❌ Open Live Preview
❌ Production Mode card
❌ How to integrate card
❌ View API integration details

The Send Mail page should focus on:

Select
→ Configure
→ Test
→ Verify
39. API Security Model

The overall system should follow:

                    USER
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
      Dashboard             User App
          │                     │
          │ Session/Auth        │ API Key
          ▼                     ▼
    Dashboard API         Production API
          │                     │
          └──────────┬──────────┘
                     ▼
                  Backend
                     │
                     ▼
              Email Service
                     │
                     ▼
               Email Provider

The backend is the trust boundary.

40. Production API Security

For user applications:

API Key
   ↓
Backend authentication
   ↓
Identify project
   ↓
Verify key status
   ↓
Verify permissions
   ↓
Send email

API keys should not be treated like normal frontend UI data.

If the production API key is intended for server-side integration, users should keep it server-side rather than exposing it in browser/client code.

41. Dashboard API Security

Dashboard request:

Logged-in User
       ↓
Session/JWT
       ↓
Dashboard API
       ↓
Project ownership
       ↓
Production configuration
       ↓
Email

The dashboard does not need to manually provide the production secret.

42. Email Sending Payload Contract

Dashboard request:

{
  "projectId": "PROJECT_ID",
  "templateId": "TEMPLATE_ID",
  "to": "recipient@example.com",
  "data": {
    "name": "John",
    "code": "123456"
  }
}
Required
projectId
templateId
to
Optional
data

depending on template variables.

43. Backend Validation Contract

Backend should validate:

projectId exists
templateId exists
recipient email valid
project belongs to authenticated user
template belongs to project
production API exists
production API active
variables valid

Only after validation:

send email
44. Important Principle: Frontend Validation ≠ Security

Frontend validation is only for UX.

For example:

if (!selectedProject) ...

does not provide security.

Backend must independently validate:

project ownership
API status
template ownership
authorization

A malicious client can bypass frontend validation.

45. Final End-to-End Example

Suppose user has:

Project:
My SaaS

Production API:
Active

Template:
Welcome Email

Variables:
name
company

User enters:

Recipient:
john@example.com

Name:
John

Company:
Acme

Frontend creates:

{
  "projectId": "p123",
  "templateId": "t456",
  "to": "john@example.com",
  "data": {
    "name": "John",
    "company": "Acme"
  }
}

Request:

POST /api/email/dashboard-send

Backend:

Authenticate user
        ↓
Verify p123 belongs to user
        ↓
Find production API
        ↓
Status = active
        ↓
Verify t456 belongs to p123
        ↓
Validate variables
        ↓
Render email
        ↓
Send email

Response:

{
  "message": "Email sent successfully",
  "emailId": "email_123"
}

Frontend:

✓ Test email sent successfully

Your API is ready to use
46. Phase Definition of Done

This phase is considered complete when all of the following work together:

                    SEND MAIL PHASE
                           │
             ┌─────────────┴─────────────┐
             │                           │
          FRONTEND                    BACKEND
             │                           │
       Project Redux                Auth Middleware
             │                           │
       Template Redux              Project Ownership
             │                           │
       API Key Redux               API Status
             │                           │
       EmailForm                   Template Validation
             │                           │
       Validation                  Email Service
             │                           │
       Confirmation                Email Provider
             │                           │
       Sending GIF                 Response
             │                           │
       Success/Error                    │
             └─────────────┬─────────────┘
                           │
                           ▼
                  API READY TO INTEGRATE
47. Final Development Rules for Future AI

A future AI/developer working on this project should preserve these rules:

Frontend
1. Keep SendEmail.jsx as the orchestration layer.
2. Keep EmailForm.jsx focused on form UI.
3. Keep VariableInput reusable.
4. Keep Redux as the source for projects/templates/API metadata.
5. Reset project-specific state when project changes.
6. Keep confirmation before sending.
7. Keep sending overlay.
8. Keep /public/gungif3.gif.
9. Keep success/error states.
10. Do not re-add removed UI.
Backend
1. Authenticate dashboard requests.
2. Verify project ownership.
3. Verify template ownership.
4. Verify production API exists.
5. Verify production API is active.
6. Validate template variables.
7. Send email server-side.
8. Never trust frontend validation.
9. Never expose provider credentials.
10. Return useful error messages.
API separation
Dashboard API
    =
Testing from dashboard

Production/User API
    =
Integration from user's application

These two flows must remain logically separate even though they ultimately use the same underlying email infrastructure.

48. One-Line Architecture Summary

The dashboard lets an authenticated user select a project, verify its active production API configuration, select/use its template, enter recipient data, send a secure backend-processed test email through /api/email/dashboard-send, and—after successful delivery—confirms that the project's production API is ready to be integrated into the user's own applications.

Phase Status
PROJECT SELECTION          ✅
TEMPLATE LOADING           ✅
RECIPIENT FORM             ✅
VARIABLE HANDLING          ✅
API STATUS CHECK           ✅
DASHBOARD EMAIL API        ✅
USER/PRODUCTION API        ✅
CONFIRMATION FLOW          ✅
SENDING STATE              ✅
GIF LOADING UI             ✅
SUCCESS STATE              ✅
API READY MESSAGE          ✅
ERROR HANDLING             ✅
SECURITY SEPARATION        ✅
UI CLEANUP                 ✅