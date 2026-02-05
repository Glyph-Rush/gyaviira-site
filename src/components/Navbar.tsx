import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/gyaviira_gold.png';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const [mobileExtensionsOpen, setMobileExtensionsOpen] = useState(false);

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
    { name: 'Home', path: '/', external: false },
    { name: 'About', path: '/about', external: false },
    { name: 'Store', path: '/store', external: false },
    { name: 'Chat', path: '/chat', external: false },
    { name: 'Polls', path: '/polls' },
    { name: 'Calendar', path: '/events', external: false },
    { name: 'Journal', path: '/blog', external: false },
    { name: 'Gallery', path: '/gallery', external: false },
    { name: 'Instruments', path: '/instruments', external: false },
    {
      name: 'Extensions',
      path: '/extensions',
      external: false,
      dropdown: [
        { name: 'Game Hub', path: '/games', external: false },
        { name: 'Metronome', path: '/extensions/metronome', external: false },
        { name: 'Chord Library', path: '/extensions/chords', external: false },
        { name: 'Lyric Pad', path: '/extensions/lyrics', external: false },
        { name: 'Tuner Suite', path: '/extensions/tuner', external: false }
      ]
    },
    { name: 'Newsletter', path: '/newsletter', external: false },
    { name: 'Contact', path: '/contact', external: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-card py-4 bg-black/80' : 'bg-transparent py-6'}`}>
      <div className="px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Gyaviira Logo" className="h-16 md:h-20 border-transparent" />
          <span className="text-3xl md:text-4xl font-cursive text-gold-primary font-bold tracking-wider hidden sm:block drop-shadow-md group-hover:text-gold-primary transition-colors">Gyaviira</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => (
            link.dropdown ? (
              <div key={link.name} className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all duration-300 hover:text-gold-primary text-white/70 group-hover:text-gold-primary">
                  {link.name} <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="glass-card bg-black/95 border border-gold-primary/20 rounded-xl overflow-hidden p-2 flex flex-col gap-1 shadow-2xl">
                    {link.dropdown.map((sub) => (
                      sub.external ? (
                        <a key={sub.name} href={sub.path} className="block px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-gold-primary hover:bg-white/5 rounded-lg transition-all text-center">
                          {sub.name}
                        </a>
                      ) : (
                        <Link key={sub.name} to={sub.path} className={`block px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 rounded-lg transition-all text-center ${location.pathname === sub.path ? 'text-gold-primary neon-gold' : 'text-white/70 hover:text-gold-primary'}`}>
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  className={`text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all duration-300 hover:text-gold-primary text-white/70`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all duration-300 hover:text-gold-primary ${location.pathname === link.path ? 'text-gold-primary neon-gold' : 'text-white/70'}`}
                >
                  {link.name}
                </Link>
              )
            )
          ))}
          <div className="h-4 w-px bg-white/10 mx-2 hidden xl:block"></div>

          <div className="flex items-center gap-4">
            <Link to="/store" className="text-white hover:text-gold-primary transition-colors p-2 relative group">
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-primary text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gold-primary"
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
            className="lg:hidden bg-black border-t border-gold-dark/20 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8 gap-6 px-6">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.name} className="flex flex-col items-center w-full">
                    <button
                      onClick={() => setMobileExtensionsOpen(!mobileExtensionsOpen)}
                      className="text-lg font-heading text-white hover:text-gold-primary tracking-widest flex items-center gap-2"
                    >
                      {link.name} <ChevronDown size={16} className={`transition-transform duration-300 ${mobileExtensionsOpen ? 'rotate-180 text-gold-primary' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExtensionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-4 mt-4 w-full bg-white/5 rounded-2xl"
                        >
                          {link.dropdown.map(sub => (
                            sub.external ? (
                              <a key={sub.name} href={sub.path} className="py-3 text-center text-sm font-mono text-gray-400 uppercase tracking-widest hover:text-white">
                                {sub.name}
                              </a>
                            ) : (
                              <Link key={sub.name} to={sub.path} onClick={() => setIsOpen(false)} className="py-3 text-center text-sm font-mono text-gray-400 uppercase tracking-widest hover:text-white">
                                {sub.name}
                              </Link>
                            )
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  link.external ? (
                    <a
                      key={link.name}
                      href={link.path}
                      className="text-lg font-heading text-white hover:text-gold-primary tracking-widest"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-lg font-heading text-white hover:text-gold-primary tracking-widest"
                    >
                      {link.name}
                    </Link>
                  )
                )
              ))}

              <div className="w-full h-px bg-white/5 my-2"></div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
};

export default Navbar;
