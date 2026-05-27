import { useReveal } from '../hooks/useReveal';

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
  const ref = useReveal();

  return (
    <section id="pricing" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Enrollment</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400">One-time investment. Lifetime returns. No hidden costs.</p>
        </div>

        <div className="reveal max-w-lg mx-auto">
          <div className="card-bg rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-purple-900/40 animate-pulse-glow">
            {/* Glow bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 pointer-events-none"></div>

            {/* Prices */}
            <div className="flex items-end gap-4 mb-2">
              <span className="text-gray-500 text-2xl line-through">₹15,000</span>
              <span className="text-5xl font-black gradient-text">₹7,499</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-semibold mb-8">
              🎉 Save ₹7,501 — Limited Offer
            </div>

            {/* Features list */}
            <ul className="space-y-3 mb-8">
              {included.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Installment */}
            <div className="bg-purple-900/30 border border-purple-700/40 rounded-xl p-4 mb-6 text-sm text-purple-300">
              💳 <strong>2 Installments Available</strong> — Pay ₹3,749 now &amp; ₹3,750 after Week 2.
            </div>

            {/* CTA */}
            <button
              onClick={onEnroll}
              className="gradient-btn w-full text-white font-bold py-4 rounded-2xl text-lg mb-3"
            >
              Enroll Now — ₹7,499 ✦
            </button>
            <p className="text-center text-gray-500 text-xs">🔒 Secure enrollment · Limited seats available</p>
          </div>
        </div>
      </div>
    </section>
  );
}
