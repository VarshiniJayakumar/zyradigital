import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Curriculum from './components/Curriculum';
import Features from './components/Features';
import Outcomes from './components/Outcomes';
import Mentor from './components/Mentor';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0B1120' }}>
      <Navbar onEnroll={() => setShowModal(true)} />
      <Hero onEnroll={() => setShowModal(true)} />
      <Problem />
      <Curriculum />
      <Features />
      <Outcomes />
      <Mentor />
      <Pricing onEnroll={() => setShowModal(true)} />
      <CTA onEnroll={() => setShowModal(true)} />
      <Footer />
      {showModal && <EnrollModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
