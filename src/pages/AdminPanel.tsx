import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Shield, Users, UserX, Trash2, ShieldCheck,
    Search, Activity, Database, Terminal,
    AlertCircle, RefreshCcw, BadgeCheck, CheckCircle
} from 'lucide-react';

const AdminPanel: React.FC = () => {
    const { user, allUsers, banUser, deleteUser, updateUserRole, verifyUser } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'all' | 'waitlist'>('all');
    const [isSyncing, setIsSyncing] = useState(false);

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

    const waitlist = filteredUsers.filter(u => !u.isVerified && u.role !== 'admin');

    const stats = [
        { label: 'Total Accounts', value: allUsers.length, icon: Users, color: 'text-gold-primary' },
        { label: 'Admin Protocols', value: allUsers.filter(u => u.role === 'admin').length, icon: ShieldCheck, color: 'text-cyan-400' },
        { label: 'Banned Signals', value: allUsers.filter(u => u.isBanned).length, icon: UserX, color: 'text-red-500' },
        { label: 'Waitlist Depth', value: waitlist.length, icon: Activity, color: 'text-green-500' }
    ];

    const UserRow = ({ u }: { u: any }) => (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`hover:bg-white/2 transition-colors ${u.isBanned ? 'bg-red-950/10' : ''}`}
        >
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                        {u.profilePic ? <img src={u.profilePic} className="w-full h-full object-cover" /> : <Users size={18} className="text-gray-600" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm font-bold text-white uppercase tracking-widest">{u.username}</div>
                            {u.isVerified && (
                                <BadgeCheck size={14} className="text-gold-primary fill-gold-primary/20" />
                            )}
                            {u.role === 'admin' && <span className="bg-gold-primary text-black text-[7px] px-1.5 py-0.5 rounded-md font-bold tracking-tighter">ADMIN</span>}
                        </div>
                        <div className="text-[9px] font-mono text-gray-600 uppercase">ID: {u.id}</div>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6 text-[11px] font-mono text-gray-400">{u.email}</td>
            <td className="px-8 py-6">
                <span className={`text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-tighter ${u.role === 'admin' ? 'bg-gold-primary/10 text-gold-primary border-gold-primary/30' : 'bg-white/5 text-gray-500 border-white/10'
                    }`}>
                    {u.role}
                </span>
            </td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${u.isBanned ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${u.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                        {u.isBanned ? 'BANNED' : 'SYNCHRONIZED'}
                    </span>
                </div>
            </td>
            <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => verifyUser(u.id)}
                        className={`p-2 rounded-lg border transition-all ${u.isVerified ? 'bg-gold-primary/20 border-gold-primary/40 text-gold-primary' : 'bg-white/5 border-white/10 text-gray-500 hover:text-gold-primary'}`}
                        title={u.isVerified ? 'Revoke Verification' : 'Verify Signal'}
                    >
                        <CheckCircle size={16} />
                    </button>
                    <button
                        onClick={() => banUser(u.id)}
                        className={`p-2 rounded-lg border transition-all ${u.isBanned ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
                        title={u.isBanned ? 'Lift Ban' : 'Terminate Link (Ban)'}
                    >
                        <UserX size={16} />
                    </button>
                    <button
                        onClick={() => updateUserRole(u.id, u.role === 'admin' ? 'user' : 'admin')}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-gold-primary hover:border-gold-primary/40 transition-all"
                        title="Switch Clearance Level"
                    >
                        <Shield size={16} />
                    </button>
                    <button
                        onClick={() => deleteUser(u.id)}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all"
                        title="Wipe Entry (Delete)"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </motion.tr>
    );

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert('Database synchronized with all Foundation nodes.');
        }, 2000);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gold-primary rounded-xl flex items-center justify-center text-black shadow-gold">
                                <Shield size={24} />
                            </div>
                            <h1 className="text-4xl font-impact text-white tracking-widest uppercase">Overseer <span className="text-gold-primary">Panel</span></h1>
                        </div>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] ml-1">Foundation Strategic Command Terminal</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                        <input
                            type="text"
                            placeholder="SCAN USER SIGNATURES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-gold-primary/20 rounded-2xl py-4 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-gold-primary/60 transition-all placeholder:text-gray-700"
                        />
                    </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-8 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-gold-primary text-black border-gold-primary' : 'bg-white/5 text-gray-400 border-white/5 hover:text-white'}`}
                    >
                        All Entities
                    </button>
                    <button
                        onClick={() => setActiveTab('waitlist')}
                        className={`px-8 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'waitlist' ? 'bg-gold-primary text-black border-gold-primary' : 'bg-white/5 text-gray-400 border-white/5 hover:text-white'}`}
                    >
                        Verification Waitlist ({waitlist.length})
                    </button>
                </div>

                {/* Main Content: User Table */}
                <div className="glass-card rounded-[3rem] border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 bg-white/2 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-xl font-impact text-white tracking-widest uppercase flex items-center gap-3">
                            <Terminal size={20} className="text-gold-primary" /> {activeTab === 'all' ? 'Registered Entities' : 'Waitlist Signatures'}
                        </h2>
                        <div className="flex gap-4">
                            <button
                                onClick={handleSync}
                                disabled={isSyncing}
                                className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                            >
                                <RefreshCcw size={14} className={isSyncing ? 'animate-spin' : ''} /> {isSyncing ? 'Syncing...' : 'Sync Database'}
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-black/40">
                                    <th className="px-8 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Signature</th>
                                    <th className="px-8 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Contact Node</th>
                                    <th className="px-8 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Clearance</th>
                                    <th className="px-8 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] text-right">Directives</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 relative">
                                <AnimatePresence mode="popLayout">
                                    {(activeTab === 'all' ? filteredUsers : waitlist).map((u) => (
                                        <UserRow key={u.id} u={u} />
                                    ))}
                                </AnimatePresence>
                                {(activeTab === 'all' ? filteredUsers : waitlist).length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">No signals detected in this frequency</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Logs / Console (Visual only) */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] border border-white/5 h-[300px] flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-mono text-gold-primary uppercase tracking-[0.4em]">Overseer Executive Console</h3>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                <div className="w-2 h-2 rounded-full bg-gold-primary/20"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                            </div>
                        </div>
                        <div className="flex-1 bg-black/60 rounded-xl p-6 font-mono text-[10px] text-green-500/80 overflow-y-auto space-y-1">
                            <div>[01/03/2026 13:51] SYSTEM_INITIALIZED: Overseer Clearance Granted.</div>
                            <div>[01/03/2026 13:52] DB_SYNC: Synchronizing 1,204 foundation nodes...</div>
                            <div>[01/03/2026 13:53] ALERT: High frequency activity detected in #production-tech.</div>
                            <div>[01/03/2026 13:54] CACHE_CLEARED: 1.2GB temporary residue purged.</div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1 }}>_</motion.div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-full border-4 border-gold-primary/20 flex items-center justify-center relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-4 border-gold-primary rounded-full"
                            ></motion.div>
                            <AlertCircle size={32} className="text-gold-primary animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-sm font-impact text-white uppercase tracking-widest mb-1">Critical Directives</h4>
                            <p className="text-[10px] text-gray-500 font-mono uppercase">System is currently operating under Standard Encryption protocols.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
