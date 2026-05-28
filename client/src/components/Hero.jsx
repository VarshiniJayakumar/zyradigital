export default function Hero({ onEnroll }) {
  return (
    <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-16">

        {/* ── Left ── */}
        <div className="flex-1 animate-fade-up">
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
            100% Tamil medium. Practical training in 30 days.
          </p>

          {/* Social proof */}
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
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5">
              Secure My Seat — ₹7,499 ✦
            </button>
            <button onClick={() => document.querySelector('#curriculum')?.scrollIntoView({ behavior:'smooth' })}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all">
              View Curriculum →
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            {[['✅','30 Live Sessions'],['✅','45+ Hours Content'],['✅','Lifetime Access'],['✅','Tamil Medium']].map(([icon,text],i) => (
              <span key={i} className="flex items-center gap-1.5">{icon} {text}</span>
            ))}
          </div>
        </div>

        {/* ── Right — Info card (no video/play button) ── */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-sm animate-float">

            {/* Main card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-bold text-lg">AI Digital Marketing</div>
                    <div className="text-blue-200 text-sm">Complete Course — Tamil Medium</div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-black text-white">ZD</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['Meta Ads','Google Ads','AI Tools','Funnels'].map(t => (
                    <span key={t} className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-5">
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-black text-slate-900">₹7,499</div>
                    <div className="text-slate-400 text-sm line-through">₹15,000</div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">Save ₹7,501</span>
                </div>

                {/* Seat progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>🔥 Seats filling fast</span>
                    <span className="font-semibold text-orange-500">73% full</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[73%] bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" />
                  </div>
                </div>

                {/* Course highlights */}
                <div className="space-y-2 mb-5">
                  {[
                    ['📆','30 Days Live Classes'],
                    ['⏱️','45+ Hours Training'],
                    ['🤖','AI Tools Integrated'],
                    ['∞','Lifetime Access'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="text-base">{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <button onClick={onEnroll}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  Enroll Now →
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">🔒 Secure · Limited seats available</p>
              </div>
            </div>

            {/* Floating badge - certified only */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <div>
                <div className="text-xs font-bold text-slate-800">Certified</div>
                <div className="text-[10px] text-slate-500">Tamil Medium</div>
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
