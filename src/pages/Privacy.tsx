import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main px-6">
            <div className="container mx-auto max-w-4xl">
                <Link to="/" className="inline-flex items-center gap-2 text-gold-primary hover:text-gold-light transition-colors mb-8 text-sm">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-[2.5rem] border border-white/5 p-12"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center">
                            <Shield size={32} className="text-gold-primary" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-impact text-white uppercase tracking-tighter">
                                Privacy <span className="text-gold-primary neon-gold">Policy</span>
                            </h1>
                            <p className="text-gray-500 text-sm font-mono mt-2">Last updated: January 2026</p>
                        </div>
                    </div>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">1. Information We Collect</h2>
                            <p className="leading-relaxed">
                                When you create an account on Gyaviira, we collect your email address, username, and profile information.
                                We also collect data about your interactions with our platform, including community chat messages, merch purchases,
                                and browsing activity to improve your experience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">2. How We Use Your Data</h2>
                            <p className="leading-relaxed">
                                Your information is used to provide and improve our services, process your orders, facilitate community interactions,
                                and send you updates about Gyaviira Foundation events and releases. We never sell your personal data to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">3. Data Security</h2>
                            <p className="leading-relaxed">
                                We use industry-standard encryption (Supabase) to protect your data. All passwords are hashed, and sensitive information
                                is transmitted over secure connections. We implement Row Level Security (RLS) to ensure users can only access their own data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">4. Your Rights</h2>
                            <p className="leading-relaxed">
                                You have the right to access, modify, or delete your personal data at any time through your Account Dashboard.
                                You can also opt out of marketing communications while retaining your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">5. Contact Us</h2>
                            <p className="leading-relaxed">
                                For privacy-related inquiries, contact us at{' '}
                                <a href="mailto:support@gyaviira.org" className="text-gold-primary hover:text-gold-light">
                                    support@gyaviira.org
                                </a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
