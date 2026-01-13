import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import assets
import cap1 from '../assets/cap_1.png';
import hoodie2 from '../assets/hoodie_2.png';
import shirt2 from '../assets/shirt_2.png';
import downloadMenu from '../assets/download_menu.png';

type Category = 'All' | 'Outerwear' | 'Head' | 'Shirts' | 'Instruments' | 'Digital' | 'Bundles';

const products = [
    { id: 1, name: 'Heritage Kora', price: 450, image: '/src/assets/instruments/kora.png', category: 'Instruments', description: 'Premium 21-string West African harp, handcrafted for the master player.' },
    { id: 2, name: 'Foundation Djembe', price: 180, image: '/src/assets/instruments/djembe.png', category: 'Instruments', description: 'Hardwood percussion piece with professional-grade skin and resonant pulse.' },
    { id: 3, name: 'Impact Hoodie', price: 55, image: hoodie2, category: 'Outerwear', description: 'Gold-embroidered heavy cotton, built for the resilient spirit.' },
    { id: 4, name: 'Signature Gold Cap', price: 25, image: cap1, category: 'Head', description: 'The official headwear of the Gyaviira legacy.' },
    { id: 5, name: 'Member T-Shirt', price: 30, image: shirt2, category: 'Shirts', description: 'Premium cotton tee featuring the foundation emblem.' },
    { id: 101, name: 'Genesis Sheet Music', price: 15, image: '/src/assets/digital/sheet_music.png', category: 'Digital', isDigital: true, description: 'Digital score for the Foundation Anthem.' },
    { id: 102, name: 'Echoes of Zephyros', price: 120, image: '/src/assets/bundles/bundle_1.png', category: 'Bundles', isBundle: true, description: 'Limited Edition Bundle: Vinyl + Hoodie + Signed Poster.', isPreorder: true },
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
                        {['All', 'Instruments', 'Outerwear', 'Head', 'Shirts', 'Digital', 'Bundles'].map((category) => (
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
                                            <ShoppingBag size={18} /> {(product as any).isPreorder ? 'RESERVE NOW' : 'Add to Cart'}
                                        </button>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                                        {(product as any).isPreorder && (
                                            <span className="bg-blue-600 text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-lg tracking-widest animate-pulse">PRE-ORDER</span>
                                        )}
                                        {(product as any).isDigital && (
                                            <span className="bg-purple-600 text-white text-[8px] font-bold px-3 py-1 rounded-full shadow-lg tracking-widest">DIGITAL</span>
                                        )}
                                        {(product as any).isBundle && (
                                            <span className="bg-gold-primary text-black text-[8px] font-bold px-3 py-1 rounded-full shadow-lg tracking-widest font-impact">BUNDLE</span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 bg-[#111] border-t border-gray-900">
                                    <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block mb-2">{product.category}</span>
                                    <h3 className="text-xl font-heading text-white group-hover:text-gold-primary transition-colors">{product.name}</h3>
                                    <p className="text-gray-500 text-[10px] mt-1 line-clamp-2">{(product as any).description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-lg font-bold text-white/90">${product.price.toLocaleString()}</p>
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
                                        <p className="font-impact text-xl uppercase tracking-wider">${totalAmount.toLocaleString()}</p>
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
