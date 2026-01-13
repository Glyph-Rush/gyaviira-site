import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Posts = [
    {
        id: 1,
        title: "The Heartbeat of Zephyros: A Sonic Journey",
        excerpt: "Exploring the spiritual and cultural roots of our latest acoustic experiments...",
        date: "Jan 12, 2026",
        author: "Jerome Moses",
        category: "Creative Process",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "Community Spotlight: Faith in Rhythm",
        excerpt: "How local percussion workshops are transforming community connectivity...",
        date: "Jan 10, 2026",
        author: "Gyaviira Team",
        category: "Community",
        image: "https://images.unsplash.com/photo-1514320291944-93e60272bb4c?auto=format&fit=crop&q=80&w=800"
    }
];

const Blog: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-16">
                    <h1 className="text-5xl font-heading text-white mb-4 tracking-tighter">Foundation Journal</h1>
                    <div className="w-24 h-1 bg-gold-primary"></div>
                    <p className="mt-6 text-gray-500 font-mono text-sm uppercase tracking-widest">Scripture, Rhythm, and Reflection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Posts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[16/9] overflow-hidden rounded-[2rem] mb-6 relative border border-white/5">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    src={post.image}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt={post.title}
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-gold-primary text-black px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{post.category}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-[10px] font-mono text-gray-600 mb-4 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                <span className="flex items-center gap-2"><User size={12} /> {post.author}</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-heading text-white mb-4 group-hover:text-gold-primary transition-colors leading-tight">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 font-light leading-relaxed mb-6">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-gold-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                                Read Transmission <ArrowRight size={14} />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
