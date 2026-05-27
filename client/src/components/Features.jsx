import { useEffect, useRef } from 'react';

const features = [
  { icon:'📆', title:'30 Days Live Sessions',    desc:'Daily interactive live classes — ask questions, get instant answers.',          color:'bg-blue-50 text-blue-600' },
  { icon:'⏱️', title:'45+ Hours Training',       desc:'Comprehensive deep dives into every module — theory + practical.',              color:'bg-purple-50 text-purple-600' },
  { icon:'🤝', title:'Lifetime Mentor Support',  desc:'Doubt clarification, career guidance, and campaign reviews — forever.',         color:'bg-green-50 text-green-600' },
  { icon:'🏆', title:'9+ Years Industry Mentor', desc:"Learn from someone who's managed crores in ad spend across verticals.",         color:'bg-yellow-50 text-yellow-600' },
  { icon:'🎥', title:'Recording Access',          desc:'Miss a session? Lifetime access to all recorded classes, always available.',    color:'bg-red-50 text-red-600' },
  { icon:'🤖', title:'AI Integrated Learning',   desc:'AI tools woven into every module — not a separate add-on, but the core.',      color:'bg-cyan-50 text-cyan-600' },
  { icon:'📊', title:'Real Client Strategies',   desc:'Live case studies from actual client campaigns with real budgets and results.',  color:'bg-orange-50 text-orange-600' },
  { icon:'🗣️', title:'Tamil Language Training',  desc:'100% Tamil medium — learn comfortably without any language barrier.',          color:'bg-pink-50 text-pink-600' },
];

export default function Features() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.05 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="reveal text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">Why ZyraDigital</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Everything You Need to Succeed</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">No fluff. Only features that directly impact your learning and career outcomes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="reveal bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              style={{ transitionDelay: `${i * 50}ms` }}>
              <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
