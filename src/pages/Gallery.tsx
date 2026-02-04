import React from 'react';
import { motion } from 'framer-motion';
import communityConcert from '../assets/community_concert.png';
import artistryInMotion from '../assets/artistry_in_motion.png';
import gyaviiraRecords from '../assets/gyaviira_records.png';
import liveEnergy from '../assets/live_energy.png';
import newSongs from '../assets/gilded_vibrations.png';
import collectivePulse from '../assets/collective_pulse.png';
import youthMentorship from '../assets/youth_mentorship.png';
import faithRooted from '../assets/faith.png'
import musicalHeritage from '../assets/musical_heritage.png'

const images = [
    { url: musicalHeritage, title: 'Musical Heritage' },
    { url: communityConcert, title: 'Community Concert' },
    { url: youthMentorship, title: 'Youth Mentorship' },
    { url: artistryInMotion, title: 'Artistry in Motion' },
    { url: faithRooted, title: 'Faith-Rooted Performance' },
    { url: gyaviiraRecords, title: 'Gyaviira Records' },
    { url: liveEnergy, title: 'Live Energy' },
    { url: collectivePulse, title: 'Collective Pulse' },
    { url: newSongs, title: 'Latest Drops' },
];

const Gallery: React.FC = () => {
    return (
        <div className="pt-32 pb-20 bg-transparent min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-impact text-gold-primary mb-6 tracking-tighter uppercase neon-gold">Gallery</h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase">Capturing the rhythm of our legacy.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="relative group overflow-hidden rounded-2xl glass-card border border-gold-primary/20 aspect-square"
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <h3 className="text-2xl font-impact text-gold-primary tracking-widest uppercase mb-2">
                                    {img.title}
                                </h3>
                                <div className="h-0.5 w-12 bg-gold-primary"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
