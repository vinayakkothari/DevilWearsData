import mongoose from 'mongoose'; // Import mongoose
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Cloud successfully');
    })
    .catch(err => {
        console.error('MongoDB cloud connection error:', err);
    });

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/images', imageRoutes); // Image routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
