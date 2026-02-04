import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Activity,
    Book,
    Mic2,
    Gamepad2,
    Music2,
    ArrowRight,
    Search
} from 'lucide-react';

const tools = [
    {
        name: 'Pulse Metronome',
        description: 'Precision BPM control and time signature calibration for perfect rhythm.',
        icon: <Activity className="text-gold-primary" size={24} />,
        path: '/extensions/metronome',
        color: 'from-gold-primary/20 to-transparent'
    },
    {
        name: 'Chord Library',
        description: 'Technical reference for heritage progressions and harmonic structures.',
        icon: <Book className="text-gold-primary" size={24} />,
        path: '/extensions/chords',
        color: 'from-gold-primary/20 to-transparent'
    },
    {
        name: 'Lyric Pad',
        description: 'Focused songwriting environment with local encryption and persistence.',
        icon: <Mic2 className="text-gold-primary" size={24} />,
        path: '/extensions/lyrics',
        color: 'from-gold-primary/20 to-transparent'
    },
    {
        name: 'Tuner Suite',
        description: 'High-fidelity instrument calibration for polyphonic and solo tuning.',
        icon: <Music2 className="text-gold-primary" size={24} />,
        path: '/extensions/tuner',
        external: false,
        color: 'from-gold-primary/20 to-transparent'
    },
    {
        name: 'Game Hub',
        description: 'Interactive rhythmic challenges and sonic mini-games for the community.',
        icon: <Gamepad2 className="text-gold-primary" size={24} />,
        path: '/games',
        color: 'from-gold-primary/20 to-transparent'
    }
];

const Extensions: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent px-6">
            <div className="container mx-auto max-w-6xl">
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <div className="h-px w-8 bg-gold-primary"></div>
                        <span className="text-gold-primary font-mono text-[10px] uppercase tracking-[0.5em]">System Utilities</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-impact text-white tracking-tighter uppercase leading-none mb-6">
                        Creative <span className="text-gold-primary neon-gold">Extensions</span>
                    </h1>
                    <p className="max-w-2xl text-gray-500 font-light text-lg leading-relaxed border-l border-white/10 pl-8">
                        A centralized hub for technical tools designed to enhance your sonic craftsmanship and creative output within the Foundation ecosystem.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {tool.external ? (
                                <a
                                    href={tool.path}
                                    className="group relative block p-8 rounded-[2.5rem] border border-white/5 bg-black/40 hover:border-gold-primary/30 transition-all overflow-hidden h-full"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {tool.icon}
                                        </div>
                                        <h3 className="text-2xl font-impact text-white uppercase tracking-wider mb-4 group-hover:text-gold-primary transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                                            {tool.description}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-gold-primary font-mono text-[10px] uppercase tracking-[0.2em]">
                                            Launch Module <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </a>
                            ) : (
                                <Link
                                    to={tool.path}
                                    className="group relative block p-8 rounded-[2.5rem] border border-white/5 bg-black/40 hover:border-gold-primary/30 transition-all overflow-hidden h-full"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {tool.icon}
                                        </div>
                                        <h3 className="text-2xl font-impact text-white uppercase tracking-wider mb-4 group-hover:text-gold-primary transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
                                            {tool.description}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-gold-primary font-mono text-[10px] uppercase tracking-[0.2em]">
                                            Initialize Protocol <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            )}
                        </motion.div>
                    ))}

                    {/* Coming Soon Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40"
                    >
                        <Search className="text-gray-600 mb-4" size={32} />
                        <h3 className="text-xl font-impact text-gray-500 uppercase tracking-widest mb-2">Expanding Nexus</h3>
                        <p className="text-gray-600 font-mono text-[10px] uppercase">New frequencies detected...</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Extensions;
