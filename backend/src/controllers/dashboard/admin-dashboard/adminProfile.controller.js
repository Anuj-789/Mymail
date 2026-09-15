const User = require("../../../models/auth/User");

const bcrypt = require("bcryptjs");

// Get Admin Profile

const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user._id)

      .select("-password -refreshToken");

    return res.status(200).json({
      success: true,

      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Update Admin Profile

const updateAdminProfile = async (req, res) => {
  try {
    const {
      name,

      email,

      phone,

      profileImage,
    } = req.body;

    const admin = await User.findById(req.user._id);

    if (name) {
      admin.name = name;
    }

    if (email) {
      admin.email = email;
    }

    if (phone) {
      admin.phone = phone;
    }

    if (profileImage) {
      admin.profileImage = profileImage;
    }

    await admin.save();

    return res.status(200).json({
      success: true,

      message: "Admin profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Change Admin Password

const changeAdminPassword = async (req, res) => {
  try {
    const {
      oldPassword,

      newPassword,
    } = req.body;

    const admin = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(
      oldPassword,

      admin.password,
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message: "Old password incorrect",
      });
    }

    const hashPassword = await bcrypt.hash(
      newPassword,

      10,
    );

    admin.password = hashPassword;

    // Logout all sessions

    admin.refreshToken = null;

    await admin.save();

    return res.status(200).json({
      success: true,

      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getAdminProfile,

  updateAdminProfile,

  changeAdminPassword,
};
