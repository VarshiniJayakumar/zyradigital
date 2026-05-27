import { useReveal } from '../hooks/useReveal';

export default function CTA({ onEnroll }) {
  const ref = useReveal();

  const scrollToPricing = () => {
    const el = document.querySelector('#pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-brand-dark to-pink-900/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center relative z-10">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Take Action</span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 mb-6 leading-tight">
          One Skill Can Completely<br />
          <span className="gradient-text">Change Your Career Growth.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Join thousands of Tamil marketers who chose practical training over theory. Your journey starts today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={scrollToPricing}
            className="gradient-btn text-white font-bold px-10 py-4 rounded-full text-lg animate-pulse-glow"
          >
            Enroll Now ✦
          </button>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-500 text-green-400 hover:bg-green-500/10 font-semibold px-10 py-4 rounded-full text-lg transition-all"
          >
            📲 WhatsApp Us
          </a>
        </div>

        <p className="text-gray-500 text-sm italic">"Elevate Your Presence" — ZyraDigital</p>
      </div>
    </section>
  );
}
