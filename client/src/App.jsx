import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Problem from './components/Problem';
import Curriculum from './components/Curriculum';
import Features from './components/Features';
import Outcomes from './components/Outcomes';
import Mentor from './components/Mentor';
import Pricing from './components/Pricing';
import EnrollSection from './components/EnrollSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const scrollToEnroll = () => {
    document.querySelector('#enroll')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar onEnroll={scrollToEnroll} />
      <Hero onEnroll={scrollToEnroll} />
      <Stats />
      <Problem />
      <Curriculum />
      <Features />
      <Outcomes />
      <Mentor />
      <Pricing onEnroll={scrollToEnroll} />
      <EnrollSection />
      <CTA onEnroll={scrollToEnroll} />
      <Footer />
    </div>
  );
}
