export default function Hero({ onEnroll }) {
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen pt-20 pb-16 overflow-hidden bg-[#0B1120]">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#1E3A5F 1px,transparent 1px),linear-gradient(90deg,#1E3A5F 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Blue glow orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-800/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-14 pt-10">

        {/* ── Left ── */}
        <div className="flex-1 animate-[fadeUp_0.7s_ease_forwards]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-700/40 rounded-full px-4 py-1.5 text-xs text-blue-300 font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI Integrated • Tamil Medium • Live Training
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-white">
            Learn AI Integrated<br />
            <span className="blue-gradient-text">Digital Marketing</span><br />
            Practically
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
            Master Meta Ads, Google Ads, AI Tools & Real Client Strategies with Live Practical Training.
            Tamil Medium. Job-Ready Skills.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button onClick={onEnroll}
              className="blue-btn font-bold px-8 py-3.5 rounded-full text-base animate-blue-glow">
              Join Now ✦
            </button>
            <button onClick={() => scrollTo('#curriculum')}
              className="border border-blue-600/60 text-blue-300 hover:bg-blue-900/30 font-semibold px-8 py-3.5 rounded-full text-base transition-all">
              Get Course Details →
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[['45+','Hours Training'],['9+','Yrs Experience'],['30','Live Sessions']].map(([v,l],i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-8 bg-[#1E3A5F] hidden sm:block" />}
                <div>
                  <div className="text-2xl font-black blue-gradient-text">{v}</div>
                  <div className="text-xs text-slate-500">{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Dashboard card ── */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-80">

            {/* Main card */}
            <div className="bg-[#111827] border border-[#1E3A5F] rounded-3xl p-6 shadow-2xl shadow-blue-900/30 animate-float">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-white font-bold">Digital Marketing Mentor</div>
                  <div className="text-blue-400 text-xs mt-0.5">9+ Years Experience</div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xl font-black text-white">ZD</div>
              </div>

              {/* Chart bars */}
              <div className="bg-[#0B1120] rounded-2xl p-4 mb-4">
                <div className="text-xs text-slate-500 mb-3">Campaign Performance</div>
                <div className="flex items-end gap-2 h-20">
                  {[40,65,45,80,55,90,70,95].map((h,i) => (
                    <div key={i} className="flex-1 rounded-t-sm transition-all"
                      style={{ height:`${h}%`, background: i === 7 ? 'linear-gradient(180deg,#3B82F6,#1D4ED8)' : `rgba(37,99,235,${0.2 + i*0.08})` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['M','T','W','T','F','S','S','T'].map((d,i) => (
                    <span key={i} className="text-[10px] text-slate-600 flex-1 text-center">{d}</span>
                  ))}
                </div>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 gap-2">
                {[['CTR','4.8%','↑'],['ROAS','8.4x','↑'],['CPC','₹12','↓']].map(([k,v,a]) => (
                  <div key={k} className="bg-[#0B1120] rounded-xl p-2.5 text-center">
                    <div className="text-[10px] text-slate-500">{k}</div>
                    <div className="text-white text-sm font-bold">{v}</div>
                    <div className={`text-[10px] font-bold ${a==='↑'?'text-green-400':'text-blue-400'}`}>{a}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROAS badge */}
            <div className="absolute -top-4 -right-4 bg-green-500/15 border border-green-500/30 rounded-2xl px-4 py-2 text-center shadow-lg backdrop-blur-sm">
              <div className="text-green-400 font-black text-lg">📈 +84%</div>
              <div className="text-white text-xs font-semibold">ROAS Improvement</div>
              <div className="text-green-400 text-[10px]">↑ After Training</div>
            </div>

            {/* Certified badge */}
            <div className="absolute -bottom-4 -left-4 bg-blue-900/40 border border-blue-700/40 rounded-2xl px-4 py-2.5 shadow-lg backdrop-blur-sm">
              <div className="text-yellow-400 text-sm font-bold">🏆 Certified</div>
              <div className="text-white text-xs">Industry Ready</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
