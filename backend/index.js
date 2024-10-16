import express from 'express';
import imageRoutes from './routes/imageRoutes';

const app = express();
app.use(express.json()); // Parse incoming JSON

// Route to handle image upload
app.use('/api/images', imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
