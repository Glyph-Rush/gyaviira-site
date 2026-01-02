import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

const instruments = [
    {
        id: 1,
        name: 'Heritage Kora',
        price: '$450.00',
        category: 'String',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1516057747705-0609711c1b3f?q=80&w=1974'
    },
    {
        id: 2,
        name: 'Foundation Djembe',
        price: '$180.00',
        category: 'Percussion',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070'
    },
    {
        id: 3,
        name: 'Echoes Flute',
        price: '$75.00',
        category: 'Wind',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1573510317513-390494df056b?q=80&w=2070'
    },
    {
        id: 4,
        name: 'Rhythm Kalimba',
        price: '$60.00',
        category: 'Percussion',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=2070'
    },
];

const Instruments: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
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
                                    <span className="bg-gold-primary/90 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
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
                                <button className="btn w-full flex items-center justify-center gap-3">
                                    <ShoppingCart size={20} />
                                    ACQUIRE INSTRUMENT
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Instruments;
