import { useState, useEffect } from 'react';
import Logo from './Logo';

const links = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Features',   href: '#features'   },
  { label: 'Mentor',     href: '#mentor'      },
  { label: 'Pricing',    href: '#pricing'     },
];

export default function Navbar({ onEnroll }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Logo size={38} />

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l.label} onClick={() => nav(l.href)}
              className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onEnroll}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors px-4 py-2">
            Log in
          </button>
          <button onClick={onEnroll}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            Enroll Now →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-slate-600" onClick={() => setOpen(o => !o)}>
          {open
            ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-3 shadow-lg">
          {links.map(l => (
            <button key={l.label} onClick={() => nav(l.href)}
              className="text-slate-700 text-sm font-medium text-left py-1.5">
              {l.label}
            </button>
          ))}
          <button onClick={() => { setOpen(false); onEnroll(); }}
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg mt-2">
            Enroll Now →
          </button>
        </div>
      )}
    </header>
  );
}
