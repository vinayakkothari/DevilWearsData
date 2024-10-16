const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  image: {
    type: string,  // URL/path of the uploaded image
    required: true,
  },
  type: {
    type: String,  // Type of clothing (e.g., "shirt", "pants", "dress")
    required: true,
  },
  color: {
    type: String,  // Color of the clothing (e.g., "red", "blue", "black")
    required: false,
  },
  season: {
    type: String,  // Suitable season for the clothing (e.g., "summer", "winter")
    required: true,
    enum: ['spring', 'summer', 'fall', 'winter'],
  },
  tags: {
    type: [String],  // Additional tags for filtering (e.g., "casual", "formal")
    required: false,
  },
  uploadDate: {
    type: Date,  // Date when the image was uploaded
    default: Date.now,
  }
});

module.exports = mongoose.model('Clothing', clothingSchema);
