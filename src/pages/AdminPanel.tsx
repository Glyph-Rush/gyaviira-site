import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MessageSquare, Users, Settings, Plus, Trash2, Save, Terminal, BarChart3, Database, Lock, Unlock, Megaphone, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Channel {
    slug: string;
    name: string;
    is_restricted: boolean;
}

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'users' | 'settings'>('dashboard');
    const [channels, setChannels] = useState<Channel[]>([]);
    const [newChanName, setNewChanName] = useState('');
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        signals: '0',
        volume: '0',
        uptime: '99.99%'
    });

    // Real-time Channels Subscription
    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (profile) setCurrentUserRole(profile.role);
            }
            setLoading(false);
        };

        const fetchChannels = async () => {
            const { data, error } = await supabase
                .from('channels')
                .select('*')
                .order('name');
            if (data) setChannels(data);
            if (error) console.error("Error fetching channels:", error);
        };

        fetchUserData();
        fetchChannels();

        const channelSub = supabase
            .channel('admin_channels_realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, () => {
                fetchChannels();
            })
            .subscribe();

        // Real-time Stats Refresher
        const fetchStats = async () => {
            const { count: msgCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });
            const { data: recentMsgs } = await supabase.from('messages').select('username').order('created_at', { ascending: false }).limit(50);

            // Unique signal calculation (simulated from recent messages)
            const uniqueUsers = new Set(recentMsgs?.map(m => m.username) || []).size;

            setStats({
                signals: uniqueUsers.toLocaleString(),
                volume: (msgCount || 0).toLocaleString(),
                uptime: '99.99%'
            });
        };

        fetchStats();
        const statsInterval = setInterval(fetchStats, 10000);

        return () => {
            supabase.removeChannel(channelSub);
            clearInterval(statsInterval);
        };
    }, []);

    const handleAddChannel = async () => {
        if (!newChanName.trim()) return;

        // Permission check
        if (currentUserRole !== 'admin' && currentUserRole !== 'founder') {
            alert("Unauthorized: Only Admins or Founders can initialize new frequencies.");
            return;
        }

        const slug = newChanName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (channels.find(c => c.slug === slug)) {
            alert("Slug already exists.");
            return;
        }

        const { error } = await supabase
            .from('channels')
            .insert([{ slug, name: newChanName, is_restricted: false }]);

        if (error) {
            alert("Failed to add channel: " + error.message);
        } else {
            setNewChanName('');
        }
    };

    const handleRemoveChannel = async (slug: string) => {
        // Permission check
        if (currentUserRole !== 'admin' && currentUserRole !== 'founder') {
            alert("Unauthorized: Only Admins or Founders can decommission frequencies.");
            return;
        }

        if (slug === 'announcements' || slug === 'general-vibe') {
            alert("Core frequencies cannot be decommissioned.");
            return;
        }

        const { error } = await supabase
            .from('channels')
            .delete()
            .eq('slug', slug);

        if (error) alert("Failed to remove channel: " + error.message);
    };

    const toggleRestricted = async (slug: string) => {
        // Permission check
        if (currentUserRole !== 'admin' && currentUserRole !== 'founder') {
            alert("Unauthorized: Only Admins or Founders can modify frequency restrictions.");
            return;
        }

        const chan = channels.find(c => c.slug === slug);
        if (!chan) return;

        const { error } = await supabase
            .from('channels')
            .update({ is_restricted: !chan.is_restricted })
            .eq('slug', slug);

        if (error) alert("Failed to update frequency: " + error.message);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Activity className="text-gold-primary animate-spin" size={48} />
                    <p className="text-gold-primary font-mono text-[10px] uppercase tracking-[0.5em]">Verifying Authorization...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gold-primary/10 border border-gold-primary/30 rounded-2xl flex items-center justify-center text-gold-primary shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                            <Shield size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-impact text-white tracking-widest uppercase mb-1">Central <span className="text-gold-primary">Command</span></h1>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">Gyaviira Administrative Nexus v4.0.2</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Database Linked</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gold-primary text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                            <Save size={16} /> Deploy Updates
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation */}
                    <div className="lg:col-span-1 space-y-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={18} /> },
                            { id: 'chat', label: 'Chat Frequencies', icon: <MessageSquare size={18} /> },
                            { id: 'users', label: 'User Governance', icon: <Users size={18} /> },
                            { id: 'settings', label: 'Site Matrix', icon: <Settings size={18} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-gold-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <span className={activeTab === tab.id ? 'text-black' : 'text-gold-primary/50 group-hover:text-gold-primary'}>{tab.icon}</span>
                                <span className="text-xs font-bold uppercase tracking-widest">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 space-y-6">
                        <AnimatePresence mode="wait">
                            {activeTab === 'dashboard' && (
                                <motion.div
                                    key="dashboard"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {[
                                        { label: 'Active Signals', value: stats.signals, delta: 'REAL-TIME', icon: <Activity className="animate-pulse" /> },
                                        { label: 'Chat Volume', value: stats.volume, delta: 'SYNCED', icon: <Terminal /> },
                                        { label: 'Uptime', value: stats.uptime, delta: 'STABLE', icon: <Database /> }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-6 glass-card border border-white/5 rounded-3xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 text-gold-primary/10 group-hover:text-gold-primary/30 transition-colors">
                                                {stat.icon}
                                            </div>
                                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
                                            <h3 className="text-3xl font-impact text-white tracking-tighter mb-1">{stat.value}</h3>
                                            <p className={`text-[9px] font-mono ${stat.delta.includes('+') ? 'text-green-500' : 'text-gold-primary'}`}>{stat.delta}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'chat' && (
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="p-8 glass-card border border-white/5 rounded-[2rem]">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h3 className="text-xl font-impact text-white tracking-widest uppercase">Frequency Management</h3>
                                                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Add or Remove active Sonic Chat channels</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="New Frequency Name..."
                                                    value={newChanName}
                                                    onChange={(e) => setNewChanName(e.target.value)}
                                                    className="bg-black/40 border border-white/10 rounded-xl px-6 py-3 text-xs text-white focus:outline-none focus:border-gold-primary/50 w-64"
                                                />
                                                <button
                                                    onClick={handleAddChannel}
                                                    className="p-3 bg-gold-primary text-black rounded-xl hover:scale-105 transition-transform"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {channels.map((chan) => (
                                                <div key={chan.slug} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-gold-primary/20 transition-all group">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-xl ${chan.is_restricted ? 'bg-red-500/10 text-red-500' : 'bg-gold-primary/10 text-gold-primary'}`}>
                                                            {chan.slug === 'announcements' ? <Megaphone size={18} /> : <Terminal size={18} />}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">{chan.name}</h4>
                                                            <p className="text-[9px] font-mono text-gray-600 uppercase">Slug: /{chan.slug}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <button
                                                            onClick={() => toggleRestricted(chan.slug)}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[8px] font-bold uppercase tracking-widest transition-all ${chan.is_restricted ? 'bg-red-500/20 border-red-500/30 text-red-500' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                                                        >
                                                            {chan.is_restricted ? <Lock size={12} /> : <Unlock size={12} />}
                                                            {chan.is_restricted ? 'Admin Only' : 'Public'}
                                                        </button>

                                                        <button
                                                            onClick={() => handleRemoveChannel(chan.slug)}
                                                            className="p-2 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
