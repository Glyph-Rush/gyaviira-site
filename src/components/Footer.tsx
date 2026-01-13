import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/gyaviira_gold.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-white/5 py-12 md:py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={logo}
                                alt="Gyaviira Logo"
                                className="h-16 w-16 rounded-full border-2 border-gold-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            />
                            <span className="text-2xl font-cursive text-gold-primary font-bold tracking-wider">Gyaviira</span>
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
                        <h3 className="text-gold-primary font-impact text-sm uppercase tracking-widest">Community</h3>
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
                            <a href="mailto:support@gyaviira.org" className="text-gray-400 hover:text-gold-primary transition-colors text-sm">
                                Support
                            </a>
                        </div>
                    </div>

                    {/* Legal & Social */}
                    <div className="space-y-4">
                        <h3 className="text-gold-primary font-impact text-sm uppercase tracking-widest">Connect</h3>
                        <div className="flex gap-4 mb-4">
                            <a
                                href="https://instagram.com/gyav.iira"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Gyaviira on Instagram"
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/40 flex items-center justify-center text-gray-400 hover:text-gold-primary transition-all group"
                            >
                                <Instagram size={24} />
                                <span className="ml-2 text-xs font-mono hidden md:inline">@gyav.iira</span>
                            </a>
                            <a
                                href="https://youtube.com/@GyaviiraMusic"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Subscribe to Gyaviira on YouTube"
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-gold-primary/40 flex items-center justify-center text-gray-400 hover:text-gold-primary transition-all group"
                            >
                                <Youtube size={24} />
                            </a>
                        </div>
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
                        <span className="font-mono">Est. 2026 | Luganda Pop Movement</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
