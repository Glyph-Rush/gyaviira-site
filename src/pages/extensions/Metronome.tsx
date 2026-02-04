import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Minus, Plus, Activity, Settings2, Zap } from 'lucide-react';

const Metronome: React.FC = () => {
    const [bpm, setBpm] = useState(120);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [currentBeat, setCurrentBeat] = useState(0);

    const audioContext = useRef<AudioContext | null>(null);
    const nextTickTime = useRef(0);
    const timerID = useRef<number | null>(null);

    const scheduleTick = (beatNumber: number, time: number) => {
        if (!audioContext.current) return;
        const osc = audioContext.current.createOscillator();
        const envelope = audioContext.current.createGain();

        osc.frequency.value = beatNumber % beatsPerMeasure === 0 ? 1200 : 800;
        envelope.gain.value = 0.5;
        envelope.gain.exponentialRampToValueAtTime(0.5, time);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(envelope);
        envelope.connect(audioContext.current.destination);

        osc.start(time);
        osc.stop(time + 0.06);
    };

    const scheduler = () => {
        if (!audioContext.current) return;
        while (nextTickTime.current < audioContext.current.currentTime + 0.1) {
            scheduleTick(currentBeat, nextTickTime.current);
            nextTickTime.current += 60.0 / bpm;
            setCurrentBeat(prev => (prev + 1) % beatsPerMeasure);
        }
        timerID.current = window.setTimeout(scheduler, 25);
    };

    const toggleMetronome = () => {
        if (!isPlaying) {
            if (!audioContext.current) audioContext.current = new AudioContext();
            nextTickTime.current = audioContext.current.currentTime;
            setCurrentBeat(0);
            setIsPlaying(true);
            scheduler();
        } else {
            if (timerID.current) clearTimeout(timerID.current);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timerID.current) clearTimeout(timerID.current);
            if (audioContext.current) audioContext.current.close();
        };
    }, []);

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progress = (bpm - 40) / (280 - 40);
    const dashOffset = circumference * (1 - progress);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="scanline"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl sci-fi-container p-12 md:p-16 text-center hex-grid"
            >
                {/* Header Section */}
                <div className="flex justify-between items-center mb-12 border-b border-gold-primary/10 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/30">
                            <Activity className="text-gold-primary" size={20} />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-impact text-white tracking-[0.2em] uppercase">Pulse Sync</h1>
                            <p className="text-[10px] font-mono text-gold-primary/60 uppercase">Temporal Calibration Active</p>
                        </div>
                    </div>
                    <Settings2 className="text-gold-primary/40 hover:text-gold-primary cursor-pointer transition-colors" size={20} />
                </div>

                {/* Main BPM Display (Holographic Circle) */}
                <div className="relative flex items-center justify-center mb-16">
                    <svg className="w-72 h-72 transform -rotate-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        <circle
                            cx="144" cy="144" r={radius}
                            stroke="currentColor" strokeWidth="4"
                            fill="transparent" className="text-white/5"
                        />
                        <motion.circle
                            cx="144" cy="144" r={radius}
                            stroke="currentColor" strokeWidth="8"
                            fill="transparent" strokeDasharray={circumference}
                            animate={{ strokeDashoffset: dashOffset }}
                            className="text-gold-primary"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                            key={bpm}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-9xl font-impact text-gold-primary tabular-nums holo-glow"
                        >
                            {bpm}
                        </motion.div>
                        <p className="text-xs font-mono text-gold-dark uppercase tracking-[0.5em] -mt-2">BPM</p>
                    </div>

                    {/* Beat Indicators */}
                    <div className="absolute inset-x-0 -bottom-8 flex justify-center gap-3">
                        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: isPlaying && currentBeat === (i + 1) % beatsPerMeasure ? 1.5 : 1,
                                    opacity: isPlaying && currentBeat === (i + 1) % beatsPerMeasure ? 1 : 0.2,
                                    backgroundColor: isPlaying && currentBeat === (i + 1) % beatsPerMeasure ? '#D4AF37' : '#fff'
                                }}
                                className="w-2 h-8 rounded-full border border-gold-primary/20"
                            />
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setBpm(prev => Math.max(40, prev - 1))}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all group"
                        >
                            <Minus size={20} className="group-active:scale-90" />
                        </button>
                        <span className="text-xs font-mono text-gray-500 uppercase">Decrease</span>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={toggleMetronome}
                            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all relative group ${isPlaying ? 'shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 'shadow-[0_0_50px_rgba(212,175,55,0.2)]'}`}
                        >
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isPlaying ? 'bg-red-500' : 'bg-gold-primary opacity-0 group-hover:opacity-20'}`}></div>
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${isPlaying ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-gold-primary/50 bg-gold-primary text-black'}`}>
                                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} className="translate-x-1" fill="currentColor" />}
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xs font-mono text-gray-500 uppercase">Increase</span>
                        <button
                            onClick={() => setBpm(prev => Math.min(280, prev + 1))}
                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all group"
                        >
                            <Plus size={20} className="group-active:scale-90" />
                        </button>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-gold-primary/10">
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Time Signature</p>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 6, 8].map(sig => (
                                <button
                                    key={sig}
                                    onClick={() => setBeatsPerMeasure(sig)}
                                    className={`w-8 h-8 rounded-lg font-impact text-sm transition-all ${beatsPerMeasure === sig ? 'bg-gold-primary text-black' : 'bg-white/5 text-gray-500 hover:text-gold-primary'}`}
                                >
                                    {sig}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Zap size={16} className="text-gold-dark" />
                        <input
                            type="range" min="40" max="280" value={bpm}
                            onChange={(e) => setBpm(parseInt(e.target.value))}
                            className="w-48 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-primary"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Metronome;
