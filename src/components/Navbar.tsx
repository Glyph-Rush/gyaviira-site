import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Settings, MessageSquare, ChevronDown, Shield, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/gyaviira_gold.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

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
    { name: 'Games', path: '/games' },
    { name: 'Newsletter', path: '/newsletter' },
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
        <div className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] xl:text-xs font-bold uppercase tracking-[0.15em] xl:tracking-[0.2em] transition-all duration-300 hover:text-gold-primary ${location.pathname === link.path ? 'text-gold-primary neon-gold' : 'text-white/70'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2 hidden xl:block"></div>

          <Link to="/store" className="text-white hover:text-gold-primary transition-colors p-2 relative group">
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-primary text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-gold-primary/60">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-gold-primary" />
                  )}
                </div>
                <ChevronDown size={14} className={`text-gold-primary transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 glass-card bg-black/95 border border-gold-primary/20 rounded-[1.5rem] shadow-2xl p-4 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Signal: Active</p>
                        <div className="flex items-center gap-2 overflow-hidden">
                          <p className="text-xs font-bold text-white uppercase tracking-widest truncate">{user.username}</p>
                          {(user.isVerified || user.role === 'admin') && <BadgeCheck size={14} className="text-gold-primary flex-shrink-0" />}
                          {user.role === 'admin' && <span className="bg-gold-primary text-black text-[7px] px-1.5 py-0.5 rounded-md font-bold tracking-tighter shadow-sm flex-shrink-0">ADMIN</span>}
                        </div>
                      </div>

                      <div className="space-y-1">
                        {user.role === 'admin' && (
                          <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-primary/10 text-gold-primary border border-gold-primary/20 hover:bg-gold-primary hover:text-black transition-all">
                            <Shield size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Overseer Panel</span>
                          </Link>
                        )}
                        <Link to="/account" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold-primary/10 text-white/70 hover:text-gold-primary transition-all">
                          <Settings size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Account Settings</span>
                        </Link>
                        <Link to="/chat" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold-primary/10 text-white/70 hover:text-gold-primary transition-all">
                          <MessageSquare size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Community Chat</span>
                        </Link>
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-white/70 hover:text-red-500 transition-all border-t border-white/5 mt-2"
                        >
                          <LogOut size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Disconnect</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth" className="btn-gold py-2 px-6 text-[10px] font-bold tracking-widest uppercase">
              Login
            </Link>
          )}
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
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg font-heading text-white hover:text-gold-primary tracking-widest"
                >
                  {link.name}
                </Link>
              ))}

              <div className="w-full h-px bg-white/5 my-2"></div>

              {user ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center overflow-hidden">
                      {user.profilePic ? <img src={user.profilePic} className="w-full h-full object-cover" /> : <User size={24} className="text-gold-primary" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-white uppercase tracking-widest truncate">{user.username}</p>
                        {(user.isVerified || user.role === 'admin') && <BadgeCheck size={14} className="text-gold-primary" />}
                        {user.role === 'admin' && <span className="bg-gold-primary text-black text-[7px] px-1.5 py-0.5 rounded-md font-bold tracking-tighter">ADMIN</span>}
                      </div>
                      <p className="text-[10px] font-mono text-gold-primary uppercase tracking-widest">{user.role === 'admin' ? 'Overseer' : 'Active Signal'}</p>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center justify-center gap-3 w-full py-4 bg-gold-primary/10 text-gold-primary border border-gold-primary/30 rounded-2xl uppercase text-xs font-bold tracking-widest">
                      <Shield size={16} /> Overseer Panel
                    </Link>
                  )}
                  <Link to="/account" className="flex items-center justify-center gap-3 w-full py-4 text-white hover:text-gold-primary border border-white/5 rounded-2xl uppercase text-xs font-bold tracking-widest">
                    <Settings size={16} /> Account Hub
                  </Link>
                  <Link to="/chat" className="flex items-center justify-center gap-3 w-full py-4 text-white hover:text-gold-primary border border-white/5 rounded-2xl uppercase text-xs font-bold tracking-widest">
                    <MessageSquare size={16} /> Community Chat
                  </Link>
                  <button onClick={logout} className="flex items-center justify-center gap-3 w-full py-4 text-red-500 border border-red-500/20 rounded-2xl uppercase text-xs font-bold tracking-widest">
                    <LogOut size={16} /> Disconnect
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="w-full btn-gold py-4 text-center text-xs font-bold tracking-widest uppercase">
                  Initialize Authentication
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
