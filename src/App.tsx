import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import AccountHub from './pages/AccountHub.tsx';
import CommunityChat from './pages/CommunityChat.tsx';
import Auth from './pages/Auth.tsx';
import AdminPanel from './pages/AdminPanel.tsx';
import Checkout from './pages/Checkout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
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
        <Route path="/account" element={<AccountHub />} />
        <Route path="/chat" element={<CommunityChat />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <RhythmChat />
      <PulseLyrics />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
