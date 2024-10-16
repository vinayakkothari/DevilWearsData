const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Clothing = require('./models/Clothing');

const app = express();

// Use CORS middleware 
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb+srv://anushri11sakhardande:Playingwithwebdev@cluster0.vwtbg.mongodb.net/wardrobe?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

// Multer setup for memory storage (image as Buffer)
const storage = multer.memoryStorage();  // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('image_file', req.file.buffer);  // Use the buffer directly
    formData.append('size', 'auto');

    // Send request to remove.bg API to remove background
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'HdcdKMx9Hr3ZUFjLYdUGD8UP' 
      },
      responseType: 'arraybuffer'
    });

    // Convert the response (image with background removed) to a Base64 string
    const imageBuffer = Buffer.from(response.data, 'binary').toString('base64');

    // Save the image directly to MongoDB
    const clothingItem = await Clothing.create({
      image: imageBuffer,  // Store the image as a base64 string
      type: req.body.type,
      color: req.body.color,
      season: req.body.season,
      tags: req.body.tags.split(',').map(tag => tag.trim())
    });

    // Send the saved clothing item back as the response
    res.json(clothingItem);
    console.log('Image uploaded and processed:', clothingItem);

  } catch (error) {
    console.error('Error removing background or saving:', error);
    res.status(500).json({ error: 'Failed to upload or process image' });
  }
});


app.get('/clothing', (req, res) => {
    Clothing.find({})
      .then(items => {
        // Convert the image buffers to base64 strings
        const itemsWithBase64Images = items.map(item => {
          return {
            ...item._doc,
            image: item.image.toString('base64') 
          };
        });
        console.log(itemsWithBase64Images);
        res.json(itemsWithBase64Images);
      })
      .catch(err => res.status(500).json({ error: 'Failed to fetch clothing items' }));
  });
  

// Start the server
app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});