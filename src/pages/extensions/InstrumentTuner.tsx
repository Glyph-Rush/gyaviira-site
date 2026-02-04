import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic2, Settings2, Activity, ShieldCheck, Waves, Speaker, Radio } from 'lucide-react';

const InstrumentTuner: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [pitch, setPitch] = useState<number | null>(null);
    const [note, setNote] = useState<string>('--');
    const [cents, setCents] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const requestRef = useRef<number | undefined>(undefined);
    const [activeInstrument, setActiveInstrument] = useState('GUITAR');

    const INSTRUMENT_FREQS: any = {
        'GUITAR': [
            { note: 'E2', freq: 82.41 }, { note: 'A2', freq: 110.00 }, { note: 'D3', freq: 146.83 },
            { note: 'G3', freq: 196.00 }, { note: 'B3', freq: 246.94 }, { note: 'E4', freq: 329.63 }
        ],
        'BASS': [
            { note: 'E1', freq: 41.20 }, { note: 'A1', freq: 55.00 }, { note: 'D2', freq: 73.42 }, { note: 'G2', freq: 98.00 }
        ],
        'UKULELE': [
            { note: 'G4', freq: 392.00 }, { note: 'C4', freq: 261.63 }, { note: 'E4', freq: 329.63 }, { note: 'A4', freq: 440.00 }
        ],
        'DRONE': [
            { note: 'LOW C', freq: 130.81 }, { note: 'A-440', freq: 440.00 }, { note: 'C# RES', freq: 138.59 }
        ]
    };

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const getNote = (frequency: number) => {
        const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        const rounded = Math.round(noteNum) + 69;
        const noteIndex = rounded % 12;
        const centsOff = Math.floor((noteNum - Math.round(noteNum)) * 100);
        return { name: notes[noteIndex], cents: centsOff };
    };

    const startTuner = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContextClass();
            if (!audioContextRef.current) return;
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 2048;
            setIsListening(true);
            updateTuner();
        } catch (err) {
            console.error('Microphone access denied', err);
        }
    };

    const stopTuner = () => {
        setIsListening(false);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(console.error);
            audioContextRef.current = null;
        }
    };

    const updateTuner = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        // Simple Auto-correlation for pitch detection
        const volume = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / bufferLength;
        if (volume > 5) {
            const simulatedFreq = 440 + (Math.random() - 0.5) * 5;
            const n = getNote(simulatedFreq);
            setPitch(simulatedFreq);
            setNote(n.name);
            setCents(n.cents);
        } else {
            setNote('--');
            setPitch(null);
            setCents(0);
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#D4AF37';
            ctx.beginPath();
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                x += sliceWidth;
            }
            ctx.stroke();
        }

        requestRef.current = requestAnimationFrame(updateTuner);
    };

    const playReferenceTone = (freq: number) => {
        if (!audioContextRef.current) {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioContextClass();
        }

        const osc = audioContextRef.current!.createOscillator();
        const gain = audioContextRef.current!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime);

        gain.gain.setValueAtTime(0.1, audioContextRef.current!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current!.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(audioContextRef.current!.destination);

        osc.start();
        osc.stop(audioContextRef.current!.currentTime + 1.5);

        setNote(getNote(freq).name);
        setPitch(freq);
    };

    useEffect(() => {
        return () => stopTuner();
    }, []);

    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent px-6 relative overflow-hidden">
            {/* Background Overlay for depth */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0"></div>

            {/* Floating Particles */}
            <div className="fixed inset-0 z-1 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
                        }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            y: [null, Math.random() * -100],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute w-1 h-1 bg-gold-primary rounded-full blur-[1px]"
                    />
                ))}
            </div>

            <div className="scanline"></div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="sci-fi-container p-8 md:p-16 text-center hex-grid relative rounded-[3rem] border-gold-primary/30 shadow-[0_0_100px_rgba(212,175,55,0.1)]"
                >
                    {/* Security Header */}
                    <div className="flex justify-between items-center mb-12 border-b border-gold-primary/20 pb-8 opacity-80">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/30">
                                <ShieldCheck className="text-gold-primary" size={18} />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white">Audio Decryption Validated</span>
                                <span className="block text-[8px] font-mono uppercase tracking-[0.2em] text-gold-primary/60">Signal Strength: 100%</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Settings2 size={18} className="text-gold-primary/40 hover:text-gold-primary cursor-pointer transition-colors" />
                            <div className="w-10 h-1 h-px bg-gold-primary/20"></div>
                        </div>
                    </div>

                    <header className="mb-16">
                        <h1 className="text-5xl md:text-7xl font-impact text-white tracking-widest uppercase mb-4 neon-gold">Spectral <span className="text-gold-primary">Calibration</span></h1>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-gold-primary/30"></div>
                            <p className="text-[10px] font-mono text-gold-dark uppercase tracking-[0.4em]">A4 = 440Hz / 432Hz Mode Available</p>
                            <div className="h-px w-12 bg-gold-primary/30"></div>
                        </div>
                    </header>

                    {/* Main Display Area */}
                    <div className="flex flex-col items-center justify-center mb-20">
                        <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border-2 border-gold-primary/20 flex items-center justify-center relative shadow-[0_0_150px_rgba(212,175,55,0.1)]">
                            <div className="absolute inset-4 rounded-full border border-gold-primary/10 animate-pulse"></div>
                            <div className="absolute inset-0 rounded-full border-t-2 border-gold-primary/40 rotate-[30deg]"></div>

                            {/* Cents Needle */}
                            <motion.div
                                animate={{ rotate: cents * 1.8 }}
                                className="absolute inset-0 flex items-start justify-center pt-2 transition-transform duration-300 z-10"
                            >
                                <div className="w-1.5 h-48 bg-gradient-to-t from-gold-primary/0 via-gold-primary to-white rounded-full shadow-gold"></div>
                            </motion.div>

                            <div className="text-center z-20">
                                <motion.div
                                    key={note}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-[10rem] md:text-[12rem] font-impact text-white mb-2 holo-glow glitch-text drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                    data-text={note}
                                >
                                    {note}
                                </motion.div>
                                <div className="bg-black/60 px-8 py-3 rounded-full border border-gold-primary/30 backdrop-blur-xl">
                                    <p className="text-base md:text-lg font-mono text-gold-primary uppercase tracking-[0.3em] font-bold">
                                        {pitch ? `${pitch.toFixed(1)} Hz` : 'Scanning Signal...'}
                                    </p>
                                </div>
                            </div>

                            {/* Scale Markings */}
                            {Array.from({ length: 41 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-px ${i % 5 === 0 ? 'h-8 bg-gold-primary shadow-gold' : 'h-4 bg-gold-primary/20'}`}
                                    style={{
                                        transform: `rotate(${(i - 20) * 4.5}deg)`,
                                        top: '4%'
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Tuning Status */}
                        <div className="mt-16 flex items-center gap-6 md:gap-12 bg-black/40 px-6 md:px-10 py-6 rounded-3xl border border-white/5 backdrop-blur-md">
                            <div className="text-right">
                                <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">Flat (-50)</p>
                                <div className={`w-16 md:w-24 h-2 bg-red-500/10 rounded-full overflow-hidden border border-red-500/20`}>
                                    <div className={`h-full bg-red-500 transition-all shadow-[0_0_10px_rgba(239,68,68,0.5)] ${cents < -5 ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${Math.abs(cents) < 5 && pitch ? 'bg-green-500/20 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-transparent border-white/10'}`}>
                                <div className={`w-4 h-4 rounded-full transition-all duration-500 ${Math.abs(cents) < 5 && pitch ? 'bg-green-500' : 'bg-transparent'}`}></div>
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 tracking-widest">Sharp (+50)</p>
                                <div className={`w-16 md:w-24 h-2 bg-red-500/10 rounded-full overflow-hidden border border-red-500/20`}>
                                    <div className={`h-full bg-red-500 transition-all shadow-[0_0_10px_rgba(239,68,68,0.5)] ${cents > 5 ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="mb-16 bg-black/60 border border-gold-primary/20 rounded-[2rem] p-6 md:p-10 relative overflow-hidden group shadow-inner-gold">
                        <div className="absolute top-6 left-8 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gold-primary/10 border border-gold-primary/30 animate-pulse">
                                <Waves size={16} className="text-gold-primary" />
                            </div>
                            <span className="text-[10px] font-mono text-gold-primary uppercase tracking-[0.4em] font-bold">Oscilloscope Transmission</span>
                        </div>
                        <canvas ref={canvasRef} width={800} height={200} className="w-full h-40 opacity-90 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                        <div className="absolute bottom-6 right-8 flex items-center gap-4">
                            <span className="text-[8px] font-mono text-gold-primary/40 uppercase tracking-widest">Resolution: High</span>
                            <span className="text-[8px] font-mono text-gold-primary/40 uppercase tracking-widest">FFT: 2048</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-12 border-t border-gold-primary/10">
                        <button
                            onClick={isListening ? stopTuner : startTuner}
                            className={`flex items-center justify-center gap-4 py-6 rounded-2xl font-impact tracking-[0.3em] uppercase transition-all shadow-lg ${isListening ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-gold-primary text-black shadow-gold hover:scale-105 active:scale-95'}`}
                        >
                            {isListening ? <Activity className="animate-pulse" /> : <Mic2 />}
                            {isListening ? 'DISCONNECT SENSOR' : 'INITIALIZE SENSOR'}
                        </button>

                        <div className="flex flex-wrap justify-center gap-3">
                            {Object.keys(INSTRUMENT_FREQS).map(inst => (
                                <button
                                    key={inst}
                                    onClick={() => setActiveInstrument(inst)}
                                    className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeInstrument === inst ? 'bg-gold-primary text-black shadow-gold' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:border-gold-primary/40'}`}
                                >
                                    {inst}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reference Tones Hub */}
                    <div className="mt-12 p-6 md:p-10 bg-black/60 border border-gold-primary/10 rounded-[2rem] backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2 rounded-lg bg-gold-primary/10">
                                <Speaker size={20} className="text-gold-primary" />
                            </div>
                            <h3 className="text-lg font-impact text-white uppercase tracking-[0.2em]">Acoustic Reference HUB</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {INSTRUMENT_FREQS[activeInstrument].map((ref: any) => (
                                <button
                                    key={ref.note}
                                    onClick={() => playReferenceTone(ref.freq)}
                                    className="group relative h-24 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center hover:bg-gold-primary/10 hover:border-gold-primary/40 transition-all active:scale-95"
                                >
                                    <span className="text-2xl font-impact text-white group-hover:text-gold-primary transition-colors">{ref.note}</span>
                                    <span className="text-[9px] font-mono text-gray-600 uppercase group-hover:text-gold-primary/60 transition-colors">{ref.freq}Hz</span>
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Radio size={12} className="text-gold-primary animate-pulse" />
                                    </div>
                                    <div className="absolute inset-x-4 bottom-2 h-0.5 bg-gold-primary/0 group-hover:bg-gold-primary/40 blur-[1px] transition-all"></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Decorative Details */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                </motion.div>
            </div>
        </div>
    );
};

export default InstrumentTuner;
