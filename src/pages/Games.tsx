import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Music, Zap, Brain, Volume2, Mic2, Activity, Sliders, Layout, Hash } from 'lucide-react';
import store_desktop from '../assets/store_desktop.png';
import store_mobile from '../assets/store_mobile.png';

// --- SOUND ENGINE ---
const playSound = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, context.currentTime);

    gain.gain.setValueAtTime(0.1, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

    osc.connect(gain);
    gain.connect(context.destination);

    osc.start();
    osc.stop(context.currentTime + duration);
};

// --- TUTORIAL DIALOG ---
const TutorialDialog: React.FC<{
    title: string;
    steps: string[];
    onStart: () => void;
    onExit: () => void;
}> = ({ title, steps, onStart, onExit }) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-full max-w-lg p-10 space-y-8 border border-gold-primary/30 text-center"
            >
                <div className="space-y-4">
                    <h3 className="text-3xl font-impact text-gold-primary tracking-widest uppercase neon-gold">{title} - BRIEFING</h3>
                    <div className="h-1 bg-gold-primary/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gold-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-lg text-white font-light leading-relaxed min-h-[100px]"
                    >
                        {steps[currentStep]}
                    </motion.p>
                </AnimatePresence>

                <div className="flex flex-col gap-4">
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={() => { setCurrentStep(s => s + 1); playSound(800, 'sine', 0.05); }}
                            className="btn-gold py-4 uppercase font-bold tracking-widest text-xs"
                        >
                            Next Module
                        </button>
                    ) : (
                        <button
                            onClick={onStart}
                            className="btn-gold py-4 uppercase font-bold tracking-widest text-xs shadow-gold animate-pulse"
                        >
                            Initialize Session
                        </button>
                    )}
                    <button
                        onClick={onExit}
                        className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                    >
                        Abort Mission
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
const RhythmMaster: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [scale, setScale] = useState(1);
    const [targetHit, setTargetHit] = useState(false);

    const tick = useCallback(() => {
        if (!isActive) return;
        setScale(s => {
            const next = s + 0.05;
            if (next > 2) {
                setIsActive(false);
                playSound(150, 'sawtooth', 0.3); // Fail sound
                return 1;
            }
            return next;
        });
    }, [isActive]);

    useEffect(() => {
        const interval = setInterval(tick, 50);
        return () => clearInterval(interval);
    }, [tick]);

    const handleClick = () => {
        if (!isActive) {
            setIsActive(true);
            setScore(0);
            return;
        }

        if (scale > 1.6 && scale < 1.9) {
            setScore(s => s + 100);
            setTargetHit(true);
            playSound(880, 'sine', 0.1); // Success sound
            setTimeout(() => setTargetHit(false), 200);
            setScale(1);
        } else {
            setIsActive(false);
            playSound(150, 'sawtooth', 0.3); // Fail sound
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative overflow-hidden">
            {showTutorial && (
                <TutorialDialog
                    title="Rhythm Master"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "Welcome to the Rhythm Core.",
                        "Your goal is to sync with the pulse of Zephyros.",
                        "Click 'HIT' when the expanding circle perfectly touches the outer ring.",
                        "Precision timing increases your score. Failure resets the pulse."
                    ]}
                />
            )}
            <img src={store_mobile} className="absolute inset-0 w-full h-full object-cover opacity-10 scale-110 blur-sm pointer-events-none" />

            <div className="z-10 text-center space-y-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Rhythm Master</h2>
                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Click when the pulse hits the ring</p>
                </div>

                <div className="text-6xl font-impact text-white">{score}</div>

                <div className="relative w-64 h-64 flex items-center justify-center border-4 border-gold-primary/20 rounded-full">
                    <div className="absolute inset-0 border-4 border-gold-primary rounded-full opacity-20 scale-[0.85]"></div>
                    <motion.div
                        style={{ scale }}
                        className={`w-32 h-32 rounded-full ${targetHit ? 'bg-white shadow-[0_0_50px_#fff]' : 'bg-gold-primary shadow-gold'} transition-colors duration-100`}
                    />
                </div>

                <div className="flex gap-4">
                    <button onClick={handleClick} className="btn-gold px-12 py-4">
                        {isActive ? 'HIT!' : 'START SESSION'}
                    </button>
                    <button onClick={onBack} className="glass-card border border-gold-primary/20 text-white px-8 py-4 rounded-2xl hover:bg-gold-primary/10 transition-colors uppercase font-bold text-xs tracking-widest">
                        Exit
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- HARMONY MATCH GAME ---
const HarmonyMatch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const symbols = ['Kora', 'Djembe', 'Flute', 'Note', 'Clef', 'Rhythm', 'Grace', 'Unity'];
    const [cards, setCards] = useState<{ id: number, symbol: string, isFlipped: boolean, isMatched: boolean }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);

    const initGame = () => {
        const deck = [...symbols, ...symbols]
            .sort(() => Math.random() - 0.5)
            .map((s, i) => ({ id: i, symbol: s, isFlipped: false, isMatched: false }));
        setCards(deck);
        setMoves(0);
        setFlipped([]);
    };

    useEffect(() => {
        initGame();
    }, []);

    const handleFlip = (id: number) => {
        if (flipped.length === 2 || cards[id].isMatched || cards[id].isFlipped) return;

        playSound(440, 'sine', 0.05);
        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;
            if (cards[first].symbol === cards[second].symbol) {
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[first].isMatched = true;
                    matchedCards[second].isMatched = true;
                    setCards(matchedCards);
                    setFlipped([]);
                    playSound(1200, 'sine', 0.2);
                }, 500);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].isFlipped = false;
                    resetCards[second].isFlipped = false;
                    setCards(resetCards);
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 h-full relative overflow-hidden">
            {showTutorial && (
                <TutorialDialog
                    title="Harmony Match"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "Synthesize the harmonics of the Foundation.",
                        "Flip the memory cells to discover hidden instruments and symbols.",
                        "Match all pairs to complete the sequence.",
                        "Your moves are tracked. Efficiency is a sign of a true Master."
                    ]}
                />
            )}
            <img src={store_desktop} className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl space-y-6">
                <div className="flex justify-between items-end border-b border-gold-primary/20 pb-4">
                    <div>
                        <h2 className="text-3xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Harmony Match</h2>
                        <p className="text-gray-500 font-mono text-[10px] tracking-widest">Connect the frequencies of Zephyros</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-impact text-white uppercase tracking-widest">{moves} MOVES</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 aspect-square">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFlip(i)}
                            className={`cursor-pointer rounded-xl flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${card.isFlipped || card.isMatched
                                ? 'bg-gold-primary/20 border-gold-primary text-gold-primary shadow-gold'
                                : 'bg-black-soft border-white/5 text-transparent hover:border-gold-primary/30'
                                }`}
                        >
                            {(card.isFlipped || card.isMatched) ? card.symbol : 'G'}
                        </motion.div>
                    ))}
                </div>

                <div className="flex gap-4">
                    <button onClick={initGame} className="btn-gold flex-1 py-3 text-xs flex items-center justify-center gap-2">
                        <RotateCcw size={14} /> RESET RESONANCE
                    </button>
                    <button onClick={onBack} className="glass-card border border-gold-primary/20 text-white px-6 py-3 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase">
                        Abort
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- SYNTH PAD GAME ---
const SynthPad: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const tones = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    const [activePad, setActivePad] = useState<number | null>(null);

    const playNote = (freq: number, i: number) => {
        playSound(freq, 'sine', 0.5);
        setActivePad(i);
        setTimeout(() => setActivePad(null), 200);
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative">
            {showTutorial && (
                <TutorialDialog
                    title="Synth Pad"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "The Melodic Grid is your canvas.",
                        "Click the golden pads to trigger high-fidelity frequencies.",
                        "The top row holds deep resonance, while the bottom row provides clarity.",
                        "Experiment and find your own anthem."
                    ]}
                />
            )}
            <img src={store_mobile} className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none" />
            <div className="z-10 w-full max-w-md space-y-10">
                <div className="text-center">
                    <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Synth Pad</h2>
                    <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">Free Melodic Expression</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {tones.map((freq, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => playNote(freq, i)}
                            className={`aspect-square rounded-2xl border-2 transition-all duration-300 ${activePad === i ? 'bg-gold-primary border-white shadow-gold scale-105' : 'bg-black/40 border-gold-primary/30 hover:border-gold-primary'}`}
                        />
                    ))}
                    {tones.map((freq, i) => (
                        <motion.button
                            key={i + 8}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => playNote(freq * 1.5, i + 8)}
                            className={`aspect-square rounded-2xl border-2 transition-all duration-300 ${activePad === i + 8 ? 'bg-white border-gold-primary shadow-[0_0_30px_#fff] scale-105' : 'bg-black/40 border-white/10 hover:border-white/30'}`}
                        />
                    ))}
                </div>
                <button onClick={onBack} className="w-full btn-gold py-4 text-xs tracking-widest uppercase font-bold">Return to Hub</button>
            </div>
        </div>
    );
};

