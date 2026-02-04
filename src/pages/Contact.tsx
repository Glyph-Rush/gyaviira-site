import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Send, Share2, Terminal, Shield, Cpu } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="pt-24 pb-20 relative overflow-hidden flex flex-col min-h-screen">
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 flex-grow">
                {/* Protocol Header */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 40 }}
                            className="h-[1px] bg-gold-primary"
                        ></motion.div>
                        <span className="text-gold-primary font-mono text-xs tracking-[0.3em] uppercase animate-pulse">Encryption Level: OMEGA</span>
                    </div>

                    <div className="relative inline-block">
                        <h1
                            className="text-6xl md:text-9xl font-impact text-white tracking-tighter uppercase mb-4 glitch-text"
                            data-text="CONTACT"
                        >
                            CONTACT
                        </h1>
                        <div className="absolute -right-12 top-0 flex flex-col gap-1">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="h-[2px] w-8 bg-gold-primary/40 origin-left"
                                ></motion.div>
                            ))}
                        </div>
                    </div>
                    <p className="text-gold-primary/60 text-lg font-mono uppercase tracking-widest max-w-xl">
                        Sector: Zephyros 01 // Transmission Protocol: Secure
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Communication Channels */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-12">
                        <div className="relative p-8 glass-card rounded-2xl border-l-4 border-l-gold-primary">
                            <div className="scanline-glitch opacity-30"></div>
                            <h2 className="text-2xl font-impact text-gold-primary mb-6 flex items-center gap-3">
                                <Terminal size={24} />
                                RESONANCE CHANNELS
                            </h2>
                            <div className="space-y-6">
                                <a href="https://instagram.com/gyav.iira" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold-primary/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary group-hover:scale-110 transition-transform">
                                            <Instagram size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Protocol: Visual</p>
                                            <p className="text-white font-impact tracking-widest text-lg">@GYAV.IIRA</p>
                                        </div>
                                    </div>
                                    <Share2 size={16} className="text-gold-primary/40 group-hover:text-gold-primary transition-colors" />
                                </a>

                                <a href="https://youtube.com/@GyaviiraMusic" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-gold-primary/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary group-hover:scale-110 transition-transform">
                                            <Youtube size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Protocol: Sonic</p>
                                            <p className="text-white font-impact tracking-widest text-lg">GYAVIIRA MUSIC</p>
                                        </div>
                                    </div>
                                    <Share2 size={16} className="text-gold-primary/40 group-hover:text-gold-primary transition-colors" />
                                </a>
                            </div>

                            {/* Signal Strength Badge */}
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-gold-primary' : 'bg-gray-800'}`}></div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono text-gold-primary/40 tracking-[0.2em]">SIGNAL STRENGTH: 94%</span>
                            </div>
                        </div>

                        {/* System Status Portal */}
                        <div className="p-8 glass-card rounded-2xl border-l-4 border-l-red-500/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-red-500/10 rounded-xl text-red-500 animate-pulse">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="text-red-500 font-impact tracking-widest text-lg uppercase">System Alert</h4>
                                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Protocol Sync Failure</p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 italic">
                                "Official support channels are currently undergoing maintenance. Use standby frequencies below."
                            </p>
                            <div className="space-y-4">
                                <div className="p-4 bg-black/60 border border-white/5 rounded-xl hover:border-gold-primary/30 transition-colors">
                                    <p className="text-[8px] font-mono text-gray-500 uppercase mb-1">Founder Direct</p>
                                    <p className="text-gold-primary font-mono text-xs truncate">jeromemoses220@gmail.com</p>
                                </div>
                                <div className="p-4 bg-black/60 border border-white/5 rounded-xl hover:border-gold-primary/30 transition-colors">
                                    <p className="text-[8px] font-mono text-gray-500 uppercase mb-1">Marketing Lead</p>
                                    <p className="text-gold-primary font-mono text-xs truncate">nyemerajosiah12@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: The Uplink Form */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <div className="relative glass-card p-10 md:p-16 rounded-[2rem] border border-white/5 group">
                            <div className="scanline-glitch opacity-10"></div>
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-primary/40 rounded-tl-3xl"></div>
                            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-primary/40 rounded-tr-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold-primary/40 rounded-bl-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold-primary/40 rounded-br-3xl"></div>

                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary flex items-center justify-center text-black">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-impact text-white tracking-widest uppercase">Direct Transmission</h2>
                                    <p className="text-gold-primary/40 font-mono text-[10px] tracking-[0.2em]">BUFFER: 100% // STATUS: READY</p>
                                </div>
                            </div>

                            <form className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group/field">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2 mb-2 block group-focus-within/field:text-gold-primary transition-colors italic">Identification (Name)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="ENTER SUBJECT"
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm tracking-widest uppercase placeholder:opacity-30"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-gold-primary/0 pointer-events-none group-focus-within/field:border-gold-primary/30 transition-all"></div>
                                        </div>
                                    </div>
                                    <div className="group/field">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2 mb-2 block group-focus-within/field:text-gold-primary transition-colors italic">Return Signal (Email)</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="ENTER FREQUENCY"
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm tracking-widest uppercase placeholder:opacity-30"
                                            />
                                            <div className="absolute inset-0 rounded-2xl border border-gold-primary/0 pointer-events-none group-focus-within/field:border-gold-primary/30 transition-all"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group/field">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-2 mb-2 block group-focus-within/field:text-gold-primary transition-colors italic">Payload Data (Message)</label>
                                    <div className="relative">
                                        <textarea
                                            rows={6}
                                            placeholder="INPUT TRANSMISSION DATA..."
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-gold-primary transition-all font-mono text-sm tracking-widest uppercase placeholder:opacity-30 resize-none"
                                        ></textarea>
                                        <div className="absolute inset-0 rounded-2xl border border-gold-primary/0 pointer-events-none group-focus-within/field:border-gold-primary/30 transition-all"></div>
                                    </div>
                                </div>
                                <button className="w-full bg-gold-primary text-black py-6 rounded-2xl font-impact text-xl tracking-[0.4em] group/btn overflow-hidden relative transition-transform active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        INITIALIZE UPLINK
                                        <Send size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-all duration-500" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
