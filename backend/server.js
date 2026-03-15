import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orders.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

/* ===== CORS FIX ===== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gurukripa-restaurant.vercel.app"
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ===== Routes ===== */
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

/* ===== MongoDB Connection ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* ===== Root Route (Testing) ===== */
app.get("/", (req, res) => {
  res.send("🚀 Gurukripa Restaurant API Running");
});

/* ===== Server Start ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});