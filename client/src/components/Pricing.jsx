import { useEffect, useRef } from 'react';

const included = [
  '30 Days Live Online Classes',
  '45+ Hours Practical Training',
  'AI Tools Integration in Every Module',
  'Real Client Campaign Case Studies',
  'Lifetime Recording Access',
  'Lifetime Mentor Support',
  'Tamil Medium Training',
  'Industry Certification',
  'WhatsApp Study Group Access',
];

export default function Pricing({ onEnroll }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-24 px-4 md:px-8 bg-[#111827]">
      <div className="max-w-6xl mx-auto">

        <div className="reveal text-center mb-16">
          <span className="inline-block bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Enrollment</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Simple, Transparent <span className="blue-gradient-text">Pricing</span>
          </h2>
          <p className="text-slate-400">One-time investment. Lifetime returns. No hidden costs.</p>
        </div>

        <div className="reveal max-w-lg mx-auto">
          <div className="relative bg-[#0B1120] border border-[#1E3A5F] rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl shadow-blue-900/30 animate-blue-glow">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 rounded-t-3xl" />

            {/* Price */}
            <div className="flex items-end gap-4 mb-3 mt-2">
              <span className="text-slate-600 text-2xl line-through">₹15,000</span>
              <span className="text-5xl font-black blue-gradient-text">₹7,499</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-semibold mb-8">
              🎉 Save ₹7,501 — Limited Offer
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Installment */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-6 text-sm text-blue-300">
              💳 <strong className="text-white">2 Installments Available</strong> — Pay ₹3,749 now &amp; ₹3,750 after Week 2.
            </div>

            <button onClick={onEnroll}
              className="blue-btn w-full font-bold py-4 rounded-2xl text-lg mb-3">
              Enroll Now — ₹7,499 ✦
            </button>
            <p className="text-center text-slate-600 text-xs">🔒 Secure enrollment · Limited seats available</p>
          </div>
        </div>

      </div>
    </section>
  );
}
