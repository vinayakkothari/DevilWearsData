import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes.js';
import connectToMongoDb from './database/connectMongo.js';

dotenv.config();

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
})) 

app.listen(PORT, () => {
  // Connect to MongoDB
  connectToMongoDb(); 
  console.log(`Server is running on port ${PORT}`);
});


app.use('/api/images', imageRoutes);