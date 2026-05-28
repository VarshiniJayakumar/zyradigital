import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-800">
          <div>
            <Logo size={40} dark={true} />
            <p className="text-slate-500 text-sm mt-3 max-w-xs">
              AI Integrated Digital Marketing Academy — Tamil Medium, Practical Training.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            {[['Curriculum','#curriculum'],['Features','#features'],['Mentor','#mentor'],['Pricing','#pricing']].map(([l,h]) => (
              <button key={l} onClick={() => document.querySelector(h)?.scrollIntoView({ behavior:'smooth' })}
                className="text-slate-400 hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>© 2025 ZyraDigital. All rights reserved. Tamil Nadu, India.</p>
          <p>AI Integrated Digital Marketing Academy</p>
        </div>
      </div>
    </footer>
  );
}
