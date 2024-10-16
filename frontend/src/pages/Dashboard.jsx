import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import VerticalNavbar from '../components/NavBar';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export default function Dashboard() {
    const [isNavbarExpanded, setIsNavbarExpanded] = React.useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

    useEffect(() => {
        introJs().start();
    }, []);

    return (
        <div>
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle} />
            <div className={`bg-white border-black m-3 ${isNavbarExpanded ? 'ml-64' : 'ml-16'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    data-intro="This is the main content area."
                >
                    <Card className="mb-8 max-w-md mx-auto p-3" data-intro="This card shows today's weather.">
                        <CardHeader className="flex ">
                            <CardTitle className="flex items-center">
                                <Sun className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                                Today's Weather
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Rainy day in Manipal</p>
                            <p>Temperature: 28</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
