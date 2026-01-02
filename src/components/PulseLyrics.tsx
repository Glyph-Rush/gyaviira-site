import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Mic2, Waves, Zap } from 'lucide-react';

const LYRIC_TEMPLATES = {
    zephyros: {
        intro: [
            "The skies of Zephyros burn in gold",
            "The wind hums a story untold",
            "Beyond the stars, where rhythms meet",
            "Gravity fades as the anthem takes hold",
            "Neon horizons in the digital cold",
            "The silent orbit of a love yet bold"
        ],
        verse: [
            "Digital echoes in the cosmic dust",
            "In ancient frequencies we place our trust",
            "The pulse of the planet begins to rise",
            "Silicon souls in a world of starlight",
            "We dance on the rings of a neon night",
            "Tracing the data where the spirit flies",
            "A symphony carved in the obsidian deep",
            "Voices of machines that never sleep",
            "Electronic tears in the innovator's eyes"
        ],
        chorus: [
            "Sing for the world that was born in the sound",
            "Grace in the air, and the rhythm on the ground",
            "Zephyros calls, we are bound to the beat",
            "Infinite motion in a finite space",
            "Reflections of glory on a digital face",
            "The melody of home where the light is sweet"
        ],
        outro: [
            "Fading into the light...",
            "The transmission continues.",
            "Signal lost in the haze.",
            "Resonating forever."
        ]
    },
    resilience: {
        intro: [
            "From the silence, a power is born",
            "The night is long, but we wait for the morn",
            "Stone by stone, we build the song",
            "Through the fire and the pouring rain",
            "A strength that's forged within the pain",
            "Holding steady, where we belong"
        ],
        verse: [
            "Broken strings and a heart of steel",
            "The power of hope is the only thing real",
            "We rise from the ashes of the quiet years",
            "Testing the limits of a grounded soul",
            "Finding the pieces that make us whole",
            "Wiping away the technological tears",
            "We are the builders of the bridge unseen",
            "Living the dream in the space between",
            "Conquering doubts and historical fears"
        ],
        chorus: [
            "Unbreakable rhythm, a spirit so pure",
            "Through every storm, our anthems endure",
            "Resilience is the key to the movement",
            "The beat goes on as we climb the height",
            "A beacon of hope in the dead of night",
            "The divine design of our improvement"
        ],
        outro: [
            "Keep the pulse alive.",
            "Strength in every note.",
            "Stand tall in the harmony.",
            "Endurance finalized."
        ]
    },
    faith: {
        intro: [
            "The heartbeat of grace is a steady sound",
            "On Holy Ground, where truth is found",
            "Lifting our voices to the King of Kings",
            "A light that filters through the dark",
            "The eternal flame, the sacred spark",
            "The peace that only the morning brings"
        ],
        verse: [
            "Every breath is a gift from the source",
            "Life flows on its divine course",
            "The rhythm of mercy is never-ending",
            "Signed in the stars, sealed in the soul",
            "His holy power will make us whole",
            "To the highest heaven, our praise is ascending",
            "Walking by faith and not by sight",
            "Basking in the glory of the perfect light",
            "The broken heart that we are mending"
        ],
        chorus: [
            "Grace in the melody, hope in the chord",
            "We sing our praise to the living Lord",
            "Faith is the pulse that carries us home",
            "The anchor holds in the shifting sea",
            "The truth that sets the captive free",
            "Wherever we wander, wherever we roam"
        ],
        outro: [
            "Shalom.",
            "Eternal Harmony.",
            "Blessings in the beat.",
            "Amen."
        ]
    },
    heritage: {
        intro: [
            "From the roots of the ancient tree",
            "The echoes of what used to be",
            "Ancestors whispering in the drum",
            "A lineage carved in the sacred wood",
            "The spirit of where our fathers stood",
            "The power of where we come from"
        ],
        verse: [
            "Strings of the kora, voices of old",
            "Stories and secrets waiting to be told",
            "The preservation of a fragile flame",
            "Tradition breathing through the modern air",
            "Connecting the dots between here and there",
            "Honoring every ancestral name",
            "The rhythm was here before time began",
            "The master design, the holy plan",
            "A fire that nothing can ever tame"
        ],
        chorus: [
            "Legacy thriving in the pulse of today",
            "The ancient of days will show us the way",
            "Heritage is the heart of the sound",
            "Bridging the gap with a melody strong",
            "Singing the rhythms that forever belong",
            "Roots that are deep in the sacred ground"
        ],
        outro: [
            "Roots deep.",
            "Legacy preserved.",
            "Honor the path.",
            "Historical pulse."
        ]
    },
    innovation: {
        intro: [
            "Circuitry singing in the dead of night",
            "The pulse of a new and blinding light",
            "The future is calling the brave",
            "New horizons in the binary sky",
            "A dream that refuses to ever die",
            "The technology that we crave"
        ],
        verse: [
            "Codes of creation, bytes of the soul",
            "The vision that makes the broken whole",
            "Synthesizing life from a digital breath",
            "The data of hope in a world of war",
            "A portal to what we are waiting for",
            "Conquering silence, conquering death",
            "High-speed signals in the void of space",
            "The evolution of the human race",
            "The knowledge that only the master saith"
        ],
        chorus: [
            "Techno-resilience, a digital truth",
            "The wisdom of age and the fire of youth",
            "Innovation is the pulse of the new",
            "Breaking the barriers of time and sound",
            "The miracles waiting to be found",
            "Making the impossible dreams come true"
        ],
        outro: [
            "Beyond advanced.",
            "Future secured.",
            "Pulsing forward.",
            "System evolved."
        ]
    }
};

