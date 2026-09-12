import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/connectDb.ts";
// import pasteRoutes from "./routes/pasteRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import projectRoutes from "./routes/projectRoutes.ts"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Database
connectDb();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Root routech
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// API routes
// app.use("/api/pastes", pasteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// 404 route - MUST BE LAST
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
