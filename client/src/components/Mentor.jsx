import { useEffect, useRef } from 'react';

const stats = [
  { value:'9+',    label:'Years Experience',  icon:'🏅' },
  { value:'500+',  label:'Students Trained',  icon:'👨‍🎓' },
  { value:'₹5Cr+', label:'Ad Spend Managed',  icon:'💰' },
  { value:'100+',  label:'Clients Served',    icon:'🤝' },
];
const tags = ['Meta Ads Expert','Google Ads Certified','AI Marketing','Funnel Strategist','Tamil Medium'];

export default function Mentor() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="mentor" ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

          {/* Avatar side */}
          <div className="reveal flex-shrink-0">
            <div className="relative">
              {/* Avatar card */}
              <div className="w-64 md:w-72 bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-8 text-center shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-black text-white shadow-lg">
                  ZD
                </div>
                <div className="text-white font-bold text-lg">Digital Marketing</div>
                <div className="text-blue-300 text-sm">Mentor & Practitioner</div>
                <div className="mt-4 flex justify-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-blue-200 text-xs mt-1">Rated 5.0 by 500+ students</div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                9+ Years Industry Experience
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal flex-1">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">Your Instructor</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Learn from an Expert Who<br />Has Done It All
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              9+ years of practical industry experience managing real campaigns, real clients, and real budgets across Meta, Google, and AI-powered marketing.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Not a classroom trainer — a practitioner who has built funnels, scaled businesses, and trained 500+ students across Tamil Nadu.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((t,i) => (
                <span key={i} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">{t}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s,i) => (
                <div key={i} className="bg-white rounded-2xl p-4 text-center border border-slate-200 shadow-sm">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-blue-600">{s.value}</div>
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
