import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, Lock, AlertTriangle, Search, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isError?: boolean;
    isSystem?: boolean;
}

const PROFANITY_LIST = ['mf', 'bitch', 'fuck', 'motherfucker', 'tf', 'wtf', 'stupid', 'idiot', 'shit', 'ass'];

const DISCLAIMER_MESSAGE = `Disclaimer:
The Gyaviira Music Foundation values respectful and meaningful dialogue. Abusive, offensive, or unclear language will not be processed. Please rephrase your message in a constructive way so Rhythm can assist you. Continued misuse may result in restricted access.`;

// Extensive Knowledge Base
const KNOWLEDGE_BASE = [
    // Identity
    { keys: ['who are you', 'what are you', 'your name'], response: "I am **Rhythm**, the official AI guide for the **Gyaviira Music Foundation**. I'm here to assist you with information about our legacy, mission, and store. Is there anything specific you'd like to explore?" },
    { keys: ['who made you', 'creator', 'developer'], response: "I was developed to embody the digital harmony of the Foundation's vision." },

    // Mission & Vision
    { keys: ['mission', 'goal', 'purpose', 'aim'], response: "Our mission is a commitment to:\n\n*   **Bridge rhythm and truth** through education and performance.\n*   **Uplift communities** by celebrating the spirit of harmony.\n*   **Empower talent** using God-given musical gifts.\n\nWould you like to learn more about our specific programs?" },
    { keys: ['vision', 'dream', 'future'], response: "We envision a future where:\n\n1.  Every child has the opportunity to **hold an instrument**.\n2.  Every community can **hear its own songs** celebrated.\n3.  Faith and creativity unite to **inspire hope** across generations." },
    { keys: ['values', 'belief', 'faith'], response: "The Foundation is built on three core pillars:\n\n*   **Faith**: Our spiritual foundation.\n*   **Legacy**: Honoring the traditions of the past.\n*   **Creativity**: Inspiring the artists of tomorrow." },

    // Foundation Info
    { keys: ['about', 'history', 'story', 'what is gyaviira'], response: "The **Gyaviira Music Foundation** honors the timeless power of music as heritage. We exist to:\n\n*   Preserve deep-rooted cultural traditions.\n*   Inspire the next generation of creative visionaries.\n*   Share a living anthem of hope with the world." },
    { keys: ['founder', 'who started', 'ceo', 'manager'], response: "The Foundation was established by visionary leaders dedicated to music and faith. Detailed profiles are available on our **About** page.\n\n[Go to About Page](/about)", action: '/about' },

    // Store & Merch
    { keys: ['store', 'shop', 'buy', 'purchase', 'price', 'cost'], response: "Our **Gold Collection** includes:\n\n*   **Signature Caps**: $25.00\n*   **Impact Hoodies**: $55.00\n*   **Member Tees**: $30.00\n\nWould you like me to take you to the store?", action: '/store' },
    { keys: ['instruments', 'buy instrument', 'kora', 'drum'], response: "We offer handcrafted instruments including **Koras**, **Djembes**, and **Kalimbas**. You can find them in our specialized Instruments shop.\n\n[Explore Instruments](/instruments)", action: '/instruments' },
];

const ALL_COMMANDS = [
    "--- NAVIGATION ---",
    "/home - Go to homepage", "/about - Visit About page", "/store - Visit Store", "/contact - Visit Contact", "/shop - Open Shop",
    "--- FOUNDATION ---",
    "/mission - View Mission", "/vision - View Vision", "/goal - View Goals", "/values - Core Values", "/heritage - Our History",
    "/faith - Gospel Focus", "/culture - Traditions", "/founder - Founder Info", "/manager - Manager Info", "/choir - Music Groups",
    "--- STORE ---",
    "/caps - View Caps", "/hoodies - View Hoodies", "/shirts - View Shirts", "/prices - Price List", "/flyer - Project Flyer",
    "/download - Download menu", "/cart - Checkout", "/sizes - Size Guide", "/payment - Pay Options", "/shipping - Ship Info",
    "--- INTERACTIVE ---",
    "/joke - Get a joke", "/quote - Music quote", "/music - Random song fact", "/bless - Daily blessing", "/time - Current time",
    "/status - System health", "/help - Basic help", "/clear - Reset chat", "/ping - Latency check", "/analyze - System scan",
    "--- LEGACY ---",
    "/rhythm - Meaning of Rhythm", "/harmony - Spirit of Unity", "/wisdom - Ancestral wisdom", "/mentor - Join program", "/outreach - Community work"
];

const RhythmChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm **Rhythm**, your official AI guide at **Gyaviira**. I'm here to help you navigate our mission and foundation.\n\nYou can ask me about:\n*   **Our Mission & Values**\n*   **Merchandise & Instruments**\n*   **Upcoming Events**\n\nHow can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [researchStep, setResearchStep] = useState<string | null>(null);
    const [violationCount, setViolationCount] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [unlockTime, setUnlockTime] = useState<Date | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, researchStep]);

    useEffect(() => {
        let interval: any;
        if (isLocked && unlockTime) {
            interval = setInterval(() => {
                const now = new Date();
                if (now >= unlockTime) {
                    setIsLocked(false);
                    setUnlockTime(null);
                    setViolationCount(0);
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: "Security lock lifted. System ready for respectful dialogue.",
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLocked, unlockTime]);

    const handleSend = () => {
        if (!inputText.trim() || isLocked) return;

        const userText = inputText;
        const lowerInput = userText.toLowerCase().trim();

        // Profanity Check
        if (PROFANITY_LIST.some(word => new RegExp(`\\b${word}\\b`, 'i').test(lowerInput))) {
            const newViolationCount = violationCount + 1;
            setViolationCount(newViolationCount);
            setMessages(prev => [...prev,
            { id: Date.now(), text: userText, sender: 'user', timestamp: new Date() },
            { id: Date.now() + 1, text: DISCLAIMER_MESSAGE, sender: 'bot', timestamp: new Date(), isError: true }
            ]);
            setInputText('');
            if (newViolationCount >= 2) {
                setIsLocked(true);
                setUnlockTime(new Date(Date.now() + 180000));
                setTimeout(() => setMessages(prev => [...prev, { id: Date.now() + 2, text: "🔒 System Locked. Offensive pattern detected twice. Retry in 3 minutes.", sender: 'bot', timestamp: new Date(), isError: true }]), 500);
            }
            return;
        }

        const userMessage: Message = { id: Date.now(), text: userText, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Command Processing
        if (lowerInput.startsWith('/')) {
            processCommand(lowerInput);
            return;
        }

        // AI "Thinking" and "Researching" Simulation
        simulateResearch(lowerInput);
    };

    const simulateResearch = (input: string) => {
        setIsTyping(true);
        const steps = [
            "Searching foundation archives...",
            "Synthesizing heritage data...",
            "Cross-referencing mission parameters...",
            "Generating structured response..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                setResearchStep(steps[stepIndex]);
                stepIndex++;
            } else {
                clearInterval(interval);
                setResearchStep(null);
                generateResponse(input);
            }
        }, 800);
    };

    const generateResponse = (input: string) => {
        let responseText = "My internal research indicates you are asking about things beyond my current primary directive. I can tell you about our Mission, Store, or Legacy. Type /cmd for all options.";
        let action: any = null;

        for (const item of KNOWLEDGE_BASE) {
            if (item.keys.some(key => input.includes(key))) {
                responseText = item.response;
                if (item.action) action = () => navigate(item.action as string);
                break;
            }
        }

        if (input.includes('explain') || input.includes('rewrite')) {
            responseText = "Rigorously analyzed core: The **Gyaviira Music Foundation** is a bastion of faith-led creativity, bridging the rhythmic traditions of the past with the hopeful melodies of tomorrow through Gospel-centered outreach and education.";
        }

        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: 'bot', timestamp: new Date() }]);
        setIsTyping(false);
        if (action) setTimeout(action, 1500);
    };

    const processCommand = (cmd: string) => {
        setIsTyping(true);
        setTimeout(() => {
            let res = "Unrecognized command. Type /cmd for a list of valid directives.";
            let action: any = null;

            if (cmd === '/clear') {
                setMessages([{ id: Date.now(), text: "System memory reset. All buffers cleared.", sender: 'bot', timestamp: new Date(), isSystem: true }]);
                setIsTyping(false);
                return;
            }

            if (cmd === '/cmd') res = "AVAILABLE COMMANDS:\n" + ALL_COMMANDS.join('\n');
            else if (cmd === '/help') res = "I am Rhythm AI. Use /cmd to see all 40+ specialized commands for navigating this site and learning about our mission.";
            else if (cmd === '/home') { res = "Returning to Home."; action = () => navigate('/'); }
            else if (cmd === '/about' || cmd === '/mission' || cmd === '/vision') { res = "Transporting to About/Legacy section."; action = () => navigate('/about'); }
            else if (cmd === '/store' || cmd === '/shop' || cmd === '/caps' || cmd === '/hoodies') { res = "Opening the Store."; action = () => navigate('/store'); }
            else if (cmd === '/contact' || cmd === '/email') { res = "Opening Contact Portal."; action = () => navigate('/contact'); }
            else if (cmd === '/joke') res = "Why was the guitarist arrested? For fingering A minor.";
            else if (cmd === '/time') res = "The current temporal coordinate is: " + new Date().toLocaleTimeString();
            else if (cmd === '/status') res = "System Health: 100%. Autonomy: High. Gospel Resonance: Perfect.";
            else if (cmd === '/bless') res = "May your path be paved with harmony and your heart filled with the rhythm of grace today.";
            else if (cmd === '/music') res = "Did you know? Music frequency 432Hz is often said to be mathematically consistent with the universe.";

            setMessages(prev => [...prev, { id: Date.now(), text: res, sender: 'bot', timestamp: new Date(), isSystem: true }]);
            setIsTyping(false);
            if (action) setTimeout(action, 1500);
        }, 600);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsOpen(true)}
                            className="w-16 h-16 bg-gradient-to-br from-gold-primary to-gold-dark rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center text-black relative group"
                        >
                            <div className="absolute inset-0 rounded-full bg-gold-light opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-1000"></div>
                            {isLocked ? <Lock size={28} /> : <Bot size={32} />}
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="w-[350px] md:w-[450px] h-[600px] bg-black/95 backdrop-blur-2xl border border-gold-primary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[#111] to-black p-5 flex justify-between items-center border-b border-gold-primary/10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-gold-primary/30 relative ${isLocked ? 'bg-red-900/10' : 'bg-gold-primary/10'}`}>
                                        {isLocked ? <Lock size={20} className="text-red-500" /> : <Sparkles size={20} className="text-gold-primary animate-pulse" />}
                                        <div className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    </div>
                                    <div>
                                        <h3 className="font-impact text-gold-primary text-xl tracking-tighter uppercase">Rhythm AI</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] text-gray-500 font-mono">AUTONOMOUS MODE V5.0</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                {messages.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                            ? 'bg-gold-primary text-black font-bold rounded-tr-none shadow-lg'
                                            : msg.isError
                                                ? 'bg-red-900/20 text-red-100 border border-red-500/50 rounded-tl-none'
                                                : msg.isSystem
                                                    ? 'bg-blue-900/10 text-blue-100 border border-blue-500/30 font-mono text-xs rounded-tl-none'
                                                    : 'bg-black-soft text-gray-200 border border-white/5 rounded-tl-none shadow-xl'
                                            }`}>
                                            {msg.text}
                                            <div className="text-[9px] mt-2 opacity-40 text-right">{msg.timestamp.toLocaleTimeString()}</div>
                                        </div>
                                    </motion.div>
                                ))}
                                {researchStep && (
                                    <div className="flex items-center gap-3 text-gold-primary/60 text-xs font-mono animate-pulse p-2">
                                        <Search size={14} />
                                        <span>{researchStep}</span>
                                    </div>
                                )}
                                {isTyping && !researchStep && (
                                    <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-100"></div><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-200"></div></div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-5 bg-black border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isLocked ? "ACCESS DENIED" : "Input directive..."}
                                        disabled={isLocked}
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl py-4 pl-5 pr-14 focus:outline-none focus:border-gold-primary/40 transition-all font-mono text-sm placeholder:text-gray-700"
                                    />
                                    <button
                                        onClick={handleSend} disabled={isLocked}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isLocked ? 'bg-gray-800' : 'bg-gold-primary hover:bg-gold-light shadow-gold'}`}
                                    >
                                        <Terminal size={18} className="text-black" />
                                    </button>
                                </div>
                                {isLocked && unlockTime && (
                                    <div className="mt-3 text-center flex items-center justify-center gap-2 text-red-500 font-mono text-[10px] animate-pulse">
                                        <AlertTriangle size={12} />
                                        <span>SYSTEM COOL DOWN: {Math.ceil((unlockTime.getTime() - Date.now()) / 1000)}s</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default RhythmChat;
