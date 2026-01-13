import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, Music } from 'lucide-react';

const Chords = [
    { name: 'C Major', notes: ['C', 'E', 'G'], family: 'Major', fingering: 'x-3-2-0-1-0' },
    { name: 'G Major', notes: ['G', 'B', 'D'], family: 'Major', fingering: '3-2-0-0-0-3' },
    { name: 'A Minor', notes: ['A', 'C', 'E'], family: 'Minor', fingering: 'x-0-2-2-1-0' },
    { name: 'E Minor', notes: ['E', 'G', 'B'], family: 'Minor', fingering: '0-2-2-0-0-0' },
    { name: 'D Major', notes: ['D', 'F#', 'A'], family: 'Major', fingering: 'x-x-0-2-3-2' },
    { name: 'F Major', notes: ['F', 'A', 'C'], family: 'Major', fingering: '1-3-3-2-1-1' },
];

const ChordLibrary: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedChord, setSelectedChord] = useState<typeof Chords[0] | null>(null);

    const filteredChords = Chords.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.family.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                    <div>
                        <h1 className="text-4xl font-heading text-white mb-2 tracking-widest uppercase flex items-center gap-3">
                            <Music className="text-gold-primary" /> Chord Library
                        </h1>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">The Harmonic Foundation of Zephyros</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                        <input
                            type="text"
                            placeholder="Find your vibration..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white font-mono text-sm focus:outline-none focus:border-gold-primary/40 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChords.map((chord, i) => (
                        <motion.button
                            key={chord.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedChord(chord)}
                            className={`p-8 rounded-[2rem] border transition-all text-left group relative overflow-hidden ${selectedChord?.name === chord.name ? 'bg-gold-primary/10 border-gold-primary shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-black-soft border-white/5 hover:border-gold-primary/30'}`}
                        >
                            <div className="relative z-10">
                                <span className="text-[9px] font-mono text-gold-dark uppercase tracking-widest mb-2 block">{chord.family}</span>
                                <h3 className="text-2xl font-impact text-white mb-4 uppercase tracking-tighter group-hover:text-gold-primary transition-colors">{chord.name}</h3>
                                <div className="flex gap-2">
                                    {chord.notes.map(note => (
                                        <span key={note} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400">{note}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                                <Info size={16} className="text-gold-primary" />
                            </div>
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedChord && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-black-soft border-l border-white/10 z-[60] p-12 shadow-2xl overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedChord(null)}
                                className="absolute top-8 right-8 text-gray-500 hover:text-white"
                            >Close</button>

                            <div className="mt-12">
                                <span className="text-xs font-mono text-gold-primary uppercase tracking-widest">{selectedChord.family} Scale</span>
                                <h2 className="text-5xl font-impact text-white mt-2 mb-8 uppercase tracking-widest">{selectedChord.name}</h2>

                                <div className="space-y-8">
                                    <div className="p-6 bg-black rounded-3xl border border-white/5">
                                        <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Standard Fingering</h4>
                                        <div className="text-3xl font-impact text-gold-primary tracking-[0.2em]">
                                            {selectedChord.fingering}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-black rounded-3xl border border-white/5">
                                        <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">Sonic Composition</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedChord.notes.map(note => (
                                                <div key={note} className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary font-bold">
                                                    {note}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed font-light italic">
                                        "Let every note resonate with the frequency of hope. The {selectedChord.name} is a pillar of the Foundation's sonic identity."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChordLibrary;
