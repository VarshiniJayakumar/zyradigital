import { useEffect, useRef } from 'react';

export default function CTA({ onEnroll }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  const scrollToPricing = () => {
    const el = document.querySelector('#pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 relative overflow-hidden bg-[#0F0A1E]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="reveal max-w-3xl mx-auto text-center relative z-10">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Take Action</span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6 leading-tight text-white">
          One Skill Can Completely<br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Change Your Career Growth.
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Join thousands of Tamil marketers who chose practical training over theory. Your journey starts today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={scrollToPricing}
            className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 animate-pulse-glow"
          >
            Enroll Now ✦
          </button>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-500 text-green-400 hover:bg-green-500/10 font-semibold px-10 py-4 rounded-full text-lg transition-all duration-300"
          >
            📲 WhatsApp Us
          </a>
        </div>

        <p className="text-gray-500 text-sm italic">"Elevate Your Presence" — ZyraDigital</p>
      </div>
    </section>
  );
}
