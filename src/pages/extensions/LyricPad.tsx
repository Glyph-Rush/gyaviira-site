import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Feather, AlignLeft, Bold, Italic } from 'lucide-react';

const LyricPad: React.FC = () => {
    const [lyrics, setLyrics] = useState('');
    const [title, setTitle] = useState('Untitled Frequency');
    const [savedStatus, setSavedStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    useEffect(() => {
        const savedLyrics = localStorage.getItem('gyaviira_lyrics');
        const savedTitle = localStorage.getItem('gyaviira_lyric_title');
        if (savedLyrics) setLyrics(savedLyrics);
        if (savedTitle) setTitle(savedTitle);
    }, []);

    const handleSave = () => {
        setSavedStatus('saving');
        localStorage.setItem('gyaviira_lyrics', lyrics);
        localStorage.setItem('gyaviira_lyric_title', title);
        setTimeout(() => setSavedStatus('saved'), 800);
        setTimeout(() => setSavedStatus('idle'), 3000);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to dissipate this transmission?')) {
            setLyrics('');
            setTitle('Untitled Frequency');
            localStorage.removeItem('gyaviira_lyrics');
            localStorage.removeItem('gyaviira_lyric_title');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#050505] px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-black p-8 md:p-12 border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Feather size={200} className="text-gold-primary rotate-12" />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-transparent border-none text-3xl font-impact text-white focus:ring-0 p-0 w-full md:w-auto uppercase tracking-widest placeholder:text-gray-800"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={handleClear}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all hover:bg-red-500/10"
                            >
                                <Trash2 size={20} />
                            </button>
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-3 px-6 h-12 rounded-2xl font-impact tracking-widest transition-all ${savedStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-gold-primary text-black hover:scale-105 shadow-gold'}`}
                            >
                                <Save size={20} />
                                {savedStatus === 'saving' ? 'ENCRYPTING...' : savedStatus === 'saved' ? 'SECURED' : 'SAVE TRANSMISSION'}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6 relative z-10">
                        <button className="text-gray-600 hover:text-gold-primary transition-colors"><Bold size={18} /></button>
                        <button className="text-gray-600 hover:text-gold-primary transition-colors"><Italic size={18} /></button>
                        <button className="text-gray-600 hover:text-gold-primary transition-colors"><AlignLeft size={18} /></button>
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        <span className="text-[10px] font-mono text-gray-600 flex items-center uppercase tracking-widest">
                            {lyrics.split(/\s+/).filter(Boolean).length} Words Captured
                        </span>
                    </div>

                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        placeholder="Transcribe the melody within..."
                        className="w-full h-[500px] bg-white/5 border border-white/5 rounded-3xl p-8 text-lg font-light leading-relaxed text-gray-200 focus:outline-none focus:border-gold-primary/30 transition-all resize-none shadow-inner"
                    />

                    <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-gray-700 uppercase tracking-widest">
                        <span>LocalStorage Encryption Active</span>
                        <span>Gyaviira Creative Pad v1.0</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LyricPad;
