import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import assets
import cap1 from '../assets/cap_1.png';
import cap2 from '../assets/cap_2.png';
import cap3 from '../assets/cap_3.png';
import hoodie1 from '../assets/hoodie_1.png';
import hoodie2 from '../assets/hoodie_2.png';
import shirt1 from '../assets/shirt_1.png';
import shirt2 from '../assets/shirt_2.png';
import downloadMenu from '../assets/download_menu.png';

type Category = 'All' | 'Outerwear' | 'Head' | 'Shirts';

const products = [
    { id: 1, name: 'Signature Gold Cap', price: '$25.00', image: cap1, category: 'Head' },
    { id: 2, name: 'Classic Black Cap', price: '$25.00', image: cap2, category: 'Head' },
    { id: 3, name: 'Urban Snapback', price: '$25.00', image: cap3, category: 'Head' },
    { id: 4, name: 'Foundation Hoodie', price: '$55.00', image: hoodie1, category: 'Outerwear' },
    { id: 5, name: 'Gold Crest Hoodie', price: '$55.00', image: hoodie2, category: 'Outerwear' },
    { id: 6, name: 'Event Tee', price: '$30.00', image: shirt1, category: 'Shirts' },
    { id: 7, name: 'Member Tee', price: '$30.00', image: shirt2, category: 'Shirts' },
];

const Store: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-heading text-white mb-4">Foundation Store</h1>
                    <p className="text-gray-400 text-lg mb-10">Wear the legacy. Support the mission.</p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {['All', 'Outerwear', 'Head', 'Shirts'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category as Category)}
                                className={`px-6 py-2 rounded-full border border-gold-primary transition-all duration-300 font-heading text-sm uppercase tracking-wider
                                    ${selectedCategory === category
                                        ? 'bg-gold-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                                        : 'bg-transparent text-gold-primary hover:bg-gold-primary/10'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -10, boxShadow: '0 20px 40px -20px rgba(212,175,55,0.2)' }}
                                className="bg-black-soft rounded-xl overflow-hidden group border border-gray-900 hover:border-gold-primary transition-all duration-500 relative"
                            >
                                <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 flex items-center justify-center relative overflow-hidden">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gold-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 drop-shadow-xl transition-transform duration-500 z-10"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                                        <button className="btn transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 bg-[#111] border-t border-gray-900">
                                    <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-2">{product.category}</span>
                                    <h3 className="text-xl font-heading text-white group-hover:text-gold-primary transition-colors">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-lg font-bold text-white/90">{product.price}</p>
                                        <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all">
                                            +
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Download Section */}
                <div className="flex justify-center mt-20">
                    <a
                        href={downloadMenu}
                        download="Gyaviira_Official_Flyer.png"
                        className="btn px-10 py-4 flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] animate-pulse"
                    >
                        <span className="font-impact text-xl tracking-widest text-black">DOWNLOAD FLYER</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Store;
