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
import EnrollModal from './components/EnrollModal';
import LoginModal from './components/LoginModal';

export default function App() {
  const [showEnroll, setShowEnroll] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zd_user')); } catch { return null; }
  });

  const handleLoginClose = (result) => {
    if (result === 'enroll') {
      setShowLogin(false);
      setShowEnroll(true);
    } else if (result && typeof result === 'object') {
      setUser(result);
      setShowLogin(false);
    } else {
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zd_token');
    localStorage.removeItem('zd_user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar
        onEnroll={() => setShowEnroll(true)}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        user={user}
      />
      <Hero onEnroll={() => setShowEnroll(true)} />
      <Stats />
      <Problem />
      <Curriculum />
      <Features />
      <Outcomes />
      <Mentor />
      <Pricing onEnroll={() => setShowEnroll(true)} />
      <CTA onEnroll={() => setShowEnroll(true)} />
      <Footer />
      {showEnroll && <EnrollModal onClose={() => setShowEnroll(false)} />}
      {showLogin  && <LoginModal  onClose={handleLoginClose} />}
    </div>
  );
}
