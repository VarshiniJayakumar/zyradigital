import { useReveal } from '../hooks/useReveal';

const problems = [
  { icon: '📺', title: 'Random YouTube Learning', desc: 'Scattered tutorials with no structure or sequence. No direction, no progress.' },
  { icon: '🧪', title: 'Zero Practical Experience', desc: 'Theory without hands-on execution doesn\'t build real skills or confidence.' },
  { icon: '🗺️', title: 'No Roadmap', desc: 'Don\'t know what to learn first, what comes next, or where to stop.' },
  { icon: '🧑‍🏫', title: 'No Mentor Guidance', desc: 'No one to answer doubts, review work, or give personalised feedback.' },
  { icon: '💼', title: 'No Real Client Strategies', desc: 'Generic textbook examples — never real campaigns, real budgets, real results.' },
];

export default function Problem() {
  const ref = useReveal();

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-brand-dark to-brand-card/30">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
            Why Most People Struggle<br />
            <span className="gradient-text">in Digital Marketing</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Many people start, few succeed. Here's what's holding them back — and how we solve it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {problems.map((p, i) => (
            <div
              key={i}
              className="reveal card-bg p-6 rounded-2xl hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-white mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Solution callout */}
        <div className="reveal card-bg border-l-4 border-purple-500 p-6 rounded-2xl flex gap-4 items-start">
          <span className="text-2xl">🎯</span>
          <p className="text-gray-300 leading-relaxed">
            That's why <span className="text-white font-bold">ZyraDigital</span> focuses entirely on practical execution and
            real-world marketing strategies — so you come out ready to run campaigns from Day 1.
          </p>
        </div>
      </div>
    </section>
  );
}
