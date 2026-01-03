import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, Chrome } from 'lucide-react';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const result = login(email, isLogin ? (username || email.split('@')[0]) : username, password);

        if (result.success) {
            navigate('/account');
        } else {
            setError(result.message || 'Authentication failed.');
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center px-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-card rounded-[2.5rem] border border-gold-primary/20 p-10 relative overflow-hidden"
            >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-primary/10 blur-[100px] rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gold-primary/5 blur-[100px] rounded-full"></div>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gold-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gold-primary/30 relative">
                        <Sparkles size={40} className="text-gold-primary animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-impact text-white tracking-widest uppercase mb-2">
                        {isLogin ? 'Access' : 'Initialize'} <span className="text-gold-primary neon-gold">Core</span>
                    </h1>
                    <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                        {isLogin ? 'Welcome back to the movement' : 'Create your digital signature'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-6 flex items-center gap-3"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="block text-[10px] font-mono text-gold-primary/60 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="MUSICAL_SOUL_01"
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-primary/50 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono text-gold-primary/60 uppercase tracking-widest ml-1">Email Terminal</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.com"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-primary/50 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-mono text-gold-primary/60 uppercase tracking-widest ml-1">Archive Key</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-primary/40" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-primary/50 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-gold py-5 text-sm tracking-[0.2em] font-bold shadow-gold mt-4">
                        {isLogin ? 'ESTABLISH LINK' : 'REGISTER SIGNATURE'}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <span className="relative bg-black px-4 text-[10px] font-mono text-gray-600 uppercase">OR CONTINUUE WITH</span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#111] border border-white/5 hover:border-gold-primary/30 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all group"
                    >
                        <Chrome size={20} className="text-gray-400 group-hover:text-gold-primary transition-colors" />
                        <span className="text-xs font-mono text-gray-400 group-hover:text-white uppercase tracking-widest">Google Sync</span>
                    </button>
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs text-gold-primary hover:text-gold-light transition-colors font-mono uppercase tracking-[0.2em]"
                    >
                        {isLogin ? "Don't have a signature? Initialize" : "Already registered? Establish link"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
