import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from "./ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { 
  Home, 
  Search, 
  Users, 
  TrendingUp, 
  Award, 
  MessageCircle, 
  Image, 
  Settings, 
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: Search, href: '/explore' },
  { name: 'Community', icon: Users, href: '/community' },
  { name: 'Trends', icon: TrendingUp, href: '/trends' },
  { name: 'Challenges', icon: Award, href: '/challenges' },
  { name: 'Forums', icon: MessageCircle, href: '/forums' },
  { name: 'Mood Boards', icon: Image, href: '/moodboards' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

export default function VerticalNavbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <motion.nav
        className={`fixed left-0 top-0 bottom-0 w-64 bg-background border-r p-4 z-40 ${
          isOpen ? 'block' : 'hidden'
        } md:block`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center mb-8">
            <span className="ml-2 text-xl font-bold">Devil Wears Data</span>
          </div>

          <ul className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href}>
                  <Button
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
