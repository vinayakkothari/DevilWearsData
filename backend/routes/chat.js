const express = require('express');
const ChatMessage = require('../models/chatMessage');
const router = express.Router();

// Post a new message
router.post('/messages', async (req, res) => {
    const { userId, message } = req.body;
    const newMessage = new ChatMessage({ userId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
});

// Get all messages
router.get('/messages', async (req, res) => {
    const messages = await ChatMessage.find().sort({ timestamp: -1 });
    res.json(messages);
});

module.exports = router;
