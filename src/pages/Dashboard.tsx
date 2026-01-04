import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Package, MessageSquare, Settings, BadgeCheck, Crown, Calendar, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserOrder {
    id: string;
    items: any[];
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at: string;
}

const Dashboard: React.FC = () => {
    const { user, loading, updateUsername, updatePreferences } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'community'>('profile');
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [userMessages, setUserMessages] = useState<any[]>([]);
    const [newUsername, setNewUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!loading && !user) navigate('/auth');
    }, [user, loading, navigate]);

    useEffect(() => {
        if (user) {
            loadOrders();
            loadUserMessages();
            setNewUsername(user.username);
        }
    }, [user]);

    const loadOrders = async () => {
        if (!user) return;
        const { data } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
    };

    const loadUserMessages = async () => {
        if (!user) return;
        const { data } = await supabase
            .from('messages')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(20);
        if (data) setUserMessages(data);
    };

    const handleUpdateUsername = async () => {
        const success = await updateUsername(newUsername);
        if (success) {
            setIsEditing(false);
        } else {
            alert('Username already taken or invalid format');
        }
    };

    if (!user) return null;

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-impact text-white uppercase tracking-tighter mb-4">
                        Account <span className="text-gold-primary neon-gold">Hub</span>
                    </h1>
                    <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                        Manage your foundation presence
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex gap-2 md:gap-4 mb-8 overflow-x-auto pb-2">
                    {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'orders', label: 'Orders', icon: Package },
                        { id: 'community', label: 'Activity', icon: MessageSquare }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-gold-primary text-black shadow-gold'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-[2.5rem] border border-white/5 p-8 md:p-12"
                >
                    {activeTab === 'profile' && (
                        <div className="space-y-8">
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/5">
                                <div className="w-24 h-24 rounded-2xl bg-gold-primary/10 border-2 border-gold-primary/30 flex items-center justify-center overflow-hidden">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} className="w-full h-full object-cover" alt={user.username} />
                                    ) : (
                                        <User size={48} className="text-gold-primary" />
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                                        {isEditing ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={newUsername}
                                                    onChange={(e) => setNewUsername(e.target.value)}
                                                    className="bg-black/40 border border-gold-primary/50 rounded-xl px-4 py-2 text-white font-mono text-sm"
                                                />
                                                <button
                                                    onClick={handleUpdateUsername}
                                                    className="btn-gold px-4 py-2 text-xs"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setNewUsername(user.username);
                                                    }}
                                                    className="text-xs text-gray-400 hover:text-white"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <h2 className="text-3xl font-impact text-white uppercase tracking-wider">{user.username}</h2>
                                                {user.isVerified && <BadgeCheck size={24} className="text-gold-primary" />}
                                                {user.role === 'admin' && <Crown size={24} className="text-gold-primary" />}
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="text-xs text-gold-primary hover:text-gold-light"
                                                >
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400 justify-center md:justify-start flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} />
                                            <span className="font-mono text-xs">{user.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            <span className="font-mono text-xs">Joined {user.joinedDate}</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-xs uppercase tracking-widest font-mono">
                                        <span className={user.role === 'admin' ? 'text-gold-primary' : 'text-white'}>
                                            {user.role === 'admin' ? '⚡ Admin Access' : '🎵 Community Member'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Preferences */}
                            <div>
                                <h3 className="text-xl font-impact text-gold-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Settings size={20} />
                                    Notification Preferences
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { key: 'musicAlerts', label: 'New Music Releases', desc: 'Get notified about new tracks and albums' },
                                        { key: 'communityMentions', label: 'Community Mentions', desc: 'When someone mentions you in chat' },
                                        { key: 'storeExclusives', label: 'Store Exclusives', desc: 'Early access to limited merch drops' }
                                    ].map(pref => (
                                        <div key={pref.key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div>
                                                <p className="text-sm font-bold text-white">{pref.label}</p>
                                                <p className="text-xs text-gray-500 mt-1">{pref.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => updatePreferences({ [pref.key]: !user.preferences[pref.key as keyof typeof user.preferences] })}
                                                className={`w-12 h-6 rounded-full transition-all ${user.preferences[pref.key as keyof typeof user.preferences]
                                                    ? 'bg-gold-primary'
                                                    : 'bg-gray-700'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${user.preferences[pref.key as keyof typeof user.preferences]
                                                    ? 'translate-x-6'
                                                    : 'translate-x-0.5'
                                                    }`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Package size={24} />
                                Order History
                            </h3>
                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package size={48} className="text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 font-mono text-sm">No orders yet</p>
                                    <button onClick={() => navigate('/store')} className="btn-gold mt-4 px-6 py-3 text-xs">
                                        Browse Merch
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="p-6 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-xs font-mono text-gray-400">Order #{order.id.slice(0, 8)}</p>
                                                    <p className="text-sm text-white mt-1">${order.total.toFixed(2)}</p>
                                                </div>
                                                <span className={`text-xs px-3 py-1 rounded-full font-mono uppercase ${order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                                        'bg-red-500/20 text-red-500'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-mono">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                                <MessageSquare size={24} />
                                Recent Activity
                            </h3>
                            {userMessages.length === 0 ? (
                                <div className="text-center py-12">
                                    <MessageSquare size={48} className="text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 font-mono text-sm">No activity yet</p>
                                    <button onClick={() => navigate('/chat')} className="btn-gold mt-4 px-6 py-3 text-xs">
                                        Join Community Chat
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userMessages.map(msg => (
                                        <div key={msg.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-xs font-mono text-gold-primary">#{msg.channel}</p>
                                                <p className="text-xs text-gray-500 font-mono">
                                                    {new Date(msg.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-300">{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
