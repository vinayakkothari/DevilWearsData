import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Devil from "../assets/698454.jpg";
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

export default function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth(); // Get login function from Auth Context
    const navigate = useNavigate(); // For redirecting after login

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Ensure token and userId are present in the response
                if (data.token && data.userId) {
                    // Save token and userId to localStorage
                    localStorage.setItem('token', data.token); // Save the token
                    localStorage.setItem('userId', data.userId); // Save the userId or user data
    
                    // Call login from Auth Context to update state
                    login();
    
                    // Redirect to dashboard or any protected route
                    navigate('/dashboard');
                } else {
                    throw new Error('Missing token or userId from the server');
                }
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Something went wrong, please try again');
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-800 to-black">
            <img src={Devil} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Welcome Back to Devil Wears Data
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button variant="default" type="submit" className="w-full my-4">
                            Log In
                        </Button>
                    </motion.div>
                </form>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-sm text-gray-600 text-center"
                >
                    Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>.
                </motion.p>
            </motion.div>
        </div>
    );
}
