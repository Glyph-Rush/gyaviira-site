import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import logo from '../assets/gyaviira_gold.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-transparent border-t border-white/5 py-12 md:py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={logo}
                                alt="Gyaviira Logo"
                                className="h-16 w-16 border-0 border-gold-primary/30 "
                            />
                            <span className="text-5xl font-cursive text-gold-primary font-bold tracking-wider">Gyaviira</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Empowering communities through faith-rooted music and cultural expression.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-gold-primary font-impact text-sm uppercase tracking-widest">Quick Access</h3>
                        <div className="flex flex-col gap-2">
                            {['About', 'Chat', 'Gallery', 'Merch', 'Games', 'Contact'].map(link => (
                                <Link
                                    key={link}
                                    to={`/${link.toLowerCase()}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="text-gray-400 hover:text-gold-primary transition-colors text-sm"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Community */}
                    <div className="space-y-4">
                        <h3 className="text-gold-primary font-impact text-sm uppercase tracking-widest">Contact</h3>
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/chat"
                                onClick={() => window.scrollTo(0, 0)}
                                className="text-gray-400 hover:text-gold-primary transition-colors text-sm"
                            >
                                Community Chat
                            </Link>
                            <Link
                                to="/newsletter"
                                onClick={() => window.scrollTo(0, 0)}
                                className="text-gray-400 hover:text-gold-primary transition-colors text-sm"
                            >
                                Newsletter
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => window.scrollTo(0, 0)}
                                className="text-gray-400 hover:text-gold-primary transition-colors text-sm"
                            >
                                Support
                            </Link>
                        </div>
                    </div>

                    {/* Legal & Social */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Link to="/privacy" className="text-gray-400 hover:text-gold-primary transition-colors text-xs">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-gold-primary transition-colors text-xs">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest text-center md:text-left">
                        © 2026 Gyaviira Music Foundation. All frequencies reserved.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Music size={14} className="text-gold-primary" />
                        <span className="font-mono">Est. 2025 | Luganda Pop Movement</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
