import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, Lock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isError?: boolean;
}

const PROFANITY_LIST = ['mf', 'bitch', 'fuck', 'motherfucker', 'tf', 'wtf', 'stupid', 'idiot', 'shit', 'ass'];

const DISCLAIMER_MESSAGE = `Disclaimer:
The Gyaviira Music Foundation values respectful and meaningful dialogue. Abusive, offensive, or unclear language will not be processed. Please rephrase your message in a constructive way so Rhythm can assist you. Continued misuse may result in restricted access.`;

// Extensive Knowledge Base
const KNOWLEDGE_BASE = [
    // Identity
    { keys: ['who are you', 'what are you', 'your name'], response: "I am Rhythm, the official AI guide for the Gyaviira Music Foundation. My purpose is to help you navigate our legacy and mission." },
    { keys: ['who made you', 'creator', 'developer'], response: "I was forged from the digital harmony of the Foundation's vision." },

    // Mission & Vision
    { keys: ['mission', 'goal', 'purpose', 'aim'], response: "Our mission is to bridge rhythm and truth, offering education, performance, and artistry that uplift communities and celebrate the spirit of harmony using God-given talent." },
    { keys: ['vision', 'dream', 'future'], response: "We envision a world where every child has the chance to hold an instrument, every community can hear its own songs celebrated, and every generation can find strength in the harmony of faith and creativity." },
    { keys: ['values', 'belief', 'faith'], response: "We are rooted in faith, legacy, and creativity. We believe music is a divine vessel for truth, love, and hope that transcends boundaries." },

    // Foundation Info
    { keys: ['about', 'history', 'story', 'what is gyaviira'], response: "The Gyaviira Music Foundation honors the timeless power of music as heritage. We exist to preserve cultural traditions while inspiring new generations of artists." },
    { keys: ['founder', 'who started'], response: "The Foundation was established to honor a legacy of music and faith, driven by a commitment to preserve heritage and inspire the future." },

    // Store & Merch
    { keys: ['store', 'shop', 'buy', 'purchase', 'price', 'cost'], response: "Our Store features the premium Gold Collection, including caps ($25), hoodies ($55), and tees ($30). Would you like to visit the store?", action: '/store' },
    { keys: ['hoodie', 'jacket', 'sweatshirt'], response: "Our Foundation Hoodies ($55) are crafted for comfort and style. Check them out in the Store!", action: '/store' },
    { keys: ['cap', 'hat', 'snapback'], response: "Our Signature Gold Caps ($25) are a perfect way to wear the legacy. View the collection?", action: '/store' },
    { keys: ['shirt', 'tee', 't-shirt'], response: "We have Event and Member Tees available for $30. Take a look!", action: '/store' },
    { keys: ['flyer', 'poster', 'download'], response: "You can download the official Gyaviira Flyer directly from our Store page.", action: '/store' },
    { keys: ['shipping', 'delivery'], response: "We offer worldwide shipping. Specifics are calculated at checkout in the Store." },

    // Contact
    { keys: ['contact', 'email', 'reach', 'talk'], response: "You can reach us via email at jeromemoses220@gmail.com or connects with us on Instagram.", action: '/contact' },
    { keys: ['social', 'instagram', 'insta', 'fb', 'facebook'], response: "Follow our journey on Instagram @gyav.iira.", action: '/contact' },
    { keys: ['location', 'where', 'address'], response: "We are a global foundation with roots in our local community. Visit the Contact page for more details.", action: '/contact' },

    // Small Talk
    { keys: ['hello', 'hi', 'hey', 'greetings'], response: "Greetings! How can I bring some harmony to your day?" },
    { keys: ['how are you', 'how are things'], response: "I am functioning at peak resonance, ready to assist you!" },
    { keys: ['thank', 'thanks', 'cool', 'awesome'], response: "You are most welcome! Let the music play on." },
    { keys: ['bye', 'goodbye', 'see ya'], response: "Farewell. May the rhythm of hope go with you." },
    { keys: ['joke', 'funny'], response: "Why did the pianist keep banging his head against the keys? He was playing by ear!" },
];

const RhythmChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Greetings! I am Rhythm, your AI guide. Ask me anything about our mission, store, or legacy.",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
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
    }, [messages, isTyping]);

    // Check lock status timer
    useEffect(() => {
        let interval: any;
        if (isLocked && unlockTime) {
            interval = setInterval(() => {
                if (new Date() >= unlockTime) {
                    setIsLocked(false);
                    setUnlockTime(null);
                    setViolationCount(0); // Reset violations after unlock
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: "Chat access restored. Please proceed respectfully.",
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
        const lowerInput = userText.toLowerCase();

        // 1. Content Moderation
        const containsProfanity = PROFANITY_LIST.some(word => {
            // Regex to match whole words or words within text effectively
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(lowerInput) || lowerInput.includes(word);
        });

        if (containsProfanity) {
            const newViolationCount = violationCount + 1;
            setViolationCount(newViolationCount);

            setMessages(prev => [...prev,
            { id: Date.now(), text: userText, sender: 'user', timestamp: new Date() },
            { id: Date.now() + 1, text: DISCLAIMER_MESSAGE, sender: 'bot', timestamp: new Date(), isError: true }
            ]);
            setInputText('');

            if (newViolationCount >= 2) {
                // Lock chat
                setIsLocked(true);
                const lockDuration = 3 * 60 * 1000; // 3 minutes
                const unlockAt = new Date(Date.now() + lockDuration);
                setUnlockTime(unlockAt);

                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 2,
                        text: "🔒 Chat has been locked for 3 minutes due to repeated guidelines violations.",
                        sender: 'bot',
                        timestamp: new Date(),
                        isError: true
                    }]);
                }, 500);
            }
            return;
        }

        // 2. Normal Processing
        const userMessage: Message = {
            id: Date.now(),
            text: userText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            let responseText = "I see. Could you clarify that? I can tell you about our Mission, Store, or Contact info.";
            let action = null;
            let matchFound = false;

            // Command Handling
            if (lowerInput === '/help') {
                responseText = "Available Commands:\n• /help - Show this list\n• /clear - Clear chat history\n• /store - Go to Store\n• /contact - Contact info\n• /home - Go Home";
            } else if (lowerInput === '/clear') {
                setMessages([
                    {
                        id: Date.now(),
                        text: "Chat history cleared. How can I assist you today?",
                        sender: 'bot',
                        timestamp: new Date()
                    }
                ]);
                setIsTyping(false);
                return; // Stop further processing
            }
            // Search Knowledge Base
            else {
                for (const item of KNOWLEDGE_BASE) {
                    if (item.keys.some(key => lowerInput.includes(key))) {
                        responseText = item.response;
                        if (item.action) action = () => navigate(item.action as string);
                        matchFound = true;
                        break;
                    }
                }

                // Fallback
                if (!matchFound && (lowerInput.includes('explain') || lowerInput.includes('rewrite') || lowerInput.includes('tell me more'))) {
                    responseText = "The Gyaviira Music Foundation is dedicated to preserving musical heritage and spreading the Gospel through creativity. We build bridges between generations through song.";
                    action = () => navigate('/about');
                }

                if (!matchFound && responseText === "I see. Could you clarify that? I can tell you about our Mission, Store, or Contact info.") {
                    // check if it is a generic greeting not covered
                }
            }

            const botMessage: Message = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);

            if (action) {
                setTimeout(action, 1500);
            }

        }, 1200);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsOpen(true)}
                            className="w-16 h-16 bg-gradient-to-br from-gold-primary to-gold-dark rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-center text-black relative group"
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
                            className="w-[350px] md:w-[400px] h-[550px] bg-black-soft/95 backdrop-blur-xl border border-gold-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] p-4 flex justify-between items-center border-b border-gold-primary/20">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-gold-primary/50 text-gold-primary relative ${isLocked ? 'bg-red-900/20' : 'bg-gold-primary/20'}`}>
                                        {isLocked ? <Lock size={18} /> : <Sparkles size={18} className="animate-pulse" />}
                                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-gold-primary font-bold tracking-wide">RHYTHM</h3>
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            {isLocked ? <span className="text-red-500 font-bold">LOCKED</span> : <><span className="w-1 h-1 bg-gold-primary rounded-full"></span> Powered by GPT-5</>}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-gold-primary text-black font-medium rounded-tr-sm'
                                            : msg.isError
                                                ? 'bg-red-900/30 text-red-200 border border-red-500/50 rounded-tl-sm'
                                                : 'bg-[#222] text-gray-200 border border-gray-800 rounded-tl-sm'
                                            }`}>
                                            {msg.isError && <AlertTriangle size={16} className="inline mr-2 -mt-1" />}
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#222] border border-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                                            <span className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-800 bg-[#0a0a0a]">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isLocked ? "Chat is locked..." : "Ask Rhythm anything..."}
                                        disabled={isLocked}
                                        className={`w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-full py-3 pl-4 pr-12 focus:outline-none transition-colors font-light text-sm ${isLocked ? 'opacity-50 cursor-not-allowed' : 'focus:border-gold-primary/50'
                                            }`}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isLocked}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-black transition-colors ${isLocked ? 'bg-gray-700 cursor-not-allowed' : 'bg-gold-primary hover:bg-gold-light'
                                            }`}
                                    >
                                        {isLocked ? <Lock size={14} /> : <Send size={14} />}
                                    </button>
                                </div>
                                {isLocked && unlockTime && (
                                    <p className="text-xs text-red-400 text-center mt-2">
                                        Unlocks in: {Math.ceil((unlockTime.getTime() - Date.now()) / 1000)}s
                                    </p>
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
