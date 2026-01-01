import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/store_desktop.png';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
            </div>

            <div className="container relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h2 className="text-gold-primary text-lg md:text-xl font-body tracking-[0.3em] mb-4 uppercase">
                        The Official Foundation
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white mb-6 tracking-wider shadow-gold"
                    style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
                >
                    GYAVIIRA
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-light"
                >
                    Music. Legacy. Faith.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link to="/store" className="btn group flex items-center gap-2">
                        Check The Store
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/about" className="btn-outline px-8 py-3 rounded-sm font-heading uppercase tracking-widest text-sm font-bold border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-black transition-all">
                        Our Mission
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
