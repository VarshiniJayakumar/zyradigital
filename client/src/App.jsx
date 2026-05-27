import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Problem from './components/Problem';
import Curriculum from './components/Curriculum';
import Features from './components/Features';
import Outcomes from './components/Outcomes';
import Mentor from './components/Mentor';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [authModal, setAuthModal] = useState(null); // null | 'signup' | 'login'
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zd_user')); } catch { return null; }
  });

  const handleAuthClose = (result) => {
    if (result && typeof result === 'object') {
      setUser(result);
    }
    setAuthModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('zd_token');
    localStorage.removeItem('zd_user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar
        onEnroll={() => setAuthModal('signup')}
        onLogin={() => setAuthModal('login')}
        onLogout={handleLogout}
        user={user}
      />
      <Hero onEnroll={() => setAuthModal('signup')} />
      <Stats />
      <Problem />
      <Curriculum />
      <Features />
      <Outcomes />
      <Mentor />
      <Pricing onEnroll={() => setAuthModal('signup')} />
      <CTA onEnroll={() => setAuthModal('signup')} />
      <Footer />
      {authModal && (
        <AuthModal
          defaultTab={authModal}
          onClose={handleAuthClose}
        />
      )}
    </div>
  );
}
