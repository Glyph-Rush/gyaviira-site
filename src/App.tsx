import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store.tsx';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Newsletter from './pages/Newsletter';
import Instruments from './pages/Instruments';
import Games from './pages/Games';
import MusicEffects from './components/MusicEffects';
import RhythmChat from './components/RhythmChat';
import PulseLyrics from './components/PulseLyrics';
import Metronome from './pages/extensions/Metronome';
import ChordLibrary from './pages/extensions/ChordLibrary';
import LyricPad from './pages/extensions/LyricPad';
import InstrumentTuner from './pages/extensions/InstrumentTuner';
import Blog from './pages/Blog.tsx';
import BlogPost from './pages/BlogPost.tsx';
import Events from './pages/Events';
import Polls from './pages/Polls';
import AdminPanel from './pages/AdminPanel';
import CommunityChat from './pages/CommunityChat.tsx';
import Checkout from './pages/Checkout.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import Extensions from './pages/Extensions';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import background from './assets/store_desktop.png'; // Global background asset
import { useState } from 'react';

function AppContent() {
  const [isRhythmOpen, setIsRhythmOpen] = useState(false);

  return (
    <div
      className="min-h-screen text-white font-body bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${background})`
      }}
    >
      <MusicEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/store" element={<Store />} />
        <Route path="/merch" element={<Navigate to="/store" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/instruments" element={<Instruments />} />
        <Route path="/games" element={<Games />} />
        <Route path="/extensions" element={<Extensions />} />
        <Route path="/extensions/metronome" element={<Metronome />} />
        <Route path="/extensions/chords" element={<ChordLibrary />} />
        <Route path="/extensions/lyrics" element={<LyricPad />} />
        <Route path="/extensions/tuner" element={<InstrumentTuner />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/extensions/admin" element={<AdminPanel />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/events" element={<Events />} />
        <Route path="/polls" element={<Polls />} />

        <Route path="/chat" element={<CommunityChat />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <RhythmChat isOpen={isRhythmOpen} setIsOpen={setIsRhythmOpen} />
      <PulseLyrics isRhythmOpen={isRhythmOpen} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
