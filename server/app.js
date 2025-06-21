import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(
  cors({
    origin: "https://multi-step-user-profile-update-form-omega.vercel.app",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", profileRoutes);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
