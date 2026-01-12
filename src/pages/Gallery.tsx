import React from 'react';
import { motion } from 'framer-motion';

const images = [
    { url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070', title: 'Musical Heritage' },
    { url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070', title: 'Traditional Rhythms' },
    { url: '/brain/4b5dc652-d3bf-4826-9300-41702f6ae61e/community_concert_1767467391861.png', title: 'Community Concert' },
    { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070', title: 'Youth Mentorship' },
    { url: '/brain/4b5dc652-d3bf-4826-9300-41702f6ae61e/artistry_in_motion_1767467362729.png', title: 'Artistry in Motion' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070', title: 'Faith-Rooted Performance' },
    { url: '/brain/4b5dc652-d3bf-4826-9300-41702f6ae61e/abstract_harmony_1767467412157.png', title: 'Abstract Harmony' },
    { url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069', title: 'Sonic Textures' },
    { url: '/brain/4b5dc652-d3bf-4826-9300-41702f6ae61e/live_energy_1767467426931.png', title: 'Live Energy' },
    { url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070', title: 'Collective Pulse' },
    { url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070', title: 'Rhythmic Shadows' },
    { url: '/brain/4b5dc652-d3bf-4826-9300-41702f6ae61e/gilded_vibrations_1767467443552.png', title: 'Gilded Vibrations' },
];

const Gallery: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-impact text-gold-primary mb-6 tracking-tighter uppercase neon-gold">Gallery</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">Capturing the rhythm of our legacy.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="relative group overflow-hidden rounded-2xl glass-card border border-gold-primary/20 aspect-square"
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h3 className="text-2xl font-impact text-gold-primary tracking-widest uppercase mb-2">
                                    {img.title}
                                </h3>
                                <div className="h-0.5 w-12 bg-gold-primary"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
