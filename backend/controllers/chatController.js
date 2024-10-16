import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const postMessage = async (req, res) => {
    const { userId, message } = req.body;
    try {
        const newMessage = new Message({ userId, message, timestamp: Date.now() });
        await newMessage.save();
        res.json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
