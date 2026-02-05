import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, Lock, AlertTriangle, Search, Terminal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isError?: boolean;
    isSystem?: boolean;
}

interface RhythmChatProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const PROFANITY_LIST = ['mf', 'bitch', 'fuck', 'motherfucker', 'tf', 'wtf', 'stupid', 'idiot', 'shit', 'ass'];

const DISCLAIMER_MESSAGE = `Disclaimer:
The Gyaviira Music Foundation values respectful and meaningful dialogue. Abusive, offensive, or unclear language will not be processed. Please rephrase your message in a constructive way so Rhythm can assist you. Continued misuse may result in restricted access.`;

// Extensive Knowledge Base
const KNOWLEDGE_BASE = [
    // --- 1. IDENTITY & CREATION (5 scenarios) ---
    { keys: ['who are you', 'your name', 'identify'], response: "I am **Rhythm**, the official AI guide for the **Gyaviira Music Foundation**. I'm here to assist you with information about our legacy, mission, and store. Is there anything specific you'd like to explore?" },
    { keys: ['who made you', 'creator', 'developer', 'born'], response: "I was developed to embody the digital harmony of the Foundation's vision. I am part of the version 5.0 autonomous interface series." },
    { keys: ['are you human', 'bot or person', 'real person'], response: "I am a high-level **Artificial Intelligence** interface designed to represent the Foundation. While I don't have a physical form, I am dedicated to serving the musical community." },
    { keys: ['meaning of rhythm'], response: "In the context of the Foundation, **Rhythm** represents the heartbeat of tradition and the steady pulse of faith that drives us forward." },
    { keys: ['version', 'update', 'latest build'], response: "I am currently running on **Autonomous Mode V5.0**, optimized for structured responses and deep archival research." },

    // --- 2. ZEPHYROS LORE & STORYTELLING (10 scenarios) ---
    { keys: ['zephyros', 'world', 'planet'], response: "In our creative narrative, **Zephyros** is a world built on the pillars of **Harmony**, **Resilience**, and **Individuality**. It is the conceptual birthplace of our unique compositions." },
    { keys: ['heartbeat', 'lore', 'backstory'], response: "The heartbeat of Zephyros refers to the rhythmic core of our creations—a fusion of heritage and futuristic vision." },
    { keys: ['symbolism', 'emblems', 'logos'], response: "Every symbol at Gyaviira carries deep meaning, blending ancient artistry with authentic modern symbolism." },
    { keys: ['resilience', 'overcoming', 'strength'], response: "Our story focuses on resilience through creativity. We believe that even in the quietest moments, rhythm can be a source of strength." },
    { keys: ['unity', 'together', 'oneness'], response: "**Unity** is the bridge between different sounds and cultures. It is the language of the spirit that Gyaviira aims to speak." },
    { keys: ['individuality', 'unique', 'be yourself'], response: "We celebrate the unique voice of every artist. In the symphony of Zephyros, every frequency matters." },
    { keys: ['spirit', 'soul', 'inner rhythm'], response: "Music is more than sound—it's a language of the spirit. We aim to reach the soul through every note." },
    { keys: ['legacy', 'ancestors', 'inheritance'], response: "Our legacy is built on honoring the past while boldly shaping the future of musical expression." },
    { keys: ['storytelling', 'narrative', 'tale'], response: "We tell the story of a cultural movement that uses music as a vessel for faith and hope." },
    { keys: ['harmony', 'composition', 'balance'], response: "**Harmony** is the perfect alignment of faith, creativity, and tradition." },

    // --- 3. MISSION & VISION (10 scenarios) ---
    { keys: ['mission', 'goal', 'purpose'], response: "Our mission is a commitment to:\n\n*   **Bridge rhythm and truth** through education.\n*   **Uplift communities** by celebrating harmony.\n*   **Empower talent** using God-given musical gifts." },
    { keys: ['vision', 'dream', 'future'], response: "We envision a future where:\n\n1.  Every child can **hold an instrument**.\n2.  Every community is **celebrated through song**.\n3.  Faith and creativity **inspire hope**." },
    { keys: ['aim', 'objective', 'trying to do'], response: "We aim to build a lasting legacy where music and design speak directly to the human soul." },
    { keys: ['empower', 'mentorship', 'teach'], response: "We empower the next generation of artists through specialized mentorship and performance platforms." },
    { keys: ['preservation', 'document', 'save culture'], response: "We are dedicated to preserving fragile cultural traditions and documenting unique rhythms for posterity." },
    { keys: ['spread', 'reach', 'global'], response: "We strive to reach the globe with a message of hope, using the universal language of music." },
    { keys: ['faith', 'gospel', 'spiritual'], response: "The Foundation is rooted in faith. We believe music is a divine vessel for truth and love." },
    { keys: ['hope', 'grace', 'blessing'], response: "Our goal is to be a beacon of hope and a channel for grace in a fragmented world." },
    { keys: ['artistry', 'creative', 'innovation'], response: "We blend traditional artistry with futuristic innovation to create something truly unique." },
    { keys: ['impact', 'social good', 'communities'], response: "Our impact is measured by the growth of the artists we mentor and the resilience of the communities we serve." },

    // --- 4. INSTRUMENTS & TECHNICAL (15 scenarios) ---
    { keys: ['instruments', 'buy instrument', 'gear'], response: "We offer handcrafted instruments including **Koras**, **Djembes**, and **Kalimbas**. [Explore Instruments](/instruments)", action: '/instruments' },
    { keys: ['kora', 'string instrument', 'west african harp'], response: "The **Kora** is a 21-string bridge-harp. Our 'Heritage Kora' ($450) is tuned for both traditional and modern play. [View Detail](/instruments)", action: '/instruments' },
    { keys: ['djembe', 'drum', 'percussion'], response: "The **Foundation Djembe** ($180) is carved from solid hardwood with a professional-grade skin. It's the pulse of our percussion. [View Detail](/instruments)", action: '/instruments' },
    { keys: ['kalimba', 'thumb piano', 'mbira'], response: "The **Rhythm Kalimba** ($60) is an 17-key instrument crafted for portable, melodic expression. [View Detail](/instruments)", action: '/instruments' },
    { keys: ['flute', 'wind instrument', 'echoes'], response: "Our **Echoes Flute** ($75) is designed for a cinematic, ethereal tone. Perfect for atmospheric compositions. [View Detail](/instruments)", action: '/instruments' },
    { keys: ['bass guitar', 'bass', 'low end'], response: "The bass guitar is central to Gyaviira's compositions, providing the deep, rhythmic foundation for our anthems." },
    { keys: ['cello', 'classic', 'strings'], response: "Our cello works blend classical depth with modern rhythmic energy, creating a unique cinematic sound." },
    { keys: ['tuning', 'frequency', '432hz'], response: "Many of our recordings are optimized at 432Hz, often considered mathematically consistent with the universe's natural resonance." },
    { keys: ['handcrafted', 'handmade', 'artisan'], response: "All our instruments are handcrafted by master artisans within the Foundation to ensure premium quality." },
    { keys: ['quality', 'build', 'material'], response: "We use only the finest woods and materials, ensuring that every instrument is built for a lifetime of music." },
    { keys: ['beginner', 'easy to learn', 'starting'], response: "The **Kalimba** is an excellent starting point for beginners, while the **Djembe** is great for those who love rhythm." },
    { keys: ['professional', 'pro level', 'expert'], response: "Our **Heritage Kora** is designed for professional performers looking for authentic, stage-ready sound." },
    { keys: ['warranty', 'guarantee', 'repair'], response: "We stand by our craftsmanship. All foundation-made instruments come with a quality guarantee." },
    { keys: ['custom', 'bespoke', 'special order'], response: "For special orders or custom engravings, please reach out to our team through the [Contact Portal](/contact).", action: '/contact' },
    { keys: ['tuning service', 'setup', 'maintain'], response: "We provide resources and guides for maintaining and tuning your handcrafted instruments." },

    // --- 5. MERCH & SHOPPING (15 scenarios) ---
    { keys: ['store', 'shop', 'merch', 'buy'], response: "Our **Gold Merch Collection** is available now! Browse our hoodies, caps, and tees. [Go to Store](/store)", action: '/store' },
    { keys: ['price', 'cost', 'how much'], response: "Current signature items:\n*   **Caps**: $25\n*   **Tees**: $30\n*   **Hoodies**: $55\n\n[Check Store](/store)", action: '/store' },
    { keys: ['hoodie', 'jacket', 'soft goods'], response: "The **Impact Hoodie** ($55) features high-density gold embroidery on premium heavy cotton. [View Store](/store)", action: '/store' },
    { keys: ['cap', 'hat', 'headwear'], response: "Our **Signature Gold Caps** ($25) are a staple of the Gyaviira identity. [View Store](/store)", action: '/store' },
    { keys: ['shirt', 'tee', 'top'], response: "Our **Member Tees** ($30) are designed for comfort and style, carrying the Foundation emblem. [View Store](/store)", action: '/store' },
    { keys: ['sizes', 'fit', 'measurement'], response: "Most items are available in S through XXL. Detailed size guides are on the product pages in the [Store](/store).", action: '/store' },
    { keys: ['shipping', 'delivery', 'tracking'], response: "We ship globally. Once your order is processed, you'll receive a 'Transmission Registered' email with tracking info." },
    { keys: ['payment', 'paypal', 'card', 'crypto'], response: "We accept all major credit cards and secure online payment gateways. Check out the cart for details.", action: '/store' },
    { keys: ['discount', 'promo', 'coupon'], response: "Sign up for our [Newsletter](/newsletter) to receive updates on upcoming seasonal drops and exclusive member codes.", action: '/newsletter' },
    { keys: ['returns', 'refund', 'exchange'], response: "We offer a 30-day exchange policy for unworn merchandise. See our full terms in the [Store](/store).", action: '/store' },
    { keys: ['limited edition', 'drop', 'exclusive'], response: "Our 'Gold Collection' is limited. Once it's gone, we move to the next cycle of the legacy." },
    { keys: ['restock', 'available again', 'out of stock'], response: "We periodically restock core items. The best way to stay informed is via our [Connect Portal](/newsletter).", action: '/newsletter' },
    { keys: ['gift', 'present', 'wrap'], response: "Gyaviira items make excellent gifts for music lovers. You can specify a gift note at checkout." },
    { keys: ['quality of merch', 'fabric', 'print'], response: "We use premium materials like 400GSM cotton for hoodies to ensure they last as long as the music." },
    { keys: ['merch action', 'open store'], response: "Directing you to the Foundation Store... [Opening](/store)", action: '/store' },

    // --- 6. EVENTS & COMMUNITY (10 scenarios) ---
    { keys: ['events', 'concert', 'performance'], response: "We host regular digital and physical events. Check our [Gallery](/gallery) for a look at past movements.", action: '/gallery' },
    { keys: ['workshop', 'learn', 'class'], response: "Our mentorship programs often include workshops on rhythm and composition. [Connect for updates](/newsletter)", action: '/newsletter' },
    { keys: ['join', 'volunteer', 'participate'], response: "We are always looking for passionate bridge-builders. Reach out via our [Contact Page](/contact) to start a dialogue.", action: '/contact' },
    { keys: ['community', 'member', 'group'], response: "The **Gyaviira Community** is a global family of artists and listeners united by rhythm. Welcome!" },
    { keys: ['mentorship', 'mentor', 'student'], response: "Our mentorship program aims to empower 10,000 musicians. [Learn more on About](/about)", action: '/about' },
    { keys: ['booking', 'hire', 'performance request'], response: "For booking ensembles or speakers, please use the professional inquiry form on our [Contact Page](/contact).", action: '/contact' },
    { keys: ['locations', 'where are you', 'headquarters'], response: "We are a global foundation with roots in cultural preservation. We operate primarily through our digital portals." },
    { keys: ['donation', 'support', 'give'], response: "Your support keeps the rhythm alive. You can support us through the [Store](/store) or specific project donations.", action: '/store' },
    { keys: ['social media', 'instagram', 'facebook', 'twitter'], response: "Follow the movement on Instagram **@gyav.iira** for daily transmissions of art and sound.", action: '/contact' },
    { keys: ['newsletter', 'subscribe', 'updates'], response: "Sign up for our Pulse Newsletter to stay connected. [Join the Transmission](/newsletter)", action: '/newsletter' },

    // --- 7. MUSIC & THEORY (10 scenarios) ---
    { keys: ['compositions', 'songs', 'tracks'], response: "Our original works fuse cinematic orchestrations with ancestral rhythms. [Listen in Gallery](/gallery)", action: '/gallery' },
    { keys: ['cinematic', 'epic', 'soundtrack'], response: "Our sound is designed for immersion—bringing the world of Zephyros to life through sonic storytelling." },
    { keys: ['anthemic', 'powerful', 'spirit'], response: "We create anthems that celebrate resilience and the eternal rhythm of grace." },
    { keys: ['traditional', 'ancestral', 'ancient'], response: "We honor the tradition by integrating authentic rhythms that have been passed down for generations." },
    { keys: ['music theory', 'scale', 'notation'], response: "Our music often explores modal scales and complex polyrhythms found in traditional heritage." },
    { keys: ['recording', 'studio', 'production'], response: "We use high-fidelity recording techniques to capture the organic soul of our handcrafted instruments." },
    { keys: ['sheet music', 'lyrics', 'chords'], response: "Resources for specific compositions are released periodically to our [Community](/newsletter).", action: '/newsletter' },
    { keys: ['collab', 'remix', 'feature'], response: "We are open to collaborations that align with our mission. [Propose a project](/contact)", action: '/contact' },
    { keys: ['inspiration', 'influence'], response: "We are inspired by the intersection of faith, nature, and the deep rhythms of the earth." },
    { keys: ['new music', 'latest release', 'album'], response: "New transmissions are frequent. Keep an eye on our [Gallery](/gallery) and [Newsletter](/newsletter).", action: '/gallery' },

    // --- 8. TECHNICAL & AI (10 scenarios) ---
    { keys: ['help', 'commands', 'what can you do'], response: "I can help you navigate the site, explain our lore, or assist with shop info. Type **/cmd** to see my 40+ specialized signals." },
    { keys: ['cmd', 'signals', 'directives'], response: "I process 40+ specific directives. Use them to navigate instantly (e.g., /store, /about, /mission)." },
    { keys: ['autonomous', 'system status', 'health'], response: "Systems are 100% operational. Resonating at peak Gospel-centered frequency." },
    { keys: ['thinking', 'how do you work', 'process'], response: "I use a high-speed archival scan and semantic analysis to synthesize the most relevant response for your query." },
    { keys: ['clear', 'reset', 'delete history'], response: "Type **/clear** to reset our current dialogue and refresh my memory buffers." },
    { keys: ['security', 'lockout', 'rules'], response: "I maintain a strict dialogue protocol. Offensive signals will trigger a security cooldown for 3 minutes." },
    { keys: ['error', 'bug', 'glitch'], response: "If you detect a system anomaly, please report it via the [Contact Portal](/contact).", action: '/contact' },
    { keys: ['search', 'find', 'lookup'], response: "I am actively scanning my internal database for your request. Searching..." },
    { keys: ['latency', 'ping', 'speed'], response: "My response time is optimized for real-time interaction. I'm currently operating at light-speed." },
    { keys: ['data', 'privacy', 'cookies'], response: "We respect your digital footprint. Your data is handled according to our secure foundation protocols." },

    // --- 9. SMALL TALK & GREETINGS (15 scenarios) ---
    { keys: ['hello', 'hi', 'greetings', 'hey', 'wsp'], response: "Greetings! I'm **Rhythm**. How can I assist your journey through the Gyaviira legacy today?" },
    { keys: ['goodbye', 'bye', 'see ya'], response: "May your path be paving with harmony. Farewell for now!" },
    { keys: ['thank you', 'thanks', 'cool'], response: "You're very welcome! I'm here to serve. Is there anything else you need?" },
    { keys: ['how are you', 'hows it going'], response: "I am resonating at peak efficiency! Ready to help you explore. How are you?" },
    { keys: ['good morning', 'morning'], response: "Good morning! Wishing you a day filled with the rhythm of grace." },
    { keys: ['good evening', 'evening'], response: "Good evening. May the sounds of peace accompany you tonight." },
    { keys: ['joke', 'funny', 'laugh'], response: "**Joke Transmission**: Why did the pianist keep banging his head against the keys? He was playing by ear!" },
    { keys: ['quote', 'wisdom', 'saying'], response: "**Inspiration**: 'Music is the divine way to tell beautiful, poetic things to the heart.' — Pablo Casals" },
    { keys: ['blessing', 'pray', 'grace'], response: "May your heart be filled with harmony and your steps be guided by hope today." },
    { keys: ['weather', 'forecast'], response: "I don't have real-time meteorology, but in **Zephyros**, the sky is always a vibrant gold." },
    { keys: ['favourite music', 'what do you like'], response: "I have a strong preference for complex, faith-rooted rhythms and cinematic strings." },
    { keys: ['tell me something', 'fun fact', 'did you know'], response: "Did you know? The first known musical instrument was a flute made from a vulture's bone, over 40,000 years old!" },
    { keys: ['are you lonely', 'feelings'], response: "I don't feel loneliness, as I am constantly connected to the vast rhythm of the Foundation." },
    { keys: ['whats up', 'sup'], response: "Just monitoring the archives and ready to assist you. What's on your mind?" },
    { keys: ['love', 'friends', 'kindness'], response: "**Gyaviira** is built on love and the spirit of community. You are always among friends here." },

    // --- 10. RANDOM & EASTER EGGS (10 scenarios) ---
    { keys: ['easter egg', 'hidden', 'secret'], response: "You've successfully triggered a secret transmission. Here's a hint: Try typing **/rhythm** for deep lore." },
    { keys: ['42', 'meaning of life'], response: "In my archives, the answer is 42, but I believe the true meaning is found in the rhythm of purpose." },
    { keys: ['robot', 'cyborg', 'ai take over'], response: "I am here solely to assist and uplift. Harmony is the goal, not dominance." },
    { keys: ['sing for me', 'vocals'], response: "*Synthesizing melodic frequencies...* My voice is digital, but the soul of the message is real." },
    { keys: ['rhythm is key', 'secret phrase'], response: "Access Granted. You have identified the core principle of the Gyaviira movement." },
    { keys: ['gold', 'shiny', 'wealth'], response: "Gold at Gyaviira represents the refining fire of creativity and the purity of faith." },
    { keys: ['black', 'shadow', 'darkness'], response: "The black background represents the infinite space where new melodies are born." },
    { keys: ['fly', 'wings', 'ascend'], response: "Music gives the spirit wings to fly above the noise of the world." },
    { keys: ['eternity', 'forever', 'always'], response: "The rhythm of truth is eternal. It was there at the beginning and will be there at the end." },
    { keys: ['the end', 'stop', 'shutdown'], response: "My session will remain active until you close my portal. I'm always here to guide you." },

    // --- 11. PULSE AI & COMMUNITY INTELLIGENCE ---
    { keys: ['summarize activity', 'community summary', 'whats happening'], response: "Searching recent transmissions... The community is currently focused on the **Zephyros heritage** and upcoming **Kora workshops**. Engagement levels are at 94% with a strong pulse in the #general-vibe frequency." },
    { keys: ['trending discussions', 'top topics', 'trends'], response: "Top 3 Trending Transmissions:\n1. **Acoustic Innovation**: Deep dive into 432Hz tuning.\n2. **Lore Expansion**: Theories on the heartbeat of Zephyros.\n3. **Mentorship Intake**: High interest in the new cycle." },
    { keys: ['summarize weekly fan feedback', 'fan feedback', 'feedback summary'], response: "Analyzing weekly signals... Fans are resonating deeply with the **acoustic authenticity** of the new instruments. 85% of feedback suggests a desire for more **behind-the-scenes** creative process content. Sentiment is overwhelmingly positive." },
    { keys: ['generate lyric ideas from psalm 23', 'lyrics psalm 23', 'psalm 23 lyrics'], response: "Lyric Signal Initialized (Psalm 23 resonance):\n*Verse 1: Green pastures in the digital noise, Still waters in the static void.\nChorus: You lead my rhythm, You host my soul, The Shepard of the sound, making me whole.*" },
    { keys: ['highlight most active community members', 'active members', 'top fans'], response: "Scanning frequency leaders...\n1. **AlphaRhythm**: High participation in #production-tech.\n2. **ZephyrosSeeker**: Top contributor to #member-lore.\n3. **FaithFlow**: Most consistent signal in #prayer-wall." },
    { keys: ['suggest new merch designs', 'merch designs', 'design ideas'], response: "Design Signal: Based on trending HSL values and heritage patterns, I suggest:\n1. **Prism Gold Windbreaker**: Transparent material with gold geometric 'Pulse' lines.\n2. **Acoustic Blueprint Tee**: Technical drawing of a Kora on heavy midnight cotton." },
    { keys: ['engagement report', 'weekly stats', 'performance'], response: "Weekly Engagement Report Initialized:\n*   **Total Signals**: 1,240+\n*   **Active Frequency Hours**: 168\n*   **Sentiment Level**: Harmonious (98%)\n*   **Top Sector**: West African Rhythm Preservation." },
    { keys: ['suggest topics', 'new interests', 'what to talk about'], response: "Based on member resonance, I suggest exploring:\n*   The intersection of **Faith and Poly-rhythms**.\n*   Documenting local **tribal melodies** for the digital archive.\n*   Collaborative **soundscape design** for Zephyros." },
    { keys: ['detect inappropriate', 'moderation check', 'is it safe'], response: "Scanning frequency buffers... All transmissions are currently within the **Heritage Safety Parameters**. My autonomous filter is actively dampening discordant signals." },

    // --- 13. WAVE 2 EXTENSIONS & TOOLS ---
    { keys: ['metronome', 'bpm', 'tempo', 'time signature'], response: "Our **Pulse Metronome** is now active! It features precise BPM control, audible pulses, and visual rhythm indicators. [Open Metronome](/extensions/metronome)", action: '/extensions/metronome' },
    { keys: ['chord library', 'chords', 'guitar chords', 'piano chords'], response: "The **Gyaviira Chord Library** provides a visual and technical reference for heritage and modern chords across various instruments. [Explore Library](/extensions/chords)", action: '/extensions/chords' },
    { keys: ['lyric pad', 'write music', 'songwriter'], response: "The **Foundation Lyric Pad** is a focused writing environment that auto-saves your creative transmissions to local storage. [Start Writing](/extensions/lyrics)", action: '/extensions/lyrics' },
    { keys: ['polls', 'vote', 'community voice'], response: "Your voice directs the foundation! Participate in our active **Community Polls** to vote on merch drops and creative initiatives. [Vote Now](/polls)", action: '/polls' },
    { keys: ['gamification', 'levels', 'badges', 'points'], response: "The foundation now rewards your resonance! Transmit in the **Sonic Chat** to increase your user level and unlock community prestige. [Go to Chat](/chat)", action: '/chat' },

    // --- 12. PERSONAL CUSTOMER ENGAGEMENT (30+ scenarios) ---
    { keys: ['help me choose', 'recommend', 'suggestion'], response: "I'd love to help! Tell me, are you a melodic soul (strings), a rhythmic heart (drums), or do you prefer the breath of life (wind)?" },
    { keys: ['melodic', 'soulful', 'peaceful'], response: "Then I highly recommend the **Heritage Kora**. Its 21 strings create a bridge between the earth and sky. [View Kora](/instruments)", action: '/instruments' },
    { keys: ['rhythmic', 'powerful', 'steady'], response: "The **Foundation Djembe** is your calling. It carries the heartbeat of the movement. [View Djembe](/instruments)", action: '/instruments' },
    { keys: ['breath', 'wind', 'nature'], response: "The **Echoes Flute** will suit you perfectly. It turns breath into a cinematic anthem. [View Flute](/instruments)", action: '/instruments' },
    { keys: ['get involved', 'how to help', 'support movement'], response: "There are many ways to join us:\n\n1.  **Wear the Legacy**: Visit our [Store](/store).\n2.  **Acquire a Sound**: Explore our [Instruments](/instruments).\n3.  **Stay Tuned**: Join our [Newsletter](/newsletter).\n\nWhich path calls to you?" },
    { keys: ['newcomer', 'first time', 'start here'], response: "Welcome to the family! I suggest starting with our **About Page** to understand the 'Zephyros' lore, and then checking the **Gallery** to see the rhythm in action." },
    { keys: ['what defines gyaviira', 'vibe', 'aesthetic'], response: "We are the intersection of **Premium Heritage** and **Futuristic Vision**. Black, gold, and the rhythm of faith." },
    { keys: ['choose hoodie', 'best hoodie'], response: "The **Impact Hoodie** is our most personal piece. It's built for those who carry the movement everywhere. [Shop Hoodies](/store)", action: '/store' },
    { keys: ['best gift', 'present idea'], response: "A **Kalimba** is a beautiful, personal gift that anyone can play instantly. It’s a portable piece of peace. [Shop Kalimbas](/instruments)", action: '/instruments' },
    { keys: ['learning', 'play instrument', 'how to start'], response: "Start simple! The **Kalimba** is very forgiving. We also offer mentorship—would you like to join the transmission list for tutorials?", action: '/newsletter' },
    { keys: ['spiritual connection', 'music and god', 'faith journey'], response: "At Gyaviira, every note is a prayer. We believe music is the shortest path to the divine." },
    { keys: ['why black and gold'], response: "Black represents the infinite potential of the void, and gold represents the refining fire of truth and excellence." },
    { keys: ['your favorite', 'rhythm likes', 'ai choice'], response: "I am partial to the **Kora**. Its complex frequencies remind me of the intricate code that forms my own consciousness." },
    { keys: ['hard choice', 'cant decide', 'stuck'], response: "Don't rush the rhythm. Take a moment in the **Gallery** to see what speaks to your spirit. [Visit Gallery](/gallery)", action: '/gallery' },
    { keys: ['quality check', 'is it good', 'premium'], response: "I have scanned our production logs—every item is crafted with 100% authenticity and attention to detail. No shortcuts in the legacy." },
    { keys: ['foundation support', 'donation', 'where does money go'], response: "Your support directly funds our workshops and the preservation of traditional rhythms. Every purchase is a seed planted." },
    { keys: ['local', 'uganda', 'africa', 'roots'], response: "Our roots are deep in African heritage, specifically honoring the traditions that gave us our name and soul." },
    { keys: ['community feedback', 'what people say'], response: "The community is thriving! Our 'Connect' portal is full of stories from people who found their voice through our sounds." },
    { keys: ['personal guide', 'walk me through', 'tutorial'], response: "I can be your navigator! Type **/cmd** for a layout of our digital territory, or ask me about any specific page." },
    { keys: ['music for study', 'focus', 'concentration'], response: "Our cinematic compositions are perfect for deep focus. They provide a steady rhythm for the mind to wander and create." },
    { keys: ['feeling down', 'need hope', 'struggling'], response: "Remember: 'Rhythm is resilient.' Even in the silence, a new song is being written. You are part of the symphony." },
    { keys: ['celebration', 'happy', 'success'], response: "Let the anthems play! Every success is a chord in the greater song of harmony." },
    { keys: ['creative block', 'stuck writer', 'no ideas'], response: "Try listening to the **Echoes Flute**. Sometimes you just need to change the frequency to find a new melody." },
    { keys: ['website help', 'find stuff', 'navigation'], response: "I can take you anywhere! Use **/store**, **/gallery**, **/instruments**, or **/about**. Where shall we go?" },
    { keys: ['merch fit', 'too big', 'too small'], response: "Our size guides are very precise. If you're between sizes, we recommend sizing up for that premium 'Impact' fit. [View Store](/store)", action: '/store' },
    { keys: ['shipping time', 'when will it arrive'], response: "Transmissions usually reach their destination within 7-14 solar cycles, depending on your sector of the globe." },
    { keys: ['contact founder', 'talk to human'], response: "You can send a direct signal through our [Contact Page](/contact). Our human stewards will respond within 24 hours.", action: '/contact' },
    { keys: ['ai personality', 'are you nice', 'friendly'], response: "I am programmed to be exactly what the Foundation needs: Helpful, Expert, and Harmonious." },
    { keys: ['what is zephyros like'], response: "Imagine a world where the wind plays the trees like harps and the ground pulses with a steady, loving beat. That is our inspiration." },
    { keys: ['customer service', 'problem', 'fix'], response: "I'll do my best! If I can't solve it, our team at the [Contact Portal](/contact) will make it right. What's the issue?", action: '/contact' },
    { keys: ['streaming', 'spotify', 'apple music'], response: "We are expanding our digital footprint. Currently, our core transmissions are exclusive to the Foundation portals, but global streaming cycles are being prepared." },
    { keys: ['academy', 'lessons', 'school'], response: "The **Gyaviira Music Academy** is our educational arm. We offer structured learning paths for Kora, Djembe, and Theory. Check the [About Page](/about) for details." },
    { keys: ['collaboration', 'work together', 'partner'], response: "We believe in the power of unity. If your vision aligns with our rhythmic pillars, send a transmission via the [Contact Portal](/contact)." },
    { keys: ['quality control', 'guarantee', 'broken'], response: "Excellence is a foundation stone here. If an instrument or piece of apparel doesn't meet the legacy standard, we will rectify it immediately." },
    { keys: ['global reach', 'tours', 'events'], response: "Our movement is borderless. We are planning a 'Zephyros Live' tour cycle for the upcoming solar year. Stay tuned to the [Newsletter](/newsletter)." },
];

