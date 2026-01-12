import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    { id: 1, name: 'Gyaviira Gold Cap', price: 5000, image: cap1, category: 'Head' },
    { id: 2, name: 'F.O.F Gold Cap', price: 5000, image: cap2, category: 'Head' },
    { id: 3, name: 'Gyaviira Mono Cap', price: 5000, image: cap3, category: 'Head' },
    { id: 4, name: 'Gyaviira Mono Hoodie', price: 25000, image: hoodie1, category: 'Outerwear' },
    { id: 5, name: 'Gyaviira Gold Hoodie', price: 25000, image: hoodie2, category: 'Outerwear' },
    { id: 6, name: 'Gyaviira Mono T-Shirt', price: 15000, image: shirt1, category: 'Shirts' },
    { id: 7, name: 'Gyaviira Gold T-Shirt', price: 15000, image: shirt2, category: 'Shirts' },
];

const Store: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const { addToCart, itemCount, totalAmount } = useCart();
    const navigate = useNavigate();

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
                    <p className="text-gray-400 text-lg mb-8">Wear the legacy. Support the mission.</p>

                    {/* WIP Banner */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 mb-10">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                        <span className="text-xs font-mono uppercase tracking-widest">Payment System Logic: Manual Processing Active</span>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {['All', 'Outerwear', 'Head', 'Shirts'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category as Category)}
                                className={`px-6 py-2 rounded-xl border border-gold-primary transition-all duration-300 font-heading text-sm uppercase tracking-wider
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
                                className="bg-black-soft rounded-[2rem] overflow-hidden group border border-gray-900 hover:border-gold-primary transition-all duration-500 relative"
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
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="btn transform scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-2"
                                        >
                                            <ShoppingBag size={18} /> Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 bg-[#111] border-t border-gray-900">
                                    <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-2">{product.category}</span>
                                    <h3 className="text-xl font-heading text-white group-hover:text-gold-primary transition-colors">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-lg font-bold text-white/90">UGX {product.price.toLocaleString()}</p>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all"
                                        >
                                            +
                                        </button>
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

                {/* Floating Checkout Button */}
                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6"
                        >
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full glass-card bg-gold-primary text-black p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(212,175,55,0.4)] border border-white/20 flex items-center justify-between group hover:scale-105 transition-transform"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Payload Detected</p>
                                        <p className="font-impact text-xl uppercase tracking-wider">{itemCount} Items Ready</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right mr-2">
                                        <p className="text-[10px] font-mono uppercase tracking-widest opacity-60">Total Valuation</p>
                                        <p className="font-impact text-xl uppercase tracking-wider">UGX {totalAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-gold-primary group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Store;
