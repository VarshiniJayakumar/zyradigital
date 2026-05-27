import { useEffect, useRef } from 'react';

const outcomes = [
  { icon: '💰', title: 'Freelancing Income', desc: 'Start landing paid clients within weeks of completing the program.' },
  { icon: '🚀', title: 'Business Growth', desc: 'Run your own ads — scale your business without depending on agencies.' },
  { icon: '🤝', title: 'Client Handling', desc: 'Communicate strategy, present reports, and manage client relationships confidently.' },
  { icon: '🧲', title: 'Lead Generation Skills', desc: 'Generate qualified leads for any niche using paid + organic strategies.' },
  { icon: '📈', title: 'Digital Career Growth', desc: 'Land roles in agencies, brands, or build your own marketing consulting practice.' },
];

const timeline = [
  { label: 'Before', desc: 'Starting point' },
  { label: 'Wk 1', desc: 'Foundations' },
  { label: 'Wk 2', desc: 'Meta Ads' },
  { label: 'Wk 3', desc: 'Google Ads' },
  { label: 'Wk 4', desc: 'AI Tools' },
  { label: 'Month 2', desc: 'Live Projects' },
  { label: 'Month 3', desc: 'Job Ready' },
];

export default function Outcomes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-8 bg-[#0F0A1E]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">After Completion</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 text-white">
            What You'll{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Achieve</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From Day 1 you're building skills that open doors — here's what awaits you after the program.
          </p>
        </div>

        {/* Outcome cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {outcomes.map((o, i) => (
            <div
              key={i}
              className="reveal bg-[#1A1030] border border-[#2D1F4E] p-6 rounded-2xl hover:border-purple-600/60 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{o.icon}</div>
              <h3 className="font-bold text-white mb-2">{o.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress Timeline */}
        <div className="reveal bg-[#1A1030] border border-[#2D1F4E] p-8 rounded-3xl overflow-x-auto">
          <div className="relative flex items-start justify-between min-w-[600px]">
            {/* Connecting line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 z-0"></div>

            {timeline.map((t, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  i === 0
                    ? 'bg-gray-800 border-gray-600 text-gray-400'
                    : i === timeline.length - 1
                    ? 'bg-gradient-to-br from-purple-600 to-pink-500 border-pink-400 text-white'
                    : 'bg-[#1A1030] border-purple-600 text-purple-300'
                }`}>
                  {i === 0 ? '●' : i + 1}
                </div>
                <div className="mt-2 text-center px-1">
                  <div className="text-white text-xs font-bold whitespace-nowrap">{t.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5 whitespace-nowrap">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