const PulseLyrics: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const generateLyrics = (themeKey: string) => {
        setIsGenerating(true);
        const templates = LYRIC_TEMPLATES[themeKey as keyof typeof LYRIC_TEMPLATES] || LYRIC_TEMPLATES.zephyros;

        const steps = [
            "INITIALIZING NEURAL RYHTM CORE...",
            "ANALYZING SYLLABIC DENSITY...",
            "CALIBRATING METER & CADENCE...",
            "SYNTHESIZING RHYME SCHEME (AABB)...",
            "MAPPING THEMATIC RESONANCE TO ZEPHYROS LORE...",
            "EXTRACTING POETIC FREQUENCIES...",
            "FINALIZING VERSE STRUCTURE...",
            "TRANSMITTING CREATIVE SIGNAL..."
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < steps.length) {
                setStatus(steps[step]);
                step++;
            } else {
                clearInterval(interval);

                const getRandom = (arr: string[], count: number) => {
                    const shuffled = [...arr].sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                };

                const generated = [
                    "// MIRAGE-V CREATIVE SIGNAL DETECTED",
                    "// THEME: " + themeKey.toUpperCase(),
                    "",
                    ...getRandom(templates.intro, 1),
                    "",
                    ...getRandom(templates.verse, 3),
                    "",
                    "[CHORUS: HARMONIC PEAK]",
                    ...getRandom(templates.chorus, 2),
                    "",
                    "// TRANSMISSION COMPLETE",
                    ...getRandom(templates.outro, 1)
                ];
                setOutput(generated);
                setStatus(null);
                setIsGenerating(false);
            }
        }, 800);
    };

    const handleInput = () => {
        if (isGenerating) return;
        const input = inputText.toLowerCase();
        if (input.includes('faith') || input.includes('god') || input.includes('grace')) generateLyrics('faith');
        else if (input.includes('strong') || input.includes('resilience') || input.includes('power')) generateLyrics('resilience');
        else if (input.includes('zephyros') || input.includes('future') || input.includes('cosmic')) generateLyrics('zephyros');
        else if (input.includes('heritage') || input.includes('root') || input.includes('ancestor') || input.includes('history')) generateLyrics('heritage');
        else if (input.includes('innovation') || input.includes('tech') || input.includes('digital') || input.includes('circuit')) generateLyrics('innovation');
        else {
            setStatus("THEME NOT FOUND. RE-RE-INITIALIZING...");
            setTimeout(() => setStatus("TRY: 'FAITH', 'RESILIENCE', 'ZEPHYROS', 'HERITAGE', or 'INNOVATION'"), 1500);
            setTimeout(() => setStatus(null), 4000);
        }
        setInputText('');
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center text-white relative group"
                    >
                        <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-1000"></div>
                        <Mic2 size={28} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        className="w-[350px] md:w-[400px] h-[550px] bg-[#050505]/95 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-cyan-950/40 to-black p-5 flex justify-between items-center border-b border-cyan-500/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 relative">
                                    <Waves size={20} className="text-cyan-400 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-impact text-cyan-400 text-lg tracking-tighter uppercase">Pulse AI</h3>
                                    <span className="text-[9px] text-cyan-700 font-mono tracking-[0.2em]">LYRIC ENGINE V1.0</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-cyan-900 hover:text-cyan-400 transition-colors"><X size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {output.length === 0 && !status && (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <Music size={48} className="text-cyan-500" />
                                    <p className="font-mono text-xs uppercase tracking-widest px-10">Input a theme to generate futuristic verses...</p>
                                </div>
                            )}

                            {status && (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="flex justify-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [10, 30, 10] }}
                                                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                                    className="w-1 bg-cyan-500 rounded-full"
                                                />
                                            ))}
                                        </div>
                                        <p className="font-mono text-[10px] text-cyan-500 uppercase animate-pulse">{status}</p>
                                    </div>
                                </div>
                            )}

                            {!status && output.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-1"
                                >
                                    {output.map((line, i) => (
                                        <p key={i} className={`font-mono text-sm ${line.startsWith('[') ? 'text-cyan-600 font-bold mt-4 mb-2' : 'text-gray-300'}`}>
                                            {line}
                                        </p>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="p-5 bg-black/50 border-t border-cyan-500/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleInput()}
                                    placeholder="Enter theme (e.g. Faith)"
                                    className="w-full bg-cyan-950/10 border border-cyan-500/20 text-cyan-100 rounded-xl py-3 pl-5 pr-12 focus:outline-none focus:border-cyan-500/60 transition-all font-mono text-xs placeholder:text-cyan-900"
                                />
                                <button
                                    onClick={handleInput}
                                    disabled={isGenerating}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <Zap size={16} className="text-black" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PulseLyrics;
