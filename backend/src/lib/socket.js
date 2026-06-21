import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Get allowed origin from environment or use default
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL || "http://localhost:5173"
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    },
    transports: ["websocket", "polling"],
    pingInterval: 25000,
    pingTimeout: 60000,
});

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
        io.emit("getOlineUsers", Object.keys(userSocketMap)); 
        console.log("User connected: " + userId);
    }
    
    socket.on("disconnect", () => {
        console.log("Client disconnected: " + socket.id);
        delete userSocketMap[userId];
        io.emit("getOlineUsers", Object.keys(userSocketMap));
    });
});

export {io, app, server};