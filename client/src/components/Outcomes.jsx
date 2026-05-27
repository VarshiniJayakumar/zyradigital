import { useEffect, useRef } from 'react';

const outcomes = [
  { icon:'💰', title:'Freelancing Income',     desc:'Start landing paid clients within weeks of completing the program.',                      tag:'Income' },
  { icon:'🚀', title:'Business Growth',         desc:'Run your own ads — scale your business without depending on agencies.',                   tag:'Growth' },
  { icon:'🤝', title:'Client Handling',         desc:'Communicate strategy, present reports, and manage client relationships confidently.',     tag:'Skills' },
  { icon:'🧲', title:'Lead Generation Skills',  desc:'Generate qualified leads for any niche using paid + organic strategies.',                 tag:'Skills' },
  { icon:'📈', title:'Digital Career Growth',   desc:'Land roles in agencies, brands, or build your own marketing consulting practice.',        tag:'Career' },
];

const timeline = [
  { label:'Before',   desc:'Starting point',  active:false },
  { label:'Week 1',   desc:'Foundations',     active:true  },
  { label:'Week 2',   desc:'Meta Ads',        active:true  },
  { label:'Week 3',   desc:'Google Ads',      active:true  },
  { label:'Week 4',   desc:'AI Tools',        active:true  },
  { label:'Month 2',  desc:'Live Projects',   active:true  },
  { label:'Month 3',  desc:'Job Ready 🎉',    active:true  },
];

const tagColors = { Income:'bg-green-100 text-green-700', Growth:'bg-blue-100 text-blue-700', Skills:'bg-purple-100 text-purple-700', Career:'bg-orange-100 text-orange-700' };

export default function Outcomes() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.05 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="reveal text-center mb-14">
          <span className="inline-block bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-green-100">Learning Outcomes</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">What You'll Achieve</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">From Day 1 you're building skills that open doors.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {outcomes.map((o, i) => (
            <div key={i} className="reveal bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">{o.icon}</div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[o.tag]}`}>{o.tag}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{o.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal bg-slate-900 rounded-3xl p-8 overflow-x-auto">
          <h3 className="text-white font-bold text-center mb-8">Your 3-Month Transformation Journey</h3>
          <div className="relative flex items-start justify-between min-w-[560px]">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-700" />
            <div className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400" style={{ width:'85%' }} />
            {timeline.map((t, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  t.active
                    ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-slate-700 border-slate-600 text-slate-400'
                }`}>
                  {i === 0 ? '○' : i}
                </div>
                <div className="mt-2 text-center px-1">
                  <div className={`text-xs font-bold whitespace-nowrap ${t.active ? 'text-white' : 'text-slate-500'}`}>{t.label}</div>
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
