const express = require("express");

const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  logout,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
} = require("../../controllers/auth/auth.controller");

const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} = require("../../middlewares/security/rateLimit.middleware");

router.post("/register", registerLimiter, register);

router.get("/verify-email/:token", verifyEmail);

router.post("/login", loginLimiter, login);

router.post("/logout", logout);

router.post("/refresh-token", refreshAccessToken);

router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;
