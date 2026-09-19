require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.disable("x-powered-by");

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mymail-alpha.vercel.app",
    ],
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-api-key",
    ],
  })
);

/* =========================
   MIDDLEWARES
========================= */

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(
      "Database Connection Error:",
      error.message
    );
  });

/* =========================
   ROUTES
========================= */

const authRoutes = require("./src/routes/auth/auth.routes");

const profileRoutes = require("./src/routes/profile/profile.routes");

const authMiddleware = require(
  "./src/middlewares/auth/auth.middleware"
);

const projectRoutes = require(
  "./src/routes/project/project.routes"
);

const apiKeyRoutes = require(
  "./src/routes/apiKey/apiKey.routes"
);

const apiKeyMiddleware = require(
  "./src/middlewares/apiKey/apiKey.middleware"
);

const templateRoutes = require(
  "./src/routes/template/template.routes"
);

const emailRoutes = require(
  "./src/routes/email-engine/email.routes"
);

const emailLogRoutes = require(
  "./src/routes/email-log/emailLog.routes"
);

const userDashboardRoutes = require(
  "./src/routes/dashboard/user-dashboard/userDashboard.routes"
);

const adminDashboardRoutes = require(
  "./src/routes/dashboard/admin-dashboard/dashboard.routes"
);

const setting2Routes = require(
  "./src/routes/settings2/settings.routes"
);

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/projects", apiKeyRoutes);

app.use("/api/templates", templateRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/email-logs", emailLogRoutes);

app.use(
  "/api/user-dashboard",
  userDashboardRoutes
);

app.use(
  "/api/admin-dashboard",
  adminDashboardRoutes
);

app.use("/api/settings", setting2Routes);

/* =========================
   TEST API
========================= */

app.get(
  "/api/auth/me",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

app.get(
  "/api/test-key",
  apiKeyMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "API Key Valid",
      data: req.apiKey,
    });
  }
);

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Email SaaS API Running",
  });
});

/* =========================
   LOCAL SERVER
========================= */

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}

/* =========================
   EXPORT FOR VERCEL
========================= */

module.exports = app;