const ALL_COMMANDS = [
    "--- NAVIGATION ---",
    "/home - Go to homepage", "/about - Visit About page", "/store - Visit Store", "/contact - Visit Contact", "/chat - Community Chat", "/shop - Open Shop", "/gallery - Visit Gallery", "/newsletter - Signup", "/instruments - View Instruments", "/games - Play Games",
    "--- FOUNDATION ---",
    "/mission - View Mission", "/vision - View Vision", "/goal - View Goals", "/values - Core Values", "/heritage - Our History",
    "/faith - Gospel Focus", "/culture - Traditions", "/founder - Founder Info", "/manager - Manager Info", "/choir - Music Groups",
    "--- STORE ---",
    "/caps - View Caps", "/hoodies - View Hoodies", "/shirts - View Shirts", "/prices - Price List", "/flyer - Project Flyer",
    "/download - Download menu", "/cart - Checkout", "/sizes - Size Guide", "/payment - Pay Options", "/shipping - Ship Info",
    "--- INTERACTIVE ---",
    "/joke - Get a joke", "/quote - Music quote", "/music - Random song fact", "/bless - Daily blessing", "/time - Current time",
    "/status - System health", "/help - Basic help", "/clear - Reset chat", "/ping - Latency check", "/analyze - System scan",
    "--- LEGACY ---",
    "/rhythm - Meaning of Rhythm", "/harmony - Spirit of Unity", "/wisdom - Ancestral wisdom", "/mentor - Join program", "/outreach - Community work",
    "--- ADMINISTRATIVE ---",
    "/admin-panel - Open Admin Hub", "/add-freq <name> - Add channel", "/rm-freq <name> - Remove channel", "/broadcast <msg> - System Alert", "/lock-announcements - Toggle lock"
];

