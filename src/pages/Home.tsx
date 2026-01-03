import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const { allUsers } = useAuth();
    const [visits, setVisits] = useState(0);

    useEffect(() => {
        const currentVisits = parseInt(localStorage.getItem('gyaviira_visits') || '25432');
        const newVisits = currentVisits + 1;
        localStorage.setItem('gyaviira_visits', newVisits.toString());
        setVisits(newVisits);
    }, []);

    return (
        <div className="bg-black-main min-h-screen text-white">
            <Hero />

            {/* Impact/Stats Section */}
            <section className="py-20 bg-black-main relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent"></div>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Site Visits', value: visits, suffix: '+' },
                            { label: 'Purchases', value: 1248, suffix: '' },
                            { label: 'Accounts', value: allUsers.length, suffix: '' },
                            { label: 'Transmissions', value: 89, suffix: 'K' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-impact text-gold-primary mb-2 shadow-gold whitespace-nowrap">
                                    {stat.value.toLocaleString()}{stat.suffix}
                                </div>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
