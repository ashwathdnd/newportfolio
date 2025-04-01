import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-tertiary/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-secondary">
            JD
          </a>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-textPrimary hover:text-secondary transition-colors">
              About
            </a>
            <a href="#projects" className="text-textPrimary hover:text-secondary transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-textPrimary hover:text-secondary transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-textPrimary hover:text-secondary transition-colors">
              Contact
            </a>
          </div>
          <button className="md:hidden text-textPrimary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 