// --- LYRIC RUNNER GAME ---
const LyricRunner: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const lyrics = [
        "Rhythm is the key",
        "Zephyros calling",
        "Grace in the melody",
        "Faith is our pulse",
        "Harmony forever",
        "Resilience rising"
    ];
    const [index, setIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setIndex((idx) => (idx + 1) % lyrics.length);
        }, 1200);
        return () => clearInterval(interval);
    }, [isActive, lyrics.length]);

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative">
            {showTutorial && (
                <TutorialDialog
                    title="Lyric Runner"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "Initialize the poetic transmission.",
                        "Watch the anthems of the Foundation flow through the system.",
                        "This is a speed-reading training exercise.",
                        "Can you keep up with the rhythm of the words?"
                    ]}
                />
            )}
            <img src={store_desktop} className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none" />

            <div className="z-10 text-center space-y-12">
                <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Lyric Runner</h2>

                <div className="h-24 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-3xl font-heading text-white tracking-widest italic"
                        >
                            "{lyrics[index]}"
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => { setIsActive(!isActive); playSound(isActive ? 200 : 800); }}
                        className="btn-gold px-12 py-4 shadow-gold"
                    >
                        {isActive ? 'STOP TRANSMISSION' : 'INITIALIZE'}
                    </button>
                    <button
                        onClick={onBack}
                        className="block w-full text-[10px] text-gray-500 hover:text-white transition-colors tracking-widest uppercase font-mono"
                    >
                        Abort
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- FREQ HUNTER GAME ---
const FreqHunter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const [target] = useState(Math.floor(Math.random() * 800) + 100);
    const [current, setCurrent] = useState(400);
    const [found, setFound] = useState(false);

    const checkFreq = () => {
        playSound(current, 'sine', 0.2);
        if (Math.abs(current - target) < 10) {
            setFound(true);
            playSound(1200, 'sine', 0.5);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative">
            {showTutorial && (
                <TutorialDialog
                    title="Freq Hunter"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "Locate the Sacred resonant frequency.",
                        "Move the slider to scan the auditory spectrum.",
                        "Listen for the harmonic ping to find your target.",
                        "Lock the signal when the frequency matches."
                    ]}
                />
            )}
            <div className="z-10 w-full max-w-md space-y-10 text-center">
                <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Freq Hunter</h2>
                <div className="space-y-4">
                    <div className="text-5xl font-mono text-white tracking-tighter">{current}Hz</div>
                    <input
                        type="range" min="100" max="1000" value={current}
                        onChange={(e) => setCurrent(parseInt(e.target.value))}
                        className="w-full accent-gold-primary bg-white/5 h-2 rounded-full appearance-none hover:opacity-100"
                    />
                </div>
                {found ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold-primary font-bold uppercase tracking-widest text-xl">Signal Locked! Target was {target}Hz</motion.div>
                ) : (
                    <button onClick={checkFreq} className="btn-gold px-12 py-4">SCAN FREQUENCY</button>
                )}
                <button onClick={onBack} className="block w-full text-[10px] text-gray-500 hover:text-white transition-colors tracking-widest uppercase">Exit</button>
            </div>
        </div>
    );
};

