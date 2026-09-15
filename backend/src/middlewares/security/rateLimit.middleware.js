const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});


const registerLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, 

  max: 7,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many registration attempts. Please try again after 20 minutes."
  }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,

  max: 15,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many password reset attempts. Please try again after 20 minutes."
  }
});



module.exports = {
  loginLimiter,
   registerLimiter,
   forgotPasswordLimiter
};