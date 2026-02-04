import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react';
import gilded_vibrations from '../assets/gilded_vibrations.png';

const Posts = [
    {
        id: 1,
        title: "The Divine Timbre: Speaking from the Soul",
        content: `
            <blockquote className="border-l-4 border-gold-primary pl-6 mb-8 italic text-gold-primary/80">
                "But speaking the truth in love, may grow up into him in all things, which is the head, even Christ." — Ephesians 4:15
            </blockquote>

            <p>At the soul of the Gyaviira Music Foundation lies a divine resonance. In our latest meditations, we have been exploring "Timbre"—not merely as a sonic quality, but as the unique voice God has given each of us to proclaim His glory. Just as the strings of a Kora and the wood of a Djembe are crafted for specific purposes, our lives are "fearfully and wonderfully made" to sound forth His praise.</p>
            
            <p>Our journey led us back to the roots of worship, where the heart's cry meets the Father's ear. We seek to align our frequencies with the Holy Spirit, ensuring that every note we produce is seasoned with grace and anchored in truth. When we speak from the heart, we are not just making music; we are witnessing to the transformational power of Christ.</p>
            
            <p>By marrying these organic, God-given tones with futuristic textures, we are declaring that His truth is eternal—spanning from the ancient paths to the horizons of tomorrow. We invite you to tune your heart to the frequency of the Heavens. Let your life be a "Divine Timbre" that draws others to the Light.</p>
        `,
        date: "Feb 04, 2026",
        author: "Jerome Moses",
        category: "Sacred Sound",
        image: gilded_vibrations,
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Sacred Rhythm: Unity in the Spirit",
        content: `
            <blockquote className="border-l-4 border-gold-primary pl-6 mb-8 italic text-gold-primary/80">
                "Behold, how good and how pleasant it is for brethren to dwell together in unity!" — Psalm 133:1
            </blockquote>

            <p>The community of Zephyros is witnessing a movement of the Spirit. Our "Faith in Rhythm" gatherings are more than workshops; they are assemblies of the Body of Christ, where every beat is a testament to our oneness in Him. As the drums call us together, we are reminded that we are many members, but one body, unified by the heartbeat of the Gospel.</p>
            
            <p>We saw this unity in action during our recent fellowship under the stars. Young and old alike joined in a symphony of praise, laying aside differences to focus on the King of Kings. This is the goal of our Foundation: to use the universal language of rhythm to foster the peace that passes all understanding.</p>
            
            <p>As we continue to walk this path of service, we pray that Gyaviira remains a beacon of hope—a place where the lonely find family and the broken find song. Join us as we march to the rhythm of God's love, building a kingdom that will never pass away.</p>
        `,
        date: "Jan 28, 2026",
        author: "Gyaviira Team",
        category: "Community",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
        readTime: "4 min read"
    },
    {
        id: 3,
        title: "The Harp of David: Strings of Worship",
        content: `
            <blockquote className="border-l-4 border-gold-primary pl-6 mb-8 italic text-gold-primary/80">
                "Praise him with the psaltery and harp. Praise him with the timbrel and dance: praise him with stringed instruments and organs." — Psalm 150:3-4
            </blockquote>

            <p>The Kora is our modern-day harp of David. In the hands of a believer, its 21 strings become a conduit for the Heavens, whispering the ancient melodies of heritage and faith. At Gyaviira, we view the Kora not just as an instrument, but as a sacred vessel dedicated to the exaltation of the Most High.</p>
            
            <p>As Master Griots pass down the intricate patterns of the Kora, they are also passing down the stories of God's faithfulness to our people. We believe that music is a form of stewardship, and we are called to be faithful with the talents we have received. Whether acoustic or electric, our Kora sounds must always point towards the Creator of all harmony.</p>
            
            <p>When you hear the strings of the Kora, let them remind you of the "new song" He has put in our mouths. We are the strings of His heritage, vibrating with the promise of eternal life and the joy of His presence.</p>
        `,
        date: "Jan 15, 2026",
        author: "Josiah Nyemera",
        category: "Sacred Instruments",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200",
        readTime: "7 min read"
    }
];

const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = Posts.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="pt-40 pb-20 text-center min-h-screen">
                <h2 className="text-4xl font-impact text-white uppercase mb-8">Signal Lost</h2>
                <p className="text-gray-500 mb-12">The transmission you're looking for does not exist.</p>
                <Link to="/blog" className="btn-gold px-8 py-3 uppercase font-bold tracking-widest text-xs">Return to Journal</Link>
            </div>
        );
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.title,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-gold-primary/60 hover:text-gold-primary transition-colors mb-12 uppercase font-mono text-[10px] tracking-[0.3em]"
                >
                    <ArrowLeft size={16} /> Back to Transmissions
                </motion.button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 mb-16"
                >
                    <div className="flex items-center gap-4 text-[10px] font-mono text-gold-primary uppercase tracking-[0.2em]">
                        <span className="bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded-full">{post.category}</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-impact text-white leading-[1.1] uppercase tracking-tighter">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-between border-y border-white/5 py-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary border border-gold-primary/20 shadow-gold/20">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-white text-sm font-mono uppercase tracking-widest">{post.author}</p>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <Calendar size={12} /> {post.date}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold-primary hover:border-gold-primary transition-all group scale-100 active:scale-95"
                        >
                            <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Featured Image Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[2.5rem] overflow-hidden border border-gold-primary/20 mb-16 shadow-[0_0_50px_rgba(212,175,55,0.1)] bg-black/60 relative group"
                >
                    <div className="absolute inset-0 bg-gold-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <img
                        src={post.image}
                        className="w-full h-auto max-h-[700px] object-contain mx-auto relative z-10"
                        alt={post.title}
                    />
                    {/* Decorative corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-primary/30 rounded-tl-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-primary/30 rounded-br-3xl"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-gold max-w-none prose-p:text-gray-400 prose-p:text-lg prose-p:leading-relaxed prose-p:font-light prose-p:mb-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer Section */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-8">
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em]">End of Transmission</p>
                    <button
                        onClick={handleShare}
                        className="btn-gold px-12 py-4 flex items-center gap-4 group"
                    >
                        <Share2 size={18} /> SHARE SIGNAL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