// --- BEAT MACHINE GAME ---
const BeatMachine: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const [steps, setSteps] = useState(Array(8).fill(false));
    const [currentStep, setCurrentStep] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setCurrentStep(s => {
                const next = (s + 1) % 8;
                if (steps[next]) playSound(200, 'square', 0.05);
                return next;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [playing, steps]);

    const toggleStep = (i: number) => {
        const newSteps = [...steps];
        newSteps[i] = !newSteps[i];
        setSteps(newSteps);
        playSound(600, 'sine', 0.02);
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative">
            {showTutorial && (
                <TutorialDialog
                    title="Beat Machine"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "Assemble the foundation of a new sound.",
                        "Toggle the steps to build a rhythmic loop.",
                        "Each pad triggers a unique synthetic beat.",
                        "Press Play to hear your loop in action."
                    ]}
                />
            )}
            <div className="z-10 w-full max-w-lg space-y-12 text-center">
                <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Beat Machine</h2>
                <div className="flex gap-2 justify-center">
                    {steps.map((on, i) => (
                        <div key={i} className="space-y-2">
                            <div className={`w-8 h-1 rounded-full transition-all ${currentStep === i ? 'bg-white shadow-gold' : 'bg-white/10'}`} />
                            <button
                                onClick={() => toggleStep(i)}
                                className={`w-12 h-16 rounded-lg border-2 transition-all ${on ? 'bg-gold-primary border-white shadow-gold' : 'bg-black/50 border-white/5'}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 justify-center">
                    <button onClick={() => setPlaying(!playing)} className="btn-gold px-12 py-4">{playing ? 'PAUSE LOOP' : 'PLAY LOOP'}</button>
                    <button onClick={onBack} className="glass-card border border-white/10 text-white px-8 py-4 rounded-2xl text-xs uppercase font-bold tracking-widest">Quit</button>
                </div>
            </div>
        </div>
    );
};

// --- ECHO HERO GAME ---
const EchoHero: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [showTutorial, setShowTutorial] = useState(true);
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [isDisplaying, setIsDisplaying] = useState(false);
    const notes = [261.63, 329.63, 392.00, 523.25];

    const nextRound = () => {
        const next = Math.floor(Math.random() * 4);
        const newSeq = [...sequence, next];
        setSequence(newSeq);
        setUserSequence([]);
        playSequence(newSeq);
    };

    const playSequence = (seq: number[]) => {
        setIsDisplaying(true);
        seq.forEach((noteIdx, i) => {
            setTimeout(() => {
                playSound(notes[noteIdx], 'sine', 0.3);
                if (i === seq.length - 1) setIsDisplaying(false);
            }, i * 600);
        });
    };

    const handleNote = (idx: number) => {
        if (isDisplaying) return;
        playSound(notes[idx], 'sine', 0.2);
        const newSeq = [...userSequence, idx];
        setUserSequence(newSeq);

        if (idx !== sequence[newSeq.length - 1]) {
            playSound(100, 'sawtooth', 0.5);
            setSequence([]);
            setUserSequence([]);
            return;
        }

        if (newSeq.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 h-full relative">
            {showTutorial && (
                <TutorialDialog
                    title="Echo Hero"
                    onExit={onBack}
                    onStart={() => { setShowTutorial(false); playSound(1000); }}
                    steps={[
                        "The System is transmitting a pattern.",
                        "Watch and listen carefully to the sequence of notes.",
                        "Repeat the sequence exactly to advance.",
                        "One mistake, and the echoes will fade away."
                    ]}
                />
            )}
            <div className="z-10 text-center space-y-12 w-full max-w-md">
                <h2 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Echo Hero</h2>
                <div className="grid grid-cols-2 gap-6">
                    {['C', 'E', 'G', 'C2'].map((note, i) => (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleNote(i)}
                            className={`h-24 rounded-2xl border-2 flex items-center justify-center font-impact text-2xl transition-all ${isDisplaying ? 'opacity-50' : 'opacity-100'} ${[
                                'border-gold-primary text-gold-primary',
                                'border-white text-white',
                                'border-cyan-500 text-cyan-500',
                                'border-purple-500 text-purple-500'
                            ][i]}`}
                        >
                            {note}
                        </motion.button>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={nextRound} className="btn-gold px-12 py-4">{sequence.length === 0 ? 'START ECHOES' : `ROUND ${sequence.length}`}</button>
                    <button onClick={onBack} className="text-xs text-gray-500 uppercase tracking-widest font-mono">Abort Mission</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const Games: React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<'rhythm' | 'harmony' | 'synth' | 'runner' | 'hunter' | 'beat' | 'echo' | null>(null);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-primary/5 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-500/5 blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 h-full">
                <AnimatePresence mode="wait">
                    {!selectedGame ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-6xl mx-auto space-y-16"
                        >
                            <div className="text-center space-y-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="inline-block p-4 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-primary mb-6"
                                >
                                    <Zap size={32} />
                                </motion.div>
                                <h1 className="text-7xl md:text-9xl font-impact text-white mb-6 tracking-tighter uppercase relative">
                                    Game <span className="text-gold-primary neon-gold">Hub</span>
                                    <div className="absolute -top-4 -right-4 bg-gold-primary text-black text-[10px] px-2 py-1 rotate-12 font-bold uppercase">v1.0.0</div>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-500 font-light tracking-widest uppercase">Select an immersive interactive experience</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Rhythm Master Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('rhythm')}
                                    className="glass-card relative h-[500px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <img src={store_mobile} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-12 h-12 bg-gold-primary rounded-xl flex items-center justify-center text-black mb-2 shadow-gold">
                                            <Music size={24} />
                                        </div>
                                        <h3 className="text-5xl font-impact text-white uppercase tracking-tighter">Rhythm Master</h3>
                                        <p className="text-gray-400 font-light leading-relaxed">A reaction-based reflex engine. Test your internal clock against the pulse of the Foundation.</p>
                                        <div className="flex items-center gap-2 text-gold-primary font-bold text-xs tracking-widest pt-4">
                                            <Play size={14} className="fill-gold-primary" /> ENTER STAGE
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 border border-white/20 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase font-mono">Reaction Type-A</div>
                                </motion.div>

                                {/* Harmony Match Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('harmony')}
                                    className="glass-card relative h-[500px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <img src={store_desktop} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black mb-2 shadow-2xl">
                                            <Brain size={24} />
                                        </div>
                                        <h3 className="text-5xl font-impact text-white uppercase tracking-tighter">Harmony Match</h3>
                                        <p className="text-gray-400 font-light leading-relaxed">Neural resonance training. Match the sacred symbols and instruments of Zephyros.</p>
                                        <div className="flex items-center gap-2 text-white font-bold text-xs tracking-widest pt-4">
                                            <Play size={14} className="fill-white" /> INITIALIZE
                                        </div>
                                    </div>
                                    <div className="absolute top-6 right-6 border border-white/20 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase font-mono">Memory Type-B</div>
                                </motion.div>

                                {/* Synth Pad Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('synth')}
                                    className="glass-card relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-gold-primary/5 group-hover:bg-gold-primary/10 transition-colors"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-10 h-10 bg-gold-primary/20 rounded-lg flex items-center justify-center text-gold-primary">
                                            <Mic2 size={20} />
                                        </div>
                                        <h3 className="text-3xl font-impact text-white uppercase tracking-tighter">Synth Pad</h3>
                                        <p className="text-gray-500 text-xs">Melodic expression grid.</p>
                                    </div>
                                </motion.div>

                                {/* Lyric Runner Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('runner')}
                                    className="glass-card relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white">
                                            <Activity size={20} />
                                        </div>
                                        <h3 className="text-3xl font-impact text-white uppercase tracking-tighter">Lyric Runner</h3>
                                        <p className="text-gray-500 text-xs">Anthem speed-reading.</p>
                                    </div>
                                </motion.div>

                                {/* Freq Hunter Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('hunter')}
                                    className="glass-card relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-500">
                                            <Sliders size={20} />
                                        </div>
                                        <h3 className="text-3xl font-impact text-white uppercase tracking-tighter">Freq Hunter</h3>
                                        <p className="text-gray-500 text-xs">Precision signal locking.</p>
                                    </div>
                                </motion.div>

                                {/* Beat Machine Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('beat')}
                                    className="glass-card relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500">
                                            <Layout size={20} />
                                        </div>
                                        <h3 className="text-3xl font-impact text-white uppercase tracking-tighter">Beat Machine</h3>
                                        <p className="text-gray-500 text-xs">8-step loop sequencer.</p>
                                    </div>
                                </motion.div>

                                {/* Echo Hero Card */}
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedGame('echo')}
                                    className="glass-card relative h-[400px] rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
                                    <div className="absolute inset-6 flex flex-col justify-end space-y-4">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                                            <Hash size={20} />
                                        </div>
                                        <h3 className="text-3xl font-impact text-white uppercase tracking-tighter">Echo Hero</h3>
                                        <p className="text-gray-500 text-xs">Pattern memory training.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="game-view"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-4xl mx-auto glass-card h-[700px] rounded-[3rem] border border-gold-primary/10 relative overflow-hidden"
                        >
                            <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
                                <Volume2 size={14} className="text-gold-primary animate-pulse" />
                                <span className="text-[10px] text-gold-primary font-mono tracking-widest uppercase">Audio Transmission Active</span>
                            </div>

                            {selectedGame === 'rhythm' ? (
                                <RhythmMaster onBack={() => setSelectedGame(null)} />
                            ) : selectedGame === 'harmony' ? (
                                <HarmonyMatch onBack={() => setSelectedGame(null)} />
                            ) : selectedGame === 'synth' ? (
                                <SynthPad onBack={() => setSelectedGame(null)} />
                            ) : selectedGame === 'runner' ? (
                                <LyricRunner onBack={() => setSelectedGame(null)} />
                            ) : selectedGame === 'hunter' ? (
                                <FreqHunter onBack={() => setSelectedGame(null)} />
                            ) : selectedGame === 'beat' ? (
                                <BeatMachine onBack={() => setSelectedGame(null)} />
                            ) : (
                                <EchoHero onBack={() => setSelectedGame(null)} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Games;
