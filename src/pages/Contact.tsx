import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black-main">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">Get in Touch</h1>
                    <div className="w-24 h-1 bg-gold-primary mx-auto mb-10"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {/* Email Section */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-black-soft p-10 rounded-lg border border-gray-900 hover:border-gold-primary/50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-primary group-hover:text-black transition-colors text-gold-primary">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-heading text-white mb-2">Email Us</h3>
                            <a href="mailto:jeromemoses220@gmail.com" className="text-gray-400 hover:text-gold-primary transition-colors text-lg">
                                jeromemoses220@gmail.com
                            </a>
                        </motion.div>

                        {/* Socials Section */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-black-soft p-10 rounded-lg border border-gray-900 hover:border-gold-primary/50 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-primary group-hover:text-black transition-colors text-gold-primary">
                                <Instagram size={32} />
                            </div>
                            <h3 className="text-xl font-heading text-white mb-2">Socials</h3>
                            <a
                                href="https://www.instagram.com/gyav.iira/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gold-primary transition-colors text-lg"
                            >
                                @gyav.iira
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
