import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import str_1 from '../assets/str_1.png';
import per_1 from '../assets/per_1.png';
import per_2 from '../assets/per_2.png';
import wnd_1 from '../assets/wnd_1.png';

const instruments = [
    {
        id: 1,
        name: 'Heritage Kora',
        price: 'UGX $450,000',
        category: 'String',
        rating: 5,
        image: str_1
    },
    {
        id: 2,
        name: 'Foundation Djembe',
        price: 'UGX $180,000',
        category: 'Percussion',
        rating: 5,
        image: per_1
    },
    {
        id: 3,
        name: 'Echoes Flute',
        price: 'UGX $750,000',
        category: 'Wind',
        rating: 5,
        image: wnd_1
    },
    {
        id: 4,
        name: 'Rhythm Kalimba',
        price: 'UGX $180,000',
        category: 'Percussion',
        rating: 4,
        image: per_2
    },
];

const Instruments: React.FC = () => {
    const { addToCart, itemCount, totalAmount } = useCart();
    const navigate = useNavigate();
    const [addedId, setAddedId] = React.useState<number | null>(null);

    const handleAddToCart = (item: any) => {
        addToCart(item);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-impact text-gold-primary mb-6 tracking-tighter uppercase neon-gold">Instruments</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">The tools of the divine rhythm.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {instruments.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gold-primary/10 group hover:border-gold-primary/30 transition-all duration-500"
                        >
                            <div className="lg:w-1/2 relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-gold-primary/90 text-black px-4 py-1 rounded-xl text-xs font-bold uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className={i < Math.floor(item.rating) ? "text-gold-primary fill-gold-primary" : "text-gray-600"} />
                                        ))}
                                    </div>
                                    <h3 className="text-3xl font-impact text-white mb-2 tracking-widest uppercase group-hover:text-gold-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-gold-primary text-2xl font-heading mb-6">{item.price}</p>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                                        Handcrafted by master artisans from the Foundation. Each instrument is tuned to the frequency of hope and tradition.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className={`btn w-full flex items-center justify-center gap-3 transition-all duration-300 ${addedId === item.id ? 'bg-green-600 text-white border-green-600' : ''}`}
                                >
                                    {addedId === item.id ? (
                                        <>
                                            <Check size={20} />
                                            ADDED TO CART
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} />
                                            ACQUIRE INSTRUMENT
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Checkout Button Sync with Store */}
                <AnimatePresence>
                    {itemCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.8 }}
                            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-gold-primary text-black rounded-full shadow-[0_0_50px_rgba(212,175,55,0.4)] flex items-center gap-6 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate('/checkout')}
                        >
                            <div className="flex items-center gap-3 border-r border-black/20 pr-6">
                                <ShoppingBag size={20} />
                                <span className="font-impact text-lg uppercase tracking-widest">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-sm opacity-60">TOTAL:</span>
                                <span className="font-heading font-bold">${totalAmount.toLocaleString()}</span>
                                <ArrowRight size={18} className="ml-2" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Instruments;
