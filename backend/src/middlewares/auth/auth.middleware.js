const jwt = require("jsonwebtoken");
const User = require("../../models/auth/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "Authentication required. Please login first.",
      });
    }

    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,

      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
