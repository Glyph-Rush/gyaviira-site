import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send, Hash, Users, Crown, Zap, Music, Search, MoreVertical, Plus, Smile, User, BadgeCheck, X, Download, Trash2 } from 'lucide-react';
import download_menu from '../assets/download_menu.png';
import { supabase } from '../lib/supabase';

interface ChatMessage {
    id: string;
    user_id: string;
    username: string;
    text: string;
    created_at: string;
    is_admin?: boolean;
    profile_pic?: string | null;
}

const CommunityChat: React.FC = () => {
    const { user, allUsers, loading } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [activeChannel, setActiveChannel] = useState('general-vibe');
    const [showFlyer, setShowFlyer] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !user) navigate('/auth');
    }, [user, loading, navigate]);

    // Load messages and subscribe to realtime updates
    useEffect(() => {
        if (!user) return;

        const loadMessages = async () => {
            setIsLoadingMessages(true);
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('channel', activeChannel)
                .order('created_at', { ascending: true });

            if (data && !error) {
                setMessages(data);
            }
            setIsLoadingMessages(false);
        };

        loadMessages();

        // Subscribe to real-time updates
        const channel = supabase
            .channel(`messages:${activeChannel}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                    filter: `channel=eq.${activeChannel}`
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setMessages(prev => [...prev, payload.new as ChatMessage]);
                    } else if (payload.eventType === 'DELETE') {
                        setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
                    } else if (payload.eventType === 'UPDATE') {
                        setMessages(prev => prev.map(msg =>
                            msg.id === payload.new.id ? payload.new as ChatMessage : msg
                        ));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [activeChannel, user]);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text || !user) return;

        // Command detection
        if (text === '/flyer') {
            setShowFlyer(true);
            setInputText('');
            return;
        }

        // Insert message into Supabase
        const { error } = await supabase
            .from('messages')
            .insert({
                channel: activeChannel,
                user_id: user.id,
                username: user.username,
                text: text,
                profile_pic: user.profilePic,
                is_admin: user.role === 'admin'
            });

        if (!error) {
            setInputText('');
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        await supabase
            .from('messages')
            .delete()
            .eq('id', messageId);
    };

    if (!user) return null;

    return (
        <div className="pt-24 pb-0 h-screen bg-[#020202] flex flex-col">
            <div className="flex-1 flex overflow-hidden">

                {/* Channel Sidebar (Desktop Only) */}
                <div className="hidden lg:flex w-72 flex-col bg-black/80 border-r border-white/5 p-6 space-y-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 bg-gold-primary rounded-xl flex items-center justify-center text-black">
                            <Music size={24} />
                        </div>
                        <h2 className="font-impact text-xl text-white tracking-widest uppercase">Sonic <span className="text-gold-primary">Chat</span></h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] px-2 flex justify-between items-center">
                                FREQUENCIES <Plus size={12} className="cursor-pointer hover:text-gold-primary" />
                            </h3>
                            {['general-vibe', 'production-tech', 'live-transmissions', 'member-lore'].map(chan => (
                                <button
                                    key={chan}
                                    onClick={() => setActiveChannel(chan)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${activeChannel === chan ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Hash size={16} className={activeChannel === chan ? 'text-gold-primary' : 'text-gray-700 group-hover:text-gray-400'} />
                                    <span className="text-xs font-bold tracking-widest uppercase">{chan.replace('-', ' ')}</span>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] px-2 flex justify-between items-center">
                                ACTIVE SIGNALS <Users size={12} />
                            </h3>
                            <div className="space-y-3 px-2">
                                {allUsers.slice(0, 8).map((u) => (
                                    <div key={u.id} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className={`text-[11px] font-mono uppercase tracking-widest truncate flex-1 ${u.role === 'admin' ? 'text-gold-primary' : 'text-white'}`}>{u.username}</span>
                                        {u.role === 'admin' && (
                                            <Crown size={10} className="text-gold-primary flex-shrink-0" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-gold-dark/20 border border-gold-primary/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {user.profilePic ? <img src={user.profilePic} className="w-full h-full object-cover" alt={user.username} /> : <User size={20} className="text-gold-primary/40" />}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{user.username}</p>
                                <p className="text-[8px] font-mono text-gold-primary/60 uppercase tracking-widest">{user.role === 'admin' ? 'Admin Level' : 'Member Level'}</p>
                            </div>
                            <MoreVertical size={14} className="text-gray-600 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-black relative">
                    {/* Chat Header */}
                    <div className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10">
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden text-gold-primary"><Music size={20} /></button>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <Hash size={18} className="text-gold-primary" />
                                    <h2 className="font-impact text-xl text-white tracking-widest uppercase">{activeChannel.replace('-', ' ')}</h2>
                                </div>
                                <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Channel connectivity: Optimal</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                                <input type="text" placeholder="Search archive..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-[10px] font-mono text-white focus:outline-none focus:border-gold-primary/40 w-48" />
                            </div>
                            <Zap size={20} className="text-gold-primary cursor-pointer hover:scale-110 transition-transform" />
                            <Users size={20} className="text-white lg:hidden cursor-pointer" />
                        </div>
                    </div>

                    {/* Messages List */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 custom-scrollbar"
                    >
                        {isLoadingMessages ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gold-primary font-mono text-xs uppercase tracking-widest animate-pulse">Loading transmissions...</div>
                            </div>
                        ) : (
                            <AnimatePresence initial={false}>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-3 md:gap-4 group"
                                    >
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all ${msg.is_admin ? 'bg-gold-primary text-black border-gold-primary' : 'bg-black-soft border-white/10 group-hover:border-gold-primary/30'} overflow-hidden`}>
                                            {msg.profile_pic ? (
                                                <img src={msg.profile_pic} className="w-full h-full object-cover" alt={msg.username} />
                                            ) : (
                                                msg.is_admin ? <Music size={20} /> : <User size={20} className="text-gray-700" />
                                            )}
                                        </div>
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                <span className={`text-xs font-impact tracking-widest uppercase ${msg.is_admin ? 'text-gold-primary' : 'text-white'}`}>{msg.username}</span>
                                                {allUsers.find(u => u.id === msg.user_id)?.isVerified && (
                                                    <BadgeCheck size={12} className="text-gold-primary fill-gold-primary/20" />
                                                )}
                                                {msg.is_admin && <span className="bg-gold-primary text-black text-[7px] px-2 py-0.5 rounded-md font-bold tracking-tighter shadow-[0_0_5px_rgba(212,175,55,0.5)]">ADMIN</span>}
                                                <span className="text-[9px] font-mono text-gray-600 uppercase">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                                                {/* Delete button for own messages */}
                                                {msg.user_id === user.id && (
                                                    <button
                                                        onClick={() => handleDeleteMessage(msg.id)}
                                                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400"
                                                        title="Delete message"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed font-light break-words">{msg.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-8 pt-0">
                        <form
                            onSubmit={handleSendMessage}
                            className="bg-black-soft border border-white/5 rounded-3xl p-2 focus-within:border-gold-primary/30 transition-all flex items-center gap-2 group relative shadow-2xl"
                        >
                            <div className="absolute -top-10 left-4 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                <span className="text-[9px] font-mono text-gold-primary uppercase tracking-widest animate-pulse">TRANSMISSION MODE: ACTIVE</span>
                            </div>

                            <button type="button" className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-gray-600 hover:text-gold-primary transition-colors hover:bg-white/5">
                                <Plus size={20} />
                            </button>

                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder={`Transmission to #${activeChannel}...`}
                                className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-700 font-mono text-sm py-4 min-h-[48px] md:min-h-[56px] touch-manipulation"
                            />

                            <div className="flex items-center gap-2 px-2">
                                <button type="button" className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-gray-600 hover:text-gold-primary transition-colors">
                                    <Smile size={20} />
                                </button>
                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all ${inputText.trim() ? 'bg-gold-primary text-black shadow-gold scale-100 hover:scale-105' : 'bg-white/5 text-gray-800 scale-90'}`}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Flyer Modal */}
            <AnimatePresence>
                {showFlyer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-2xl w-full glass-card border border-gold-primary/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.2)]"
                        >
                            <button
                                onClick={() => setShowFlyer(false)}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-all hover:text-red-500"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row h-full">
                                <div className="w-full md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                                    <img src={download_menu} alt="Flyer" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-10 flex flex-col justify-center space-y-6 flex-1">
                                    <h3 className="text-4xl font-impact text-gold-primary tracking-tighter uppercase neon-gold">Foundation Flyer</h3>
                                    <p className="text-gray-400 font-light leading-relaxed">Download the latest frequency guide and exclusive community insights. Your link to the harmonic collective begins here.</p>
                                    <div className="space-y-4">
                                        <button className="w-full btn-gold py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs">
                                            <Download size={18} /> Download Signal
                                        </button>
                                        <button
                                            onClick={() => setShowFlyer(false)}
                                            className="w-full py-4 text-[10px] font-mono text-gray-600 hover:text-white uppercase tracking-widest transition-colors"
                                        >
                                            Return to Transmission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommunityChat;
