import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Bookmark, Clock, Share2 } from 'lucide-react';
import gilded_vibrations from '../assets/gilded_vibrations.png';

const Posts = [
    {
        id: 1,
        title: "The Divine Timbre: Speaking from the Soul",
        excerpt: "Exploring the divine resonance in every life. We delve into how our 'Divine Timbre' is fearfully and wonderfully made to proclaim His glory through the power of the Gospel.",
        date: "Feb 04, 2026",
        author: "Jerome Moses",
        category: "Sacred Sound",
        image: gilded_vibrations,
        readTime: "5 min read",
        featured: true
    },
    {
        id: 2,
        title: "Sacred Rhythm: Unity in the Spirit",
        excerpt: "How our gatherings are becoming assemblies of the Body of Christ, unified by the heartbeat of the Spirit and the transformational power of percussion.",
        date: "Jan 28, 2026",
        author: "Gyaviira Team",
        category: "Community",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "The Harp of David: Strings of Worship",
        excerpt: "The Kora as a modern-day sacred vessel. Dedicating the 21 strings of our heritage to the exaltation of the Most High and the stories of His faithfulness.",
        date: "Jan 15, 2026",
        author: "Josiah Nyemera",
        category: "Sacred Instruments",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200",
        readTime: "7 min read"
    }
];

const Blog: React.FC = () => {
    const featuredPost = Posts.find(p => p.featured) || Posts[0];
    const otherPosts = Posts.filter(p => p.id !== featuredPost.id);

    const handleShare = async (e: React.MouseEvent, post: typeof featuredPost) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: `${window.location.origin}/blog/${post.id}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <div className="h-px w-8 bg-gold-primary"></div>
                            <span className="text-gold-primary font-mono text-[10px] uppercase tracking-[0.5em]">Transmissions</span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-impact text-white tracking-tighter uppercase leading-none">
                            Foundation <span className="text-gold-primary neon-gold">Journal</span>
                        </h1>
                    </div>
                    <p className="max-w-md text-gray-500 font-light text-lg leading-relaxed border-l border-white/10 pl-8">
                        Documenting the intersection of ancestral rhythm and futuristic faith. Every transmission is a bridge.
                    </p>
                </div>

                {/* Featured Post */}
                <Link to={`/blog/${featuredPost.id}`}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-[2.5rem] overflow-hidden border border-white/5 mb-24 group cursor-pointer"
                    >
                        <div className="flex flex-col lg:flex-row h-full">
                            <div className="lg:w-2/3 relative h-[400px] lg:h-[600px] overflow-hidden bg-black/40">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    src={featuredPost.image}
                                    className="w-full h-full object-contain transition-all duration-1000 group-hover:grayscale-0"
                                    alt={featuredPost.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none"></div>
                                <div className="absolute top-8 left-8">
                                    <span className="bg-gold-primary text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-2xl">
                                        Featured Signal
                                    </span>
                                </div>
                            </div>
                            <div className="lg:w-1/3 bg-black-soft p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-[10px] font-mono text-gold-primary/60 mb-8 uppercase tracking-[0.2em]">
                                    <span className="flex items-center gap-2"><Clock size={14} /> {featuredPost.readTime}</span>
                                    <span className="flex items-center gap-2"><Bookmark size={14} /> {featuredPost.category}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-impact text-white mb-6 leading-tight group-hover:text-gold-primary transition-colors uppercase tracking-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 line-clamp-4">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary border border-gold-primary/20">
                                            <User size={18} />
                                        </div>
                                        <span className="text-sm font-mono text-gray-300 uppercase tracking-widest">{featuredPost.author}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <Share2
                                            size={20}
                                            className="hover:text-gold-primary transition-colors cursor-pointer"
                                            onClick={(e) => handleShare(e, featuredPost)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
                    {otherPosts.map((post, i) => (
                        <Link to={`/blog/${post.id}`} key={post.id}>
                            <motion.article
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-8 border border-white/5 bg-black/40">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={post.image}
                                        className="w-full h-full object-contain transition-all duration-700 opacity-80 group-hover:opacity-100"
                                        alt={post.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                                    <div className="absolute top-6 right-6 flex gap-2">
                                        <span className="bg-black/80 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                            {post.category}
                                        </span>
                                        <button
                                            onClick={(e) => handleShare(e, post)}
                                            className="bg-black/80 backdrop-blur-md text-white border border-white/20 p-2 rounded-full hover:text-gold-primary transition-colors shadow-2xl"
                                        >
                                            <Share2 size={12} />
                                        </button>
                                    </div>
                                </div>

                                <div className="px-2">
                                    <div className="flex items-center gap-6 text-[10px] font-mono text-gray-600 mb-6 uppercase tracking-[0.2em]">
                                        <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                                        <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                                    </div>

                                    <h3 className="text-3xl font-heading text-white mb-4 group-hover:text-gold-primary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 font-light leading-relaxed mb-8 line-clamp-3 md:text-lg">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-gold-primary font-mono text-[10px] uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
                                        Decrypt Signal <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
