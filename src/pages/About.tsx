import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-heading text-gold-primary mb-8">About Us</h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto mb-12"></div>

                    <div className="bg-black-soft p-8 md:p-12 rounded-xl border border-gray-900 shadow-2xl relative overflow-hidden group">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold-primary to-gold-dark"></div>
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl group-hover:bg-gold-primary/10 transition-all duration-1000"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl group-hover:bg-gold-primary/10 transition-all duration-1000"></div>

                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light relative z-10 text-justify">
                            <span className="text-gold-primary font-heading text-2xl font-bold block mb-4 text-center">The Gyaviira Music Foundation</span>
                            was created to honor the timeless power of music as both heritage and future. Rooted in faith, legacy, and creativity, we exist to preserve cultural traditions while inspiring new generations of artists to find their voice.
                            <br /><br />
                            Our mission is to bridge rhythm and truth, offering education, performance, and artistry that uplift communities and celebrate the spirit of harmony. Through the God‑given ability of instruments and voices, we are committed to reaching the gospel to the world—sharing music not only as a memory of the past but as a living anthem of hope for tomorrow.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
