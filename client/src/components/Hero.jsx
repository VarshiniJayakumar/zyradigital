export default function Hero({ onEnroll }) {
  return (
    <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-16">

        {/* Left */}
        <div className="flex-1 animate-fade-up">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm text-blue-300 font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Batch Starting Soon — Tamil Medium
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.12] mb-6 tracking-tight">
            Master Digital Marketing<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              with AI Integration
            </span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
            India's most practical digital marketing course — Meta Ads, Google Ads, AI Tools & real client strategies.
            100% Tamil medium. Job-ready in 30 days.
          </p>

          {/* Social proof row */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {['bg-blue-500','bg-purple-500','bg-pink-500','bg-green-500'].map((c,i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white`}>
                  {['A','B','C','D'][i]}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-300">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-1">500+ students enrolled</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <button onClick={onEnroll}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 hover:-translate-y-0.5">
              Enroll Now — ₹7,499 ✦
            </button>
            <button onClick={() => document.querySelector('#curriculum')?.scrollIntoView({ behavior:'smooth' })}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all">
              View Curriculum →
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            {[['✅','30 Live Sessions'],['✅','45+ Hours Content'],['✅','Lifetime Access'],['✅','Tamil Medium']].map(([icon,text],i) => (
              <span key={i} className="flex items-center gap-1.5">{icon} {text}</span>
            ))}
          </div>
        </div>

        {/* Right — Course card mockup */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-sm">
            {/* Main course card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-float">
              {/* Course thumbnail */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-44 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-5xl mb-2">📊</div>
                  <div className="text-white font-bold text-sm">AI Digital Marketing</div>
                  <div className="text-blue-200 text-xs">Complete Course</div>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/30 transition-all">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-2xl font-black text-slate-900">₹7,499</div>
                    <div className="text-slate-400 text-sm line-through">₹15,000</div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">50% OFF</span>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Seats filling fast</span>
                    <span>73% full</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[73%] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  </div>
                </div>

                {/* Course meta */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  {[['30','Live Classes'],['45+','Hours'],['∞','Access']].map(([v,l]) => (
                    <div key={l} className="bg-slate-50 rounded-lg py-2">
                      <div className="text-sm font-bold text-slate-800">{v}</div>
                      <div className="text-[10px] text-slate-500">{l}</div>
                    </div>
                  ))}
                </div>

                <button onClick={onEnroll}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  Enroll Now
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">🔒 Secure · Limited seats</p>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <div>
                <div className="text-xs font-bold text-slate-800">Certified</div>
                <div className="text-[10px] text-slate-500">Industry Ready</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
              <span className="text-lg">📈</span>
              <div>
                <div className="text-xs font-bold text-green-600">+84% ROAS</div>
                <div className="text-[10px] text-slate-500">After Training</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="h-12 bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
    </section>
  );
}
