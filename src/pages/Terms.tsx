import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-transparent px-6">
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
                            <FileText size={32} className="text-gold-primary" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-impact text-white uppercase tracking-tighter">
                                Terms of <span className="text-gold-primary neon-gold">Service</span>
                            </h1>
                            <p className="text-gray-500 text-sm font-mono mt-2">Last updated: January 2026</p>
                        </div>
                    </div>

                    <div className="space-y-8 text-gray-300">
                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">1. Acceptance of Terms</h2>
                            <p className="leading-relaxed">
                                By accessing and using the Gyaviira Music Foundation platform, you agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">2. Account Responsibilities</h2>
                            <p className="leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information
                                during registration and to update it as necessary. All activities under your account are your responsibility.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">3. Community Guidelines</h2>
                            <p className="leading-relaxed">
                                Our community chat is a space for respectful dialogue. Harassment, hate speech, spam, or inappropriate content will result in
                                account suspension or termination. Users must comply with our moderation policies and respect all community members.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">4. Intellectual Property</h2>
                            <p className="leading-relaxed">
                                All content on this platform, including music, graphics, logos, and text, is the property of Gyaviira Music Foundation
                                and is protected by copyright laws. Unauthorized reproduction or distribution is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">5. Purchases & Refunds</h2>
                            <p className="leading-relaxed">
                                All merch purchases are final. Refunds are only provided for defective products or shipping errors.
                                Please contact <a href="mailto:support@gyaviira.org" className="text-gold-primary hover:text-gold-light">support@gyaviira.org</a> within
                                14 days of receiving your order to request a refund.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">6. Termination</h2>
                            <p className="leading-relaxed">
                                We reserve the right to suspend or terminate your account at any time for violations of these terms,
                                fraudulent activity, or any behavior that harms the community or platform integrity.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-impact text-gold-primary uppercase tracking-wider mb-4">7. Contact</h2>
                            <p className="leading-relaxed">
                                For questions about these terms, contact{' '}
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

export default Terms;
