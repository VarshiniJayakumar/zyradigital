import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const modules = [
  { icon: '📣', title: 'Meta Ads', desc: 'Facebook & Instagram campaigns, audience targeting, creatives, and scaling strategies.' },
  { icon: '🔍', title: 'Google Ads', desc: 'Search, Display & YouTube campaigns with keyword research, Quality Score, and bidding.' },
  { icon: '🤖', title: 'AI Tools & Automation', desc: 'ChatGPT, Midjourney, Canva AI, and automation workflows to 10x your productivity.' },
  { icon: '🔀', title: 'Funnel Strategy', desc: 'Build high-converting funnels from awareness to purchase with psychological triggers.' },
  { icon: '🧲', title: 'Lead Generation', desc: 'WhatsApp funnels, lead magnets, landing pages, and low-cost lead gen tactics.' },
  { icon: '🔁', title: 'Retargeting', desc: 'Pixel setup, custom audiences, dynamic retargeting, and email remarketing strategies.' },
  { icon: '📅', title: 'Campaign Planning', desc: 'Full campaign lifecycle — briefs, budgets, timelines, A/B testing, and reporting.' },
  { icon: '🕵️', title: 'Competitor Research', desc: 'Spy tools, ad library analysis, and building strategies around competitor gaps.' },
];

export default function Curriculum() {
  const [expanded, setExpanded] = useState(null);
  const ref = useReveal();

  return (
    <section id="curriculum" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal text-center mb-14">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Curriculum</span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4">
            What You'll <span className="gradient-text">Learn</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A complete, industry-aligned curriculum built for real execution — not just theory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m, i) => (
            <div
              key={i}
              className="reveal card-bg p-5 rounded-2xl cursor-pointer hover:border-purple-600/50 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-purple-400 font-semibold">Module {i + 1}</span>
                <span className="text-gray-500 text-xs">{expanded === i ? '▲' : '▼'}</span>
              </div>
              <div className="text-2xl mb-2">{m.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{m.title}</h3>
              {expanded === i && (
                <p className="text-gray-400 text-xs leading-relaxed mt-2 border-t border-brand-border pt-2">
                  {m.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
