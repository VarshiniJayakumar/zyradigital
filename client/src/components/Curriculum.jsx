import { useState, useEffect, useRef } from 'react';

const modules = [
  { icon: '📣', title: 'Meta Ads',             desc: 'Facebook & Instagram campaigns, audience targeting, creatives, and scaling strategies.' },
  { icon: '🔍', title: 'Google Ads',            desc: 'Search, Display & YouTube campaigns with keyword research, Quality Score, and bidding.' },
  { icon: '🤖', title: 'AI Tools & Automation', desc: 'ChatGPT, Midjourney, Canva AI, and automation workflows to 10x your productivity.' },
  { icon: '🔀', title: 'Funnel Strategy',        desc: 'Build high-converting funnels from awareness to purchase with psychological triggers.' },
  { icon: '🧲', title: 'Lead Generation',        desc: 'WhatsApp funnels, lead magnets, landing pages, and low-cost lead gen tactics.' },
  { icon: '🔁', title: 'Retargeting',            desc: 'Pixel setup, custom audiences, dynamic retargeting, and email remarketing strategies.' },
  { icon: '📅', title: 'Campaign Planning',      desc: 'Full campaign lifecycle — briefs, budgets, timelines, A/B testing, and reporting.' },
  { icon: '🕵️', title: 'Competitor Research',   desc: 'Spy tools, ad library analysis, and building strategies around competitor gaps.' },
];

export default function Curriculum() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="curriculum" ref={ref} className="py-24 px-4 md:px-8 bg-[#111827]">
      <div className="max-w-6xl mx-auto">

        <div className="reveal text-center mb-16">
          <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Curriculum</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            What You'll <span className="blue-gradient-text">Learn</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">A complete, industry-aligned curriculum built for real execution — not just theory.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m, i) => (
            <div key={i} className="reveal card p-5 cursor-pointer hover:-translate-y-1 transition-all duration-300 group" style={{ transitionDelay:`${i*50}ms` }}
              onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-blue-400 bg-blue-900/30 px-2.5 py-0.5 rounded-full">Module {i+1}</span>
                <span className="text-slate-600 text-xs group-hover:text-blue-400 transition-colors">{open===i?'▲':'▼'}</span>
              </div>
              <div className="text-2xl mb-2">{m.icon}</div>
              <h3 className="font-bold text-white text-sm">{m.title}</h3>
              {open === i && (
                <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-3 border-t border-[#1E3A5F]">{m.desc}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
