import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users } from 'lucide-react';

const Events = [
    {
        id: 1,
        title: "Zephyros Live Frequency",
        date: "Feb 15, 2026",
        time: "19:00 UTC",
        location: "Digital Transmission (Discord)",
        description: "An intimate night of acoustic worship and creative storytelling.",
        attendees: 42
    },
    {
        id: 2,
        title: "Kora Workshop - Cycle III",
        date: "Feb 22, 2026",
        time: "14:00 UTC",
        location: "Nairobi Creative Hub",
        description: "Hands-on mentorship for the next generation of 21-string players.",
        attendees: 15
    }
];

const EventCalendar: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen bg-black px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-impact text-white mb-4 tracking-widest uppercase">Sonic Calendar</h1>
                    <p className="text-gold-primary font-mono text-xs uppercase tracking-[0.4em]">Where Faith Meets Frequency</p>
                </div>

                <div className="space-y-6">
                    {Events.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card bg-black-soft p-8 md:p-12 rounded-[3rem] border-white/5 flex flex-col md:flex-row gap-8 items-center group hover:border-gold-primary/20 transition-all"
                        >
                            <div className="text-center md:text-left min-w-[200px]">
                                <div className="text-4xl font-impact text-gold-primary mb-1">{event.date.split(' ')[1]}</div>
                                <div className="text-gray-500 font-mono text-sm uppercase tracking-widest">{event.date.split(' ')[0]} {event.date.split(' ')[2]}</div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-heading text-white mb-4 group-hover:text-gold-primary transition-colors">{event.title}</h2>
                                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Clock size={12} className="text-gold-primary" /> {event.time}</span>
                                    <span className="flex items-center gap-2"><MapPin size={12} className="text-gold-primary" /> {event.location}</span>
                                    <span className="flex items-center gap-2"><Users size={12} className="text-gold-primary" /> {event.attendees} Resonating</span>
                                </div>
                            </div>

                            <button className="btn-gold px-10 py-4 font-impact tracking-widest text-sm whitespace-nowrap">
                                RSVP SIGNAL
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventCalendar;