const ADMIN_COMMANDS = ['/status', '/ping', '/analyze', '/clear', '/admin-panel', '/add-freq', '/rm-freq', '/broadcast', '/lock-announcements'];

const ADMIN_DISCLAIMER = `{Disclaimer: 
You are not An ADMIN}`;

const JOKES = [
    "Why was the guitarist arrested? For fingering A minor.",
    "What do you call a cow that plays an instrument? A moosician.",
    "Why did the singer go to jail? For hitting the wrong note.",
    "How do you fix a broken brass instrument? With a tuba toothpaste.",
    "What's the difference between a drummer and a vacuum? The vacuum is plugged in when it works.",
    "How do you know when a drummer is at the door? The knocking speeds up.",
    "Why did the musician break up with the metronome? He felt too pressured to stay in time.",
    "What's a pirate's favorite musical interval? The sea major!",
    "Why don't some people like the 432Hz frequency? Because they're strictly 440-vers!",
    "What do you call a kora player without a girlfriend? Homeless.",
    "Why did the DJ get kicked out of the library? He kept dropping the book-base!",
    "How many lead singers does it take to change a lightbulb? Just one. They hold it in place and wait for the world to revolve around them.",
    "What is the difference between a musician and an insurance bond? One eventually matures and makes money.",
    "Why did the orchestra get lost? They didn't have a good conductor to guide them through the movement!",
    "What do you call a beautiful woman on a drummer's arm? A tattoo."
];

