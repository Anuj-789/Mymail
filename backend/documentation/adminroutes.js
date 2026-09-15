No.	Module	Method	API Endpoint	Purpose	Auth	Status
1	Admin Overview	GET	/api/admin-dashboard/admin/overview	Admin dashboard ka complete overview (users, projects, templates, emails, recent activities)	Bearer Token + Admin	✅ Working
2	Admin Profile	GET	/api/admin-dashboard/admin/profile	Admin profile details fetch	Bearer Token + Admin	⏳ Pending
3	User Management	GET	/api/admin-dashboard/admin/users	Saare users ki list fetch karna	Bearer Token + Admin	✅ Working
4	User Management	GET	/api/admin-dashboard/admin/users/:id	User ka complete profile + projects + templates + API keys + email stats	Bearer Token + Admin	✅ Working
5	User Management	PUT	/api/admin-dashboard/admin/users/:id/status	User ko active/block karna	Bearer Token + Admin	✅ Working
6	Project Management	GET	/api/admin-dashboard/admin/projects	Saare projects ki list fetch karna	Bearer Token + Admin	✅ Working
7	Project Management	GET	/api/admin-dashboard/admin/projects/:id	Project ki full details dekhna	Bearer Token + Admin	✅ Working
8	Project Management	PUT	/api/admin-dashboard/admin/projects/:id/status	Project status active/inactive change	Bearer Token + Admin	✅ Working
9	Email Management	GET	/api/admin-dashboard/admin/emails	Saare email logs dekhna	Bearer Token + Admin	✅ Working
10	Email Management	GET	/api/admin-dashboard/admin/emails/:id	Single email ki detail dekhna	Bearer Token + Admin	⚠️ Tested
11	Email Management	GET	/api/admin-dashboard/admin/email-stats	Email statistics dekhna	Bearer Token + Admin	✅ Working
12	Template Management	GET	/api/admin-dashboard/admin/templates	System templates list fetch	Bearer Token + Admin	✅ Working
13	Template Management	POST	/api/admin-dashboard/admin/templates	System template create karna	Bearer Token + Admin	✅ Fixed & Working
14	Template Management	PUT	/api/admin-dashboard/admin/templates/:id	Template update karna	Bearer Token + Admin	⏳ Pending
15	Template Management	DELETE	/api/admin-dashboard/admin/templates/:id	Template delete karna	Bearer Token + Admin	⏳ Pending
16	Analytics	GET	/api/admin-dashboard/analytics	Users, projects aur email analytics	Bearer Token + Admin	✅ Working
17	Activity Logs	GET	/api/admin-dashboard/activity	Admin ki saari activities dekhna	Bearer Token + Admin	⏳ Testing Pending
18	Activity Logs	GET	/api/admin-dashboard/activity/:id	Single activity detail dekhna	Bearer Token + Admin	⏳ Testing Pending
19	API Key Management	GET	/api/admin-dashboard/api-keys/overview	API key statistics	Bearer Token + Admin	⏳ Testing Pending
20	API Key Management	GET	/api/admin-dashboard/api-keys	Saari API keys dekhna	Bearer Token + Admin	⏳ Testing Pending