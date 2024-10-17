import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import imageRoutes from './routes/imageRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import chatRoutes from './routes/chatRoutes.js'; // Import chat routes
import connectToMongoDb from './database/connectMongo.js';

dotenv.config();

const app = express();
app.use(cors());
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Your frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/images', imageRoutes); // Image routes
app.use('/api/chat', chatRoutes); // Chat routes

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for messages from clients
    socket.on('send_message', (data) => {
        // Broadcast message to all clients
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});
