import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ✅ Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // ✅ Credentials check
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    try {
      // ✅ Role bhi include karo token mein
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ 
        token,
        message: "Login successful",
        role: "admin"
      });

    } catch (err) {
      res.status(500).json({ message: "Token generation failed" });
    }

  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;