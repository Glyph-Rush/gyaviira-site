import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Hash, Users, Zap, Music, Search, Plus, Smile, User, X, Download, Trash2, Gift, Star, Heart, Flame, Crown, Music2, Mic2, Disc, Radio, Speaker, Headphones, Gem, Trophy, Activity, Volume2, Shield, ShieldOff, Pin, Megaphone, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import download_menu from '../assets/download_menu.png';
import { supabase } from '../lib/supabase';

interface ChatMessage {
    id: string;
    user_id: string | null;
    username: string;
    text: string;
    created_at: string;
    is_admin?: boolean;
    profile_pic?: string | null;
    level?: number;
}

const CommunityChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [showFlyer, setShowFlyer] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [displayName, setDisplayName] = useState('');
    const [showNameModal, setShowNameModal] = useState(false);
    const [showAssetLibrary, setShowAssetLibrary] = useState(false);
    const [activeAssetTab, setActiveAssetTab] = useState<'custom' | 'giphy' | 'emoji'>('emoji');
    const [giphySearch, setGiphySearch] = useState('');
    const [giphyResults, setGiphyResults] = useState<any[]>([]);
    const [isSearchingGiphy, setIsSearchingGiphy] = useState(false);
    const [activeChannel, setActiveChannel] = useState('general-vibe');
    const [channels, setChannels] = useState<any[]>([]);
    const navigate = useNavigate();

    // Admin State (Simulated for this session)
    const [mutedUsers, setMutedUsers] = useState<Set<string>>(new Set());
    const [bannedUsers, setBannedUsers] = useState<Set<string>>(new Set());
    const [pinnedMessages, setPinnedMessages] = useState<Set<string>>(new Set());
    const [messageCooldown, setMessageCooldown] = useState(false);
    const [userLevel, setUserLevel] = useState(1);
    const [msgCount, setMsgCount] = useState(0);
    const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

    const CUSTOM_EMOJIS = [
        { icon: <Crown size={20} className="text-gold-primary" />, label: 'Overseer', code: '👑' },
        { icon: <Music size={20} className="text-gold-primary" />, label: 'Rhythm', code: '🎵' },
        { icon: <Zap size={20} className="text-gold-primary" />, label: 'Pulse', code: '⚡' },
        { icon: <Hash size={20} className="text-gold-primary" />, label: 'Signal', code: '#' },
        { icon: <Flame size={20} className="text-gold-primary" />, label: 'Vibe', code: '🔥' },
        { icon: <Star size={20} className="text-gold-primary" />, label: 'Verified', code: '⭐' },
        { icon: <Heart size={20} className="text-gold-primary" />, label: 'Love', code: '💎' },
        { icon: <Music2 size={20} className="text-gold-primary" />, label: 'Acoustic', code: '🎸' },
    ];

    const STANDARD_EMOJIS = ['😊', '😂', '🔥', '🙌', '💯', '🦾', '💎', '🎵', '✨', '⚡', '🚀', '🖤', '👑', '🤝', '🔊', '🎧', '🎸', '🎹', '🌍', '👽'];

    const GUEST_AVATARS = [
        'Crown', 'Music', 'Zap', 'Star', 'Heart', 'Flame', 'Music2', 'Mic2', 'Disc', 'Radio', 'Speaker', 'Headphones', 'Gem', 'Trophy', 'Activity', 'Volume2'
    ];

    const getAvatarForName = (name: string) => {
        if (!name) return 'User';
        // Admin Override
        if (name.toLowerCase() === 'jeromemoses220@gmail.com' || name.toLowerCase() === 'nyemerajosiah12@gmail.com' || name.toLowerCase() === 'chris16nshuti@gmail.com' || name === 'Chris Nshuti') return 'icon:Music2';

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % GUEST_AVATARS.length;
        return `icon:${GUEST_AVATARS[index]} `;
    };

    const renderAvatar = (pic: string | null, isAdmin: boolean, username: string) => {
        if (pic && pic.startsWith('http')) {
            return <img src={pic} className="w-full h-full object-cover" alt={username} />;
        }

        if (isAdmin) return <Music size={20} />;

        const iconName = pic?.startsWith('icon:') ? pic.replace('icon:', '') : 'User';

        const iconProps = { size: 20, className: "text-gold-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" };

        switch (iconName) {
            case 'Crown': return <Crown {...iconProps} />;
            case 'Music': return <Music {...iconProps} />;
            case 'Zap': return <Zap {...iconProps} />;
            case 'Star': return <Star {...iconProps} />;
            case 'Heart': return <Heart {...iconProps} />;
            case 'Flame': return <Flame {...iconProps} />;
            case 'Music2': return <Music2 {...iconProps} />;
            case 'Mic2': return <Mic2 {...iconProps} />;
            case 'Disc': return <Disc {...iconProps} />;
            case 'Radio': return <Radio {...iconProps} />;
            case 'Speaker': return <Speaker {...iconProps} />;
            case 'Headphones': return <Headphones {...iconProps} />;
            case 'Gem': return <Gem {...iconProps} />;
            case 'Trophy': return <Trophy {...iconProps} />;
            case 'Activity': return <Activity {...iconProps} />;
            case 'Volume2': return <Volume2 {...iconProps} />;
            default: return <User size={20} className="text-gray-700" />;
        }
    };

    // Initialize Frequencies from Supabase
    useEffect(() => {
        const loadChannels = async () => {
            const { data, error } = await supabase
                .from('channels')
                .select('*')
                .order('name');
            if (data && !error) {
                setChannels(data);
            }
        };

        loadChannels();

        const channelSub = supabase
            .channel('chat_channels_realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, () => {
                loadChannels();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channelSub);
        };
    }, []);

    // Initialize Guest Session
    useEffect(() => {
        // Check session storage for guest name
        const storedName = sessionStorage.getItem('guest_name');
        if (storedName) {
            setDisplayName(storedName);
        } else {
            setShowNameModal(true);
        }
    }, []);

    const handleSetGuestName = (name: string) => {
        if (!name.trim()) return;
        sessionStorage.setItem('guest_name', name.trim());
        setDisplayName(name.trim());
        setShowNameModal(false);
    };

    // Initialize Gamification from LocalStorage
    useEffect(() => {
        const storedName = sessionStorage.getItem('guest_name');
        const isAdminIdentity =
            storedName?.toLowerCase() === 'jeromemoses220@gmail.com' ||
            storedName === 'Jerome Moses' ||
            storedName?.toLowerCase() === 'nyemerajosiah12@gmail.com' ||
            storedName === 'Josiah Nyemera' ||
            storedName?.toLowerCase() === 'chris16nshuti@gmail.com' ||
            storedName === 'Chris Nshuti';

        if (isAdminIdentity) {
            setUserLevel(99);
        } else {
            const storedCount = localStorage.getItem('gyaviira_msg_count');
            if (storedCount) {
                const count = parseInt(storedCount);
                setMsgCount(count);
                setUserLevel(Math.floor(count / 10) + 1);
            }
        }
    }, [displayName]);

    // Persist Gamification to LocalStorage
    useEffect(() => {
        const isAdminIdentity =
            displayName.toLowerCase() === 'jeromemoses220@gmail.com' ||
            displayName === 'Jerome Moses' ||
            displayName.toLowerCase() === 'nyemerajosiah12@gmail.com' ||
            displayName === 'Josiah Nyemera' ||
            displayName.toLowerCase() === 'chris16nshuti@gmail.com' ||
            displayName === 'Chris Nshuti' ||
            displayName.toLowerCase() === 'admin@gyaviira.com' ||
            displayName.toLowerCase() === 'marketing@gyaviira.com';

        if (isAdminIdentity) {
            setUserLevel(99);
        } else {
            localStorage.setItem('gyaviira_msg_count', msgCount.toString());
            setUserLevel(Math.floor(msgCount / 10) + 1);
        }
    }, [msgCount, displayName]);

    // Load messages and subscribe to realtime updates
    useEffect(() => {

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
            .channel(`messages:${activeChannel} `)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                    filter: `channel = eq.${activeChannel} `
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
    }, [activeChannel]);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text || !displayName) return;

        const isAdminIdentity =
            displayName.toLowerCase() === 'jeromemoses220@gmail.com' ||
            displayName === 'Jerome Moses' ||
            displayName.toLowerCase() === 'nyemerajosiah12@gmail.com' ||
            displayName === 'Josiah Nyemera' ||
            displayName.toLowerCase() === 'chris16nshuti@gmail.com' ||
            displayName === 'Chris Nshuti' ||
            displayName.toLowerCase() === 'admin@gyaviira.com' ||
            displayName.toLowerCase() === 'marketing@gyaviira.com';

        // 1. Ban Check
        if (bannedUsers.has(displayName)) {
            alert("🔒 Access Revoked: You have been banned from this frequency.");
            return;
        }

        // 2. Mute Check
        if (mutedUsers.has(displayName) && !isAdminIdentity) {
            alert("🔇 Frequency Muted: You are currently restricted from transmitting.");
            return;
        }

        // 3. Rate Limit Check
        if (messageCooldown && !isAdminIdentity) {
            alert("⚠️ Transmission Overflow: Calm the rhythm. (3s cooldown active)");
            return;
        }

        // 4. Restricted Frequency Check
        const currentChannelConfig = channels.find(c => c.slug === activeChannel);
        if (currentChannelConfig?.is_restricted && !isAdminIdentity) {
            alert(`📢 Restricted Frequency: Only Founders and Admins can broadcast in ${currentChannelConfig.name}.`);
            return;
        }

        // Command detection
        if (text === '/flyer') {
            setShowFlyer(true);
            setInputText('');
            return;
        }

        // Start Rate Limit
        if (!isAdminIdentity) {
            setMessageCooldown(true);
            setTimeout(() => setMessageCooldown(false), 3000);
        }

        // Insert message into Supabase
        const { error } = await supabase
            .from('messages')
            .insert({
                channel: activeChannel,
                user_id: null, // Guests only
                username: isAdminIdentity ?
                    (displayName.toLowerCase().includes('nyemera') ? "Josiah Nyemera" :
                        displayName.toLowerCase().includes('chris') ? "Chris Nshuti" :
                            displayName.toLowerCase().includes('marketing') ? "Gyaviira Marketing" :
                                displayName.toLowerCase().includes('admin') ? "Gyaviira Admin" : "Jerome Moses")
                    : displayName,
                text: text,
                profile_pic: getAvatarForName(displayName), // Assign unique emoji
                is_admin: isAdminIdentity,
                level: isAdminIdentity ? 99 : userLevel
            });

        if (error) {
            console.error("Transmission Error:", error.message);
            alert("Transmission Failed: Check your database connection.");
        } else {
            setInputText('');
            if (!isAdminIdentity) setMsgCount(prev => prev + 1);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        await supabase
            .from('messages')
            .delete()
            .eq('id', messageId);
    };

    const handlePinMessage = (messageId: string) => {
        setPinnedMessages(prev => {
            const next = new Set(prev);
            if (next.has(messageId)) next.delete(messageId);
            else next.add(messageId);
            return next;
        });
    };

    const handleMuteUser = (username: string) => {
        if (username === "Jerome Moses") return;
        setMutedUsers(prev => {
            const next = new Set(prev);
            if (next.has(username)) next.delete(username);
            else next.add(username);
            return next;
        });
    };

    const handleBanUser = (username: string) => {
        if (username === "Jerome Moses") return;
        setBannedUsers(prev => {
            const next = new Set(prev);
            if (next.has(username)) next.delete(username);
            else next.add(username);
            return next;
        });
    };

    const handleSelectAsset = (asset: string, type: 'text' | 'image' = 'text') => {
        if (type === 'text') {
            setInputText(prev => prev + asset);
        } else {
            // Plan: If GIF select, send immediately or append as text? Usually GIFs are sent immediately.
            // For now, let's treat them as text (markdown image or link)
            handleSendAssetMessage(asset);
        }
        setShowAssetLibrary(false);
    };

    const handleSendAssetMessage = async (asset: string) => {
        const isFounderIdentity =
            displayName.toLowerCase() === 'jeromemoses220@gmail.com' ||
            displayName === 'Jerome Moses' ||
            displayName.toLowerCase() === 'nyemerajosiah12@gmail.com' ||
            displayName === 'Josiah Nyemera' ||
            displayName.toLowerCase() === 'chris16nshuti@gmail.com' ||
            displayName === 'Chris Nshuti' ||
            displayName.toLowerCase() === 'admin@gyaviira.com' ||
            displayName.toLowerCase() === 'marketing@gyaviira.com';

        const username = isFounderIdentity ?
            (displayName.toLowerCase().includes('nyemera') ? "Josiah Nyemera" :
                displayName.toLowerCase().includes('chris') ? "Chris Nshuti" :
                    displayName.toLowerCase().includes('marketing') ? "Gyaviira Marketing" :
                        displayName.toLowerCase().includes('admin') ? "Gyaviira Admin" : "Jerome Moses")
            : displayName;

        const { error } = await supabase
            .from('messages')
            .insert({
                channel: activeChannel,
                user_id: null,
                username: username,
                text: asset,
                profile_pic: getAvatarForName(displayName), // Assign unique emoji
                is_admin: isFounderIdentity,
                level: isFounderIdentity ? 99 : userLevel
            });
        if (error) {
            console.error("Asset Transmission Error:", error.message);
        }
    };

    const handleStartPrivateChat = (targetUsername: string) => {
        if (!displayName) {
            setShowNameModal(true);
            return;
        }

        // Create consistent channel ID: dm-alpha-beta (alphabetical order)
        // Clean names: remove spaces, lowercase, remove special chars
        const cleanName1 = displayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const cleanName2 = targetUsername.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const participants = [cleanName1, cleanName2].sort();
        const dmChannel = `dm-${participants[0]}-${participants[1]}`;

        setActiveChannel(dmChannel);
        setSelectedProfile(null);
    };

    const searchGiphy = async (query: string) => {
        if (!query.trim()) return;
        setIsSearchingGiphy(true);
        try {
            const API_KEY = import.meta.env.VITE_GIPHY_API_KEY || 'dc6zaTOxFJmzC';
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&rating=g`);
            const { data } = await response.json();
            setGiphyResults(data || []);
        } catch (err) {
            console.error("Giphy Error", err);
        }
        setIsSearchingGiphy(false);
    };



    return (
        <div className="pt-24 pb-0 h-screen bg-transparent flex flex-col">
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
                                FREQUENCIES {(displayName.toLowerCase() === 'jeromemoses220@gmail.com' || displayName.toLowerCase().includes('nyemera') || displayName.toLowerCase().includes('chris')) && <Plus size={12} className="cursor-pointer hover:text-gold-primary" onClick={() => navigate('/admin')} />}
                            </h3>
                            {channels.map(chan => (
                                <button
                                    key={chan.slug}
                                    onClick={() => setActiveChannel(chan.slug)}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all group ${activeChannel === chan.slug ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {chan.slug === 'announcements' ? <Megaphone size={16} className={activeChannel === chan.slug ? 'text-gold-primary' : 'text-gray-700'} /> :
                                            chan.slug === 'prayer-wall' ? <Heart size={16} className={activeChannel === chan.slug ? 'text-gold-primary' : 'text-gray-700'} /> :
                                                <Hash size={16} className={activeChannel === chan.slug ? 'text-gold-primary' : 'text-gray-700'} />}
                                        <span className="text-xs font-bold tracking-widest uppercase">{chan.name}</span>
                                    </div>
                                    {chan.is_restricted && <Shield size={10} className="text-gold-primary/40" />}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 px-2">
                            <div className="bg-gold-primary/5 p-4 rounded-xl border border-gold-primary/10">
                                <p className="text-[9px] font-mono text-gold-primary/60 uppercase tracking-widest mb-1">Public Frequency</p>
                                <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">Visitors can join without an account. Use /flyer for info.</p>
                            </div>
                        </div>
                    </div>

                    {/* Guest/User Status Footer */}
                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-gold-dark/20 border border-gold-primary/30 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <User size={20} className="text-gold-primary/40" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{displayName}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-[8px] font-mono text-gold-primary/60 uppercase tracking-widest">Level {userLevel}</p>
                                    <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gold-primary transition-all duration-500"
                                            style={{ width: `${(msgCount % 10) * 10}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { sessionStorage.removeItem('guest_name'); window.location.reload(); }} className="text-red-500 hover:text-red-400 cursor-pointer" title="Disconnect Signal">
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col bg-transparent relative">
                    {/* Chat Header */}
                    <div className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 z-10">
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden text-gold-primary"><Music size={20} /></button>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <Hash size={18} className="text-gold-primary" />
                                    <h2 className="font-impact text-xl text-white tracking-widest uppercase">
                                        {activeChannel.startsWith('dm-')
                                            ? `PRIVATE SIGNAL: ${activeChannel.replace('dm-', '').replace(displayName.toLowerCase().replace(/[^a-z0-9-]/g, '-'), '').replace('-', '').replace(/-+/g, ' ')}`
                                            : activeChannel.replace('-', ' ')}
                                    </h2>
                                </div>
                                <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                                    {activeChannel.startsWith('dm-') ? 'ENCRYPTED P2P LINK' : 'Channel connectivity: Optimal'}
                                </p>
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
                                        <button
                                            onClick={() => setSelectedProfile({ username: msg.username, is_admin: msg.is_admin, profile_pic: msg.profile_pic, created_at: msg.created_at })}
                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all ${msg.is_admin ? 'bg-gold-primary text-black border-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-black-soft border-white/10 group-hover:border-gold-primary/30'} overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold-primary/50`}
                                        >
                                            {renderAvatar(msg.profile_pic ?? null, !!msg.is_admin, msg.username)}
                                        </button>
                                        <div className="space-y-1 flex-1 min-w-0">
                                            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                                <button
                                                    onClick={() => setSelectedProfile({ username: msg.username, is_admin: msg.is_admin, profile_pic: msg.profile_pic, created_at: msg.created_at })}
                                                    className={`text-xs font-impact tracking-widest uppercase hover:text-gold-primary transition-colors ${msg.is_admin ? 'text-gold-primary' : 'text-white'}`}
                                                >
                                                    {msg.username}
                                                </button>
                                                <div className="flex items-center gap-1">
                                                    <span className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border ${msg.level === 99 ? 'bg-gold-primary text-black border-gold-primary animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-white/5 text-gold-primary/70 border-white/10'}`}>
                                                        LVL {msg.level || 1}
                                                    </span>
                                                </div>
                                                {msg.is_admin && (
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="bg-gold-primary text-black text-[7px] px-2 py-0.5 rounded-md font-bold tracking-tighter shadow-[0_0_5px_rgba(212,175,55,0.5)]">
                                                            {msg.username === 'Chris Nshuti' ? 'HEAD OF RECORDS' :
                                                                msg.username === 'Josiah Nyemera' ? 'HEAD OF MARKETING' :
                                                                    msg.username === 'Gyaviira Marketing' ? 'MARKETING' : 'ADMIN'}
                                                        </span>
                                                        <div className="relative">
                                                            {msg.username === 'Chris Nshuti' ? (
                                                                <Music2 size={12} className="text-gold-primary fill-gold-primary drop-shadow-[0_0_12px_rgba(212,175,55,1)] animate-pulse" />
                                                            ) : (
                                                                <Crown size={12} className="text-gold-primary fill-gold-primary drop-shadow-[0_0_12px_rgba(212,175,55,1)] animate-bounce" />
                                                            )}
                                                            <div className="absolute inset-0 bg-gold-primary/20 blur-md rounded-full animate-ping"></div>
                                                        </div>
                                                    </div>
                                                )}
                                                <span className="text-[9px] font-mono text-gray-600 uppercase">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                                                {/* Admin Controls */}
                                                <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {(displayName.toLowerCase() === 'jeromemoses220@gmail.com' || displayName === 'Jerome Moses') && (
                                                        <>
                                                            <button onClick={() => handlePinMessage(msg.id)} className={`p-1 rounded hover:bg-white/10 ${pinnedMessages.has(msg.id) ? 'text-gold-primary' : 'text-gray-600'}`} title="Pin Message">
                                                                <Pin size={14} />
                                                            </button>
                                                            {msg.username !== 'Jerome Moses' && (
                                                                <>
                                                                    <button onClick={() => handleMuteUser(msg.username)} className={`p-1 rounded hover:bg-white/10 ${mutedUsers.has(msg.username) ? 'text-red-500' : 'text-gray-600'}`} title="Mute User">
                                                                        {mutedUsers.has(msg.username) ? <ShieldOff size={14} /> : <Shield size={14} />}
                                                                    </button>
                                                                    <button onClick={() => handleBanUser(msg.username)} className={`p-1 rounded hover:bg-white/10 ${bannedUsers.has(msg.username) ? 'text-red-600 font-bold' : 'text-gray-600'}`} title="Ban User">
                                                                        <AlertCircle size={14} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                    {/* Delete button for own messages or admin */}
                                                    {(msg.username === displayName || (displayName.toLowerCase() === 'jeromemoses220@gmail.com' && msg.username === 'Jerome Moses') || (displayName.toLowerCase() === 'jeromemoses220@gmail.com')) ? (
                                                        <button
                                                            onClick={() => handleDeleteMessage(msg.id)}
                                                            className="text-red-500 hover:text-red-400"
                                                            title="Delete message"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    ) : null}
                                                </div>
                                            </div>
                                            {msg.text.startsWith('http') && (msg.text.includes('giphy.com') || msg.text.includes('gif')) ? (
                                                <div className="mt-2 rounded-xl overflow-hidden max-w-sm border border-white/10 shadow-lg">
                                                    <img src={msg.text} alt="GIF Transmission" className="w-full h-auto" />
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    {msg.username === 'Chris Nshuti' && (
                                                        <div className="absolute -top-6 -right-4 pointer-events-none select-none">
                                                            {[Music, Music2, Volume2].map((Icon, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, y: 0, scale: 0.5, x: 0 }}
                                                                    animate={{
                                                                        opacity: [0, 1, 0],
                                                                        y: -20,
                                                                        scale: [0.5, 1.2, 0.8],
                                                                        x: Math.sin(i) * 10
                                                                    }}
                                                                    transition={{
                                                                        duration: 2 + i,
                                                                        repeat: Infinity,
                                                                        delay: i * 0.5,
                                                                        ease: "easeOut"
                                                                    }}
                                                                    className="absolute"
                                                                >
                                                                    <Icon size={10 + i * 2} className="text-gold-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <p className={`text-gray-300 text-sm leading-relaxed font-light break-words ${msg.username === 'Chris Nshuti' ? 'border-l-2 border-gold-primary/30 pl-3 italic' : ''}`}>
                                                        {msg.text}
                                                    </p>
                                                </div>
                                            )}
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
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleSendMessage(e);
                                    }
                                }}
                                placeholder={`Transmission to #${activeChannel}...`}
                                className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-700 font-mono text-sm py-4 min-h-[48px] md:min-h-[56px] touch-manipulation"
                            />

                            <div className="flex items-center gap-2 px-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAssetLibrary(!showAssetLibrary)}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-colors ${showAssetLibrary ? 'text-gold-primary bg-gold-primary/10' : 'text-gray-600 hover:text-gold-primary'}`}
                                >
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

                        {/* Asset Library Dialogue */}
                        <AnimatePresence>
                            {showAssetLibrary && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="absolute bottom-24 right-4 md:right-8 w-80 md:w-96 glass-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col"
                                >
                                    {/* Tabs */}
                                    <div className="flex border-b border-white/5 bg-black/40">
                                        {[
                                            { id: 'custom', label: 'GYAVIIRA', icon: <Crown size={12} /> },
                                            { id: 'giphy', label: 'GIPHY', icon: <Gift size={12} /> },
                                            { id: 'emoji', label: 'OFFICIAL', icon: <Smile size={12} /> }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveAssetTab(tab.id as any)}
                                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest transition-all ${activeAssetTab === tab.id ? 'text-gold-primary bg-gold-primary/5' : 'text-gray-600 hover:text-gray-400'}`}
                                            >
                                                {tab.icon} {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <div className="h-64 overflow-y-auto p-4 custom-scrollbar bg-black/60">
                                        {activeAssetTab === 'custom' && (
                                            <div className="grid grid-cols-4 gap-3">
                                                {CUSTOM_EMOJIS.map((e, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSelectAsset(e.code)}
                                                        className="aspect-square bg-white/5 rounded-xl flex flex-col items-center justify-center hover:bg-gold-primary/10 hover:border-gold-primary/30 border border-transparent transition-all group"
                                                    >
                                                        {e.icon}
                                                        <span className="text-[7px] text-gray-600 uppercase mt-1 group-hover:text-gold-primary">{e.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {activeAssetTab === 'emoji' && (
                                            <div className="grid grid-cols-6 gap-2">
                                                {STANDARD_EMOJIS.map((e, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSelectAsset(e)}
                                                        className="text-2xl hover:bg-white/5 rounded-lg py-2 transition-colors"
                                                    >
                                                        {e}
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {activeAssetTab === 'giphy' && (
                                            <div className="space-y-4">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search GIFs..."
                                                        value={giphySearch}
                                                        onChange={(e) => setGiphySearch(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && searchGiphy(giphySearch)}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-primary/40"
                                                    />
                                                    <button
                                                        onClick={() => searchGiphy(giphySearch)}
                                                        className="btn-gold py-1 px-3 text-[10px]"
                                                    >
                                                        FIND
                                                    </button>
                                                </div>
                                                {isSearchingGiphy ? (
                                                    <div className="flex justify-center py-8">
                                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-gold-primary"><Zap size={24} /></motion.div>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {giphyResults.map((gif) => (
                                                            <button
                                                                key={gif.id}
                                                                onClick={() => handleSelectAsset(gif.images.fixed_height.url, 'image')}
                                                                className="rounded-lg overflow-hidden hover:opacity-80 transition-opacity aspect-square bg-white/5"
                                                                title={gif.title}
                                                            >
                                                                <img src={gif.images.fixed_height.url} className="w-full h-full object-cover" alt={gif.title} />
                                                            </button>
                                                        ))}
                                                        {giphyResults.length === 0 && (
                                                            <p className="col-span-2 text-center text-[9px] text-gray-600 uppercase tracking-widest py-8">Connect to GIPHY database...</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="bg-black/80 border-t border-white/5 p-3 flex justify-between items-center">
                                        <p className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">Asset Management v1.0</p>
                                        <button onClick={() => setShowAssetLibrary(false)} className="text-gray-500 hover:text-white transition-colors">
                                            <X size={12} />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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

            {/* Display Name Modal */}
            <AnimatePresence>
                {showNameModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full glass-card border border-gold-primary/30 rounded-[2rem] p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-primary/20">
                                <Users size={32} className="text-gold-primary" />
                            </div>
                            <h2 className="text-2xl font-impact text-white tracking-widest uppercase mb-2">Identify Yourself</h2>
                            <p className="text-gray-400 font-mono text-xs mb-8">Enter a callsign to join the frequency.</p>

                            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); handleSetGuestName(fd.get('nickname') as string); }}>
                                <input
                                    name="nickname"
                                    type="text"
                                    placeholder="Enter Nickname..."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-center font-bold tracking-wider mb-4 focus:border-gold-primary focus:outline-none"
                                    autoFocus
                                    maxLength={50}
                                />
                                <button type="submit" className="w-full btn-gold py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                                    Join Signal
                                </button>
                                <p className="mt-4 text-[9px] text-gray-600 font-mono">
                                    Nickname deletes upon exit.
                                </p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Fan Profile Modal */}
            <AnimatePresence>
                {selectedProfile && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProfile(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-sm glass-card border border-gold-primary/20 rounded-[2.5rem] overflow-hidden shadow-2xl p-8 text-center"
                        >
                            <button
                                onClick={() => setSelectedProfile(null)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <div className="w-24 h-24 mx-auto rounded-3xl bg-gold-dark/10 border border-gold-primary/30 flex items-center justify-center mb-6 shadow-gold">
                                {renderAvatar(selectedProfile.profile_pic, selectedProfile.is_admin, selectedProfile.username)}
                            </div>

                            <h2 className="text-2xl font-heading text-white mb-1 uppercase tracking-widest">{selectedProfile.username}</h2>
                            <p className="text-[10px] font-mono text-gold-primary uppercase tracking-[0.3em] mb-6">
                                {selectedProfile.is_admin ? 'Frequency Overseer' : 'Pulse Explorer'}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-xs font-bold text-white uppercase">Online</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-1">Joined</p>
                                    <p className="text-xs font-bold text-white uppercase">{new Date(selectedProfile.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="bg-gold-primary/5 p-4 rounded-2xl border border-gold-primary/10 mb-8">
                                <p className="text-[9px] font-mono text-gold-primary uppercase tracking-widest mb-2">Member Lore</p>
                                <p className="text-[10px] text-gray-400 leading-relaxed uppercase italic">
                                    "Navigating the rhythms of the foundation with faith and sonic precision."
                                </p>
                            </div>

                            <button
                                onClick={() => handleStartPrivateChat(selectedProfile.username)}
                                className="w-full py-4 bg-gold-primary text-black rounded-2xl font-heading font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-gold"
                            >
                                Transmission Request
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommunityChat;
