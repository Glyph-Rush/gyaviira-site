
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Users, UserX, Trash2, ShieldCheck,
    Search, Activity, Database,
    RefreshCcw, CheckCircle,
    Settings, Edit3, X, Save, Server
} from 'lucide-react';

// Sub-components can be extracted, but keeping mostly inline for now or modularizing if huge.
// We will use a Modal for editing users.

const AdminPanel: React.FC = () => {
    const { user, allUsers, toggleBan, deleteUser, toggleVerification, adminUpdateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'system' | 'advanced'>('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    // Edit Modal State
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [editForm, setEditForm] = useState({ username: '', bio: '', role: 'user' as 'user' | 'admin' });

    // Redirect if not admin
    React.useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'admin') return null;

    const filteredUsers = allUsers.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert('Database synchronized with all Foundation nodes.');
        }, 2000);
    };

    const openEditModal = (u: any) => {
        setEditingUser(u);
        setEditForm({ username: u.username, bio: u.bio || '', role: u.role });
    };

    const saveUserChanges = async () => {
        if (!editingUser) return;
        try {
            await adminUpdateUser(editingUser.id, editForm);
            setEditingUser(null);
        } catch (error) {
            alert('Update failed');
        }
    };

    // -- DASHBOARD VIEW --
    const DashboardView = () => {
        const stats = [
            { label: 'Total Accounts', value: allUsers.length, icon: Users, color: 'text-gold-primary' },
            { label: 'Admin Protocols', value: allUsers.filter(u => u.role === 'admin').length, icon: ShieldCheck, color: 'text-cyan-400' },
            { label: 'Banned Signals', value: allUsers.filter(u => u.isBanned).length, icon: UserX, color: 'text-red-500' },
            { label: 'Waitlist Depth', value: allUsers.filter(u => !u.isVerified).length, icon: Activity, color: 'text-yellow-500' }
        ];

        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 border border-white/5 rounded-3xl relative overflow-hidden group hover:border-gold-primary/20 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon size={20} className={stat.color} />
                                <Database size={14} className="text-gray-800" />
                            </div>
                            <div className="text-2xl font-impact text-white mb-1">{stat.value}</div>
                            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 h-[300px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-mono text-gold-primary uppercase tracking-[0.4em]">System Logs</h3>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-gold-primary/20"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                            </div>
                        </div>
                        <div className="flex-1 bg-black/60 rounded-xl p-6 font-mono text-[10px] text-green-500/80 overflow-y-auto space-y-1">
                            <div>[SYSTEM] Overseer Protocol Initialized...</div>
                            <div>[AUTH] Admin {user.username} authenticated.</div>
                            <div>[DB] Syncing {allUsers.length} profile records...</div>
                            {/* Mock logs */}
                            {allUsers.slice(0, 3).map(u => (
                                <div key={u.id}>[USER] Signature detected: {u.username} ({u.id.substring(0, 8)}...)</div>
                            ))}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }}>_</motion.div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // -- USER MANAGER VIEW --
    const UserManagerView = () => {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                        <input
                            type="text"
                            placeholder="SCAN USER SIGNATURES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-gold-primary/20 rounded-2xl py-3 pl-12 pr-4 text-white font-mono text-xs focus:outline-none focus:border-gold-primary/60 transition-all placeholder:text-gray-700"
                        />
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isSyncing ? 'animate-spin' : ''} /> {isSyncing ? 'Syncing...' : 'Sync DB'}
                    </button>
                </div>

                <div className="glass-card rounded-[2rem] border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-black/40">
                                    <th className="px-8 py-5 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">Identity</th>
                                    <th className="px-8 py-5 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-8 py-5 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">Role</th>
                                    <th className="px-8 py-5 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {filteredUsers.map((u) => (
                                        <motion.tr
                                            key={u.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`hover:bg-white/2 transition-colors ${u.isBanned ? 'bg-red-950/10' : ''}`}
                                        >
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                                                        {u.profilePic ? <img src={u.profilePic} className="w-full h-full object-cover" /> : <Users size={14} className="text-gray-600" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                                            {u.username}
                                                            {u.preferences?.verificationRequested && !u.isVerified && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" title="Requested Verification"></span>}
                                                        </div>
                                                        <div className="text-[8px] font-mono text-gray-600">{u.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-[10px] font-mono text-gray-400">{u.email}</td>
                                            <td className="px-8 py-4">
                                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md border uppercase ${u.role === 'admin' ? 'bg-gold-primary/10 text-gold-primary border-gold-primary/30' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${u.isBanned ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                    <span className={`text-[9px] font-mono uppercase tracking-widest ${u.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                                                        {u.isBanned ? 'BANNED' : 'ACTIVE'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => openEditModal(u)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors modal-trigger" title="Edit Details">
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button onClick={() => toggleVerification(u.id, !!u.isVerified)} className={`p-2 rounded-lg transition-colors ${u.isVerified ? 'text-gold-primary bg-gold-primary/10' : 'text-gray-500 hover:text-gold-primary'}`} title="Toggle Verification">
                                                        <CheckCircle size={14} />
                                                    </button>
                                                    <button onClick={() => toggleBan(u.id, !!u.isBanned)} className={`p-2 rounded-lg transition-colors ${u.isBanned ? 'text-green-500 bg-green-500/10' : 'text-gray-500 hover:text-red-500'}`} title="Banishment Protocol">
                                                        <UserX size={14} />
                                                    </button>
                                                    <button onClick={() => deleteUser(u.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // -- SYSTEM & ADVANCED VIEW --
    const SystemView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                <h3 className="text-sm font-impact text-white uppercase tracking-widest flex items-center gap-3">
                    <Settings size={18} className="text-gold-primary" /> Global Configurations
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider">Maintenance Mode</div>
                            <div className="text-[9px] font-mono text-gray-500">Lockdown site for non-admins</div>
                        </div>
                        <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-not-allowed opacity-50"><div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider">Registration Gate</div>
                            <div className="text-[9px] font-mono text-gray-500">Close new account creation</div>
                        </div>
                        <div className="w-10 h-5 bg-gold-primary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full shadow-md"></div></div>
                    </div>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-[10px] font-mono text-yellow-500">
                    NOTE: Global flags require database migration. Currently simulating local admin environment.
                </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                <h3 className="text-sm font-impact text-white uppercase tracking-widest flex items-center gap-3">
                    <Server size={18} className="text-gold-primary" /> Database Diagnostics
                </h3>
                <pre className="bg-black p-4 rounded-xl text-[9px] font-mono text-green-500 overflow-x-auto border border-white/10">
                    {JSON.stringify({
                        status: 'HEALTHY',
                        latency: '24ms',
                        connections: allUsers.length,
                        region: 'aws-us-east-1',
                        version: 'v2.4.0'
                    }, null, 2)}
                </pre>
                <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-gold-primary hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    Run System Diagnostics
                </button>
            </div>
        </div>
    );

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-impact text-white tracking-widest uppercase mb-2">Overseer <span className="text-gold-primary">Panel</span></h1>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] ml-1">Foundation Strategic Command v2.0</p>
                    </div>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: Activity },
                            { id: 'users', label: 'User Database', icon: Users },
                            { id: 'system', label: 'System Config', icon: Settings },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab.id ? 'bg-gold-primary text-black shadow-gold' : 'text-gray-400 hover:text-white'}`}
                            >
                                <tab.icon size={14} /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {activeTab === 'dashboard' && <DashboardView />}
                    {activeTab === 'users' && <UserManagerView />}
                    {activeTab === 'system' && <SystemView />}
                </div>

            </div>

            {/* Edit User Modal */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-black-soft border border-gold-primary/30 rounded-3xl p-8 w-full max-w-lg relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                        >
                            <button onClick={() => setEditingUser(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>

                            <h3 className="text-xl font-impact text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Edit Entity Data</h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Target Signature (Username)</label>
                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-gold-primary/50 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Metadata (Bio)</label>
                                    <textarea
                                        value={editForm.bio}
                                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-gold-primary/50 outline-none h-24 resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Clearance Level</label>
                                    <select
                                        value={editForm.role}
                                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 text-white font-mono text-sm focus:border-gold-primary/50 outline-none"
                                    >
                                        <option value="user">Foundation Member (User)</option>
                                        <option value="admin">Overseer (Admin)</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button onClick={saveUserChanges} className="flex-1 bg-gold-primary text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
                                        <Save size={16} /> Save Changes
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
