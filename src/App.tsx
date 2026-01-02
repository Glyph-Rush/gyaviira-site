import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Newsletter from './pages/Newsletter';
import Instruments from './pages/Instruments';
import Games from './pages/Games';
import MusicEffects from './components/MusicEffects';
import RhythmChat from './components/RhythmChat';
import PulseLyrics from './components/PulseLyrics';

function App() {
  return (
    <Router>
      <div className="bg-black-main min-h-screen text-white font-body">
        <MusicEffects />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/games" element={<Games />} />
        </Routes>
        <RhythmChat />
        <PulseLyrics />
        <footer className="bg-black-soft py-10 text-center border-t border-gray-900 mt-20">
          <p className="text-gray-500">© 2026 <span className="font-cursive text-gold-primary text-xl">Gyaviira</span> Music Foundation. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
