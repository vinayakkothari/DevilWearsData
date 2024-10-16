router.get('/messages', (req, res) => {
    console.log("Fetching messages..."); // Log when the endpoint is hit
    res.status(200).json(messages);
});

router.post('/messages', (req, res) => {
    const { sender, content } = req.body;
    console.log("Message received:", sender, content); // Log the received data
    if (!sender || !content) {
        return res.status(400).json({ message: 'Sender and content are required' });
    }

    const newMessage = {
        id: messages.length + 1,
        sender,
        content,
        timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    res.status(201).json({ message: 'Message sent!', data: newMessage });
});
