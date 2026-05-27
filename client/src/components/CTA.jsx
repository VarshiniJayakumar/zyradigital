import { useEffect, useRef } from 'react';

export default function CTA({ onEnroll }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 px-4 md:px-8 relative overflow-hidden bg-[#0B1120]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-blue-900/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="reveal max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Take Action</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-2 mb-6 leading-tight">
          One Skill Can Completely<br />
          <span className="blue-gradient-text">Change Your Career Growth.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          Join thousands of Tamil marketers who chose practical training over theory. Your journey starts today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior:'smooth' })}
            className="blue-btn font-bold px-10 py-4 rounded-full text-lg animate-blue-glow">
            Enroll Now ✦
          </button>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
            className="border border-green-500/60 text-green-400 hover:bg-green-500/10 font-semibold px-10 py-4 rounded-full text-lg transition-all">
            📲 WhatsApp Us
          </a>
        </div>

        <p className="text-slate-600 text-sm italic">"Elevate Your Presence" — ZyraDigital</p>
      </div>
    </section>
  );
}
