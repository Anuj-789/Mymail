Template Management Phase Documentation
Project Phase Name

Template Management System

Purpose:

User apne projects ke liye email templates create, edit, preview aur manage kar sake.

System me do type ke templates hain:

System Templates
Predefined templates
User directly use kar sakta hai
Clone hoke user ke project me aa jata hai
Custom Templates
User khud create karta hai
HTML/CSS editor ke through customize karta hai
Overall Workflow
User
 |
 |
Dashboard
 |
 |
Templates Section
 |
 |
Select Project
 |
 |
-------------------------
|                       |
System Templates        My Templates
|                       |
Preview                 Edit
|
Use Template
|
Clone To Project
|
Edit
|
Save
Backend Structure
backend

controllers

 └── template

      ├── template.controller.js


models

 └── template

      └── Template.js


routes

 └── template

      └── template.routes.js


utils

 └── templates

      └── variableExtractor.js
Database Relationship
User
User
 |
 |
has many
 |
Projects
 |
 |
has many
 |
Templates

Mongo Relation:

Template contains:

{
 userId,
 projectId,
 templateType,
 templateName,
 subject,
 htmlContent,
 cssContent,
 variables,
 status
}
Template Model Purpose

Template collection stores:

Owner user
Connected project
Template data
HTML
CSS
Variables
Status

Example:

{
"userId":"123",
"projectId":"456",
"templateName":"Welcome Email",
"subject":"Welcome",
"htmlContent":"<h1>Hello {{name}}</h1>",
"variables":[
"name"
],
"status":"draft"
}
Controllers Documentation

Total Controllers:

1. createTemplate

Purpose:

New custom template create karta hai.

Flow:

Frontend
 |
POST
 |
/templates/projects/:projectId/templates
 |
Controller
 |
Validate
 |
Extract Variables
 |
Save Template

Validation:

Project required
Duplicate template check
Variables auto extract

Example:

HTML:

<h1>Hello {{username}}</h1>

Extract:

username
2. getProjectTemplates

Purpose:

Ek specific project ke templates lana.

API:

GET

/templates/projects/:projectId/templates

Used In:

My Templates section

3. getSingleTemplate

Purpose:

Single template fetch karna.

Used:

Edit Template Page

API:

GET

/templates/projects/:projectId/templates/:id
4. updateTemplate

Purpose:

Existing template update karna.

Update fields:

templateName
subject
html
css
designConfig

Flow:

Edit Page

↓

Update Button

↓

PUT API

↓

Database Update
5. deleteTemplate

Purpose:

Template delete karna.

API:

DELETE

/templates/projects/:projectId/templates/:id
6. getMyTemplates

Purpose:

User ke saare templates lana.

API:

GET

/templates/my-templates

Response:

Project name ke sath populate hota hai.

Example:

.populate(
"projectId",
"projectName"
)
7. getAvailableProjects

Purpose:

Wo projects lana jinke andar abhi template nahi bana.

Logic:

Projects:

Project A
Project B
Project C

Existing Templates:

Project A

Return:

Project B
Project C

Used:

Project Selector

System Template Flow

System templates database me nahi hote.

Ye predefined templates hote hain.

Example:

Welcome Email

Newsletter

Marketing Email
System Template Controllers
8. getSystemTemplates

Purpose:

Saare default templates show karna.

Used:

System Templates Tab

9. getSystemTemplateByType

Purpose:

Ek specific system template preview karna.

Example:

welcome

Return:

HTML Content

10. cloneSystemTemplate

Purpose:

System template ko user project me copy karna.

Flow:

System Template

↓

Clone

↓

New Template Create

↓

Project Attach

↓

Edit Page Open
11. previewSystemTemplate

Purpose:

System template ka live preview.

Used:

Preview Button

Frontend Structure
src

pages

 |
 Templates.jsx
 CreateTemplate.jsx
 EditTemplate.jsx
 PreviewTemplate.jsx



components

 |
 TemplateForm.jsx
 TemplateEditor.jsx
 TemplateCard.jsx
 SystemTemplateCard.jsx
 ProjectSelector.jsx
 TemplateTabs.jsx
 LiveTemplatePreview.jsx
 VariableInsert.jsx
 DeleteConfirmModal.jsx
 TemplatePreviewFrame.jsx

Pages Documentation
1. Templates.jsx

Main Template Dashboard

Responsibilities:

Project select
System templates show
User templates show
Delete
Create own
Preview

Tabs:

System Templates

My Templates

Create Own
2. CreateTemplate.jsx

Purpose:

New custom template banana.

Features:

Template information form
HTML editor
CSS editor
Variable detection
Live preview

Flow:

Fill Form

+

HTML Add

+

CSS Add

↓

Create Button

↓

API

↓

Template Saved
3. EditTemplate.jsx

Purpose:

Existing template modify karna.

Features:

Fetch Template
Update HTML
Update CSS
Update Variables
Live Preview
4. PreviewTemplate.jsx

Purpose:

Only preview mode.

No editing.

Components
ProjectSelector

Purpose:

Project choose karna.

Data:

Available Projects API
TemplateCard

Custom template card.

Actions:

View
Edit
Delete
SystemTemplateCard

System templates ke liye.

Actions:

Preview
Use Template
TemplateEditor

HTML/CSS editing area.

LiveTemplatePreview

Real time preview.

Flow:

HTML Input

↓

State Update

↓

Preview Update
VariableInsert

Detected variables insert karne ke liye.

Example:

Available:

{{name}}

{{email}}
TemplateForm

Fields:

Template Name

Subject

Template Type
API Flow
Create Template

Frontend:

CreateTemplate.jsx

API:

POST

/templates/projects/:projectId/templates

Backend:

createTemplate()
Update Template

Frontend:

EditTemplate.jsx

API:

PUT

/templates/projects/:projectId/templates/:id

Backend:

updateTemplate()
Delete Template

Frontend:

TemplateCard

API:

DELETE

/templates/projects/:projectId/templates/:id

Backend:

deleteTemplate()
Validation System
Create Template Validation

Required:

templateName

subject

htmlContent

cssContent

Missing field:

Frontend toast:

Please fill all required fields
Variable System

HTML:

<p>Hello {{customerName}}</p>

Extractor:

customerName

Database:

[
"customerName"
]

Frontend:

VariableInsert component me show hota hai.

Current Completed Features

✅ Project based templates

✅ System templates

✅ Clone system template

✅ Custom template creation

✅ HTML editor

✅ CSS editor

✅ Live preview

✅ Variable extraction

✅ Template update

✅ Template delete

✅ Toast notifications

✅ Delete confirmation modal

✅ Project selection validation

Important Future GPT Context

Agar next time is project pe kaam karna ho to samajhna:

Backend Node.js + Express + MongoDB hai
Frontend React + Vite + Tailwind hai
Authentication already implemented hai
API service axios interceptor ke through token bhejta hai
Template system project based hai
Ek project me ek hi template allowed hai
System templates clone hote hain
Variables {{ }} format me extract hote hain
Live preview HTML/CSS render karta hai
Next Development Phase Suggestions
Template Builder UI improve
Drag & Drop Email Blocks
Template Version History
Duplicate Template Feature
Export HTML
Send Test Email
Template Analytics

Template Management Phase Complete Documentation ✅