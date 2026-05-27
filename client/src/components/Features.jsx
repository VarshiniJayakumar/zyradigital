import { useEffect, useRef } from 'react';

const features = [
  { icon: '📆', title: '30 Days Live Sessions', desc: 'Daily interactive live classes — ask questions, get instant answers.' },
  { icon: '⏱️', title: '45+ Hours Training', desc: 'Comprehensive deep dives into every module — theory + practical.' },
  { icon: '🤝', title: 'Lifetime Mentor Support', desc: 'Doubt clarification, career guidance, and campaign reviews — forever.' },
  { icon: '🏆', title: '9+ Years Industry Mentor', desc: "Learn from someone who's managed crores in ad spend across verticals." },
  { icon: '🎥', title: 'Recording Access', desc: 'Miss a session? Lifetime access to all recorded classes, always available.' },
  { icon: '🤖', title: 'AI Integrated Learning', desc: 'AI tools woven into every module — not a separate add-on, but the core.' },
  { icon: '📊', title: 'Real Client Strategies', desc: 'Live case studies from actual client campaigns with real budgets and results.' },
  { icon: '🗣️', title: 'Tamil Language Training', desc: '100% Tamil medium — learn comfortably without any language barrier.' },
];

export default function Features() {
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
    <section id="features" ref={sectionRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0F0A1E] to-[#1A1030]/30">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Program Highlights</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 text-white">
            Everything You Need<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">to Succeed</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            No fluff. Only features that directly impact your learning and career outcomes.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="reveal bg-[#1A1030] border border-[#2D1F4E] p-6 rounded-2xl hover:border-purple-600/60 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
