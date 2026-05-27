import { useEffect, useRef } from 'react';

const problems = [
  { icon: '📺', title: 'Random YouTube Learning',   desc: 'Scattered tutorials with no structure or sequence. No direction, no progress.' },
  { icon: '🧪', title: 'Zero Practical Experience', desc: "Theory without hands-on execution doesn't build real skills or confidence." },
  { icon: '🗺️', title: 'No Clear Roadmap',          desc: "Don't know what to learn first, what comes next, or where to stop." },
  { icon: '🧑‍🏫', title: 'No Mentor Guidance',      desc: 'No one to answer doubts, review work, or give personalised feedback.' },
  { icon: '💼', title: 'No Real Client Work',        desc: 'Generic textbook examples — never real campaigns, real budgets, real results.' },
];

export default function Problem() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="reveal text-center mb-14">
          <span className="inline-block bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-red-100">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Why Most People Struggle<br className="hidden md:block" /> in Digital Marketing
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">Many people start, few succeed. Here's what's holding them back.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {problems.map((p, i) => (
            <div key={i} className="reveal bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-200 hover:shadow-md transition-all duration-300 group"
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-red-100 transition-colors">{p.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Solution banner */}
        <div className="reveal bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🎯</div>
          <div>
            <div className="text-white font-bold text-lg mb-1">That's exactly why ZyraDigital exists.</div>
            <p className="text-blue-100 leading-relaxed">
              We focus entirely on practical execution and real-world marketing strategies — so you come out ready to run campaigns from Day 1.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
