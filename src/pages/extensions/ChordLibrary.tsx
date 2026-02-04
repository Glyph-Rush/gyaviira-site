import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

const ChordData = [
    // C
    { name: 'C Major', notes: ['C', 'E', 'G'], family: 'Major', fingering: 'x-3-2-0-1-0', positions: [[5, 3], [4, 2], [2, 1]] },
    { name: 'C Minor', notes: ['C', 'Eb', 'G'], family: 'Minor', fingering: 'x-3-5-5-4-3', positions: [[5, 3], [4, 5], [3, 5], [2, 4], [1, 3]] },
    { name: 'C7', notes: ['C', 'E', 'G', 'Bb'], family: 'Dominant', fingering: 'x-3-2-3-1-0', positions: [[5, 3], [4, 2], [3, 3], [2, 1]] },
    { name: 'Cmaj7', notes: ['C', 'E', 'G', 'B'], family: 'Major 7', fingering: 'x-3-2-0-0-0', positions: [[5, 3], [4, 2]] },
    { name: 'C# Major', notes: ['C#', 'E#', 'G#'], family: 'Major', fingering: 'x-4-6-6-6-4', positions: [[5, 4], [4, 6], [3, 6], [2, 6], [1, 4]] },
    { name: 'C# Minor', notes: ['C#', 'E', 'G#'], family: 'Minor', fingering: 'x-4-6-6-5-4', positions: [[5, 4], [4, 6], [3, 6], [2, 5], [1, 4]] },

    // D
    { name: 'D Major', notes: ['D', 'F#', 'A'], family: 'Major', fingering: 'x-x-0-2-3-2', positions: [[3, 2], [2, 3], [1, 2]] },
    { name: 'D Minor', notes: ['D', 'F', 'A'], family: 'Minor', fingering: 'x-x-0-2-3-1', positions: [[3, 2], [2, 3], [1, 1]] },
    { name: 'D7', notes: ['D', 'F#', 'A', 'C'], family: 'Dominant', fingering: 'x-x-0-2-1-2', positions: [[3, 2], [2, 1], [1, 2]] },
    { name: 'Dmaj7', notes: ['D', 'F#', 'A', 'C#'], family: 'Major 7', fingering: 'x-x-0-2-2-2', positions: [[3, 2], [2, 2], [1, 2]] },

    // E
    { name: 'E Major', notes: ['E', 'G#', 'B'], family: 'Major', fingering: '0-2-2-1-0-0', positions: [[5, 2], [4, 2], [3, 1]] },
    { name: 'E Minor', notes: ['E', 'G', 'B'], family: 'Minor', fingering: '0-2-2-0-0-0', positions: [[5, 2], [4, 2]] },
    { name: 'E7', notes: ['E', 'G#', 'B', 'D'], family: 'Dominant', fingering: '0-2-0-1-0-0', positions: [[5, 2], [3, 1]] },
    { name: 'Emaj7', notes: ['E', 'G#', 'B', 'D#'], family: 'Major 7', fingering: '0-2-1-1-0-0', positions: [[5, 2], [4, 1], [3, 1]] },

    // F
    { name: 'F Major', notes: ['F', 'A', 'C'], family: 'Major', fingering: '1-3-3-2-1-1', positions: [[6, 1], [5, 3], [4, 3], [3, 2], [2, 1], [1, 1]] },
    { name: 'F Minor', notes: ['F', 'Ab', 'C'], family: 'Minor', fingering: '1-3-3-1-1-1', positions: [[6, 1], [5, 3], [4, 3], [3, 1], [2, 1], [1, 1]] },
    { name: 'F# Major', notes: ['F#', 'A#', 'C#'], family: 'Major', fingering: '2-4-4-3-2-2', positions: [[6, 2], [5, 4], [4, 4], [3, 3], [2, 2], [1, 2]] },
    { name: 'F# Minor', notes: ['F#', 'A', 'C#'], family: 'Minor', fingering: '2-4-4-2-2-2', positions: [[6, 2], [5, 4], [4, 4], [3, 2], [2, 2], [1, 2]] },

    // G
    { name: 'G Major', notes: ['G', 'B', 'D'], family: 'Major', fingering: '3-2-0-0-0-3', positions: [[6, 3], [5, 2], [1, 3]] },
    { name: 'G Minor', notes: ['G', 'Bb', 'D'], family: 'Minor', fingering: '3-5-5-3-3-3', positions: [[6, 3], [5, 5], [4, 5], [3, 3], [2, 3], [1, 3]] },
    { name: 'G7', notes: ['G', 'B', 'D', 'F'], family: 'Dominant', fingering: '3-2-0-0-0-1', positions: [[6, 3], [5, 2], [1, 1]] },
    { name: 'G# Major', notes: ['G#', 'C', 'D#'], family: 'Major', fingering: '4-6-6-5-4-4', positions: [[6, 4], [5, 6], [4, 6], [3, 5], [2, 4], [1, 4]] },
    { name: 'G# Minor', notes: ['G#', 'B', 'D#'], family: 'Minor', fingering: '4-6-6-4-4-4', positions: [[6, 4], [5, 6], [4, 6], [3, 4], [2, 4], [1, 4]] },

    // A
    { name: 'A Major', notes: ['A', 'C#', 'E'], family: 'Major', fingering: 'x-0-2-2-2-0', positions: [[4, 2], [3, 2], [2, 2]] },
    { name: 'A Minor', notes: ['A', 'C', 'E'], family: 'Minor', fingering: 'x-0-2-2-1-0', positions: [[4, 2], [3, 2], [2, 1]] },
    { name: 'A7', notes: ['A', 'C#', 'E', 'G'], family: 'Dominant', fingering: 'x-0-2-0-2-0', positions: [[4, 2], [2, 2]] },

    // B
    { name: 'B Major', notes: ['B', 'D#', 'F#'], family: 'Major', fingering: 'x-2-4-4-4-2', positions: [[5, 2], [4, 4], [3, 4], [2, 4], [1, 2]] },
    { name: 'B Minor', notes: ['B', 'D', 'F#'], family: 'Minor', fingering: 'x-2-4-4-3-2', positions: [[5, 2], [4, 4], [3, 4], [2, 3], [1, 2]] },
    { name: 'Bb Major', notes: ['Bb', 'D', 'F'], family: 'Major', fingering: 'x-1-3-3-3-1', positions: [[5, 1], [4, 3], [3, 3], [2, 3], [1, 1]] },
    { name: 'Eb Major', notes: ['Eb', 'G', 'Bb'], family: 'Major', fingering: 'x-x-1-3-4-3', positions: [[4, 1], [3, 3], [2, 4], [1, 3]] },
    { name: 'Ab Major', notes: ['Ab', 'C', 'Eb'], family: 'Major', fingering: '4-6-6-5-4-4', positions: [[6, 4], [5, 6], [4, 6], [3, 5], [2, 4], [1, 4]] },
];

