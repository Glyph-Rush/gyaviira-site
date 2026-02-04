import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Feather, AlignLeft, Bold, Italic, Cpu, Zap, Radio, Database } from 'lucide-react';

const LyricPad: React.FC = () => {
    const [lyrics, setLyrics] = useState('');
    const [title, setTitle] = useState('Untitled Frequency');
    const [userName, setUserName] = useState('');
    const [savedStatus, setSavedStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        const savedLyrics = localStorage.getItem('gyaviira_lyrics');
        const savedTitle = localStorage.getItem('gyaviira_lyric_title');
        const savedUser = localStorage.getItem('gyaviira_lyric_user');
        if (savedLyrics) setLyrics(savedLyrics);
        if (savedTitle) setTitle(savedTitle);
        if (savedUser) setUserName(savedUser);
    }, []);

    const handleSave = () => {
        setSavedStatus('saving');
        localStorage.setItem('gyaviira_lyrics', lyrics);
        localStorage.setItem('gyaviira_lyric_title', title);
        localStorage.setItem('gyaviira_lyric_user', userName);
        setTimeout(() => setSavedStatus('saved'), 1200);
        setTimeout(() => setSavedStatus('idle'), 3000);
    };

    const downloadTransmission = () => {
        const timestamp = new Date().toISOString();
        const content = `[USER]: ${userName || 'Unknown Steward'}\n[TIME]: ${timestamp}\n[TITLE]: ${title}\n\n[TRANSMISSION]:\n${lyrics}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}_${new Date().getTime()}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        if (window.confirm('Dissipate this neural transmission?')) {
            setLyrics('');
            setTitle('Untitled Frequency');
            localStorage.removeItem('gyaviira_lyrics');
            localStorage.removeItem('gyaviira_lyric_title');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent px-6 relative overflow-hidden">
            <div className="scanline"></div>

            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sci-fi-container p-8 md:p-12 hex-grid relative"
                >
                    {/* Neural Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 border-b border-gold-primary/10 pb-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center relative group">
                                <Cpu className="text-gold-primary group-hover:rotate-90 transition-transform duration-500" size={32} />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-transparent border-none text-4xl font-impact text-white focus:ring-0 p-0 w-full uppercase tracking-tighter placeholder:text-gray-800 holo-glow"
                                />
                                <div className="flex items-center gap-4 mt-1">
                                    <div className="flex items-center gap-2">
                                        <Radio size={12} className="text-gold-primary/60" />
                                        <span className="text-[10px] font-mono text-gold-primary/60 uppercase tracking-widest">Neural Link: Established</span>
                                    </div>
                                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                                        <Feather size={12} className="text-gold-primary/40" />
                                        <input
                                            type="text"
                                            placeholder="STEWARD IDENTIFICATION..."
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className="bg-transparent border-none text-[10px] font-mono text-gold-primary/40 focus:ring-0 p-0 uppercase tracking-widest w-40 placeholder:text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleClear}
                                title="Wipe Buffer"
                                className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all hover:bg-red-500/10 active:scale-95"
                            >
                                <Trash2 size={24} />
                            </button>
                            <button
                                onClick={downloadTransmission}
                                title="Export Transmission"
                                className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-gold-primary transition-all hover:bg-gold-primary/10 active:scale-95"
                            >
                                <Radio className="rotate-45" size={24} />
                            </button>
                            <button
                                onClick={handleSave}
                                className={`group flex items-center gap-4 px-8 h-14 rounded-xl font-impact tracking-[0.2em] transition-all relative overflow-hidden ${savedStatus === 'saved' ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-gold-primary text-black hover:scale-105 shadow-gold'}`}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                {savedStatus === 'saving' ? <Zap className="animate-spin" size={20} /> : <Database size={20} />}
                                {savedStatus === 'saving' ? 'TRANSMITTING...' : savedStatus === 'saved' ? 'ENCRYPTED' : 'SAVE DIRECTIVE'}
                            </button>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8 bg-black/40 p-4 rounded-2xl border border-white/5 relative z-10">
                        <div className="flex items-center gap-6 px-4">
                            <button className="text-gray-500 hover:text-gold-primary transition-colors cursor-help"><Bold size={20} /></button>
                            <button className="text-gray-500 hover:text-gold-primary transition-colors cursor-help"><Italic size={20} /></button>
                            <button className="text-gray-500 hover:text-gold-primary transition-colors cursor-help"><AlignLeft size={20} /></button>
                            <div className="h-8 w-px bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <Feather size={16} className="text-gold-primary/40" />
                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                                    {lyrics.split(/\s+/).filter(Boolean).length} / 5000 Tokens
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-[9px] font-mono text-gold-primary/30 uppercase tracking-[0.3em]">
                            <span>Scribe Mod-Alpha</span>
                            <div className="w-2 h-2 rounded-full bg-gold-primary/20 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-b from-gold-primary/20 to-transparent rounded-[2.5rem] blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                        <textarea
                            value={lyrics}
                            onChange={(e) => setLyrics(e.target.value)}
                            placeholder="INITIALIZE TRANSCRIPTION..."
                            className="relative w-full h-[600px] bg-black/60 border border-white/5 rounded-[2.5rem] p-12 text-xl font-light leading-relaxed text-gray-200 focus:outline-none focus:border-gold-primary/40 transition-all resize-none shadow-2xl placeholder:text-white/5 custom-scrollbar"
                        />
                    </div>

                    {/* Footer Stats */}
                    <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 px-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${savedStatus === 'saving' ? 'bg-gold-primary animate-ping' : 'bg-green-500/40'}`}></div>
                            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Sub-Layer Encryption: Active</span>
                        </div>
                        <div className="flex gap-8">
                            <div className="text-right">
                                <p className="text-[8px] font-mono text-gray-700 uppercase mb-1">Last Transmission</p>
                                <p className="text-[10px] font-mono text-gold-primary/40 uppercase">{new Date().toLocaleTimeString()}</p>
                            </div>
                            <div className="text-right border-l border-white/10 pl-8">
                                <p className="text-[8px] font-mono text-gray-700 uppercase mb-1">System Core</p>
                                <p className="text-[10px] font-mono text-gold-primary/40 uppercase">V.921-SCRIBE</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LyricPad;
