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
            title: "Mission",
            content: "To bridge rhythm and truth, offering education, performance, and artistry that uplift communities and celebrate the spirit of harmony.",
            delay: 0.1
        },
        {
            title: "Vision",
            content: "A world where every child has the chance to hold an instrument and every community can hear its own songs celebrated.",
            delay: 0.2
        },
        {
            title: "Goals",
            points: [
                "Empower 10,000 young musicians through mentorship.",
                "Preserve and document 50+ traditional rhythms.",
                "Build a global community of faith-rooted artists."
            ],
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
                    <h1 className="text-6xl md:text-8xl font-impact text-gold-primary mb-6 tracking-tighter uppercase">Our Legacy</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">Building the future on the rhythm of truth.</p>
                </motion.div>

                {/* Main Content Card */}
                <div className="bg-black-soft p-8 md:p-16 rounded-2xl border border-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden mb-20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                        <div className="lg:col-span-12 space-y-10 text-gray-300 font-light leading-relaxed text-lg font-body text-justify">
                            <p className="text-2xl md:text-3xl font-heading text-white text-center leading-tight mb-12">
                                <span className="text-gold-primary">The <span className="font-cursive text-5xl">Gyaviira</span> Music Foundation</span> was created to honor the timeless power of music as both heritage and future.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <p>
                                    Rooted in faith, legacy, and creativity, we exist to preserve cultural traditions while inspiring new generations of artists to find their voice. Our mission is to bridge rhythm and truth, offering education, performance, and artistry that uplift communities and celebrate the spirit of harmony.
                                </p>
                                <p>
                                    Through the God‑given ability of instruments and voices, we are committed to reaching the gospel to the world—sharing music not only as a memory of the past but as a living anthem of hope for tomorrow. We believe music is more than sound—it is a language of the soul.
                                </p>
                            </div>

                            <p className="bg-gold-primary/5 p-8 rounded-lg border-l-4 border-gold-primary italic text-xl">
                                "At Gyaviira, we nurture talent by providing opportunities for learning, mentorship, and performance. We envision a world where every child has the chance to hold an instrument and every community can hear its own songs celebrated."
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <p>
                                    Beyond education, the Foundation is a platform for collaboration and creativity. We bring together musicians, composers, and visionaries to create works that inspire change, heal hearts, and glorify God. Every note played and every voice lifted is part of a greater mission.
                                </p>
                                <p>
                                    Through concerts, workshops, and outreach initiatives, we strive to make music accessible to all. We stand as a beacon of inspiration, carrying forward the legacy of music as heritage while boldly shaping its future. Together, we sing for the world—for unity, for joy, and for the eternal rhythm of hope.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission, Vision, Goals Section */}
                <div className="mb-32">
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

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-[#111] to-black p-16 rounded-2xl border border-gold-primary/20 relative"
                >
                    <div className="absolute inset-0 bg-gold-primary/5 blur-3xl rounded-full"></div>
                    <h2 className="text-4xl md:text-5xl font-impact text-white mb-6 relative z-10 tracking-widest uppercase">Join Our Movement</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg relative z-10">
                        Help us spread the message of hope and preservation. Whether through talent, support, or prayer, you have a place in the legacy.
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
