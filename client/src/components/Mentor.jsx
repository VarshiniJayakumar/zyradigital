import { useReveal } from '../hooks/useReveal';

const stats = [
  { value: '9+', label: 'Years Experience' },
  { value: '500+', label: 'Students Trained' },
  { value: '₹5Cr+', label: 'Ad Spend Managed' },
  { value: '100+', label: 'Clients Served' },
];

const tags = ['Meta Ads Expert', 'Google Ads Certified', 'AI Marketing', 'Funnel Strategist', 'Tamil Medium'];

export default function Mentor() {
  const ref = useReveal();

  return (
    <section id="mentor" className="py-20 px-4 md:px-8 bg-gradient-to-b from-brand-dark to-brand-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Mentor visual */}
          <div ref={ref} className="reveal flex-shrink-0 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-900/50 animate-pulse-glow">
              <svg viewBox="0 0 200 200" className="w-48 h-48" fill="none">
                <circle cx="100" cy="80" r="45" fill="#c4b5fd" />
                <ellipse cx="100" cy="170" rx="65" ry="45" fill="#a78bfa" />
                <circle cx="100" cy="80" r="38" fill="#ede9fe" />
                <circle cx="86" cy="74" r="6" fill="#7c3aed" />
                <circle cx="114" cy="74" r="6" fill="#7c3aed" />
                <path d="M86 96 Q100 112 114 96" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 gradient-btn px-6 py-2 rounded-full text-white text-sm font-bold whitespace-nowrap shadow-lg">
              9+ Years Industry Experience
            </div>
          </div>

          {/* Content */}
          <div className="reveal flex-1">
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Your Mentor</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
              Learn from an Expert Who<br />
              <span className="gradient-text">Has Done It All</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Learn directly from a mentor with 9+ years of practical industry experience managing real campaigns,
              real clients, and real budgets across Meta, Google, and AI-powered marketing.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Not a classroom trainer — a practitioner who has built funnels, scaled businesses, and trained
              500+ students across Tamil Nadu.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((t, i) => (
                <span key={i} className="bg-purple-900/40 border border-purple-700/50 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="card-bg p-4 rounded-2xl text-center">
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
