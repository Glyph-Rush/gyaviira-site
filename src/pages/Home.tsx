import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
    return (
        <div className="bg-black-main min-h-screen text-white">
            <Hero />

            {/* Official Merchandise Preview */}
            <section className="py-20 bg-black-soft">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">Official Merchandise</h2>
                        <div className="w-24 h-1 bg-gold-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Merch placeholders */}
                        {[1, 2, 3].map((item) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-black-main border border-gray-800 p-4 rounded-lg group cursor-pointer"
                            >
                                <div className="aspect-square bg-gray-900 mb-4 flex items-center justify-center overflow-hidden">
                                    <span className="text-gray-600">See Store</span>
                                </div>
                                <h3 className="text-xl font-heading text-gold-light group-hover:text-gold-primary">Premium Collection Item {item}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
