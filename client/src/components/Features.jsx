import { useEffect, useRef } from 'react';

const features = [
  { icon: '📆', title: '30 Days Live Sessions',    desc: 'Daily interactive live classes — ask questions, get instant answers.' },
  { icon: '⏱️', title: '45+ Hours Training',       desc: 'Comprehensive deep dives into every module — theory + practical.' },
  { icon: '🤝', title: 'Lifetime Mentor Support',  desc: 'Doubt clarification, career guidance, and campaign reviews — forever.' },
  { icon: '🏆', title: '9+ Years Industry Mentor', desc: "Learn from someone who's managed crores in ad spend across verticals." },
  { icon: '🎥', title: 'Recording Access',          desc: 'Miss a session? Lifetime access to all recorded classes, always available.' },
  { icon: '🤖', title: 'AI Integrated Learning',   desc: 'AI tools woven into every module — not a separate add-on, but the core.' },
  { icon: '📊', title: 'Real Client Strategies',   desc: 'Live case studies from actual client campaigns with real budgets and results.' },
  { icon: '🗣️', title: 'Tamil Language Training',  desc: '100% Tamil medium — learn comfortably without any language barrier.' },
];

export default function Features() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 px-4 md:px-8 bg-[#0B1120]">
      <div className="max-w-6xl mx-auto">

        <div className="reveal text-center mb-16">
          <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Program Highlights</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Everything You Need <span className="blue-gradient-text">to Succeed</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">No fluff. Only features that directly impact your learning and career outcomes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="reveal card p-6 hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay:`${i*50}ms` }}>
              <div className="w-12 h-12 rounded-2xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-2xl mb-4 group-hover:border-blue-500/50 transition-colors">{f.icon}</div>
              <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
