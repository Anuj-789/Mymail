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

    // Send Verification Email

    await sendEmail({
      email: user.email,

      subject: "MyMail — Verify Your Email",

      message: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Verify Your Email - MyMail</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f5f7;
    font-family:Arial, Helvetica, sans-serif;
    color:#1a1a1a;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:#f4f5f7; padding:40px 15px;"
  >

    <tr>
      <td align="center">

        <!-- Main Container -->

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:600px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
          "
        >

          <!-- Header -->

          <tr>
            <td
              align="center"
              style="
                background:#08090B;
                padding:28px 20px;
              "
            >

              <img
                src="https://mymail-alpha.vercel.app/gungif3.gif"
                alt="MyMail"
                width="72"
                style="
                  display:block;
                  margin:0 auto 12px auto;
                  border:0;
                  outline:none;
                "
              />

              <div
                style="
                  color:#ffffff;
                  font-size:25px;
                  font-weight:700;
                  letter-spacing:0.5px;
                "
              >
                MyMail
              </div>

              <div
                style="
                  color:#aeb3ba;
                  font-size:13px;
                  margin-top:6px;
                "
              >
                Reliable Email Infrastructure
              </div>

            </td>
          </tr>


          <!-- Content -->

          <tr>
            <td
              style="
                padding:42px 40px;
              "
            >

              <div
                style="
                  font-size:26px;
                  font-weight:700;
                  color:#111318;
                  margin-bottom:18px;
                "
              >
                Welcome to MyMail 👋
              </div>


              <div
                style="
                  font-size:16px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:18px;
                "
              >
                Hi ${user.name},
              </div>


              <div
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:24px;
                "
              >
                Thanks for creating your MyMail account.
                We're excited to have you with us.
              </div>


              <div
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:30px;
                "
              >
                To complete your registration and activate your
                account, please verify your email address by clicking
                the button below.
              </div>


              <!-- Verify Button -->

              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
              >

                <tr>
                  <td align="center">

                    <a
                      href="${process.env.FRONTEND_URL}/verify-email/${token}"
                      style="
                        display:inline-block;
                        background:#f97316;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:15px;
                        font-weight:700;
                        padding:15px 32px;
                        border-radius:10px;
                      "
                    >
                      Verify My Email
                    </a>

                  </td>
                </tr>

              </table>


              <!-- Expiry -->

              <div
                style="
                  margin-top:30px;
                  padding:15px;
                  background:#f8f9fa;
                  border-radius:10px;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                  text-align:center;
                "
              >
                This verification link is valid for
                <strong>24 hours</strong>.
              </div>


              <!-- Alternative Link -->

              <div
                style="
                  margin-top:28px;
                  font-size:12px;
                  line-height:1.6;
                  color:#9ca3af;
                  word-break:break-all;
                "
              >

                If the button above doesn't work, copy and paste
                the following link into your browser:

                <br><br>

                <a
                  href="${process.env.FRONTEND_URL}/verify-email/${token}"
                  style="
                    color:#f97316;
                    text-decoration:none;
                  "
                >
                  ${process.env.FRONTEND_URL}/verify-email/${token}
                </a>

              </div>


              <!-- Security -->

              <div
                style="
                  margin-top:30px;
                  padding-top:22px;
                  border-top:1px solid #eeeeee;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                "
              >

                <strong style="color:#374151;">
                  Didn't create this account?
                </strong>

                <br>

                You can safely ignore this email.
                No action is required.

              </div>

            </td>
          </tr>


          <!-- Footer -->

          <tr>
            <td
              align="center"
              style="
                background:#08090B;
                padding:24px 20px;
              "
            >

              <div
                style="
                  color:#ffffff;
                  font-size:15px;
                  font-weight:600;
                "
              >
                MyMail
              </div>

              <div
                style="
                  color:#9ca3af;
                  font-size:12px;
                  margin-top:8px;
                  line-height:1.6;
                "
              >
                Secure • Reliable • Developer-Friendly
              </div>

              <div
                style="
                  color:#6b7280;
                  font-size:11px;
                  margin-top:14px;
                "
              >
                © ${new Date().getFullYear()} MyMail. All rights reserved.
              </div>

            </td>
          </tr>


        </table>

      </td>
    </tr>

  </table>

</body>

</html>
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

// const forgotPassword = async (req, res) => {
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

    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail({
      email: user.email,

      subject: "MyMail — Reset Your Password",

      message: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - MyMail</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f5f7;
    font-family:Arial, Helvetica, sans-serif;
    color:#1a1a1a;
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
      background:#f4f5f7;
      padding:40px 15px;
    "
  >

    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:600px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            border:1px solid #e5e7eb;
          "
        >

          <!-- HEADER -->
          <tr>
            <td
              align="center"
              style="
                background:#08090B;
                padding:28px 20px;
              "
            >

              <img
                src="https://mymail-alpha.vercel.app/gungif3.gif"
                alt="MyMail"
                width="72"
                style="
                  display:block;
                  margin:0 auto 12px auto;
                  border:0;
                  outline:none;
                "
              />

              <div
                style="
                  color:#ffffff;
                  font-size:25px;
                  font-weight:700;
                  letter-spacing:0.5px;
                "
              >
                MyMail
              </div>

              <div
                style="
                  color:#aeb3ba;
                  font-size:13px;
                  margin-top:6px;
                "
              >
                Reliable Email Infrastructure
              </div>

            </td>
          </tr>


          <!-- MAIN CONTENT -->
          <tr>
            <td
              style="
                padding:42px 40px;
              "
            >

              <div
                style="
                  font-size:26px;
                  font-weight:700;
                  color:#111318;
                  margin-bottom:18px;
                "
              >
                Reset Your Password 🔐
              </div>


              <div
                style="
                  font-size:16px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:18px;
                "
              >
                Hi ${user.name},
              </div>


              <div
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:24px;
                "
              >
                We received a request to reset the password
                for your MyMail account.
              </div>


              <div
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#4b5563;
                  margin-bottom:30px;
                "
              >
                If you made this request, click the button below
                to create a new password for your account.
              </div>


              <!-- RESET BUTTON -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
              >

                <tr>
                  <td align="center">

                    <a
                      href="${resetUrl}"
                      style="
                        display:inline-block;
                        background:#f97316;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:15px;
                        font-weight:700;
                        padding:15px 32px;
                        border-radius:10px;
                      "
                    >
                      Reset My Password
                    </a>

                  </td>
                </tr>

              </table>


              <!-- EXPIRY NOTICE -->
              <div
                style="
                  margin-top:30px;
                  padding:15px;
                  background:#f8f9fa;
                  border-radius:10px;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                  text-align:center;
                "
              >
                For your security, this password reset link
                is valid for <strong>15 minutes</strong>.
              </div>


              <!-- FALLBACK URL -->
              <div
                style="
                  margin-top:28px;
                  font-size:12px;
                  line-height:1.6;
                  color:#9ca3af;
                  word-break:break-all;
                "
              >

                If the button above doesn't work, copy and paste
                the following link into your browser:

                <br><br>

                <a
                  href="${resetUrl}"
                  style="
                    color:#f97316;
                    text-decoration:none;
                  "
                >
                  ${resetUrl}
                </a>

              </div>


              <!-- SECURITY NOTICE -->
              <div
                style="
                  margin-top:30px;
                  padding-top:22px;
                  border-top:1px solid #eeeeee;
                  font-size:13px;
                  line-height:1.6;
                  color:#6b7280;
                "
              >

                <strong style="color:#374151;">
                  Didn't request a password reset?
                </strong>

                <br>

                You can safely ignore this email.
                Your password will remain unchanged.

              </div>

            </td>
          </tr>


          <!-- FOOTER -->
          <tr>
            <td
              align="center"
              style="
                background:#08090B;
                padding:24px 20px;
              "
            >

              <div
                style="
                  color:#ffffff;
                  font-size:15px;
                  font-weight:600;
                "
              >
                MyMail
              </div>

              <div
                style="
                  color:#9ca3af;
                  font-size:12px;
                  margin-top:8px;
                  line-height:1.6;
                "
              >
                Secure • Reliable • Developer-Friendly
              </div>

              <div
                style="
                  color:#6b7280;
                  font-size:11px;
                  margin-top:14px;
                "
              >
                © ${new Date().getFullYear()} MyMail.
                All rights reserved.
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>

</html>
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
