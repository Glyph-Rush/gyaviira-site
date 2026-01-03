import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Camera, LogOut, Settings, Bell, MessageSquare, ExternalLink, Shield, BadgeCheck } from 'lucide-react';

const AccountHub: React.FC = () => {
    const { user, logout, updateProfilePic, updateUsername } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(user?.username || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!user) {
        navigate('/auth');
        return null;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const success = updateUsername(tempName);
        if (success) {
            setIsEditing(false);
        } else {
            alert('Invalid symbols in signature. Only ( _ . - ` ) allowed.');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Sidebar / Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        {/* Profile Card */}
                        <div className="glass-card rounded-[2.5rem] border border-gold-primary/20 p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-gold-dark/20 border-2 border-gold-primary/30 flex items-center justify-center overflow-hidden">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-gold-primary/40" />
                                    )}
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold-primary rounded-xl flex items-center justify-center text-black border-4 border-black hover:scale-110 transition-transform shadow-xl"
                                >
                                    <Camera size={18} />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-1">
                                <h2 className="text-2xl font-impact text-white tracking-widest uppercase truncate max-w-[200px]">{user.username}</h2>
                                {(user.isVerified || user.role === 'admin') && <BadgeCheck size={20} className="text-gold-primary fill-gold-primary/20" />}
                                {user.role === 'admin' && <span className="bg-gold-primary text-black text-[8px] px-2 py-0.5 rounded-md font-bold tracking-tighter">ADMIN</span>}
                            </div>
                            <p className="text-gold-primary/60 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">{user.role === 'admin' ? 'Overseer' : 'Foundation Member'}</p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => navigate('/chat')}
                                    className="w-full bg-gold-primary/10 border border-gold-primary/20 hover:bg-gold-primary hover:text-black py-4 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={16} /> Community Chat
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 py-4 rounded-2xl transition-all font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                                >
                                    <LogOut size={16} /> Disconnect
                                </button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="glass-card rounded-[2rem] border border-white/5 p-6 space-y-6">
                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] border-b border-white/5 pb-4">Member Archive</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-mono">
                                    <span className="text-gray-500 uppercase">Joined</span>
                                    <span className="text-white">{user.joinedDate}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-mono">
                                    <span className="text-gray-500 uppercase">Status</span>
                                    <span className="text-gold-primary uppercase">Active Signal</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-mono">
                                    <span className="text-gray-500 uppercase">Transmissions</span>
                                    <span className="text-white">128 Cycles</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content Col */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Settings Hub */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-[3rem] border border-white/5 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-gold-dark/20 to-transparent p-10 border-b border-white/5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-4xl font-impact text-white tracking-widest uppercase mb-2">Central <span className="text-gold-primary">Settings</span></h1>
                                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest italic">Personalize your Foundation experience</p>
                                    </div>
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gold-primary">
                                        <Settings size={32} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 space-y-12">
                                {/* Profile Edit */}
                                <section className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-impact text-white uppercase tracking-widest flex items-center gap-3">
                                            <User size={20} className="text-gold-primary" /> Profile Identity
                                        </h3>
                                        {!isEditing ? (
                                            <button onClick={() => setIsEditing(true)} className="text-[10px] text-gold-primary hover:text-gold-light uppercase tracking-widest font-bold">Edit Fragment</button>
                                        ) : (
                                            <div className="flex gap-4">
                                                <button onClick={handleSave} className="text-[10px] text-green-500 hover:text-green-400 uppercase tracking-widest font-bold">Save</button>
                                                <button onClick={() => { setIsEditing(false); setTempName(user.username); }} className="text-[10px] text-red-500 hover:text-red-400 uppercase tracking-widest font-bold">Cancel</button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Username</label>
                                            <input
                                                type="text"
                                                value={isEditing ? tempName : user.username}
                                                onChange={(e) => setTempName(e.target.value)}
                                                readOnly={!isEditing}
                                                className={`w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white font-mono text-sm focus:outline-none transition-all ${isEditing ? 'border-gold-primary/40 bg-gold-primary/5' : 'cursor-default'}`}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Email Terminal</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    readOnly
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-white/40 font-mono text-sm cursor-not-allowed"
                                                />
                                                <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Notification / Preferences */}
                                <section className="space-y-6 pt-10 border-t border-white/5">
                                    <h3 className="text-lg font-impact text-white uppercase tracking-widest flex items-center gap-3">
                                        <Bell size={20} className="text-gold-primary" /> Transmissions & Alerts
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'New Music Alerts', desc: 'Get notified when new frequencies drop' },
                                            { label: 'Community Mentions', desc: 'Alerts from the Musician Discord' },
                                            { label: 'Store Exclusives', desc: 'Early access to limited apparel' }
                                        ].map((pref, i) => (
                                            <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-gold-primary/20 transition-all group">
                                                <div>
                                                    <h4 className="text-white font-impact tracking-widest text-sm uppercase mb-1">{pref.label}</h4>
                                                    <p className="text-gray-500 text-[10px] font-mono uppercase italic">{pref.desc}</p>
                                                </div>
                                                <div className="w-12 h-6 bg-gold-dark/20 rounded-full relative cursor-pointer border border-gold-primary/20">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-gold-primary rounded-full shadow-gold"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Quick Links */}
                                <section className="pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Foundation Lore', icon: ExternalLink },
                                        { label: 'Member Discord', icon: MessageSquare },
                                        { label: 'Help Terminal', icon: Shield }
                                    ].map((link, i) => (
                                        <button key={i} className="flex flex-col items-center justify-center gap-3 p-6 glass-card rounded-2xl border border-white/5 hover:border-gold-primary/30 transition-all group">
                                            <link.icon size={20} className="text-gold-primary/60 group-hover:text-gold-primary transition-colors" />
                                            <span className="text-[9px] font-mono text-gray-500 group-hover:text-white uppercase tracking-widest text-center">{link.label}</span>
                                        </button>
                                    ))}
                                </section>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountHub;

