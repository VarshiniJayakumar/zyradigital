import { useEffect, useRef } from 'react';

const included = [
  { text:'30 Days Live Online Classes',           icon:'📆' },
  { text:'45+ Hours Practical Training',          icon:'⏱️' },
  { text:'AI Tools Integration in Every Module',  icon:'🤖' },
  { text:'Real Client Campaign Case Studies',     icon:'📊' },
  { text:'Lifetime Recording Access',             icon:'🎥' },
  { text:'Lifetime Mentor Support',               icon:'🤝' },
  { text:'Tamil Medium Training',                 icon:'🗣️' },
  { text:'Industry Certification',                icon:'🏆' },
  { text:'WhatsApp Study Group Access',           icon:'💬' },
];

export default function Pricing({ onEnroll }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="reveal text-center mb-14">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 text-lg">One-time investment. Lifetime returns. No hidden costs.</p>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-xl overflow-hidden">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 flex items-center justify-between">
              <span className="text-white font-bold text-sm">🎉 Limited Time Offer — Save ₹7,501</span>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">50% OFF</span>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left — price + CTA */}
                <div className="md:w-56 flex-shrink-0">
                  <div className="text-slate-400 text-sm line-through mb-1">₹15,000</div>
                  <div className="text-5xl font-black text-slate-900 mb-1">₹7,499</div>
                  <div className="text-slate-500 text-sm mb-6">One-time payment</div>

                  <button onClick={onEnroll}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-base transition-colors shadow-md shadow-blue-200 mb-3">
                    Enroll Now ✦
                  </button>
                  <p className="text-center text-xs text-slate-400 mb-6">🔒 Secure · Limited seats</p>

                  {/* Installment removed */}
                </div>

                {/* Right — features */}
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">What's Included</div>
                  <ul className="space-y-3">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                        <span className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 text-base">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
