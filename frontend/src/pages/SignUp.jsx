import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import Back from "../assets/Closet_Beige.jpeg"
import { useNavigate } from "react-router-dom";

// const aestheticOptions = [
//     'Minimalist', 'Bohemian', 'Vintage', 'Streetwear',
//     'Preppy', 'Romantic', 'Edgy', 'Classic'
// ];

const aestheticOptions = [
    'Casual', 'Ethnic', 'Sports', 'Formal',
    'Party', 'Smart Casual'
]

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        aesthetics: []
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAestheticToggle = (aesthetic) => {
        setFormData(prev => ({
            ...prev,
            aesthetics: prev.aesthetics.includes(aesthetic)
                ? prev.aesthetics.filter(a => a !== aesthetic)
                : [...prev.aesthetics, aesthetic]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            // Submit the data to the backend
            try {
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message);
                }

                const data = await response.json();
                console.log('Signup successful:', data);
                // Redirect to dashboard
                navigate('/dashboard');
            } catch (error) {
                console.error('Signup failed:', error);
                alert('Something went wrong, please try again');
            }
        }
    };

    return (
        /*<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-500 via-gray-800 to-black">*/
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: {Back}, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Join Devil Wears Data
                </h1>
                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-4">
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
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
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                    Select Your Aesthetic Preferences
                                </h2>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {aestheticOptions.map((aesthetic) => (
                                        <Button
                                            key={aesthetic}
                                            type="button"
                                            variant={formData.aesthetics.includes(aesthetic) ? "default" : "outline"}
                                            onClick={() => handleAestheticToggle(aesthetic)}
                                            className="w-full"
                                        >
                                            {aesthetic}
                                        </Button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button variant="default" type="submit" className="w-full my-3">
                            {step === 1 ? 'Next' : 'Complete Sign Up'}
                        </Button>
                    </motion.div>
                </form>
                {step === 2 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-gray-600 text-center"
                    >
                        You can always update your preferences later.
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}