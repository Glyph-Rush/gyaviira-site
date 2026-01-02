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
    { name: 'Gallery', path: '/gallery' },
    { name: 'Merch', path: '/store' },
    { name: 'Instruments', path: '/instruments' },
    { name: 'Connect', path: '/newsletter' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-card py-4 bg-black/80' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Gyaviira Logo" className="h-16 md:h-20 rounded-full border-2 border-transparent group-hover:border-gold-primary transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]" />
          <span className="text-3xl md:text-4xl font-cursive text-gold-primary font-bold tracking-wider hidden sm:block drop-shadow-md group-hover:text-gold-light transition-colors">Gyaviira</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-gold-primary ${location.pathname === link.path ? 'text-gold-primary neon-gold' : 'text-white/70'}`}
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
