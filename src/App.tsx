import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Store from './pages/Store';
import Contact from './pages/Contact';

// Placeholder pages
const About = () => <div className="pt-32 text-center text-white text-2xl font-heading">About Page Coming Soon</div>;

function App() {
  return (
    <Router>
      <div className="bg-black-main min-h-screen text-white font-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="bg-black-soft py-10 text-center border-t border-gray-900 mt-20">
          <p className="text-gray-500">© 2026 Gyaviira Music Foundation. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
