import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Music, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/store_desktop.png';

const Home: React.FC = () => {
    return (
        <div className="bg-black-main min-h-screen text-white overflow-hidden">
            {/* Animated Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax-like movement */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={heroBg}
                        alt="Gyaviira Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
                </motion.div>

                {/* Floating Particles/Shapes */}
                <div className="absolute inset-0 z-1 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight
                            }}
                            animate={{
                                opacity: [0, 0.5, 0],
                                y: [null, Math.random() * -100],
                                scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            className="absolute w-1 h-1 bg-gold-primary rounded-full blur-[1px]"
                        />
                    ))}
                </div>

                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex items-center justify-center gap-2 mb-6"
                    >
                        <div className="h-px w-8 md:w-12 bg-gold-primary/40"></div>
                        <h2 className="text-gold-primary text-[10px] md:text-sm font-mono tracking-[0.5em] uppercase">
                            The Official Foundation
                        </h2>
                        <div className="h-px w-8 md:w-12 bg-gold-primary/40"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="relative inline-block"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-black text-white mb-6 tracking-tight leading-none">
                            <span className="relative z-10">Gyaviira</span>
                            <motion.span
                                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 text-gold-primary/20 blur-xl select-none"
                            >
                                Gyaviira
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-mono uppercase tracking-[0.3em]">
                            Music <span className="text-gold-primary mx-2">/</span> Legacy <span className="text-gold-primary mx-2">/</span> Faith
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4">
                            <Link to="/store" aria-label="Navigate to Official Merchandise Store" className="group relative px-10 py-4 bg-gold-primary text-black rounded-full font-heading font-bold uppercase tracking-widest overflow-hidden transition-all hover:shadow-gold hover:scale-105">
                                <span className="relative z-10 flex items-center gap-2">
                                    Check The Store <ArrowRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link to="/about" aria-label="Learn more about our Mission" className="px-10 py-4 border border-gold-primary/30 text-gold-primary rounded-full font-heading font-bold uppercase tracking-widest hover:bg-gold-primary/5 hover:border-gold-primary transition-all">
                                Our Mission
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black-main to-transparent z-20"></div>
            </section>

            {/* Impact/Stats Section */}
            <section className="py-24 bg-black-main relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-gold-primary/50 to-transparent"></div>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {[
                            { label: 'Site Visits', value: '500', suffix: '+', icon: <Zap size={16} /> },
                            { label: 'Community Members', value: '150', suffix: '+', icon: <Heart size={16} /> },
                            { label: 'Sonic Transmissions', value: '∞', suffix: '', icon: <Music size={16} /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="flex justify-center mb-4 text-gold-primary/40 group-hover:text-gold-primary transition-colors">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl md:text-6xl font-impact text-gold-primary mb-2 shadow-gold whitespace-nowrap">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Teaser: Community Voice */}
            <section className="py-24 bg-black-soft relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-heading text-white mb-6 uppercase tracking-wider">The Community <span className="text-gold-primary">Voice</span></h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light italic">
                                "The rhythm of the foundation is directed by the pulse of its members. Every frequency matters in the symphony of our legacy."
                            </p>
                            <Link to="/polls" className="flex items-center gap-3 text-gold-primary font-mono text-sm uppercase tracking-widest hover:gap-5 transition-all">
                                Participate in Polls <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 aspect-video bg-gradient-to-br from-gold-primary/10 to-transparent rounded-[2.5rem] border border-gold-primary/20 flex items-center justify-center relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gold-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Sparkles className="text-gold-primary/20 group-hover:text-gold-primary/50 transition-colors" size={80} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
