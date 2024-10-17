const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isShown: {
        type: Boolean,
        default: false
    }
});

// Static method to get the count of items that haven't been shown
imageSchema.statics.countNotShown = function() {
    return this.countDocuments({ isShown: false });
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
