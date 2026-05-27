import { useReveal } from '../hooks/useReveal';

const outcomes = [
  { icon: '💰', title: 'Freelancing Income', desc: 'Start landing paid clients within weeks of completing the program.' },
  { icon: '🚀', title: 'Business Growth', desc: 'Run your own ads — scale your business without depending on agencies.' },
  { icon: '🤝', title: 'Client Handling', desc: 'Communicate strategy, present reports, and manage client relationships confidently.' },
  { icon: '🧲', title: 'Lead Generation Skills', desc: 'Generate qualified leads for any niche using paid + organic strategies.' },
  { icon: '📈', title: 'Digital Career Growth', desc: 'Land roles in agencies, brands, or build your own marketing consulting practice.' },
];

const timeline = [
  { label: 'Before', desc: 'No skills' },
  { label: 'Wk 1', desc: 'Foundations' },
  { label: 'Wk 2', desc: 'Meta Ads' },
  { label: 'Wk 3', desc: 'Google Ads' },
  { label: 'Wk 4', desc: 'AI Tools' },
  { label: 'Month 2', desc: 'Live Projects' },
  { label: 'Month 3', desc: 'Job Ready' },
];

export default function Outcomes() {
  const ref = useReveal();

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">After Completion</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
            What You'll <span className="gradient-text">Achieve</span>
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
              className="reveal card-bg p-6 rounded-2xl hover:border-purple-600/50 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{o.icon}</div>
              <h3 className="font-bold text-white mb-2">{o.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal card-bg p-8 rounded-3xl overflow-x-auto">
          <div className="flex items-center min-w-max mx-auto relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 z-0"></div>

            {timeline.map((t, i) => (
              <div key={i} className="flex flex-col items-center relative z-10 px-4 md:px-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  i === 0
                    ? 'bg-gray-700 border-gray-500 text-gray-300'
                    : i === timeline.length - 1
                    ? 'bg-gradient-to-br from-purple-600 to-pink-500 border-pink-400 text-white'
                    : 'bg-brand-card border-purple-600 text-purple-300'
                }`}>
                  {i + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-white text-xs font-bold">{t.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
