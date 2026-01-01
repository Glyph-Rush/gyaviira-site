import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

const ABOUT_CONTENT = `
The Gyaviira Music Foundation honors the power of music as heritage and future. Rooted in faith and legacy, we preserve cultural traditions while inspiring new artists.
Our mission is to bridge rhythm and truth through education and performance, using God-given musical talent to share the gospel and hope. 
We view music as a divine calling to truth, love, and unity, connecting generations through traditional and contemporary sounds.
We nurture talent through mentorship and collaboration, reminding the world that music is a vessel for healing and glorifying God.
`;

const RhythmChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Greetings! I am Rhythm, your AI guide. How may I assist you in navigating the Gyaviira legacy today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const lowerInput = userMessage.text.toLowerCase();
            let responseText = "I see. Tell me more about what you're looking for.";
            let action = null;

            // Logic for "Rewriting" About Us info
            if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('mission') || lowerInput.includes('info')) {
                if (lowerInput.includes('explain') || lowerInput.includes('rewrite') || lowerInput.includes('tell me')) {
                    responseText = "Certainly. Here is a summary of who we are: " + ABOUT_CONTENT;
                } else {
                    responseText = "The Gyaviira Music Foundation is dedicated to preserving musical heritage and spreading the Gospel through creativity. I can take you to the About page for the full story, or explain more here.";
                    action = () => navigate('/about');
                }
            }
            // Navigation intents
            else if (lowerInput.includes('home')) {
                responseText = "Navigating to the Home page immediately.";
                action = () => navigate('/');
            } else if (lowerInput.includes('store') || lowerInput.includes('shop') || lowerInput.includes('merch') || lowerInput.includes('buy')) {
                responseText = "Opening the Store for you. We have some excellent Gold collection items and a flyer you can download.";
                action = () => navigate('/store');
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
                responseText = "Redirecting you to our Contact information.";
                action = () => navigate('/contact');
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseText = "Hello there! I am Rhythm, powered by advanced AI to help you explore Gyaviira's legacy.";
            } else if (lowerInput.includes('gyaviira')) {
                responseText = "Gyaviira is built on faith, legacy, and the transformative power of music.";
            } else if (lowerInput.includes('flyer') || lowerInput.includes('download')) {
                responseText = "You can download our official flyer from the Store page. I'll take you there.";
                action = () => navigate('/store');
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

        }, 2000);
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
                            <Bot size={32} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="w-[350px] md:w-[400px] h-[500px] bg-black-soft/95 backdrop-blur-xl border border-gold-primary/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] p-4 flex justify-between items-center border-b border-gold-primary/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-primary/20 flex items-center justify-center border border-gold-primary/50 text-gold-primary relative">
                                        <Sparkles size={18} className="animate-pulse" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-gold-primary font-bold tracking-wide">RHYTHM</h3>
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <span className="w-1 h-1 bg-gold-primary rounded-full"></span> Powered by GPT-5
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
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-gold-primary text-black font-medium rounded-tr-sm'
                                            : 'bg-[#222] text-gray-200 border border-gray-800 rounded-tl-sm'
                                            }`}>
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
                                        placeholder="Ask Rhythm to navigate..."
                                        className="w-full bg-[#1a1a1a] border border-gray-800 text-white rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-gold-primary/50 transition-colors font-light text-sm"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold-primary rounded-full flex items-center justify-center text-black hover:bg-gold-light transition-colors"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default RhythmChat;
