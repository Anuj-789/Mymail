const User = require("../../models/auth/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const VerificationToken = require("../../models/auth/VerificationToken");
const PasswordResetToken = require("../../models/auth/PasswordResetToken");
const sendEmail = require("../../utils/sendEmail");
const jwt = require("jsonwebtoken");

const {
    generateAccessToken,
    generateRefreshToken,
} = require("../../config/jwt");


// =====================================================
// REGISTER
// =====================================================

const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password: hashedPassword,
        });

        // Generate verification token
        const token = crypto.randomBytes(32).toString("hex");

        await VerificationToken.create({
            userId: user._id,
            token,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        const verificationUrl =
            `${process.env.FRONTEND_URL}/verify-email/${token}`;

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#f4f4f5;padding:40px 15px;">

        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#08090B;padding:28px 30px;text-align:center;">

                            <img
                                src="https://mymail-alpha.vercel.app/gungif3.gif"
                                alt="MyMail"
                                width="55"
                                height="55"
                                style="display:block;margin:0 auto 12px;border-radius:12px;"
                            />

                            <div style="font-size:24px;font-weight:700;color:#ffffff;">
                                MyMail
                            </div>

                            <div style="font-size:13px;color:#a1a1aa;margin-top:5px;">
                                Simple. Powerful. Professional Email.
                            </div>

                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:40px 35px;">

                            <h1 style="margin:0 0 15px;font-size:26px;color:#18181b;">
                                Verify Your Email
                            </h1>

                            <p style="font-size:15px;line-height:1.7;color:#52525b;margin:0 0 15px;">
                                Hi <strong>${name}</strong>,
                            </p>

                            <p style="font-size:15px;line-height:1.7;color:#52525b;margin:0 0 25px;">
                                Welcome to MyMail! Please verify your email address
                                to activate your account and start using MyMail.
                            </p>

                            <!-- Button -->
                            <table cellpadding="0" cellspacing="0" border="0"
                                style="margin:30px auto;">

                                <tr>
                                    <td align="center"
                                        style="background:#f97316;border-radius:8px;">

                                        <a
                                            href="${verificationUrl}"
                                            style="
                                                display:inline-block;
                                                padding:14px 28px;
                                                color:#ffffff;
                                                text-decoration:none;
                                                font-size:15px;
                                                font-weight:600;
                                            "
                                        >
                                            Verify My Email
                                        </a>

                                    </td>
                                </tr>

                            </table>

                            <p style="font-size:13px;line-height:1.6;color:#71717a;margin:25px 0 10px;">
                                This verification link will expire in
                                <strong>24 hours</strong>.
                            </p>

                            <p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 20px;">
                                If the button above doesn't work, copy and paste
                                the following URL into your browser:
                            </p>

                            <div style="
                                background:#f4f4f5;
                                padding:12px;
                                border-radius:7px;
                                word-break:break-all;
                                font-size:12px;
                                color:#52525b;
                            ">
                                ${verificationUrl}
                            </div>

                            <!-- Security Notice -->
                            <div style="
                                margin-top:30px;
                                padding:15px;
                                background:#fff7ed;
                                border-left:4px solid #f97316;
                                border-radius:5px;
                            ">
                                <p style="margin:0;font-size:13px;line-height:1.6;color:#7c2d12;">
                                    <strong>Security Notice:</strong>
                                    If you did not create a MyMail account,
                                    you can safely ignore this email.
                                </p>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="
                            background:#08090B;
                            padding:25px 30px;
                            text-align:center;
                        ">

                            <p style="
                                margin:0;
                                color:#ffffff;
                                font-size:14px;
                                font-weight:600;
                            ">
                                MyMail
                            </p>

                            <p style="
                                margin:8px 0 0;
                                color:#71717a;
                                font-size:12px;
                                line-height:1.5;
                            ">
                                This is an automated email. Please do not reply.
                            </p>

                            <p style="
                                margin:12px 0 0;
                                color:#52525b;
                                font-size:11px;
                            ">
                                © ${new Date().getFullYear()} MyMail. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
`;

        await sendEmail({
            email: user.email,
            subject: "MyMail — Verify Your Email",
            message: emailHtml,
        });

        return res.status(201).json({
            success: true,
            message:
                "Registration successful. Please check your email to verify your account.",
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message,
        });
    }
};


// =====================================================
// VERIFY EMAIL
// =====================================================

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const verificationToken = await VerificationToken.findOne({
            token,
        });

        if (!verificationToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link",
            });
        }

        if (verificationToken.expiresAt < new Date()) {
            await VerificationToken.deleteOne({
                _id: verificationToken._id,
            });

            return res.status(400).json({
                success: false,
                message: "Verification link has expired",
            });
        }

        const user = await User.findById(verificationToken.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isVerified = true;
        await user.save();

        await VerificationToken.deleteOne({
            _id: verificationToken._id,
        });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        console.error("Verify Email Error:", error);

        return res.status(500).json({
            success: false,
            message: "Email verification failed",
            error: error.message,
        });
    }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (user.status === "blocked") {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked",
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage,
                role: user.role,
                isVerified: user.isVerified,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
};


// =====================================================
// LOGOUT
// =====================================================

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

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message,
        });
    }
};


// =====================================================
// REFRESH ACCESS TOKEN
// =====================================================

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        const user = await User.findOne({
            refreshToken,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        if (decoded.id !== user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};


// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        // Don't reveal whether email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
        }

        // Delete old reset tokens
        await PasswordResetToken.deleteMany({
            userId: user._id,
        });

        const token = crypto.randomBytes(32).toString("hex");

        await PasswordResetToken.create({
            userId: user._id,
            token,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        });

        const resetUrl =
            `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#f4f4f5;padding:40px 15px;">

        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background:#08090B;padding:28px 30px;text-align:center;">

                            <img
                                src="https://mymail-alpha.vercel.app/gungif3.gif"
                                alt="MyMail"
                                width="55"
                                height="55"
                                style="display:block;margin:0 auto 12px;border-radius:12px;"
                            />

                            <div style="font-size:24px;font-weight:700;color:#ffffff;">
                                MyMail
                            </div>

                            <div style="font-size:13px;color:#a1a1aa;margin-top:5px;">
                                Simple. Powerful. Professional Email.
                            </div>

                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:40px 35px;">

                            <h1 style="margin:0 0 15px;font-size:26px;color:#18181b;">
                                Reset Your Password
                            </h1>

                            <p style="font-size:15px;line-height:1.7;color:#52525b;margin:0 0 15px;">
                                Hi <strong>${user.name}</strong>,
                            </p>

                            <p style="font-size:15px;line-height:1.7;color:#52525b;margin:0 0 25px;">
                                We received a request to reset your MyMail account
                                password. Click the button below to create a new password.
                            </p>

                            <!-- Button -->
                            <table cellpadding="0" cellspacing="0" border="0"
                                style="margin:30px auto;">

                                <tr>
                                    <td align="center"
                                        style="background:#f97316;border-radius:8px;">

                                        <a
                                            href="${resetUrl}"
                                            style="
                                                display:inline-block;
                                                padding:14px 28px;
                                                color:#ffffff;
                                                text-decoration:none;
                                                font-size:15px;
                                                font-weight:600;
                                            "
                                        >
                                            Reset My Password
                                        </a>

                                    </td>
                                </tr>

                            </table>

                            <p style="font-size:13px;line-height:1.6;color:#71717a;margin:25px 0 10px;">
                                This password reset link will expire in
                                <strong>15 minutes</strong>.
                            </p>

                            <p style="font-size:13px;line-height:1.6;color:#71717a;margin:0 0 20px;">
                                If the button above doesn't work, copy and paste
                                the following URL into your browser:
                            </p>

                            <div style="
                                background:#f4f4f5;
                                padding:12px;
                                border-radius:7px;
                                word-break:break-all;
                                font-size:12px;
                                color:#52525b;
                            ">
                                ${resetUrl}
                            </div>

                            <!-- Security Notice -->
                            <div style="
                                margin-top:30px;
                                padding:15px;
                                background:#fff7ed;
                                border-left:4px solid #f97316;
                                border-radius:5px;
                            ">
                                <p style="margin:0;font-size:13px;line-height:1.6;color:#7c2d12;">
                                    <strong>Security Notice:</strong>
                                    If you did not request a password reset,
                                    you can safely ignore this email.
                                </p>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="
                            background:#08090B;
                            padding:25px 30px;
                            text-align:center;
                        ">

                            <p style="
                                margin:0;
                                color:#ffffff;
                                font-size:14px;
                                font-weight:600;
                            ">
                                MyMail
                            </p>

                            <p style="
                                margin:8px 0 0;
                                color:#71717a;
                                font-size:12px;
                                line-height:1.5;
                            ">
                                This is an automated email. Please do not reply.
                            </p>

                            <p style="
                                margin:12px 0 0;
                                color:#52525b;
                                font-size:11px;
                            ">
                                © ${new Date().getFullYear()} MyMail. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
`;

        await sendEmail({
            email: user.email,
            subject: "MyMail — Reset Your Password",
            message: emailHtml,
        });

        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent.",
        });

    } catch (error) {
        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to process password reset request",
            error: error.message,
        });
    }
};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "New password is required",
            });
        }

        const resetToken = await PasswordResetToken.findOne({
            token,
        });

        if (!resetToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired password reset link",
            });
        }

        if (resetToken.expiresAt < new Date()) {
            await PasswordResetToken.deleteOne({
                _id: resetToken._id,
            });

            return res.status(400).json({
                success: false,
                message: "Password reset link has expired",
            });
        }

        const user = await User.findById(resetToken.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.refreshToken = null;

        await user.save();

        await PasswordResetToken.deleteOne({
            _id: resetToken._id,
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Password reset failed",
            error: error.message,
        });
    }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
};