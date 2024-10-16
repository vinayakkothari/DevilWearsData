import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import connectToMongoDb from './database/connectMongo.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/images', imageRoutes); // Image routes

// Start the server
app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`);
});


