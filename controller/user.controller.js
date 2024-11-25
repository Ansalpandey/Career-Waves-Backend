const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendRegisterEmail} = require("../services/email.service");

const register = async (req, res) => {
  try {
    const { email, password, name, dob, age, phoneNumber } = req.body;
    if (!name || !email || !password || !dob || !age || !phoneNumber) {
      return res
        .status(400)
        .json({
          message:
            "Name, email, password, dob, age and phone number are required",
        });
    }
    // Validate password strength
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one lowercase letter",
      });
    }
    if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one digit" });
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one special character",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `User already exists with the email ${email}`,
      });
    }

    // Send email to user
    const subject = "Registration successful";
    await sendRegisterEmail(email, subject, name);

    const user = new User({ email, password, name, dob, age, phoneNumber });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const newPassword = req.body.password;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one lowercase letter",
      });
    }

    if (!/[0-9]/.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one digit" });
    }

    if (!/[!@#$%^&*]/.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one special character",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfull" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { register, login, logout, resetPassword };
