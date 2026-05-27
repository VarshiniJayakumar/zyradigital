import { useEffect, useRef } from 'react';

const outcomes = [
  { icon: '💰', title: 'Freelancing Income',      desc: 'Start landing paid clients within weeks of completing the program.' },
  { icon: '🚀', title: 'Business Growth',          desc: 'Run your own ads — scale your business without depending on agencies.' },
  { icon: '🤝', title: 'Client Handling',          desc: 'Communicate strategy, present reports, and manage client relationships confidently.' },
  { icon: '🧲', title: 'Lead Generation Skills',   desc: 'Generate qualified leads for any niche using paid + organic strategies.' },
  { icon: '📈', title: 'Digital Career Growth',    desc: 'Land roles in agencies, brands, or build your own marketing consulting practice.' },
];

const timeline = [
  { label: 'Before',  desc: 'Starting point', color: '#475569' },
  { label: 'Wk 1',   desc: 'Foundations',    color: '#1D4ED8' },
  { label: 'Wk 2',   desc: 'Meta Ads',       color: '#2563EB' },
  { label: 'Wk 3',   desc: 'Google Ads',     color: '#3B82F6' },
  { label: 'Wk 4',   desc: 'AI Tools',       color: '#60A5FA' },
  { label: 'Month 2',desc: 'Live Projects',  color: '#93C5FD' },
  { label: 'Month 3',desc: 'Job Ready 🎉',   color: '#BFDBFE' },
];

export default function Outcomes() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-4 md:px-8 bg-[#111827]">
      <div className="max-w-6xl mx-auto">

        <div className="reveal text-center mb-16">
          <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">After Completion</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            What You'll <span className="blue-gradient-text">Achieve</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">From Day 1 you're building skills that open doors — here's what awaits you after the program.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {outcomes.map((o, i) => (
            <div key={i} className="reveal card p-6 hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay:`${i*70}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-2xl mb-4 group-hover:border-blue-500/50 transition-colors">{o.icon}</div>
              <h3 className="font-bold text-white mb-2">{o.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal card p-8 rounded-3xl overflow-x-auto">
          <h3 className="text-white font-bold text-center mb-8 text-sm uppercase tracking-widest text-slate-400">Your Progress Journey</h3>
          <div className="relative flex items-start justify-between min-w-[560px]">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-700 via-blue-600 to-blue-300" />
            {timeline.map((t, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 flex-1">
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ background: i === 0 ? '#1E293B' : t.color, borderColor: t.color, color: i === 0 ? '#64748B' : '#fff' }}>
                  {i === 0 ? '○' : i}
                </div>
                <div className="mt-2 text-center px-1">
                  <div className="text-white text-xs font-bold whitespace-nowrap">{t.label}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5 whitespace-nowrap">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
