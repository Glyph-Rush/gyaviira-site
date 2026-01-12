import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Twitter, Facebook, Youtube, Send, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">Get in Touch</h1>
                    <div className="w-24 h-1 bg-gold-primary mx-auto mb-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {/* Email Section */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-black-soft p-10 rounded-lg border border-gray-900 hover:border-gold-primary/50 transition-all group relative overflow-visible"
                        >
                            {/* Error Notification Sign */}
                            <div className="absolute -top-3 -right-3 z-20 group/error">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-red-600 text-white p-1.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-help"
                                >
                                    <AlertCircle size={16} />
                                </motion.div>
                                <div className="absolute right-0 top-8 w-64 bg-black/95 border border-red-500/30 p-4 rounded-xl opacity-0 invisible group-hover/error:opacity-100 group-hover/error:visible transition-all text-[10px] text-gray-300 font-mono leading-relaxed normal-case tracking-wider shadow-2xl z-30">
                                    <p className="text-red-500 font-bold mb-1 uppercase tracking-widest text-[9px]">Transmission Error</p>
                                    Due to certain errors, the official support email is not working. Rather use: <span className="text-white">jeromemoses220@gmail.com</span>
                                </div>
                            </div>

                            <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-primary group-hover:text-black transition-colors text-gold-primary">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-heading text-white mb-2">Email Us</h3>
                            <a href="mailto:jeromemoses220@gmail.com" className="text-gray-400 hover:text-gold-primary transition-colors text-lg">
                                jeromemoses220@gmail.com
                            </a>
                        </motion.div>

                        {/* Socials Section */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-black-soft p-10 rounded-lg border border-gray-900 hover:border-gold-primary/50 transition-all group md:col-span-2"
                        >
                            <h3 className="text-xl font-heading text-white mb-8 border-b border-white/5 pb-4">Social Frequencies</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <a href="https://www.instagram.com/gyav.iira/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 transition-all hover:scale-110 group/item">
                                    <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-black transition-colors">
                                        <Instagram size={24} />
                                    </div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover/item:text-gold-primary">@gyav.iira</span>
                                </a>

                                <a href="https://twitter.com/gyav.iira" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 transition-all hover:scale-110 group/item">
                                    <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-black transition-colors">
                                        <Twitter size={24} />
                                    </div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover/item:text-gold-primary">@gyav.iira</span>
                                </a>

                                <a href="https://facebook.com/gyav.iira" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 transition-all hover:scale-110 group/item">
                                    <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-black transition-colors">
                                        <Facebook size={24} />
                                    </div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover/item:text-gold-primary">@gyav.iira</span>
                                </a>

                                <a href="https://youtube.com/@GyaviiraMusic" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 transition-all hover:scale-110 group/item">
                                    <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center text-gold-primary group-hover/item:bg-gold-primary group-hover/item:text-black transition-colors">
                                        <Youtube size={24} />
                                    </div>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest group-hover/item:text-gold-primary">@GyaviiraMusic</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden text-left"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"></div>

                            <h3 className="text-2xl font-impact text-white mb-8 tracking-widest uppercase text-center">Transmit a <span className="text-gold-primary neon-gold">Direct Message</span></h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2">Subject Name</label>
                                        <input
                                            type="text"
                                            placeholder="ENTER NAME"
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2">Return Frequency (Email)</label>
                                        <input
                                            type="email"
                                            placeholder="ENTER EMAIL"
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2">Transmission Data (Message)</label>
                                    <textarea
                                        rows={5}
                                        placeholder="INPUT YOUR MESSAGE HERE..."
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm resize-none"
                                    ></textarea>
                                </div>
                                <button className="btn w-full py-5 text-sm font-impact tracking-[0.3em] group relative overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        INITIALIZE UPLINK
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold-primary to-gold-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
