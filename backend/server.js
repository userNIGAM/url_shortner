// Express does not ship with TypeScript declarations in this project.
// @ts-expect-error The dependency is untyped; install @types/express when available.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDb } from "./config/connectDb.ts";
import pasteRoutes from "./routes/pasteRoutes.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Pastebin API is running",
  });
});

app.use("/api/pastes", pasteRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});