import { useEffect, useRef } from 'react';

const stats = [
  { value: '9+',    label: 'Years Experience'   },
  { value: '500+',  label: 'Students Trained'   },
  { value: '₹5Cr+', label: 'Ad Spend Managed'  },
  { value: '100+',  label: 'Clients Served'     },
];
const tags = ['Meta Ads Expert','Google Ads Certified','AI Marketing','Funnel Strategist','Tamil Medium'];

export default function Mentor() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="mentor" ref={ref} className="py-24 px-4 md:px-8 bg-[#0B1120]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

          {/* Avatar card */}
          <div className="reveal flex-shrink-0">
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shadow-2xl shadow-blue-900/50 animate-blue-glow">
                {/* ZD monogram avatar */}
                <div className="text-center">
                  <div className="text-7xl font-black text-white/20 select-none">ZD</div>
                  <div className="text-blue-300 text-sm font-semibold mt-2">Digital Marketing</div>
                  <div className="text-blue-400 text-xs">Mentor & Practitioner</div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 blue-btn px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                9+ Years Industry Experience
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal flex-1">
            <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Your Mentor</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">
              Learn from an Expert Who<br />
              <span className="blue-gradient-text">Has Done It All</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Learn directly from a mentor with 9+ years of practical industry experience managing real campaigns,
              real clients, and real budgets across Meta, Google, and AI-powered marketing.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Not a classroom trainer — a practitioner who has built funnels, scaled businesses, and trained
              500+ students across Tamil Nadu.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((t,i) => (
                <span key={i} className="bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full">{t}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s,i) => (
                <div key={i} className="card p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black blue-gradient-text">{s.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
