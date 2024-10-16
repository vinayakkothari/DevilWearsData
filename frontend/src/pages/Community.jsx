// pages/Community.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Community = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/chat/messages');
                const fetchedMessages = response.data;

                // Dummy messages
                const dummyMessages = [
                    { id: 1, sender: 'UserA', content: 'Hey, this is UserA!', timestamp: new Date(Date.now() - 60000).toISOString() },
                    { id: 2, sender: 'UserB', content: 'Hello, UserA! How are you?', timestamp: new Date(Date.now() - 45000).toISOString() },
                    { id: 3, sender: 'UserC', content: 'UserB, I am doing well! How about you?', timestamp: new Date(Date.now() - 30000).toISOString() },
                ];

                // Combine dummy and fetched messages
                setMessages([...dummyMessages, ...fetchedMessages]);
            } catch (error) {
                console.error("Error fetching messages:", error);
                // If an error occurs, only load the dummy messages
                const dummyMessages = [
                    { id: 1, sender: 'Miranda', content: 'Something funny?', timestamp: new Date(Date.now() - 60000).toISOString() },
                    { id: 2, sender: 'Andy', content: 'No... No, no, nothing\'s... you know, it\'s just... both those belts look exactly the same to me. You know, I\'m still learning about this stuff and, uh...', timestamp: new Date(Date.now() - 45000).toISOString() },
                    { id: 3, sender: 'Miranda', content: 'This stuff"? Oh. Okay. I see. You think this has nothing to do with you. You go to your closet and you select, I don\'t know, that lumpy blue sweater, for instance, because you\'re trying to tell the world that you take yourself too seriously to care about what you put on your back.', timestamp: new Date(Date.now() - 30000).toISOString() },
                ];
                setMessages(dummyMessages);
            }
        };

        fetchMessages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMsg = {
            sender: 'You', // Set as the current user
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        // Append the new message after the existing messages (dummy + fetched)
        setMessages([...messages, newMsg]);

        try {
            await axios.post('http://localhost:3000/api/chat/messages', newMsg);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        setNewMessage('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Top Bar with Dashboard Button */}
            <div className="flex justify-between items-center p-4 bg-white shadow">
                <h1 className="text-2xl font-bold">Community Forum</h1>
                <Link to="/dashboard">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        Back to Dashboard
                    </button>
                </Link>
            </div>

            {/* Chat Messages Container */}
            <div className="flex-grow p-4 overflow-y-auto bg-white shadow-md mx-4 my-2 rounded-lg">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-4">
                        <div className="font-bold">{msg.sender}</div>
                        <div>{msg.content}</div>
                        <div className="text-gray-500 text-xs">
                            {new Date(msg.timestamp).toLocaleString()}
                        </div>
                        <hr className="my-2" />
                    </div>
                ))}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white shadow mt-4">
                <form onSubmit={handleSubmit} className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        required
                        className="flex-grow border border-gray-300 rounded-lg p-2"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Community;
