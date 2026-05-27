import { useState, useEffect, useRef } from 'react';

const modules = [
  { num:'01', icon:'📣', title:'Meta Ads',             hours:'6h', lessons:8,  desc:'Facebook & Instagram campaigns, audience targeting, creatives, and scaling strategies.' },
  { num:'02', icon:'🔍', title:'Google Ads',            hours:'6h', lessons:9,  desc:'Search, Display & YouTube campaigns with keyword research, Quality Score, and bidding.' },
  { num:'03', icon:'🤖', title:'AI Tools & Automation', hours:'5h', lessons:7,  desc:'ChatGPT, Midjourney, Canva AI, and automation workflows to 10x your productivity.' },
  { num:'04', icon:'🔀', title:'Funnel Strategy',        hours:'4h', lessons:6,  desc:'Build high-converting funnels from awareness to purchase with psychological triggers.' },
  { num:'05', icon:'🧲', title:'Lead Generation',        hours:'5h', lessons:7,  desc:'WhatsApp funnels, lead magnets, landing pages, and low-cost lead gen tactics.' },
  { num:'06', icon:'🔁', title:'Retargeting',            hours:'4h', lessons:5,  desc:'Pixel setup, custom audiences, dynamic retargeting, and email remarketing strategies.' },
  { num:'07', icon:'📅', title:'Campaign Planning',      hours:'5h', lessons:6,  desc:'Full campaign lifecycle — briefs, budgets, timelines, A/B testing, and reporting.' },
  { num:'08', icon:'🕵️', title:'Competitor Research',   hours:'4h', lessons:5,  desc:'Spy tools, ad library analysis, and building strategies around competitor gaps.' },
];

export default function Curriculum() {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.05 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="curriculum" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="reveal text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">Course Curriculum</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">What You'll Learn</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">8 comprehensive modules — 45+ hours of practical, industry-aligned content.</p>
        </div>

        {/* Summary bar */}
        <div className="reveal bg-slate-900 rounded-2xl p-5 mb-8 flex flex-wrap gap-6 justify-center md:justify-between items-center">
          {[['8','Modules'],['45+','Hours'],['53','Lessons'],['∞','Lifetime Access']].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-black text-white">{v}</div>
              <div className="text-slate-400 text-xs">{l}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="reveal space-y-3">
          {modules.map((m, i) => (
            <div key={i} className={`border rounded-xl overflow-hidden transition-all duration-200 ${open === i ? 'border-blue-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
              <button
                className="w-full flex items-center gap-4 p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                <span className="text-xs font-bold text-slate-400 w-6 flex-shrink-0">{m.num}</span>
                <span className="text-xl flex-shrink-0">{m.icon}</span>
                <span className="flex-1 font-semibold text-slate-800">{m.title}</span>
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400 flex-shrink-0">
                  <span>{m.lessons} lessons</span>
                  <span>{m.hours}</span>
                </div>
                <svg className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 bg-blue-50/50 border-t border-blue-100">
                  <p className="text-slate-600 text-sm leading-relaxed pt-4">{m.desc}</p>
                  <div className="flex gap-4 mt-3 text-xs text-blue-600 font-medium">
                    <span>📹 {m.lessons} video lessons</span>
                    <span>⏱ {m.hours} total</span>
                    <span>📝 Practice assignments</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
