import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        error: { message: "Name, email, and password are required" }
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({
        status: "error",
        error: {
          code: "DUPLICATE_EMAIL",
          message: "Email is already registered"
        }
      });
    }

    const user = new User({
      name: name.trim(),
      email: normalizedEmail
    });

    await user.setPassword(password);
    await user.save();

    return res.status(201).json({
      status: "ok",
      data: { userId: user._id }
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error during signup" }
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: { message: "Email and password are required" }
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        status: "error",
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password"
        }
      });
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res.status(401).json({
        status: "error",
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password"
        }
      });
    }

    const token = createToken(user);

    return res.json({
      status: "ok",
      data: {
        accessToken: token
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error during login" }
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const user = req.user;
    return res.json({
      status: "ok",
      data: {
        user
      }
    });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({
      status: "error",
      error: { message: "Server error while getting profile" }
    });
  }
};
