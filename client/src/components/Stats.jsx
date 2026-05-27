import { useEffect, useRef } from 'react';

const stats = [
  { value: '500+', label: 'Students Trained',    icon: '👨‍🎓' },
  { value: '9+',   label: 'Years Experience',     icon: '🏅' },
  { value: '₹5Cr+',label: 'Ad Spend Managed',    icon: '💰' },
  { value: '100+', label: 'Clients Served',       icon: '🤝' },
  { value: '30',   label: 'Live Sessions',        icon: '🎥' },
  { value: '45+',  label: 'Hours of Content',     icon: '⏱️' },
];

export default function Stats() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold text-blue-600">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
