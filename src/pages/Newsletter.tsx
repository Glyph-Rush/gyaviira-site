import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-transparent">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 md:p-20 rounded-3xl border border-gold-primary/20 relative overflow-hidden text-center"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"></div>

                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h1 className="text-5xl md:text-7xl font-impact text-gold-primary mb-6 tracking-tighter uppercase neon-gold">Join the Pulse</h1>
                                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                    Subscribe to our futuristic transmission. Be first to hear about new compositions, mentorship programs, and cultural events.
                                </p>

                                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto relative z-10">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="INPUT FREQUENCY (EMAIL)"
                                        required
                                        className="flex-1 bg-black/50 border border-gold-primary/30 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold-primary transition-all font-mono"
                                    />
                                    <button
                                        type="submit"
                                        className="btn px-10 py-4 flex items-center justify-center gap-2 group"
                                    >
                                        TRANSMIT
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6 py-10"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 10 }}
                                    className="w-24 h-24 bg-gold-primary/20 rounded-full flex items-center justify-center mx-auto text-gold-primary"
                                >
                                    <CheckCircle size={48} />
                                </motion.div>
                                <h2 className="text-4xl font-impact text-gold-primary tracking-widest uppercase">Connection Established</h2>
                                <p className="text-gray-400 text-lg font-light">
                                    Your frequency has been registered. Welcome to the legacy.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-gold-primary uppercase tracking-widest text-sm font-bold border-b border-gold-primary/30 hover:border-gold-primary transition-all pb-1"
                                >
                                    TRANSMIT ANOTHER
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Newsletter;
