import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, Music3, Music4, Zap, Activity } from 'lucide-react';

interface Note {
    id: number;
    x: number;
    y: number;
    icon: React.ReactNode;
}

const MusicEffects: React.FC = () => {
    const [trail, setTrail] = useState<Note[]>([]);
    const [cornerNotes, setCornerNotes] = useState<Note[]>([]);
    const [isCornerEffectActive, setIsCornerEffectActive] = useState(false);

    const icons = [
        <Music size={16} />,
        <Music2 size={16} />,
        <Music3 size={16} />,
        <Music4 size={16} />,
        <Zap size={16} />,
        <Activity size={16} />
    ];

    // Cursor Trail Logic
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const newNote: Note = {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY,
            icon: icons[Math.floor(Math.random() * icons.length)]
        };
        setTrail(prev => [...prev.slice(-15), newNote]);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Timer to clear trail
    useEffect(() => {
        const timer = setInterval(() => {
            setTrail(prev => prev.slice(1));
        }, 100);
        return () => clearInterval(timer);
    }, []);

    // Corner Effect Logic
    useEffect(() => {
        if (!isCornerEffectActive) {
            setCornerNotes([]);
            return;
        }

        const interval = setInterval(() => {
            const newNote: Note = {
                id: Date.now() + Math.random(),
                x: 0, // Will be set by CSS animation or framer motion
                y: 0,
                icon: icons[Math.floor(Math.random() * icons.length)]
            };
            setCornerNotes(prev => [...prev.slice(-20), newNote]);
        }, 400);

        return () => clearInterval(interval);
    }, [isCornerEffectActive]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            {/* Cursor Trail */}
            <AnimatePresence>
                {trail.map((note) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0.8, scale: 0.5, x: note.x - 10, y: note.y - 10 }}
                        animate={{ opacity: 0, scale: 1.5, y: note.y - 60, x: note.x + (Math.random() * 40 - 20) }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-gold-primary/40 filter blur-[1px]"
                    >
                        {note.icon}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Corner Emission Effect */}
            <AnimatePresence>
                {isCornerEffectActive && cornerNotes.map((note) => (
                    <motion.div
                        key={note.id}
                        initial={{
                            opacity: 0,
                            scale: 0.2,
                            bottom: "-5%",
                            right: "-5%"
                        }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0.5, 1.5, 2],
                            bottom: "110%",
                            right: ["-5%", "50%", "110%"],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            ease: "linear"
                        }}
                        className="absolute text-gold-primary/10 filter blur-[2px]"
                    >
                        {note.icon}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsCornerEffectActive(!isCornerEffectActive)}
                className="fixed bottom-6 left-6 pointer-events-auto w-12 h-12 rounded-2xl bg-black/80 border border-gold-primary/30 flex items-center justify-center text-gold-primary hover:bg-gold-primary/20 transition-all group overflow-hidden"
                title="Toggle Ambient Harmony"
            >
                <div className={`absolute inset-0 bg-gold-primary/10 transition-transform duration-500 ${isCornerEffectActive ? 'scale-100' : 'scale-0'}`}></div>
                <Music size={20} className={isCornerEffectActive ? 'animate-bounce' : 'opacity-40'} />
            </button>
        </div>
    );
};

export default MusicEffects;
