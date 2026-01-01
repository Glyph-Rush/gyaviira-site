import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-impact text-gold-primary mb-12 tracking-wide">About Us</h1>

                    <div className="bg-black-soft p-8 md:p-14 rounded-xl border border-gray-900 shadow-2xl relative overflow-hidden group text-justify">
                        {/* Decorative background glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dark via-gold-primary to-gold-dark"></div>
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl group-hover:bg-gold-primary/10 transition-all duration-1000"></div>

                        <div className="space-y-8 text-gray-300 font-light leading-relaxed text-lg font-body relative z-10">
                            <p>
                                <span className="text-gold-primary font-heading text-2xl font-bold block mb-4 text-center">The <span className="font-cursive text-4xl">Gyaviira</span> Music Foundation</span>
                                was created to honor the timeless power of music as both heritage and future. Rooted in faith, legacy, and creativity, we exist to preserve cultural traditions while inspiring new generations of artists to find their voice.
                            </p>

                            <p>
                                Our mission is to bridge rhythm and truth, offering education, performance, and artistry that uplift communities and celebrate the spirit of harmony. Through the God‑given ability of instruments and voices, we are committed to reaching the gospel to the world—sharing music not only as a memory of the past but as a living anthem of hope for tomorrow.
                            </p>

                            <p>
                                We believe that music is more than sound—it is a language of the soul, a vessel of unity, and a force that transcends boundaries. From traditional rhythms that carry the wisdom of our ancestors to contemporary compositions that speak to the challenges of today, we embrace music as a bridge between generations.
                            </p>

                            <p>
                                At <span className="font-cursive text-gold-primary text-xl">Gyaviira</span>, we nurture talent by providing opportunities for learning, mentorship, and performance. Our programs encourage young artists to explore their gifts, refine their skills, and discover the deeper meaning of their art. We also work to preserve cultural heritage, ensuring that the songs, instruments, and stories of our communities remain alive and vibrant for future generations.
                            </p>

                            <p>
                                Beyond education, the Foundation is a platform for collaboration and creativity. We bring together musicians, composers, and visionaries to create works that inspire change, heal hearts, and glorify God. Every note played and every voice lifted is part of a greater mission: to remind the world that music is not only entertainment, but a divine calling to truth, love, and hope.
                            </p>

                            <p>
                                Through concerts, workshops, and outreach initiatives, we strive to make music accessible to all—whether in schools, churches, or community spaces. We envision a world where every child has the chance to hold an instrument, every community can hear its own songs celebrated, and every generation can find strength in the harmony of faith and creativity.
                            </p>

                            <div className="pt-8 border-t border-gray-800 mt-8">
                                <p className="font-impact text-2xl md:text-3xl text-gold-light text-center uppercase tracking-wider">
                                    The <span className="font-cursive text-gold-primary capitalize">Gyaviira</span> Music Foundation stands as a beacon of inspiration, carrying forward the legacy of music as heritage while boldly shaping its future. Together, we sing not only for ourselves, but for the world—for unity, for joy, and for the eternal rhythm of hope.
                                </p>
                            </div>

                            {/* Leadership Frames */}
                            <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
                                {/* Founder Frame */}
                                <div className="flex flex-col items-center group/frame">
                                    <div className="w-64 h-80 bg-[#111] border-2 border-gold-primary/30 rounded-lg relative flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover/frame:border-gold-primary group-hover/frame:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500">
                                        <div className="absolute inset-2 border border-gold-primary/20 rounded-sm"></div>
                                        <User size={64} className="text-gray-600 group-hover/frame:text-gold-primary transition-colors duration-500" />

                                        {/* Corner Decorations */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-primary/50"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-primary/50"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-primary/50"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-primary/50"></div>
                                    </div>
                                    <h3 className="mt-6 text-2xl font-heading text-gold-primary font-bold tracking-widest uppercase">Founder & CEO</h3>
                                </div>

                                {/* Co-Founder Frame */}
                                <div className="flex flex-col items-center group/frame">
                                    <div className="w-64 h-80 bg-[#111] border-2 border-gold-primary/30 rounded-lg relative flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover/frame:border-gold-primary group-hover/frame:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500">
                                        <div className="absolute inset-2 border border-gold-primary/20 rounded-sm"></div>
                                        <User size={64} className="text-gray-600 group-hover/frame:text-gold-primary transition-colors duration-500" />

                                        {/* Corner Decorations */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-primary/50"></div>
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-primary/50"></div>
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-primary/50"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-primary/50"></div>
                                    </div>
                                    <h3 className="mt-6 text-2xl font-heading text-gold-primary font-bold tracking-widest uppercase">Co-Founder & Manager</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
