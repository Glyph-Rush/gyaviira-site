import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';

interface Poll {
    id: string;
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    expiresAt: string;
    hasVoted?: boolean;
}

const Polls: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([
        {
            id: '1',
            question: "Which heritage chord series should we archive next?",
            options: [
                { id: 'a', text: 'Classic Rhythms (Roots/Reggae)', votes: 145 },
                { id: 'b', text: 'Spiritual Resonance (Gospel)', votes: 89 },
                { id: 'c', text: 'Afro-Jazz Fusion', votes: 112 },
                { id: 'd', text: 'Acoustic Soul', votes: 67 }
            ],
            totalVotes: 413,
            expiresAt: '2026-01-20T12:00:00Z'
        },
        {
            id: '2',
            question: "Next Merch Drop Design?",
            options: [
                { id: 'a', text: 'Minimalist Gold Logo', votes: 230 },
                { id: 'b', text: 'Sonic Pulse Abstract', votes: 190 },
                { id: 'c', text: 'Vintage Heritage Print', votes: 215 }
            ],
            totalVotes: 635,
            expiresAt: '2026-01-15T18:00:00Z'
        }
    ]);

    const handleVote = (pollId: string, optionId: string) => {
        setPolls(prev => prev.map(poll => {
            if (poll.id === pollId && !poll.hasVoted) {
                const newOptions = poll.options.map(opt =>
                    opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
                );
                return { ...poll, options: newOptions, totalVotes: poll.totalVotes + 1, hasVoted: true };
            }
            return poll;
        }));
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 bg-black-main min-h-screen">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading text-white mb-4 uppercase tracking-[0.2em]">
                            Community <span className="text-gold-primary shadow-gold">Voice</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-xs md:text-sm uppercase tracking-widest max-w-xl mx-auto">
                            The rhythm of the foundation is directed by the pulse of its members. Vote on future initiatives.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {polls.map((poll, index) => (
                        <motion.div
                            key={poll.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card border border-gold-primary/20 rounded-[2rem] p-6 md:p-10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gold-primary/10 rounded-xl">
                                        <BarChart2 className="text-gold-primary" size={20} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-heading text-white uppercase tracking-wider">{poll.question}</h3>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <Clock size={12} />
                                        <span>Ends in 3 days</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                        <Users size={12} />
                                        <span>{poll.totalVotes} Votes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {poll.options.map(option => {
                                    const percentage = poll.totalVotes > 0
                                        ? Math.round((option.votes / poll.totalVotes) * 100)
                                        : 0;

                                    return (
                                        <button
                                            key={option.id}
                                            disabled={poll.hasVoted}
                                            onClick={() => handleVote(poll.id, option.id)}
                                            className={`w-full group relative p-5 rounded-2xl border transition-all text-left overflow-hidden ${poll.hasVoted ? 'border-white/5 bg-white/2' : 'border-white/10 bg-white/5 h-16 hover:border-gold-primary/40'}`}
                                        >
                                            {/* Progress Bar Background */}
                                            {poll.hasVoted && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${percentage}%` }}
                                                    className="absolute inset-0 bg-gold-primary/10"
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                />
                                            )}

                                            <div className="relative flex justify-between items-center z-10">
                                                <div className="flex items-center gap-3">
                                                    {poll.hasVoted && <CheckCircle size={16} className="text-gold-primary" />}
                                                    <span className={`text-sm md:text-base font-bold uppercase tracking-widest ${poll.hasVoted ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {option.text}
                                                    </span>
                                                </div>
                                                {poll.hasVoted && (
                                                    <span className="text-gold-primary font-impact text-lg">{percentage}%</span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {poll.hasVoted && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-6 text-center text-[10px] font-mono text-gold-primary/60 uppercase tracking-[0.2em]"
                                >
                                    Thank you for sharing your frequency. Your vote has been recorded.
                                </motion.p>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono text-gray-500 uppercase tracking-widest hover:text-gold-primary hover:border-gold-primary/40 transition-all flex items-center gap-2 mx-auto">
                        View Archived Polls <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Polls;