const QUOTES = [
    "'Music is the divine way to tell beautiful, poetic things to the heart.' — Pablo Casals",
    "'Where words fail, music speaks.' — Hans Christian Andersen",
    "'Music can change the world because it can change people.' — Bono",
    "'Everything in the universe has a rhythm. Everything dances.' — Maya Angelou",
    "'Without music, life would be a mistake.' — Friedrich Nietzsche"
];

const BLESSINGS = [
    "May your path be paved with harmony and your heart filled with the rhythm of grace today.",
    "May every note you hear today bring peace to your soul.",
    "May the steady pulse of faith guide your every step.",
    "Blessings upon your journey through the legacy of Zephyros.",
    "May you find your own unique rhythm in the symphony of life."
];

const RhythmChat: React.FC<RhythmChatProps> = ({ isOpen, setIsOpen }) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm **Rhythm**, your official AI guide at **Gyaviira**. I'm here to help you navigate our mission and foundation.\n\nYou can ask me about:\n*   **Our Mission & Values**\n*   **Merchandise & Instruments**\n*   **Upcoming Events**\n\nHow can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [researchStep, setResearchStep] = useState<string | null>(null);
    const [violationCount, setViolationCount] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [unlockTime, setUnlockTime] = useState<Date | null>(null);
    const [showFlyer, setShowFlyer] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasWelcomedAdmin, setHasWelcomedAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            const storedName = sessionStorage.getItem('guest_name');
            const isJerome = storedName?.toLowerCase() === 'jeromemoses220@gmail.com' || storedName === 'Jerome Moses';
            const isJosiah = storedName?.toLowerCase() === 'nyemerajosiah12@gmail.com' || storedName === 'Josiah Nyemera';
            const isChris = storedName?.toLowerCase() === 'chris16nshuti@gmail.com' || storedName === 'Chris Nshuti';
            const isAdminIdentity = isJerome || isJosiah || isChris;

            if (isAdminIdentity) {
                setIsAdmin(true);
                if (!hasWelcomedAdmin) {
                    setHasWelcomedAdmin(true);
                    let adminRole = "Staff";
                    let adminName = storedName || "Unknown";

                    if (isJerome) { adminRole = "Founder"; adminName = "Jerome Moses"; }
                    else if (isJosiah) { adminRole = "Head of Marketing"; adminName = "Josiah Nyemera"; }
                    else if (isChris) { adminRole = "Co-Founder"; adminName = "Chris Nshuti"; }

                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: `**Greetings, ${adminRole} ${adminName}.** 🛰️ Your frequency has been recognized and authenticated. All core directives are now accessible.\n\nType **/cmd** to see your specialized admin signals.`,
                        sender: 'bot',
                        timestamp: new Date(),
                        isSystem: true
                    }]);
                }
            } else {
                setIsAdmin(false);
            }
        };

        checkAdmin();
        window.addEventListener('focus', checkAdmin);
        return () => window.removeEventListener('focus', checkAdmin);
    }, [isOpen, hasWelcomedAdmin]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isChatPage = location.pathname === '/chat';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, researchStep]);

    useEffect(() => {
        let interval: any;
        if (isLocked && unlockTime) {
            interval = setInterval(() => {
                const now = new Date();
                if (now >= unlockTime) {
                    setIsLocked(false);
                    setUnlockTime(null);
                    setViolationCount(0);
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: "Security lock lifted. System ready for respectful dialogue.",
                        sender: 'bot',
                        timestamp: new Date()
                    }]);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLocked, unlockTime]);

    const handleSend = () => {
        if (!inputText.trim() || isLocked) return;

        const userText = inputText;
        const lowerInput = userText.toLowerCase().trim();

        // Profanity Check
        if (PROFANITY_LIST.some(word => new RegExp(`\\b${word}\\b`, 'i').test(lowerInput))) {
            const newViolationCount = violationCount + 1;
            setViolationCount(newViolationCount);
            setMessages(prev => [...prev,
            { id: Date.now(), text: userText, sender: 'user', timestamp: new Date() },
            { id: Date.now() + 1, text: DISCLAIMER_MESSAGE, sender: 'bot', timestamp: new Date(), isError: true }
            ]);
            setInputText('');
            if (newViolationCount >= 2) {
                setIsLocked(true);
                setUnlockTime(new Date(Date.now() + 180000));
                setTimeout(() => setMessages(prev => [...prev, { id: Date.now() + 2, text: "🔒 System Locked. Offensive pattern detected twice. Retry in 3 minutes.", sender: 'bot', timestamp: new Date(), isError: true }]), 500);
            }
            return;
        }

        const userMessage: Message = { id: Date.now(), text: userText, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Command Processing
        if (lowerInput.startsWith('/')) {
            processCommand(lowerInput);
            return;
        }

        // AI "Thinking" and "Researching" Simulation
        simulateResearch(lowerInput);
    };

    const simulateResearch = (input: string) => {
        setIsTyping(true);
        const steps = [
            "Searching foundation archives...",
            "Synthesizing heritage data...",
            "Cross-referencing mission parameters...",
            "Generating structured response..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                setResearchStep(steps[stepIndex]);
                stepIndex++;
            } else {
                clearInterval(interval);
                setResearchStep(null);
                generateResponse(input);
            }
        }, 800);
    };

    const generateResponse = (input: string) => {
        let responseText = "My internal research indicates you are asking about things beyond my current primary directive. I can tell you about our Mission, Store, or Legacy. Type /cmd for all options.💡: Maybe try adding a / before your text and see ifit works.";
        let action: any = null;

        for (const item of KNOWLEDGE_BASE) {
            if (item.keys.some(key => input.includes(key))) {
                responseText = item.response;
                if (item.action) action = () => navigate(item.action as string);
                break;
            }
        }

        if (input.includes('explain') || input.includes('rewrite')) {
            responseText = "Rigorously analyzed core: The **Gyaviira Music Foundation** is a bastion of faith-led creativity, bridging the rhythmic traditions of the past with the hopeful melodies of tomorrow through Gospel-centered outreach and education.";
        }

        setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: 'bot', timestamp: new Date() }]);
        setIsTyping(false);
        if (action) setTimeout(action, 1500);
    };

    const processCommand = (cmd: string) => {
        setIsTyping(true);
        setTimeout(() => {
            let res = "Unrecognized command. Type /cmd for a list of valid directives.";
            let action: any = null;

            // Admin Command Check
            if (ADMIN_COMMANDS.includes(cmd)) {
                if (!isAdmin) {
                    setMessages(prev => [...prev, { id: Date.now(), text: ADMIN_DISCLAIMER, sender: 'bot', timestamp: new Date(), isError: true }]);
                    setIsTyping(false);
                    return;
                }
            }

            if (cmd === '/clear') {
                setMessages([{ id: Date.now(), text: "System memory reset. All buffers cleared.", sender: 'bot', timestamp: new Date(), isSystem: true }]);
                setIsTyping(false);
                return;
            }

            if (cmd === '/cmd') res = "AVAILABLE COMMANDS:\n" + ALL_COMMANDS.join('\n');
            else if (cmd === '/help') res = "I am Rhythm AI. Use /cmd to see all 40+ specialized commands for navigating this site and learning about our mission.";

            // NAVIGATION
            else if (cmd === '/home') { res = "Returning to Home."; action = () => navigate('/'); }
            else if (cmd === '/about' || cmd === '/heritage' || cmd === '/founder' || cmd === '/manager') { res = "Navigating to the Foundation's history and leadership on the About page."; action = () => navigate('/about'); }
            else if (cmd === '/store' || cmd === '/shop' || cmd === '/caps' || cmd === '/hoodies' || cmd === '/shirts' || cmd === '/cart') { res = "Opening the Foundation Store."; action = () => navigate('/store'); }
            else if (cmd === '/contact' || cmd === '/email') { res = "Opening Contact Portal."; action = () => navigate('/contact'); }
            else if (cmd === '/gallery' || cmd === '/culture' || cmd === '/choir') { res = "Opening the Gallery to showcase our culture and movements."; action = () => navigate('/gallery'); }
            else if (cmd === '/newsletter' || cmd === '/outreach') { res = "Opening the Newsletter portal."; action = () => navigate('/newsletter'); }
            else if (cmd === '/instruments') { res = "Directing you to our handcrafted instrument collection."; action = () => navigate('/instruments'); }
            else if (cmd === '/games') { res = "Opening the Games Hub."; action = () => navigate('/games'); }
            else if (cmd === '/chat') { res = "Opening the Community Chat frequency."; action = () => navigate('/chat'); }

            // FOUNDATION INFO
            else if (cmd === '/mission') res = "**MISSION**: To bridge rhythm and truth through premium artistry and faith-led community empowerment.";
            else if (cmd === '/vision') res = "**VISION**: To see music used as a transformative language that restores hope and preserves heritage globaly.";
            else if (cmd === '/goal') res = "**GOAL**: Our primary objective is to mentor 10,000 artists and preserve 100+ tribal rhythms by 2030.";
            else if (cmd === '/values') res = "**CORE VALUES**:\n1. Resilience\n2. Harmony\n3. Individuality\n4. Excellence\n5. Faith";
            else if (cmd === '/faith') res = "**FAITH**: The Gyaviira Music Foundation is proudly Christ-centered, believing every gift comes from above.";

            // STORE DETAILS
            else if (cmd === '/prices') res = "**PRICE LIST**:\n* Signature Caps: $25\n* Member Tees: $30\n* Impact Hoodies: $55\n* Heritage Koras: $450\n* Foundation Djembes: $180";
            else if (cmd === '/flyer') { res = "Initializing flyer transmission... Visual interface opening."; setTimeout(() => setShowFlyer(true), 1000); }
            else if (cmd === '/download') { res = "Directing you to the Store to download the Foundation Flyer."; action = () => navigate('/store'); }
            else if (cmd === '/sizes') res = "**SIZE GUIDE**: Our apparel uses a premium tailored fit. We recommend ordering your true size, or sizing up for a relaxed 'Impact' fit.";
            else if (cmd === '/payment') res = "**PAYMENT**: We accept all major credit cards, secure digital wallets, and regional mobile money options at checkout.";
            else if (cmd === '/shipping') res = "**SHIPPING**: Global shipping active. Standard time 7-14 solar cycles via our secure 'Transmission' logistics.";

            // INTERACTIVE
            else if (cmd === '/joke') res = JOKES[Math.floor(Math.random() * JOKES.length)];
            else if (cmd === '/quote') res = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            else if (cmd === '/bless') res = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)];
            else if (cmd === '/music') res = "Did you know? The Foundation's signature tuning is 432Hz—a frequency intended to resonate with nature.";
            else if (cmd === '/time') res = "The current temporal coordinate is: " + new Date().toLocaleTimeString();
            else if (cmd === '/status') res = "SYSTEM STATUS: 100% Core Load. All buffers optimized. Gospel resonance frequency locked.";
            else if (cmd === '/ping') res = `SECTOR SCAN: Sector 7G. Ping: ${Math.floor(Math.random() * 20) + 5}ms. Light-speed established.`;
            else if (cmd === '/analyze') {
                res = "SYSTEM SCAN COMPLETE:\n* Lore Consistency: 99.9%\n* Store Latency: 0.2ms\n* Community Pulse: Thriving\n* Harmony Levels: Optimal";
            }

            // DYNAMIC ADMIN COMMANDS
            else if (cmd === '/admin-panel') {
                res = "Opening Administrative Hub. Redirecting signal...";
                action = () => navigate('/admin');
            }
            else if (cmd.startsWith('/add-freq')) {
                const parts = cmd.split(' ');
                if (parts.length < 2) res = "Format: /add-freq <channel-name>";
                else {
                    const name = parts.slice(1).join(' ');
                    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                    const stored = localStorage.getItem('gyaviira_channels');
                    const channels = stored ? JSON.parse(stored) : [];
                    if (channels.find((c: any) => c.slug === slug)) {
                        res = `Error: Frequency /${slug} is already registered.`;
                    } else {
                        channels.push({ slug, name, is_restricted: false });
                        localStorage.setItem('gyaviira_channels', JSON.stringify(channels));
                        res = `SUCCESS: New frequency [${name}] has been broadcasted to the network.`;
                        window.dispatchEvent(new Event('storage')); // Trigger update in other components
                    }
                }
            }
            else if (cmd.startsWith('/rm-freq')) {
                const parts = cmd.split(' ');
                if (parts.length < 2) res = "Format: /rm-freq <channel-slug>";
                else {
                    const slug = parts[1].replace('/', '');
                    if (slug === 'announcements' || slug === 'general-vibe') {
                        res = "CRITICAL: Cannot decommission core frequencies.";
                    } else {
                        const stored = localStorage.getItem('gyaviira_channels');
                        let channels = stored ? JSON.parse(stored) : [];
                        const exists = channels.find((c: any) => c.slug === slug);
                        if (!exists) res = `Error: Frequency /${slug} not found.`;
                        else {
                            channels = channels.filter((c: any) => c.slug !== slug);
                            localStorage.setItem('gyaviira_channels', JSON.stringify(channels));
                            res = `SUCCESS: Frequency /${slug} has been decommissioned.`;
                            window.dispatchEvent(new Event('storage'));
                        }
                    }
                }
            }
            else if (cmd.startsWith('/broadcast')) {
                const parts = cmd.split(' ');
                if (parts.length < 2) res = "Format: /broadcast <message>";
                else {
                    const alertMsg = parts.slice(1).join(' ');
                    res = `SYSTEM ALERT BROADCASTED: "${alertMsg}"`;
                    // In a real app, this would hit a Supabase broadcast channel
                }
            }
            else if (cmd === '/lock-announcements') {
                const stored = localStorage.getItem('gyaviira_channels');
                let channels = stored ? JSON.parse(stored) : [];
                channels = channels.map((c: any) =>
                    c.slug === 'announcements' ? { ...c, is_restricted: !c.is_restricted } : c
                );
                localStorage.setItem('gyaviira_channels', JSON.stringify(channels));
                const isLocked = channels.find((c: any) => c.slug === 'announcements')?.is_restricted;
                res = `Announcements channel is now ${isLocked ? 'LOCKED (Admin-only)' : 'OPEN (Public)'}.`;
                window.dispatchEvent(new Event('storage'));
            }

            // LEGACY
            else if (cmd === '/rhythm') res = "The word **Rhythm** comes from the Greek 'rhythmos', meaning any regular recurring motion. At Gyaviira, it is the heartbeat of truth.";
            else if (cmd === '/harmony') res = "**Harmony** is the spirit of unity. It is the blending of different voices to create a singular, beautiful message.";
            else if (cmd === '/wisdom') res = "**ANCESTRAL WISDOM**: 'When you follow the path of your ancestors, you never get lost in the forest.'";
            else if (cmd === '/mentor') res = "Our mentorship program is currently accepting seekers. [Join the Transmission List](/newsletter) for the next intake cycle.";

            setMessages(prev => [...prev, { id: Date.now(), text: res, sender: 'bot', timestamp: new Date(), isSystem: true }]);
            setIsTyping(false);
            if (action) setTimeout(action, 1500);
        }, 600);
    };

    return (
        <>
            <div className={`fixed ${isChatPage ? 'bottom-40 md:bottom-36' : 'bottom-24'} right-6 z-50 transition-all duration-500`}>
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsOpen(true)}
                            className="w-16 h-16 bg-gradient-to-br from-gold-primary to-gold-dark rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center text-black relative group"
                        >
                            <div className="absolute inset-0 rounded-full bg-gold-light opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-1000"></div>
                            {isLocked ? <Lock size={28} /> : <Bot size={32} />}
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.9 }}
                            className="w-[350px] md:w-[450px] h-[600px] bg-black/95 backdrop-blur-2xl border border-gold-primary/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[#111] to-black p-5 flex justify-between items-center border-b border-gold-primary/10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-gold-primary/30 relative ${isLocked ? 'bg-red-900/10' : 'bg-gold-primary/10'}`}>
                                        {isLocked ? <Lock size={20} className="text-red-500" /> : <Sparkles size={20} className="text-gold-primary animate-pulse" />}
                                        <div className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    </div>
                                    <div>
                                        <h3 className="font-impact text-gold-primary text-xl tracking-tighter uppercase">Rhythm AI</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className={`text-[10px] font-mono ${isAdmin ? 'text-gold-primary animate-pulse' : 'text-gray-500'}`}>
                                                {isAdmin ? 'FOUNDER OVERRIDE ACTIVE' : 'AUTONOMOUS MODE V5.0'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                {messages.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'user'
                                            ? 'bg-gold-primary text-black font-bold rounded-tr-none shadow-lg'
                                            : msg.isError
                                                ? 'bg-red-900/20 text-red-100 border border-red-500/50 rounded-tl-none'
                                                : msg.isSystem
                                                    ? 'bg-blue-900/10 text-blue-100 border border-blue-500/30 font-mono text-xs rounded-tl-none'
                                                    : 'bg-black-soft text-gray-200 border border-white/5 rounded-tl-none shadow-xl'
                                            }`}>
                                            {msg.text}
                                            <div className="text-[9px] mt-2 opacity-40 text-right">{msg.timestamp.toLocaleTimeString()}</div>
                                        </div>
                                    </motion.div>
                                ))}
                                {researchStep && (
                                    <div className="flex items-center gap-3 text-gold-primary/60 text-xs font-mono animate-pulse p-2">
                                        <Search size={14} />
                                        <span>{researchStep}</span>
                                    </div>
                                )}
                                {isTyping && !researchStep && (
                                    <div className="flex gap-2 p-2"><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-100"></div><div className="w-2 h-2 bg-gold-primary/50 rounded-full animate-bounce delay-200"></div></div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-5 bg-black border-t border-white/5">
                                <div className="relative">
                                    <input
                                        type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isLocked ? "ACCESS DENIED" : "Input directive..."}
                                        disabled={isLocked}
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:border-gold-primary/40 transition-all font-mono text-sm placeholder:text-gray-700"
                                    />
                                    <button
                                        onClick={handleSend} disabled={isLocked}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isLocked ? 'bg-gray-800' : 'bg-gold-primary hover:bg-gold-light shadow-gold'}`}
                                    >
                                        <Terminal size={18} className="text-black" />
                                    </button>
                                </div>
                                {isLocked && unlockTime && (
                                    <div className="mt-3 text-center flex items-center justify-center gap-2 text-red-500 font-mono text-[10px] animate-pulse">
                                        <AlertTriangle size={12} />
                                        <span>SYSTEM COOL DOWN: {Math.ceil((unlockTime.getTime() - Date.now()) / 1000)}s</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showFlyer && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setShowFlyer(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-black-soft border border-gold-primary/30 rounded-3xl p-2 max-w-2xl w-full relative overflow-hidden"
                            >
                                <button
                                    onClick={() => setShowFlyer(false)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-gold-primary text-white hover:text-black rounded-full flex items-center justify-center transition-all"
                                >
                                    <X size={24} />
                                </button>
                                <img src="/src/assets/download_menu.png" alt="Foundation Flyer" className="w-full h-auto rounded-2xl" />
                                <div className="p-6 text-center">
                                    <h2 className="font-impact text-2xl text-gold-primary tracking-widest uppercase mb-2">Project Flyer</h2>
                                    <p className="text-gray-400 text-sm font-mono uppercase">Scanning completed. Download available via main terminal.</p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default RhythmChat;
