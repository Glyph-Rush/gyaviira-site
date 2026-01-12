import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Globe, Music, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import storeMobile from '../assets/store_mobile.png';

const About: React.FC = () => {
    const values = [
        { icon: <Heart className="text-gold-primary" size={32} />, title: "Faith Rooted", desc: "Our foundation is built on spiritual principles and a commitment to the Gospel." },
        { icon: <Music className="text-gold-primary" size={32} />, title: "Musical Excellence", desc: "We strive for the highest quality in composition, performance, and education." },
        { icon: <Globe className="text-gold-primary" size={32} />, title: "Cultural Preservation", desc: "Honoring our ancestors by keeping traditional rhythms and stories alive." },
        { icon: <Users className="text-gold-primary" size={32} />, title: "Empowering Talent", desc: "Providing mentorship and platforms for the next generation of creative visionaries." },
    ];

    interface PillarItem {
        title: string;
        content?: string;
        points?: string[];
        delay: number;
    }

    const pillars: PillarItem[] = [
        {
            title: "Music",
            content: "Original compositions that fuse cinematic, spiritual, and anthemic genres.",
            delay: 0.1
        },
        {
            title: "Merch",
            content: "Carefully designed apparel and accessories that embody Gyaviira’s identity, crafted with attention to detail and authenticity.",
            delay: 0.2
        },
        {
            title: "Community",
            content: "A space for collaboration, creativity, and shared rhythm—where every voice adds to the symphony.",
            delay: 0.3
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-impact text-gold-primary mb-6 tracking-tighter uppercase neon-gold">About Us</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">The heartbeat of a cultural movement.</p>
                </motion.div>

                {/* Intro Section */}
                <div className="glass-card p-8 md:p-16 rounded-3xl border border-gold-primary/20 relative overflow-hidden mb-20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"></div>

                    <div className="grid grid-cols-1 gap-12 items-start relative z-10">
                        <div className="space-y-10 text-gray-300 font-light leading-relaxed text-xl font-body text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-impact text-white tracking-widest uppercase mb-4">
                                About Us – <span className="text-gold-primary neon-gold">Gyaviira</span> Music Foundation
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                                At <span className="text-white font-bold">Gyaviira</span>, we believe music is more than sound—it’s a language of spirit, rhythm, and unity. Born from a vision to blend artistry with authentic symbolism, <span className="text-gold-primary font-bold">Gyaviira</span> is both a creative foundation and a cultural movement.
                            </p>

                            <div className="bg-gold-primary/5 p-10 rounded-2xl border border-gold-primary/20 relative group">
                                <div className="absolute inset-0 bg-gold-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
                                <h2 className="text-3xl font-impact text-gold-primary mb-6 tracking-widest uppercase relative z-10">🎶 Our Mission</h2>
                                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed relative z-10">
                                    We exist to inspire through music, design, and storytelling. From bass guitar and cello compositions to symbolic emblems and merch, every creation carries the heartbeat of <span className="text-gold-primary">Zephyros</span>: a world built on harmony, resilience, and individuality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What We Do Section */}
                <div className="mb-32">
                    <h2 className="text-4xl md:text-5xl font-impact text-white mb-16 text-center tracking-widest uppercase neon-gold">🌍 What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pillars.map((pillar) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: pillar.delay }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="relative h-[400px] group overflow-hidden rounded-2xl border border-gold-primary/20"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${storeMobile})` }}
                                ></div>
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-colors duration-500"></div>
                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end border-t border-gold-primary/0 group-hover:border-gold-primary/30 transition-all duration-500">
                                    <h3 className="text-4xl font-impact text-gold-primary mb-4 tracking-wider uppercase group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all">
                                        {pillar.title}
                                    </h3>
                                    {pillar.content && (
                                        <p className="text-gray-300 font-light leading-relaxed text-lg">
                                            {pillar.content}
                                        </p>
                                    )}
                                    {pillar.points && (
                                        <ul className="space-y-3">
                                            {pillar.points.map((point, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-2 text-gray-300 font-light text-sm">
                                                    <span className="text-gold-primary mt-1">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Decorative Light Effect on Hover */}
                                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-gold-primary/10 via-transparent to-transparent rotate-45"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <h2 className="text-4xl md:text-5xl font-impact text-white mb-16 text-center tracking-widest uppercase">Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 bg-black-soft border border-gray-900 rounded-xl hover:border-gold-primary/30 transition-all group"
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform">{v.icon}</div>
                                <h3 className="text-xl font-heading text-white mb-4 group-hover:text-gold-primary transition-colors">{v.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Leadership Section */}
                <section className="mb-32">
                    <h2 className="text-4xl md:text-5xl font-impact text-white mb-16 text-center tracking-widest uppercase">Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                        {/* Founder Frame */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center group/frame w-full max-w-sm"
                        >
                            <div className="w-full aspect-[3/4] bg-[#0a0a0a] border-2 border-gold-primary/20 rounded-2xl relative flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-700 group-hover/frame:border-gold-primary group-hover/frame:shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                                <div className="absolute inset-4 border border-gold-primary/10 rounded-xl"></div>
                                <div className="w-32 h-32 rounded-full border border-gold-primary/20 flex items-center justify-center bg-gold-primary/5 group-hover/frame:bg-gold-primary/10 transition-all">
                                    <User size={64} className="text-gray-700 group-hover/frame:text-gold-primary transition-colors" />
                                </div>
                                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-2xl font-impact text-gold-primary tracking-widest text-center">FOUNDER & CEO</h3>
                                </div>
                            </div>
                        </motion.div>

                        {/* Co-Founder Frame */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center group/frame w-full max-w-sm"
                        >
                            <div className="w-full aspect-[3/4] bg-[#0a0a0a] border-2 border-gold-primary/20 rounded-2xl relative flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-700 group-hover/frame:border-gold-primary group-hover/frame:shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                                <div className="absolute inset-4 border border-gold-primary/10 rounded-xl"></div>
                                <div className="w-32 h-32 rounded-full border border-gold-primary/20 flex items-center justify-center bg-gold-primary/5 group-hover/frame:bg-gold-primary/10 transition-all">
                                    <User size={64} className="text-gray-700 group-hover/frame:text-gold-primary transition-colors" />
                                </div>
                                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                                    <h3 className="text-2xl font-impact text-gold-primary tracking-widest text-center">CO-FOUNDER & MANAGER</h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Vision Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-[#111] to-black p-16 rounded-3xl border border-gold-primary/20 relative mb-32 glass-card"
                >
                    <div className="absolute inset-0 bg-gold-primary/5 blur-3xl rounded-full"></div>
                    <h2 className="text-4xl md:text-5xl font-impact text-gold-primary mb-8 relative z-10 tracking-widest uppercase neon-gold">✨ Our Vision</h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative z-10 font-light">
                        <span className="text-white font-bold italic">Gyaviira</span> is more than a brand—it’s a foundation for expression. We aim to empower creators, unite listeners, and build a legacy where music and design speak to the soul.
                    </p>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-black-soft p-16 rounded-2xl border border-gray-900 relative"
                >
                    <h2 className="text-4xl md:text-5xl font-impact text-white mb-6 relative z-10 tracking-widest uppercase">Join Our Movement</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg relative z-10">
                        Help us spread the message of hope and preservation. Whether through talent, support, or prayer, you have a place in the symphony.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link to="/contact" className="btn px-10 py-4 flex items-center justify-center gap-3 shadow-gold group">
                            Contact Us
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/store" className="btn-outline px-10 py-4 flex items-center justify-center border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-black transition-all font-heading tracking-widest text-sm uppercase font-bold">
                            Support the Foundation
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
