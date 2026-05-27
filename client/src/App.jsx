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

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const enroll = () => setShowModal(true);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar onEnroll={enroll} />
      <Hero onEnroll={enroll} />
      <Stats />
      <Problem />
      <Curriculum />
      <Features />
      <Outcomes />
      <Mentor />
      <Pricing onEnroll={enroll} />
      <CTA onEnroll={enroll} />
      <Footer />
      {showModal && <EnrollModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
