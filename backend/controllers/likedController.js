const Image = require('../models/imageModel'); // Assuming the model is in a models folder

// GET controller to retrieve all liked images
exports.getLikedImages = async (req, res) => {
    try {
        const likedImages = await Image.find({ isLiked: true });
        res.status(200).json(likedImages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving liked images', error });
    }
};

// POST controller to update whether an image is liked or not
exports.likeImage = async (req, res) => {
    const { imageId, isLiked } = req.body;
    try {
        const image = await Image.findByIdAndUpdate(
            imageId,
            { isLiked },
            { new: true }
        );
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Error updating image like status', error });
    }
};

// GET controller to retrieve the number of images not shown
exports.getNotShownCount = async (req, res) => {
    try {
        const notShownCount = await Image.countDocuments({ isShown: false });
        res.status(200).json({ notShownCount });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving not shown images count', error });
    }
};
