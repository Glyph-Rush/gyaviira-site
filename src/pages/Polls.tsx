import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PollOption {
    id: string;
    text: string;
    votes: number;
}

interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    total_votes: number;
    expires_at: string;
    hasVoted?: boolean;
}

const Polls: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPolls();

        // Subscribe to realtime updates
        const channel = supabase
            .channel('public:polls')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'polls' }, () => {
                fetchPolls();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchPolls = async () => {
        const { data, error } = await supabase
            .from('polls')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching polls:', error);
        } else {
            // Check localStorage for voted status
            const votedPolls = JSON.parse(localStorage.getItem('gyaviira_voted_polls') || '[]');
            const pollsWithVoted = data.map((poll: any) => ({
                ...poll,
                hasVoted: votedPolls.includes(poll.id)
            }));
            setPolls(pollsWithVoted);
        }
        setLoading(false);
    };

    const handleVote = async (pollId: string, optionId: string) => {
        const poll = polls.find(p => p.id === pollId);
        if (!poll || poll.hasVoted) return;

        const updatedOptions = poll.options.map(opt =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );

        const { error } = await supabase
            .from('polls')
            .update({
                options: updatedOptions,
                total_votes: poll.total_votes + 1
            })
            .eq('id', pollId);

        if (error) {
            console.error('Error recording vote:', error);
            alert('Failed to transmit vote. Check your frequency.');
        } else {
            // Update local state and storage
            const votedPolls = JSON.parse(localStorage.getItem('gyaviira_voted_polls') || '[]');
            votedPolls.push(pollId);
            localStorage.setItem('gyaviira_voted_polls', JSON.stringify(votedPolls));

            setPolls((prev: Poll[]) => prev.map((p: Poll) =>
                p.id === pollId ? { ...p, options: updatedOptions, total_votes: p.total_votes + 1, hasVoted: true } : p
            ));
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 bg-transparent min-h-screen">
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

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-gold-primary/20 border-t-gold-primary rounded-full animate-spin"></div>
                    </div>
                ) : polls.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-gray-500 font-mono text-sm uppercase">No active polls in current frequency.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {polls.map((poll: Poll, index: number) => (
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
                                            <span>{poll.total_votes} Votes</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {poll.options.map((option: PollOption) => {
                                        const percentage: number = poll.total_votes > 0
                                            ? Math.round((option.votes / poll.total_votes) * 100)
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
                )}

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
