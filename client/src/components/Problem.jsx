import { useEffect, useRef } from 'react';

const problems = [
  { icon: '📺', title: 'Random YouTube Learning',    desc: 'Scattered tutorials with no structure or sequence. No direction, no progress.' },
  { icon: '🧪', title: 'Zero Practical Experience',  desc: "Theory without hands-on execution doesn't build real skills or confidence." },
  { icon: '🗺️', title: 'No Roadmap',                desc: "Don't know what to learn first, what comes next, or where to stop." },
  { icon: '🧑‍🏫', title: 'No Mentor Guidance',      desc: 'No one to answer doubts, review work, or give personalised feedback.' },
  { icon: '💼', title: 'No Real Client Strategies',  desc: 'Generic textbook examples — never real campaigns, real budgets, real results.' },
];

export default function Problem() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-4 md:px-8 bg-[#0B1120] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">

        <div className="reveal text-center mb-16">
          <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Why Most People Struggle<br />
            <span className="blue-gradient-text">in Digital Marketing</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Many people start, few succeed. Here's what's holding them back — and how we solve it.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {problems.map((p, i) => (
            <div key={i} className="reveal card p-6 hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay:`${i*70}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-2xl mb-4 group-hover:border-blue-500/50 transition-colors">{p.icon}</div>
              <h3 className="font-bold text-white mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-700/40 p-6 rounded-2xl flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">🎯</span>
          <p className="text-slate-300 leading-relaxed">
            That's why <span className="text-white font-bold">ZyraDigital</span> focuses entirely on practical execution and
            real-world marketing strategies — so you come out ready to run campaigns from Day 1.
          </p>
        </div>

      </div>
    </section>
  );
}
