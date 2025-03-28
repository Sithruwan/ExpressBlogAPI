import "reflect-metadata";
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './src/configs/DB/db.mjs';
import syncDB from './src/configs/DB/syncDB.mjs';
import indexRoute from './src/routes/IndexRoutes.mjs';
import { Server as SocketIO } from 'socket.io';
import SocketService from "./src/services/SocketService.mjs";

const app = express();
const socketServer = createServer(app); // Create HTTP server
export const io = new SocketIO(socketServer); // Attach Socket.IO to the HTTP server
export const socketService = new SocketService(io);


await connectDB(); // Initial DB connection

const port = process.env.APP_PORT || 8000;
const host = process.env.APP_HOST || 'localhost';
const base_url = process.env.BASE_URL || '/api/v1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Socket.IO connection

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id); // socket.id is unique for each client

  // Here you can set a flag or handle user-specific logic
  socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id); // socket.id helps identify the user
      // You can perform cleanup actions or notify other users that someone has disconnected
  });
});

const startServer = async () => {
  try {
    await syncDB(); // Sync DB (do not call connectDB() here again)

    app.use(base_url, indexRoute);

    // Start the HTTP server with Socket.IO support
    socketServer.listen(port, () => {
      console.log(`Server is listening on http://${host}:${port} 🚀`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
  }
};

startServer();
