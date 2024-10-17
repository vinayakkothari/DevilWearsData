import React from 'react';
import { motion } from 'framer-motion';
import { HandIcon, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import VerticalNavbar from '../components/NavBar';
import { Button } from "../components/ui/Button.jsx";
import Weather from './Weather'; // Import the new Weather component
import DashboardCalendar from '../components/DashboardCalendar';

export default function Dashboard() {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle} />
            <div
                className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isNavbarExpanded ? '-ml-64' : 'ml-16'}`}
                style={{ marginLeft: isNavbarExpanded ? '16rem' : '14rem' }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Swipe Through Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-matte-blue rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <HandIcon className="w-6 h-6 mr-2" />
                                <CardTitle>Swipe through!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button variant="secondary" size="sm" onClick={() => navigate('/swipe')}>
                                    Swipe
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Weather Card */}
                    <Weather /> {/* Use the new Weather component here */}

                    {/* Leaderboard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-matte-green rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2" />
                                <CardTitle>Leaderboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>1. User123 - 1450 points</p>
                                <p>2. Fashionista45 - 1380 points</p>
                                <p>3. TrendSetter - 1200 points</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Calendar Card */}
                    <DashboardCalendar /> {/* Use the new Calendar component here */}
                </div>
            </div>
        </div>
    );
}