const ChordDiagram: React.FC<{ positions: number[][] }> = ({ positions }) => {
    return (
        <div className="relative w-48 h-64 bg-black/40 border border-gold-primary/20 rounded-xl p-4 overflow-hidden">
            {/* Frets */}
            {[1, 2, 3, 4, 5].map(fret => (
                <div key={fret} className="absolute inset-x-0 h-px bg-gold-primary/30" style={{ top: `${(fret * 20)}%` }}></div>
            ))}
            {/* Strings */}
            {[1, 2, 3, 4, 5, 6].map(string => (
                <div key={string} className="absolute inset-y-0 w-px bg-white/10" style={{ left: `${(string * 14.2) + 2}%` }}></div>
            ))}
            {/* Dots */}
            {positions.map(([string, fret], i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute w-4 h-4 bg-gold-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[8px] text-black font-bold"
                    style={{
                        left: `${((7 - string) * 14.2) + 2}%`,
                        top: `${(fret * 20) - 10}%`
                    }}
                >
                    {i + 1}
                </motion.div>
            ))}
            <div className="absolute top-0 inset-x-0 h-2 bg-gold-primary/60"></div>
        </div>
    );
};

const ChordLibrary: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedChord, setSelectedChord] = useState<typeof ChordData[0] | null>(ChordData[0]);
    const [activeFamily, setActiveFamily] = useState('ALL');

    const FAMILIES = ['ALL', 'Major', 'Minor', 'Dominant', 'Major 7'];

    const filteredChords = ChordData.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.family.toLowerCase().includes(search.toLowerCase());
        const matchesFamily = activeFamily === 'ALL' || c.family === activeFamily;
        return matchesSearch && matchesFamily;
    });

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent px-6 relative overflow-hidden">
            <div className="scanline"></div>

            <div className="container mx-auto max-w-7xl">
                <header className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-gold-primary"></div>
                        <span className="text-gold-primary font-mono text-[10px] uppercase tracking-[0.5em]">Harmonic Nexus v2.0</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <h1 className="text-6xl md:text-8xl font-impact text-white tracking-tighter uppercase leading-none mb-4">
                                Harmonic <span className="text-gold-primary neon-gold">Scanning</span>
                            </h1>
                            <p className="max-w-xl text-gray-400 font-light text-sm leading-relaxed border-l border-gold-primary/20 pl-6">
                                Decrypting the spectral sequences of heritage sounds. Access the complete harmonic database for the Foundation's orchestrations.
                            </p>
                        </div>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                            <input
                                type="text"
                                placeholder="INITIALIZE FREQUENCY SEARCH..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/40 border border-gold-primary/20 rounded-full py-5 pl-16 pr-8 text-white font-mono text-[10px] tracking-widest focus:outline-none focus:border-gold-primary/60 transition-all placeholder:text-gold-primary/20"
                            />
                        </div>
                    </div>
                </header>

                <div className="flex flex-wrap gap-4 mb-10">
                    {FAMILIES.map(family => (
                        <button
                            key={family}
                            onClick={() => setActiveFamily(family)}
                            className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${activeFamily === family ? 'bg-gold-primary text-black' : 'bg-white/5 border border-white/5 text-gray-500 hover:text-white'}`}
                        >
                            {family}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Database Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                        {filteredChords.map((chord, i) => (
                            <motion.button
                                key={chord.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.02 }}
                                onClick={() => setSelectedChord(chord)}
                                className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${selectedChord?.name === chord.name ? 'bg-gold-primary/10 border-gold-primary shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-black/40 border-white/5 hover:border-gold-primary/30'}`}
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[9px] font-mono text-gold-primary/60 uppercase tracking-widest">{chord.family}</span>
                                        <Activity size={14} className={selectedChord?.name === chord.name ? 'text-gold-primary animate-pulse' : 'text-white/10'} />
                                    </div>
                                    <h3 className="text-xl font-impact text-white mb-2 uppercase tracking-wider group-hover:text-gold-primary transition-colors">{chord.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {chord.notes.map(note => (
                                            <span key={note} className="text-[8px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">{note}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Detail Sidebar */}
                    <div className="lg:col-span-4">
                        <AnimatePresence mode="wait">
                            {selectedChord && (
                                <motion.div
                                    key={selectedChord.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="sci-fi-container p-10 h-full flex flex-col items-center text-center"
                                >
                                    <div className="w-full flex justify-between items-center mb-10 opacity-40">
                                        <ShieldCheck size={16} className="text-gold-primary" />
                                        <span className="text-[8px] font-mono uppercase tracking-[0.3em]">Neural Verification Active</span>
                                        <Info size={16} />
                                    </div>

                                    <h2 className="text-5xl font-impact text-gold-primary mb-2 uppercase tracking-tighter holo-glow">{selectedChord.name}</h2>
                                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] mb-12">{selectedChord.family} Alignment</span>

                                    <div className="mb-12 bg-black/20 p-8 rounded-[2rem] border border-gold-primary/10 relative">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold-primary/40 rounded-tl-xl"></div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold-primary/40 rounded-br-xl"></div>
                                        <ChordDiagram positions={selectedChord.positions} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full mb-10">
                                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                            <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">Fingering</p>
                                            <p className="text-sm font-impact text-white tracking-widest">{selectedChord.fingering}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                                            <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">Resonance</p>
                                            <div className="flex gap-1 justify-center">
                                                {selectedChord.notes.map(n => <span key={n} className="text-[9px] text-gold-primary font-bold">{n}</span>)}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                                        "Let every note resonate with the divine frequency of hope. The {selectedChord.name} is a cornerstone of the Zephyros archive."
                                    </p>

                                    <div className="mt-auto pt-10 w-full">
                                        <button className="w-full py-4 border border-gold-primary/30 rounded-xl text-[10px] font-mono text-gold-primary uppercase tracking-[0.4em] hover:bg-gold-primary hover:text-black transition-all flex items-center justify-center gap-3">
                                            Synthesize Audio <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChordLibrary;
