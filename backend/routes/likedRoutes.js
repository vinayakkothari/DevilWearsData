const express = require('express');
const router = express.Router();
const likedController = require('../controllers/likedController');

// Route to get all liked images
router.get('/liked', likedController.getLikedImages);

// Route to like/unlike an image
router.post('/liked', likedController.likeImage);

// Route to get the count of images not shown
router.get('/not-shown-count', likedController.getNotShownCount);

module.exports = router;
