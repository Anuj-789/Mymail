const User = require("../../models/auth/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const VerificationToken = require("../../models/auth/VerificationToken");
const sendEmail = require("../../utils/sendEmail");
const generateToken = require("../../config/jwt");
const jwt = require("jsonwebtoken");
const PasswordResetToken = require("../../models/auth/PasswordResetToken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../config/jwt");

// Register User

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check existing user

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User

    const user = await User.create({
      name,

      email,

      phone,

      password: hashedPassword,
    });

    // Create Verification Token

    const token = crypto.randomBytes(32).toString("hex");

    await VerificationToken.create({
      userId: user._id,

      token,

      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await sendEmail({
      email: user.email,

      subject: "Verify Your Email",

      message: `

    <h2>Welcome to Email SaaS</h2>

    <p>Please verify your email account.</p>


    <a href="${process.env.FRONTEND_URL}/verify-email/${token}">
        Verify Email
    </a>

    `,
    });

    return res.status(201).json({
      success: true,

      message: "Registration successful",

      userId: user._id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

// Verify Email

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find Token

    const verificationToken = await VerificationToken.findOne({
      token,
    });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Check Expiry

    if (verificationToken.expiresAt < Date.now()) {
      await VerificationToken.deleteOne({
        _id: verificationToken._id,
      });

      return res.status(400).json({
        success: false,
        message: "Verification token expired",
      });
    }

    // Find User

    const user = await User.findById(verificationToken.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify User

    user.isVerified = true;

    await user.save();

    // Delete Token

    await VerificationToken.deleteOne({
      _id: verificationToken._id,
    });

    return res.status(200).json({
      success: true,

      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

// Login User
// Login User

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid email or password",
      });
    }

    // Check Email Verification

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,

        message: "Please verify your email first",
      });
    }

    // Compare Password

    const isMatch = await bcrypt.compare(
      password,

      user.password,
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message: "Invalid email or password",
      });
    }

    // Generate Tokens

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    // Save Refresh Token in Database

    user.refreshToken = refreshToken;

    await user.save();

    // Save Refresh Token in Cookie

    res.cookie(
      "refreshToken",

      refreshToken,

      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    );

    return res.status(200).json({
      success: true,

      message: "Login successful",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Logout User

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({
        refreshToken,
      });

      if (user) {
        user.refreshToken = null;

        await user.save();
      }
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,

      message: "Logout successful",
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Refresh Access Token

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,

        message: "Refresh token not found",
      });
    }

    // Verify Refresh Token

    const decoded = jwt.verify(
      refreshToken,

      process.env.JWT_REFRESH_SECRET,
    );

    // Find User

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // Check Stored Refresh Token

    if (user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,

        message: "Invalid refresh token",
      });
    }

    // Generate New Access Token

    const accessToken = generateAccessToken(user._id);

    return res.status(200).json({
      success: true,

      accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,

      message: "Refresh token expired",
    });
  }
};

// Forgot Password

const forgotPassword = async (req, res) => {
  try {
    console.log("FORGOT BODY:", req.body);

    const { email } = req.body;

    console.log("EMAIL RECEIVED:", email);

    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await PasswordResetToken.create({
      userId: user._id,

      token,

      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    await sendEmail({
      email: user.email,

      subject: "Reset Password",

      message: `

    <h2>Password Reset</h2>

    <p>Click below to reset your password</p>


    <a href="${process.env.FRONTEND_URL}/reset-password/${token}">
    Reset Password
    </a>

    `,
    });

    return res.json({
      success: true,

      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

// Reset Password

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    // Find Reset Token

    const resetToken = await PasswordResetToken.findOne({
      token,
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,

        message: "Invalid or expired token",
      });
    }

    // Check Expiry

    if (resetToken.expiresAt < Date.now()) {
      await PasswordResetToken.deleteOne({
        _id: resetToken._id,
      });

      return res.status(400).json({
        success: false,

        message: "Token expired",
      });
    }

    // Find User

    const user = await User.findById(resetToken.userId);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // Hash New Password

    const hashedPassword = await bcrypt.hash(
      password,

      10,
    );

    user.password = hashedPassword;

    // Remove refresh token for security

    user.refreshToken = null;

    await user.save();

    // Delete Reset Token

    await PasswordResetToken.deleteOne({
      _id: resetToken._id,
    });

    return res.status(200).json({
      success: true,

      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
};
