import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";

import projectReducer from "@/features/project/projectSlice";
import apiKeyReducer from "@/features/apiKey/apiKeySlice";
import templateReducer from "@/features/template/templateSlice";
import profileReducer from "@/features/profile/profileSlice";
import emailReducer from "@/features/email/emailSlice";
import emailLogsReducer from "../features/emailLogs/emailLogsSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    projects: projectReducer,
    apiKey: apiKeyReducer,
    template: templateReducer,
    email: emailReducer,
    emailLogs: emailLogsReducer,
   
  },
});
