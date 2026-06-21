
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import aiRoutes from "./routes/ai.routes.js";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.rote.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";



const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use("/api/ai", aiRoutes);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY ? "LOADED" : "MISSING");


app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Changed from app.get("*", ...) to app.use(...)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});