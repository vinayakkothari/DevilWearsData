// components/Chat.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/chat/messages');
                const fetchedMessages = response.data;

                // If no messages from the server, fallback to dummy messages
                const dummyMessages = [
                    { id: 1, sender: 'UserA', content: 'Hey, this is UserA!', timestamp: new Date(Date.now() - 60000).toISOString() },
                    { id: 2, sender: 'UserB', content: 'Hello, UserA! How are you?', timestamp: new Date(Date.now() - 45000).toISOString() },
                    { id: 3, sender: 'UserC', content: 'UserB, I am doing well! How about you?', timestamp: new Date(Date.now() - 30000).toISOString() },
                ];

                // If fetched messages are empty, use dummy messages
                setMessages(fetchedMessages.length > 0 ? fetchedMessages : dummyMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
                // Fallback to dummy messages on error
                const dummyMessages = [
                    { id: 1, sender: 'UserA', content: 'Hey, this is UserA!', timestamp: new Date(Date.now() - 60000).toISOString() },
                    { id: 2, sender: 'UserB', content: 'Hello, UserA! How are you?', timestamp: new Date(Date.now() - 45000).toISOString() },
                    { id: 3, sender: 'UserC', content: 'UserB, I am doing well! How about you?', timestamp: new Date(Date.now() - 30000).toISOString() },
                ];
                setMessages(dummyMessages);
            }
        };

        fetchMessages();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/chat/messages', { userId, message: newMessage });
        setMessages([response.data, ...messages]);
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map(msg => (
                    <div key={msg._id}>
                        <strong>{msg.userId}</strong>: {msg.message} <em>{new Date(msg.timestamp).toLocaleString()}</em>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
