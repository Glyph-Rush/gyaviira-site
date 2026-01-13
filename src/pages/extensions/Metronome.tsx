import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Minus, Plus, Music } from 'lucide-react';

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

        osc.frequency.value = beatNumber % beatsPerMeasure === 0 ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        osc.connect(envelope);
        envelope.connect(audioContext.current.destination);

        osc.start(time);
        osc.stop(time + 0.1);
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

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black flex flex-col items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-12 text-center border-gold-primary/20 relative overflow-hidden"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gold-primary shadow-gold"></div>

                <h1 className="text-3xl font-heading text-white mb-8 tracking-widest uppercase flex items-center justify-center gap-3">
                    <Music className="text-gold-primary" /> Metronome
                </h1>

                <div className="mb-12">
                    <div className="text-8xl font-impact text-gold-primary mb-4 tabular-nums">
                        {bpm}
                    </div>
                    <p className="text-gray-500 font-mono text-sm tracking-widest uppercase font-bold">Beats per Minute</p>
                </div>

                <div className="flex items-center justify-center gap-8 mb-12">
                    <button
                        onClick={() => setBpm(prev => Math.max(40, prev - 1))}
                        className="w-12 h-12 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all"
                    >
                        <Minus size={20} />
                    </button>

                    <button
                        onClick={toggleMetronome}
                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${isPlaying ? 'bg-red-500/10 text-red-500 border border-red-500/50 scale-95' : 'bg-gold-primary text-black hover:scale-105'}`}
                    >
                        {isPlaying ? <Pause size={48} fill="currentColor" /> : <Play size={48} className="translate-x-1" fill="currentColor" />}
                    </button>

                    <button
                        onClick={() => setBpm(prev => Math.min(280, prev + 1))}
                        className="w-12 h-12 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-black transition-all"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="flex justify-center gap-8 mb-12">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Time Signature</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setBeatsPerMeasure(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-lg border border-gold-primary/20 flex items-center justify-center text-gray-500 hover:text-gold-primary transition-colors"
                            > - </button>
                            <span className="text-xl font-impact text-white w-8">{beatsPerMeasure}/4</span>
                            <button
                                onClick={() => setBeatsPerMeasure(prev => Math.min(12, prev + 1))}
                                className="w-8 h-8 rounded-lg border border-gold-primary/20 flex items-center justify-center text-gray-500 hover:text-gold-primary transition-colors"
                            > + </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4].map((beat) => (
                        <div
                            key={beat}
                            className={`w-4 h-4 rounded-full border border-white/10 transition-all duration-100 ${isPlaying && (currentBeat === beat % beatsPerMeasure) ? (beat === 1 ? 'bg-gold-primary shadow-gold scale-125' : 'bg-white/40 scale-110') : 'bg-white/5'}`}
                        />
                    ))}
                </div>

                <div className="mt-12">
                    <input
                        type="range"
                        min="40"
                        max="280"
                        value={bpm}
                        onChange={(e) => setBpm(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-primary"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Metronome;
