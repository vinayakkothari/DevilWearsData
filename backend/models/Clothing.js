// const mongoose = require('mongoose');

// const clothingSchema = new mongoose.Schema({
//   image: {
//     type: string,  // URL/path of the uploaded image
//     required: true,
//   },
//   gender:{
//     type: string, 
//     required: true,
//   },
//   masterCat: {
//     type: String,  
//     required: true,
//   },
//   subCat: {
//     type: String,  
//     required: true,
//   },
//   ctype: {
//     type: String, 
//     required: true,
//   },
//   season: {
//     type: String,  
//     required: true,
//     //enum: ['spring', 'summer', 'fall', 'winter'],
//   },
//   usage: {
//     type: String,  
//     required: true,
//   },
//   tags: {
//     type: [String],  
//     required: true,
//   },
//   uploadDate: {
//     type: Date,  // Date when the image was uploaded
//     default: Date.now,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to the User model
//     ref: 'User',
//     required: true,
//   },
// });

// module.exports = mongoose.model('Clothing', clothingSchema);

const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
  image: {
    type: String,  // URL/path of the uploaded image
    required: true,
  },
  gender: {
    type: String, 
    required: true,
  },
  masterCat: {
    type: String,  
    required: true,
  },
  subCat: {
    type: String,  
    required: true,
  },
  ctype: {
    type: String, 
    required: true,
  },
  season: {
    type: String,  
    required: true,
    // enum: ['spring', 'summer', 'fall', 'winter'],
  },
  usage: {
    type: String,  
    required: true,
  },
  tags: {
    type: [String],  
    required: true,
  },
  uploadDate: {
    type: Date,  // Date when the image was uploaded
    default: Date.now,
  },
  userId: {  // **Field to associate with the user**
    type: 'String', // Reference to the User model
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Clothing', clothingSchema);

