import { useNavigate } from "react-router-dom";
import video1 from "../assets/video1.mp4";
import logo from "../assets/dwd_dark.png";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/Button.jsx";
import { Input } from "./ui/Input.jsx";
import { Shirt, User, Crown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
      <div>
        <div className="bg-black border-black border-2">
          <video
              autoPlay
              loop
              muted
              className="w-full object-cover h-screen opacity-30"
          >
            <source src={video1} type="video/mp4" />
          </video>
          <div className="fixed top-0 left-0 z-50 w-full py-2 flex justify-between items-center">
            <button onClick={scrollToTop}>
              <img className="h-16 w-auto ml-5 md:h-20" src={logo} alt="Logo" />
            </button>
            <div className="flex space-x-2 mx-4 md:space-x-5">
              <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/swipe')}>
                Swipe
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {/* <h1 className="text-white text-4xl md:text-7xl"> */}
            <h1 className="text-white text-4xl md:text-7xl" style={{ fontFamily: 'Pistilli Roman' }}>
              Devil Wears Data
            </h1>
            <motion.p
                className="text-white text-sm md:text-base"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your wardrobe at your fingertips
            </motion.p>
            <motion.button>
              <Button variant="ghost" size="sm" className="m-5" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </motion.button>
          </div>
        </div>

        {/* Rest of your component code stays unchanged */}
        {/* Key Features Section */}
        <div className="bg-white">
          <section className="py-10 md:py-20">
            <div className="container mx-auto px-4">
              <motion.h2
                  className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
              >
                Key Features
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shirt className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        Personalized Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Get outfit suggestions tailored to your style, occasion,
                        and local weather.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        Virtual Closet
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Organize your wardrobe digitally and create new outfit
                        combinations.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Crown className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        Style Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Participate in seasonal challenges and climb the style
                        leaderboard.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Latest Fashion Trends Section */}
        <div className="bg-white border-black">
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8 max-w-md mx-auto p-3">
              <CardHeader>
                <CardTitle>Latest Fashion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    <span>Oversized blazers are making a comeback</span>
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    <span>Pastel colors are dominating spring collections</span>
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    <span>Sustainable fashion is on the rise</span>
                  </li>
                </ul>
                <Button className="mt-4">View All Trends</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-black text-primary-foreground">
          <div className="container mx-auto text-center">
            <motion.h2
                className="text-3xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to Elevate Your Style?
            </motion.h2>
            <motion.p
                className="text-xl text-white mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join Devil Wears Data today and transform your fashion journey!
            </motion.p>
            <motion.div
                className="flex justify-center items-center space-x-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Input className="max-w-xs" placeholder="Enter your email" />
              <Button variant="secondary" size="lg" onClick={() => navigate('/signup')}>
                Sign Up Now
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-8 text-white">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Devil Wears Data. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
}

export default Hero;
