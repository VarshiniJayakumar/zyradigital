export default function Hero({ onEnroll }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      {/* Left content */}
      <div className="flex-1 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 text-xs text-purple-300 font-medium mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          AI Integrated • Tamil Medium • Live Training
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
          Learn AI Integrated{' '}
          <span className="gradient-text">Digital Marketing</span>{' '}
          Practically
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
          Master Meta Ads, Google Ads, AI Tools & Real Client Strategies with Live Practical Training.
          Tamil Medium. Job-Ready Skills.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={onEnroll}
            className="gradient-btn text-white font-bold px-8 py-3.5 rounded-full text-base animate-pulse-glow"
          >
            Join Now ✦
          </button>
          <button
            onClick={() => scrollTo('#curriculum')}
            className="border border-purple-600 text-purple-300 hover:bg-purple-900/30 font-semibold px-8 py-3.5 rounded-full text-base transition-all"
          >
            Get Course Details →
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6">
          {[
            { value: '45+', label: 'Hours Training' },
            { value: '9+', label: 'Yrs Experience' },
            { value: '30', label: 'Live Sessions' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <div className="w-px h-8 bg-brand-border hidden sm:block"></div>}
              <div>
                <div className="text-2xl font-black gradient-text">{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Mentor card + floating badges */}
      <div className="flex-1 flex justify-center relative">
        <div className="relative w-72 md:w-80">
          {/* Main mentor card */}
          <div className="card-bg p-6 rounded-3xl animate-float shadow-2xl shadow-purple-900/40">
            {/* Avatar */}
            <div className="w-full h-48 bg-gradient-to-br from-purple-700 to-pink-600 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-40 h-40" fill="none">
                <circle cx="100" cy="80" r="40" fill="#c4b5fd" />
                <ellipse cx="100" cy="160" rx="60" ry="40" fill="#a78bfa" />
                <circle cx="100" cy="80" r="35" fill="#ede9fe" />
                <circle cx="88" cy="75" r="5" fill="#7c3aed" />
                <circle cx="112" cy="75" r="5" fill="#7c3aed" />
                <path d="M88 95 Q100 108 112 95" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-lg">Digital Marketing Mentor</div>
              <div className="text-purple-400 text-sm mt-1">9+ Years Experience</div>
            </div>
          </div>

          {/* ROAS badge */}
          <div className="absolute -top-4 -right-4 bg-green-500/20 border border-green-500/40 rounded-2xl px-4 py-2 text-center shadow-lg">
            <div className="text-green-400 font-black text-lg">📈 +84%</div>
            <div className="text-white text-xs font-semibold">ROAS Improvement</div>
            <div className="text-green-400 text-xs">↑ After Training</div>
          </div>

          {/* Ad Performance widget */}
          <div className="absolute -bottom-6 -left-6 card-bg px-4 py-3 rounded-2xl shadow-lg min-w-[160px]">
            <div className="text-xs text-gray-400 mb-1">Ad Performance</div>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-white text-xs font-semibold">Live Campaign Insights</div>
          </div>

          {/* Certified badge */}
          <div className="absolute top-1/2 -left-8 bg-yellow-500/20 border border-yellow-500/40 rounded-xl px-3 py-2 shadow-lg">
            <div className="text-yellow-400 text-xs font-bold">🏆 Certified</div>
            <div className="text-white text-xs">Industry Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
}
