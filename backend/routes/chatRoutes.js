import express from 'express';
import ChatMessage from '../models/ChatMessage.js';

const router = express.Router();

// Route to get all chat messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Route to send a new chat message
router.post('/messages', async (req, res) => {
    const { sender, content } = req.body;

    if (!sender || !content) {
        return res.status(400).json({ message: 'Sender and content are required' });
    }

    try {
        const newMessage = new ChatMessage({ sender, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

export default router;
