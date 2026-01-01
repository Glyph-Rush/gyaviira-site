import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/gyaviira_gold.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Music & Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Gyaviira Logo" className="h-10 md:h-12" />
          <span className="text-xl md:text-2xl font-heading text-gold-primary font-bold tracking-widest hidden sm:block">GYAVIIRA</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest hover:text-gold-primary transition-colors ${location.pathname === link.path ? 'text-gold-primary' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/store" className="text-white hover:text-gold-primary transition-colors">
            <ShoppingBag size={20} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gold-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-gold-dark/20 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-lg font-heading text-white hover:text-gold-primary tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
